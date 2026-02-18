<script setup>
import { useHead } from '@vueuse/head'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAllPosts } from '../utils/blog.js'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

const router = useRouter()

const allPosts = getAllPosts()

// Search
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

// Mobile drawer
const drawerOpen = ref(false)

useHead({
    title: 'Engineering Journal | Satyendra',
    meta: [
        { name: 'description', content: 'Deep dives into DevSecOps, Linux internals, Go programming, and System Architecture. No-fluff technical articles and tutorials.' },
        { property: 'og:title', content: 'Engineering Journal | Satyendra' },
        { property: 'og:description', content: 'Deep dives into DevSecOps, Linux internals, Go, and System Architecture.' },
        { property: 'og:url', content: 'https://satyendra.in/blog' },
    ]
})
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
            <!-- DESKTOP: Left sidebar — all posts list with search -->


            <!-- Mobile FAB — open drawer -->
            <Drawer v-model:open="drawerOpen">
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
                        <div class="relative">
                            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
                                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                            <input v-model="search" type="text" placeholder="Search posts…"
                                class="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-cyan-500/50 transition-colors" />
                        </div>
                        <ul class="space-y-1">
                            <li v-for="post in filteredPosts" :key="post.slug">
                                <router-link :to="`/blog/${post.slug}`" @click="drawerOpen = false"
                                    class="flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm transition-all hover:bg-white/5"
                                    active-class="bg-cyan-500/15 text-cyan-400 font-medium">
                                    <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-text-muted" fill="none"
                                        stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path
                                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <span class="text-text-muted leading-snug">{{ post.title }}</span>
                                </router-link>
                            </li>
                            <li v-if="filteredPosts.length === 0" class="text-sm text-text-muted px-3 py-4 text-center">
                                No posts found</li>
                        </ul>
                    </div>
                </DrawerContent>
            </Drawer>

            <!-- Main content -->
            <main class="w-full px-4 sm:px-6">
                <!-- Header -->
                <div class="text-center mb-12 space-y-3">
                    <h1
                        class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-br from-cyan-100 to-cyan-400/60 pb-2">
                        Engineering Journal
                    </h1>
                    <p class="text-base md:text-lg text-text-muted max-w-xl mx-auto">
                        Deep dives into distributed systems, security, and low-level engineering.
                    </p>
                </div>

                <!-- Inline search (visible when sidebars hidden) -->
                <div v-if="!showSidebars" class="mb-6 max-w-lg mx-auto">
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
                            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input v-model="search" type="text" placeholder="Search posts…"
                            class="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-cyan-500/50 transition-colors" />
                    </div>
                </div>

                <!-- Post list -->
                <div class="space-y-3 max-w-2xl mx-auto">
                    <router-link v-for="post in filteredPosts" :key="post.slug" :to="`/blog/${post.slug}`"
                        class="group flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/8 transition-all duration-300 hover:-translate-y-0.5">
                        <!-- Date column -->
                        <div class="flex-shrink-0 text-right hidden sm:block w-20">
                            <span class="text-xs font-mono text-cyan-400/60">
                                {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                }}
                            </span>
                            <div class="text-xs font-mono text-text-muted/50">
                                {{ new Date(post.date).getFullYear() }}
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1 sm:hidden">
                                <span class="text-xs font-mono text-cyan-400/60">
                                    {{ new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric', month:
                                            'short', day: 'numeric'
                                    }) }}
                                </span>
                            </div>
                            <h2
                                class="text-base font-semibold text-text-main group-hover:text-cyan-400 transition-colors leading-snug mb-1">
                                {{ post.title }}
                            </h2>
                            <p class="text-sm text-text-muted leading-relaxed line-clamp-2">
                                {{ post.summary }}
                            </p>
                            <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-1.5 mt-2">
                                <span v-for="tag in post.tags.slice(0, 3)" :key="tag"
                                    class="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400/80">
                                    {{ tag }}
                                </span>
                            </div>
                        </div>

                        <!-- Arrow -->
                        <svg class="w-4 h-4 text-text-muted group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </router-link>

                    <div v-if="filteredPosts.length === 0" class="text-center py-20">
                        <div class="text-5xl mb-4">📭</div>
                        <p class="text-text-muted">No posts match your search.</p>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
/* Visibility transitions matching DocsPage */
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
