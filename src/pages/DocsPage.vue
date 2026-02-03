<script setup>
import { useHead } from '@vueuse/head'
import { computed, ref, onMounted, onUnmounted, watch, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { docsConfig, buildNavTree, getDocComponent, getDocContent, getAllSections, getDirectoryContents } from '../utils/docs.js'
import NavTree from '../components/NavTree.vue'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

const route = useRoute()
const router = useRouter()

// Get isScrolled from parent App.vue via provide/inject or detect ourselves
const isScrolled = ref(false)
// Responsive state
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
const isDesktop = computed(() => windowWidth.value > 944)
const isUltraWide = computed(() => windowWidth.value >= 1760)

// Visibility Logic (Matches v2.html)
// Show Sidebars if: Desktop AND (Not Scrolled OR UltraWide)
const showSidebars = computed(() => {
    // Only show sidebars when a specific section is selected (not on docs index)
    if (!section.value) return false
    return isDesktop.value && (!isScrolled.value || isUltraWide.value)
})

// Show FABs if: Sidebars are NOT shown (Inverse)
const showFabs = computed(() => {
    // Only show FABs when a specific section is selected
    if (!section.value) return false
    return !showSidebars.value
})

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
}

const handleResize = () => {
    windowWidth.value = window.innerWidth
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleScroll() // Check initial scroll state
    handleResize() // Check initial resize state
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
})

// Extract section and slug from route params
const section = computed(() => route.params.section || '')
const slug = computed(() => {
    const slugParam = route.params.slug
    if (!slugParam) return 'index'
    return Array.isArray(slugParam) ? slugParam.join('/') : slugParam
})

// Get current doc config
const currentConfig = computed(() => docsConfig[section.value] || null)

// Build navigation for current section
const navItems = computed(() => {
    if (!section.value) return []
    return buildNavTree(section.value)
})

// Get directory contents for dynamic index
const directoryContents = computed(() => {
    if (!section.value) return null
    return getDirectoryContents(section.value, slug.value === 'index' ? '' : slug.value)
})

// Check if current page is an index page
const isIndexPage = computed(() => {
    return slug.value === 'index' || slug.value.endsWith('/index')
})

// Get document component
const docModule = computed(() => {
    if (!section.value) return null
    return getDocComponent(section.value, slug.value)
})

// Get frontmatter for SEO
const docContent = computed(() => {
    if (!section.value) return null
    return getDocContent(section.value, slug.value)
})

// Mobile sidebar toggle
const sidebarOpen = ref(false)

// TOC accordion state (closed by default)
const tocOpen = ref(false)

// Mobile floating TOC state
const mobileTocOpen = ref(false)

// Close sidebar and mobile TOC on route change
watch(() => route.path, () => {
    sidebarOpen.value = false
    mobileTocOpen.value = false
})

// Table of Contents from document headers
const toc = ref([])
const extractToc = () => {
    setTimeout(() => {
        const headers = document.querySelectorAll('.doc-content h2, .doc-content h3')
        toc.value = Array.from(headers).map(h => ({
            id: h.id,
            text: h.textContent?.replace('#', '').trim() || '',
            level: h.tagName === 'H2' ? 2 : 3,
        }))
    }, 150)
}

onMounted(extractToc)
watch(() => route.path, extractToc)

// All sections for docs index
const allSections = getAllSections()

// SEO
useHead(computed(() => {
    const fm = docContent.value?.frontmatter || {}
    const config = currentConfig.value || {}
    const title = fm.title || config.title || 'Documentation | Satyendra'
    const description = fm.description || config.description || 'Technical documentation and API references.'

    return {
        title: `${title} | Satyendra`,
        meta: [
            { name: 'description', content: description },
            { name: 'keywords', content: fm.keywords || 'documentation, API, technical' },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:url', content: `https://satyendra.in${route.path}` },
            { property: 'og:type', content: 'article' },
            { property: 'og:image', content: 'https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/docs.png' },
            { name: 'twitter:card', content: 'summary_large_image' },
        ],
        link: [
            { rel: 'canonical', href: `https://satyendra.in${route.path}` }
        ]
    }
}))

// Scroll to anchor
function scrollToAnchor(id) {
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    tocOpen.value = false
}

// IntersectionObserver for scroll animations
const sections = ref([])
onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
            }
        })
    }, { threshold: 0.1 })

    sections.value.forEach(section => {
        if (section) observer.observe(section)
    })
})

const setSectionRef = (el) => {
    if (el) sections.value.push(el)
}

// Handle internal anchor link clicks to prevent full page reload
const handleDocContentClick = (event) => {
    const target = event.target.closest('a')
    if (!target) return

    const href = target.getAttribute('href')
    if (!href) return

    // Check if it's an internal anchor link (starts with #)
    if (href.startsWith('#')) {
        event.preventDefault()
        const id = href.slice(1)
        scrollToAnchor(id)
        // Update URL without reload
        window.history.pushState({}, '', href)
        return
    }

    // Check if it's an internal docs link
    if (href.startsWith('/docs/')) {
        event.preventDefault()
        router.push(href)
    }
}

onMounted(() => {
    // Add click listener to doc content
    const docContent = document.querySelector('.doc-content')
    if (docContent) {
        docContent.addEventListener('click', handleDocContentClick)
    }
})

onUnmounted(() => {
    const docContent = document.querySelector('.doc-content')
    if (docContent) {
        docContent.removeEventListener('click', handleDocContentClick)
    }
})
</script>

<template>
    <div class="docs-wrapper flex flex-col items-center w-full min-h-[80vh] relative overflow-hidden">
        <!-- Background ambient -->
        <div class="fixed inset-0 pointer-events-none z-0">
            <div
                class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] opacity-30 animate-pulse">
            </div>
            <div
                class="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] opacity-20 animate-pulse delay-1000">
            </div>
        </div>

        <!-- Docs Index (when no section selected) -->
        <div v-if="!section" class="relative z-10 py-16 px-6 w-full">
            <div :ref="setSectionRef" class="scroll-section space-y-6 mb-16 text-center">
                <h1
                    class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-br from-cyan-100 to-cyan-400/60 pb-2">
                    Documentation
                </h1>
                <p class="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
                    Technical guides, API references, and project documentation.
                </p>
            </div>

            <div :ref="setSectionRef" class="scroll-section grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                <router-link v-for="sec in allSections" :key="sec.key" :to="sec.basePath"
                    class="group block p-6 rounded-2xl bg-bg-main/50 border border-white/5 hover:border-cyan-500/30 hover:bg-white/5 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                    <div
                        class="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div class="relative z-10">
                        <div class="text-3xl mb-4">{{ sec.icon }}</div>
                        <h2 class="text-xl font-bold text-text-main mb-2 group-hover:text-cyan-400 transition-colors">
                            {{ sec.title }}
                        </h2>
                        <p class="text-sm text-text-muted leading-relaxed line-clamp-2">
                            {{ sec.description }}
                        </p>
                        <div class="mt-4 flex items-center gap-2 text-cyan-400/70 text-sm font-medium">
                            <span>Explore</span>
                            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none"
                                stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- Doc Page Layout (when section is selected) -->
        <div v-else class="relative z-10 w-full py-8">
            <!-- DESKTOP: Fixed Nav Sidebar - Left edge of screen -->
            <!-- DESKTOP: Fixed Nav Sidebar - Left edge of screen -->
            <aside class="desktop-sidebar fixed left-4 top-1/2 -translate-y-1/2 w-64 z-30"
                :class="{ 'visible': showSidebars }">
                <nav class="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <router-link to="/docs"
                        class="flex items-center gap-2 text-sm text-text-muted hover:text-cyan-400 transition-colors mb-4 group">
                        <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none"
                            stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>All Docs</span>
                    </router-link>

                    <div class="mb-4 pb-4 border-b border-white/10">
                        <div class="text-xl mb-1">{{ currentConfig?.icon }}</div>
                        <h2 class="text-sm font-bold text-text-main">{{ currentConfig?.title }}</h2>
                    </div>

                    <NavTree :items="navItems" :current-path="route.path" />
                </nav>
            </aside>

            <!-- DESKTOP: Fixed TOC - Right edge of screen -->
            <aside v-if="toc.length > 0" class="desktop-sidebar fixed right-4 top-1/2 -translate-y-1/2 w-64 z-30"
                :class="{ 'visible': showSidebars }">
                <div class="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">On this page</h3>
                    <ul class="space-y-1 max-h-[50vh] overflow-y-auto">
                        <li v-for="item in toc" :key="item.id">
                            <button @click="scrollToAnchor(item.id)" :class="[
                                'block text-left text-xs py-1 transition-colors hover:text-cyan-400 w-full',
                                item.level === 3 ? 'pl-3 text-text-muted/70' : 'text-text-muted'
                            ]">
                                {{ item.text }}
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            <!-- Navigation Drawer (below 2xl breakpoint) -->
            <Drawer v-model:open="sidebarOpen">
                <DrawerTrigger as-child>
                    <button
                        class="fab-button fixed bottom-6 right-6 z-50 p-4 rounded-full bg-cyan-600 text-white shadow-2xl hover:bg-cyan-500 transition-all active:scale-95"
                        :class="{ 'visible': showFabs }" aria-label="Toggle navigation">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </DrawerTrigger>
                <DrawerContent class="bg-bg-main border-white/10 text-text-main h-[85vh]">
                    <DrawerHeader class="border-b border-white/5 pb-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="text-2xl">{{ currentConfig?.icon }}</div>
                                <DrawerTitle class="text-lg font-bold text-text-main">{{ currentConfig?.title }}
                                </DrawerTitle>
                            </div>
                            <DrawerDescription class="sr-only">Navigation for {{ currentConfig?.title }} documentation
                            </DrawerDescription>
                            <DrawerClose as-child>
                                <button class="p-2 rounded-lg hover:bg-white/5 transition-colors">
                                    <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor"
                                        stroke-width="2" viewBox="0 0 24 24">
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </DrawerClose>
                        </div>
                    </DrawerHeader>

                    <div class="p-6 overflow-y-auto">
                        <router-link to="/docs"
                            class="flex items-center gap-2 text-sm text-text-muted hover:text-cyan-400 transition-colors mb-6 group"
                            @click="sidebarOpen = false">
                            <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none"
                                stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            <span>All Docs</span>
                        </router-link>

                        <NavTree :items="navItems" :current-path="route.path" :is-mobile="true"
                            @navigate="sidebarOpen = false" />
                    </div>
                </DrawerContent>
            </Drawer>

            <Drawer v-if="toc.length > 0" v-model:open="mobileTocOpen">
                <DrawerTrigger as-child>
                    <button
                        class="fab-button fixed bottom-6 left-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-400 shadow-2xl hover:bg-white/20 transition-all active:scale-95"
                        :class="{ 'visible': showFabs }" aria-label="Table of Contents">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 10h16M4 14h10M4 18h7" />
                        </svg>
                    </button>
                </DrawerTrigger>
                <DrawerContent class="bg-bg-main border-white/10 text-text-main max-h-[70vh]">
                    <div class="mx-auto mt-4 h-1.5 w-12 rounded-full bg-white/10"></div>
                    <DrawerHeader class="border-b border-white/5 pb-4">
                        <div class="flex items-center justify-between">
                            <DrawerTitle class="text-xs font-bold text-text-muted uppercase tracking-wider">On this page
                            </DrawerTitle>
                            <DrawerDescription class="sr-only">Table of contents for the current document section
                            </DrawerDescription>
                            <DrawerClose as-child>
                                <button class="p-2 rounded-lg hover:bg-white/5 transition-colors">
                                    <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor"
                                        stroke-width="2" viewBox="0 0 24 24">
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </DrawerClose>
                        </div>
                    </DrawerHeader>
                    <div class="p-6 overflow-y-auto">
                        <ul class="space-y-1">
                            <li v-for="item in toc" :key="item.id">
                                <button @click="scrollToAnchor(item.id); mobileTocOpen = false" :class="[
                                    'block text-left text-sm py-2.5 transition-colors hover:text-cyan-400 w-full rounded-lg px-2 hover:bg-white/5',
                                    item.level === 3 ? 'pl-6 text-text-muted/70' : 'text-text-muted font-medium'
                                ]">
                                    {{ item.text }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </DrawerContent>
            </Drawer>

            <!-- Main content - Center -->
            <main class="w-full px-4 sm:px-6">
                <!-- TOC Accordion for mobile/tablet (when not scrolled) -->
                <div v-if="toc.length > 0 && !isScrolled" class="mb-8 lg:hidden">
                    <button @click="tocOpen = !tocOpen"
                        class="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group">
                        <span class="text-sm font-medium text-text-muted group-hover:text-text-main">
                            On this page
                        </span>
                        <svg :class="['w-4 h-4 text-text-muted transition-transform', tocOpen ? 'rotate-180' : '']"
                            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div v-if="tocOpen" class="mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        <button v-for="item in toc" :key="item.id" @click="scrollToAnchor(item.id)" :class="[
                            'block text-left text-sm transition-colors hover:text-cyan-400 w-full',
                            item.level === 3 ? 'pl-3 text-text-muted/70' : 'text-text-muted'
                        ]">
                            {{ item.text }}
                        </button>
                    </div>
                </div>

                <article class="doc-content" :key="route.path">
                    <component v-if="docModule?.default" :is="docModule.default" :key="route.path" />

                    <!-- Dynamic index content injection -->
                    <div v-if="isIndexPage && directoryContents && (directoryContents.folders.length > 0 || directoryContents.files.length > 0)"
                        class="mt-12 space-y-8">
                        <div v-if="directoryContents.folders.length > 0">
                            <h2 class="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
                                <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                                Sections
                            </h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <router-link v-for="folder in directoryContents.folders" :key="folder.path"
                                    :to="folder.path"
                                    class="group block p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
                                    <div class="flex items-start gap-3">
                                        <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none"
                                            stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        <div class="flex-1 min-w-0">
                                            <h3
                                                class="font-semibold text-text-main group-hover:text-cyan-400 transition-colors truncate">
                                                {{ folder.title }}</h3>
                                        </div>
                                        <svg class="w-4 h-4 text-text-muted group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0"
                                            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </router-link>
                            </div>
                        </div>

                        <div v-if="directoryContents.files.length > 0">
                            <h2 class="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
                                <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Pages
                            </h2>
                            <div class="space-y-3">
                                <router-link v-for="file in directoryContents.files" :key="file.path" :to="file.path"
                                    class="group block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300">
                                    <div class="flex items-start gap-3">
                                        <svg class="w-5 h-5 text-cyan-400/70 mt-0.5 flex-shrink-0" fill="none"
                                            stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path
                                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <div class="flex-1 min-w-0">
                                            <h3
                                                class="font-semibold text-text-main group-hover:text-cyan-400 transition-colors mb-1">
                                                {{ file.title }}</h3>
                                            <p v-if="file.description" class="text-sm text-text-muted line-clamp-2">{{
                                                file.description }}</p>
                                        </div>
                                        <svg class="w-4 h-4 text-text-muted group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                                            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="!docModule?.default" class="text-center py-20">
                        <div class="text-6xl mb-4">📄</div>
                        <h2 class="text-2xl font-bold text-text-main mb-2">Page Not Found</h2>
                        <p class="text-text-muted">The requested documentation page doesn't exist.</p>
                        <router-link :to="`/docs/${section}`"
                            class="inline-block mt-6 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors">
                            Back to {{ currentConfig?.title || 'Docs' }}
                        </router-link>
                    </div>
                </article>
            </main>
        </div>
    </div>
</template>

<style scoped>
@reference "tailwindcss";

.scroll-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.2, 0.0, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.0, 0.2, 1);
}

.scroll-section.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Prose overrides for markdown content */
.doc-content :deep(h1) {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-text-main);
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
    .doc-content :deep(h1) {
        font-size: 2.25rem;
    }
}

.doc-content :deep(h2) {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-main);
    margin-top: 3rem;
    margin-bottom: 1rem;
    scroll-margin-top: 5rem;
}

.doc-content :deep(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-main);
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    scroll-margin-top: 5rem;
}

.doc-content :deep(p) {
    color: var(--color-text-muted);
    line-height: 1.75;
    margin-bottom: 1rem;
}

.doc-content :deep(a) {
    color: rgb(34, 211, 238);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s;
}

.doc-content :deep(a:hover) {
    color: rgb(103, 232, 249);
}

.doc-content :deep(ul),
.doc-content :deep(ol) {
    color: var(--color-text-muted);
    margin-bottom: 1rem;
    padding-left: 1.5rem;
}

.doc-content :deep(li) {
    margin-bottom: 0.5rem;
}

.doc-content :deep(ul) {
    list-style-type: disc;
}

.doc-content :deep(ol) {
    list-style-type: decimal;
}

.doc-content :deep(code:not(pre code)) {
    background: rgba(255, 255, 255, 0.1);
    color: rgb(103, 232, 249);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-family: var(--font-mono);
}

.doc-content :deep(pre) {
    background: #0d1117;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    padding: 1rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
}

.doc-content :deep(.shiki-wrapper) {
    border-radius: 0.75rem;
    overflow: hidden;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.doc-content :deep(.shiki-wrapper pre) {
    background: transparent !important;
    border: 0;
    border-radius: 0;
}

.doc-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
}

.doc-content :deep(th) {
    background: rgba(255, 255, 255, 0.05);
    text-align: left;
    padding: 0.75rem 1rem;
    font-weight: 600;
    color: var(--color-text-main);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.doc-content :deep(td) {
    padding: 0.75rem 1rem;
    color: var(--color-text-muted);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.doc-content :deep(tr:hover td) {
    background: rgba(255, 255, 255, 0.05);
}

.doc-content :deep(blockquote) {
    border-left: 4px solid rgba(34, 211, 238, 0.5);
    padding-left: 1rem;
    font-style: italic;
    color: var(--color-text-muted);
    background: rgba(34, 211, 238, 0.05);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin: 1.5rem 0;
    border-radius: 0 0.5rem 0.5rem 0;
}

.doc-content :deep(hr) {
    border-color: rgba(255, 255, 255, 0.1);
    margin: 2rem 0;
}

.doc-content :deep(strong) {
    color: var(--color-text-main);
    font-weight: 600;
}

/* Header anchor styling */
.doc-content :deep(.header-anchor) {
    color: rgba(34, 211, 238, 0.5);
    text-decoration: none;
    margin-right: 0.5rem;
    opacity: 0.6;
    transition: opacity 0.2s;
}

.doc-content :deep(.header-anchor:hover) {
    color: rgb(34, 211, 238);
}

.doc-content :deep(h2:hover .header-anchor),
.doc-content :deep(h3:hover .header-anchor),
.doc-content :deep(h4:hover .header-anchor) {
    opacity: 1;
}

/* Fade-in animation for delayed sidebars */
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateX(10px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.4s cubic-bezier(0.2, 0.0, 0.2, 1) forwards;
}

/* Visibility transitions matching v2.html */
.desktop-sidebar {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.desktop-sidebar.visible {
    opacity: 1;
    pointer-events: auto;
}

.fab-button {
    opacity: 0;
    pointer-events: none;
    transform: translateY(1rem);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fab-button.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}
</style>
