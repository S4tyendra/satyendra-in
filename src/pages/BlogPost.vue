<script setup>
import { useHead } from '@vueuse/head'
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllPosts, getPostComponent, getPost } from '../utils/blog.js'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

const props = defineProps({
    slug: { type: String, required: true }
})

const route = useRoute()
const router = useRouter()

const allPosts = getAllPosts()

// Search for sidebar
const search = ref('')
const filteredPosts = computed(() => {
    const q = search.value.toLowerCase().trim()
    if (!q) return allPosts
    return allPosts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.summary || '').toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
    )
})

// Post data
const post = computed(() => {
    const data = getPost(props.slug)
    if (!data) return null
    const fm = data.frontmatter
    return {
        ...fm,
        title: fm.title || props.slug,
        date: fm.date ? new Date(fm.date) : new Date(),
        summary: fm.summary || '',
        tags: fm.tags ? fm.tags.split(',').map(t => t.trim()) : [],
    }
})
const postComponent = computed(() => getPostComponent(props.slug))

// Responsive state — mirrors DocsPage exactly
const isScrolled = ref(false)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
const isDesktop = computed(() => windowWidth.value > 944)
const isUltraWide = computed(() => windowWidth.value >= 1760)
const showSidebars = computed(() => isDesktop.value && (!isScrolled.value || isUltraWide.value))
const showFabs = computed(() => !showSidebars.value)

const handleScroll = () => { isScrolled.value = window.scrollY > 50 }
const handleResize = () => { windowWidth.value = window.innerWidth }

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleScroll()
    handleResize()
})
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
})

// Mobile drawers
const sidebarOpen = ref(false)
const mobileTocOpen = ref(false)

watch(() => route.path, () => {
    sidebarOpen.value = false
    mobileTocOpen.value = false
})

// TOC
const toc = ref([])
const tocOpen = ref(false)
const activeId = ref('')

let tocObserver = null

const extractToc = () => {
    setTimeout(() => {
        const headers = document.querySelectorAll('.blog-content h2, .blog-content h3')
        toc.value = Array.from(headers).map(h => ({
            id: h.id,
            text: h.textContent?.replace('#', '').trim() || '',
            level: h.tagName === 'H2' ? 2 : 3,
        }))

        // Set up IntersectionObserver for active TOC highlighting
        if (tocObserver) tocObserver.disconnect()
        if (headers.length === 0) return

        // Track which headings are visible; pick the topmost one
        const visibleIds = new Set()
        tocObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        visibleIds.add(entry.target.id)
                    } else {
                        visibleIds.delete(entry.target.id)
                    }
                })
                // Pick the first visible heading in document order
                const allIds = Array.from(headers).map(h => h.id)
                const first = allIds.find(id => visibleIds.has(id))
                if (first) activeId.value = first
            },
            { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
        )
        headers.forEach(h => tocObserver.observe(h))
    }, 150)
}

onMounted(extractToc)
watch(() => route.path, () => {
    if (tocObserver) tocObserver.disconnect()
    activeId.value = ''
    extractToc()
})

onUnmounted(() => {
    if (tocObserver) tocObserver.disconnect()
})

function scrollToAnchor(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    tocOpen.value = false
}

// Handle anchor clicks inside blog content
const handleContentClick = (event) => {
    const target = event.target.closest('a')
    if (!target) return
    const href = target.getAttribute('href')
    if (!href) return
    if (href.startsWith('#')) {
        event.preventDefault()
        scrollToAnchor(href.slice(1))
        window.history.pushState({}, '', href)
    }
}

onMounted(() => {
    const el = document.querySelector('.blog-content')
    if (el) el.addEventListener('click', handleContentClick)
})
onUnmounted(() => {
    const el = document.querySelector('.blog-content')
    if (el) el.removeEventListener('click', handleContentClick)
})

// SEO
useHead(computed(() => ({
    title: `${post.value?.title || 'Blog Post'} | Satyendra`,
    meta: [
        { name: 'description', content: post.value?.summary || '' },
        { property: 'og:title', content: post.value?.title || 'Blog Post' },
        { property: 'og:description', content: post.value?.summary || '' },
        { property: 'og:url', content: `https://satyendra.in/blog/${props.slug}` },
        { property: 'og:type', content: 'article' },
        { property: 'article:published_time', content: post.value?.date },
        { property: 'article:author', content: 'Satyendra' },
        ...(post.value?.tags || []).map(tag => ({ property: 'article:tag', content: tag }))
    ]
})))
</script>

<template>
    <div class="blog-wrapper flex flex-col items-center w-full min-h-[80vh] relative overflow-hidden">
        <!-- Background ambient -->
        <div class="fixed inset-0 pointer-events-none z-0">
            <div
                class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] opacity-30 animate-pulse">
            </div>
            <div
                class="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] opacity-20 animate-pulse delay-1000">
            </div>
        </div>

        <div class="relative z-10 w-full py-8">
            <!-- DESKTOP: Left sidebar — all posts with search -->
            <aside class="desktop-sidebar fixed left-4 top-1/2 -translate-y-1/2 w-64 z-30"
                :class="{ 'visible': showSidebars }">
                <nav
                    class="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col gap-3 max-h-[80vh]">
                    <!-- Back to Blog -->
                    <router-link to="/blog"
                        class="flex items-center gap-2 text-sm text-text-muted hover:text-cyan-400 transition-colors group">
                        <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none"
                            stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>All Posts</span>
                    </router-link>

                    <div class="border-t border-white/10 pt-3">
                        <!-- Search -->
                        <div class="relative mb-3">
                            <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none"
                                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                            <input v-model="search" type="text" placeholder="Search posts…"
                                class="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-text-main placeholder-text-muted focus:outline-none focus:border-cyan-500/50 transition-colors" />
                        </div>

                        <!-- Post list -->
                        <ul class="space-y-0.5 overflow-y-auto max-h-[55vh] pr-0.5">
                            <li v-for="p in filteredPosts" :key="p.slug">
                                <router-link :to="`/blog/${p.slug}`"
                                    class="flex items-start gap-2 px-2 py-2 rounded-lg text-xs transition-all group hover:bg-white/5"
                                    :class="p.slug === slug ? 'bg-cyan-500/15 text-cyan-400 font-medium' : ''">
                                    <svg class="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                                        :class="p.slug === slug ? 'text-cyan-400' : 'text-text-muted'" fill="none"
                                        stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path
                                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <span
                                        :class="p.slug === slug ? 'text-cyan-400' : 'text-text-muted group-hover:text-text-main'"
                                        class="leading-snug">{{ p.title }}</span>
                                </router-link>
                            </li>
                            <li v-if="filteredPosts.length === 0" class="text-xs text-text-muted px-2 py-3 text-center">
                                No posts found</li>
                        </ul>
                    </div>
                </nav>
            </aside>

            <!-- DESKTOP: Right TOC -->
            <aside v-if="toc.length > 0" class="desktop-sidebar fixed right-4 top-1/2 -translate-y-1/2 w-64 z-30"
                :class="{ 'visible': showSidebars }">
                <div class="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">On this page</h3>
                    <ul class="space-y-1 max-h-[50vh] overflow-y-auto">
                        <li v-for="item in toc" :key="item.id">
                            <button @click="scrollToAnchor(item.id)" :class="[
                                'block text-left text-xs py-1 transition-all w-full font-medium',
                                item.id === activeId
                                    ? 'text-cyan-400'
                                    : item.level === 3
                                        ? 'pl-3 text-text-muted/70 hover:text-cyan-400 font-normal'
                                        : 'text-text-muted hover:text-cyan-400 font-normal'
                            ]">
                                <span :class="item.level === 3 ? 'pl-3 block' : ''">
                                    {{ item.text }}
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            <!-- Mobile FAB: Nav sidebar -->
            <Drawer v-model:open="sidebarOpen">
                <DrawerTrigger as-child>
                    <button
                        class="fab-button fixed bottom-6 right-6 z-50 p-4 rounded-full bg-cyan-600 text-white shadow-2xl hover:bg-cyan-500 transition-all active:scale-95"
                        :class="{ 'visible': showFabs }" aria-label="All posts">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </DrawerTrigger>
                <DrawerContent class="bg-bg-main border-white/10 text-text-main h-[85vh]">
                    <DrawerHeader class="border-b border-white/5 pb-4">
                        <div class="flex items-center justify-between">
                            <DrawerTitle class="text-lg font-bold text-text-main">All Posts</DrawerTitle>
                            <DrawerDescription class="sr-only">Browse all blog posts</DrawerDescription>
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
                    <div class="p-6 overflow-y-auto flex flex-col gap-4">
                        <router-link to="/blog" @click="sidebarOpen = false"
                            class="flex items-center gap-2 text-sm text-text-muted hover:text-cyan-400 transition-colors group">
                            <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none"
                                stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            <span>All Posts</span>
                        </router-link>
                        <div class="relative">
                            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
                                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                            <input v-model="search" type="text" placeholder="Search posts…"
                                class="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-cyan-500/50 transition-colors" />
                        </div>
                        <ul class="space-y-1">
                            <li v-for="p in filteredPosts" :key="p.slug">
                                <router-link :to="`/blog/${p.slug}`" @click="sidebarOpen = false"
                                    class="flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm transition-all hover:bg-white/5"
                                    :class="p.slug === slug ? 'bg-cyan-500/15 text-cyan-400 font-medium' : ''">
                                    <svg class="w-4 h-4 mt-0.5 flex-shrink-0"
                                        :class="p.slug === slug ? 'text-cyan-400' : 'text-text-muted'" fill="none"
                                        stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path
                                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <span :class="p.slug === slug ? 'text-cyan-400' : 'text-text-muted'"
                                        class="leading-snug">{{ p.title }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </DrawerContent>
            </Drawer>

            <!-- Mobile FAB: TOC -->
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
                            <DrawerDescription class="sr-only">Table of contents</DrawerDescription>
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
                                    'block text-left text-sm py-2.5 transition-all w-full rounded-lg px-2 hover:bg-white/5',
                                    item.id === activeId
                                        ? 'text-cyan-400 font-semibold bg-cyan-500/10'
                                        : item.level === 3
                                            ? 'pl-6 text-text-muted/70 hover:text-cyan-400'
                                            : 'text-text-muted font-medium hover:text-cyan-400'
                                ]">
                                    {{ item.text }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </DrawerContent>
            </Drawer>

            <!-- Main content -->
            <main class="w-full px-4 sm:px-6">
                <!-- TOC accordion for mobile/tablet -->
                <div v-if="toc.length > 0 && !isScrolled" class="mb-8 lg:hidden">
                    <button @click="tocOpen = !tocOpen"
                        class="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group">
                        <span class="text-sm font-medium text-text-muted group-hover:text-text-main">On this page</span>
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

                <div v-if="post">
                    <article class="blog-content" :key="slug">
                        <component v-if="postComponent?.default" :is="postComponent.default" />
                        <div v-else class="text-center py-20">
                            <div class="text-5xl mb-4">📄</div>
                            <h2 class="text-2xl font-bold text-text-main mb-2">Post Not Found</h2>
                            <p class="text-text-muted">This blog post doesn't exist.</p>
                            <router-link to="/blog"
                                class="inline-block mt-6 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors">
                                Back to Blog
                            </router-link>
                        </div>
                    </article>
                </div>
                <div v-else class="text-center py-20">
                    <div class="text-5xl mb-4">📄</div>
                    <h2 class="text-2xl font-bold text-text-main mb-2">Post Not Found</h2>
                    <router-link to="/blog"
                        class="inline-block mt-6 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors">
                        Back to Blog
                    </router-link>
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
/* Visibility transitions — identical to DocsPage */
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

/* Prose styles — identical to DocsPage .doc-content */
.blog-content :deep(h1) {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-text-main);
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
    .blog-content :deep(h1) {
        font-size: 2.25rem;
    }
}

.blog-content :deep(h2) {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-main);
    margin-top: 3rem;
    margin-bottom: 1rem;
    scroll-margin-top: 5rem;
}

.blog-content :deep(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-main);
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    scroll-margin-top: 5rem;
}

.blog-content :deep(h4) {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-text-main);
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    scroll-margin-top: 5rem;
}

.blog-content :deep(p) {
    color: var(--color-text-muted);
    line-height: 1.75;
    margin-bottom: 1rem;
}

.blog-content :deep(a) {
    color: rgb(34, 211, 238);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s;
}

.blog-content :deep(a:hover) {
    color: rgb(103, 232, 249);
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
    color: var(--color-text-muted);
    margin-bottom: 1rem;
    padding-left: 1.5rem;
}

.blog-content :deep(li) {
    margin-bottom: 0.5rem;
}

.blog-content :deep(ul) {
    list-style-type: disc;
}

.blog-content :deep(ol) {
    list-style-type: decimal;
}

.blog-content :deep(code:not(pre code)) {
    background: rgba(255, 255, 255, 0.1);
    color: rgb(103, 232, 249);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-family: var(--font-mono);
}

.blog-content :deep(pre) {
    background: #0d1117;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    padding: 1rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
}

.blog-content :deep(.shiki-wrapper) {
    border-radius: 0.75rem;
    overflow: hidden;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.blog-content :deep(.shiki-wrapper pre) {
    background: transparent !important;
    border: 0;
    border-radius: 0;
}

.blog-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
}

.blog-content :deep(th) {
    background: rgba(255, 255, 255, 0.05);
    text-align: left;
    padding: 0.75rem 1rem;
    font-weight: 600;
    color: var(--color-text-main);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.blog-content :deep(td) {
    padding: 0.75rem 1rem;
    color: var(--color-text-muted);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.blog-content :deep(tr:hover td) {
    background: rgba(255, 255, 255, 0.05);
}

.blog-content :deep(blockquote) {
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

.blog-content :deep(hr) {
    border-color: rgba(255, 255, 255, 0.1);
    margin: 2rem 0;
}

.blog-content :deep(strong) {
    color: var(--color-text-main);
    font-weight: 600;
}

.blog-content :deep(img) {
    border-radius: 0.75rem;
    margin: 1.5rem auto;
    display: block;
    max-width: 100%;
}

/* Header anchor styling — same as DocsPage */
.blog-content :deep(.header-anchor) {
    color: rgba(34, 211, 238, 0.5);
    text-decoration: none;
    margin-right: 0.5rem;
    opacity: 0.6;
    transition: opacity 0.2s;
}

.blog-content :deep(.header-anchor:hover) {
    color: rgb(34, 211, 238);
}

.blog-content :deep(h2:hover .header-anchor),
.blog-content :deep(h3:hover .header-anchor),
.blog-content :deep(h4:hover .header-anchor) {
    opacity: 1;
}
</style>
