<script setup>
import { useHead } from '@vueuse/head'
import { ref, computed } from 'vue'
import { getAllPosts } from '../utils/blog.js'

const allPosts = getAllPosts()

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

const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

useHead({
    title: 'Engineering Journal | Satyendra',
    meta: [
        { name: 'description', content: 'Articles on DevSecOps, Linux internals, Go programming, and System Architecture. Technical articles and practical tutorials.' },
        { property: 'og:title', content: 'Engineering Journal | Satyendra' },
        { property: 'og:description', content: 'Articles on DevSecOps, Linux internals, Go, and System Architecture.' },
        { property: 'og:url', content: 'https://satyendra.in/blog' },
    ]
})
</script>

<template>
    <div class="flex flex-col gap-8 fade-in-up pb-8">
        <header class="space-y-3">
            <p class="page-kicker">Articles & guides</p>
            <h1 class="page-title text-3xl">Writing.</h1>
            <p class="text-sm text-text-muted max-w-md">
                Practical tutorials, project write-ups, and technical articles on software, Linux, and infrastructure.
            </p>
            <div class="relative max-w-sm">
                <input v-model="search" type="text" aria-label="Search articles" placeholder="Search articles or topics"
                    class="w-full bg-transparent border-b border-text-main/15 py-2 pr-3 text-sm text-text-main placeholder-text-main/30 focus:outline-none focus:border-text-main/50 transition-colors" />
            </div>
        </header>

        <ul class="flex flex-col border-t border-text-main/10">
            <li v-for="post in filteredPosts" :key="post.slug">
                <router-link :to="`/blog/${post.slug}`"
                    class="group grid grid-cols-1 sm:grid-cols-[6.5rem_1fr] gap-1 sm:gap-6 py-6 border-b border-text-main/10 hover:bg-text-main/[0.03] transition-colors px-1">
                    <time class="font-sans text-sm text-text-muted pt-0.5">{{ formatDate(post.date) }}</time>
                    <div class="min-w-0">
                        <h2 class="text-xl text-text-main group-hover:underline decoration-text-main/30 underline-offset-4 leading-snug">
                            {{ post.title }}
                            <span v-if="post.wip" class="ml-2 font-sans text-xs text-text-muted no-underline">In progress</span>
                        </h2>
                        <p class="text-sm text-text-muted leading-relaxed mt-1 line-clamp-2">{{ post.summary }}</p>
                        <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mt-2">
                            <span v-for="tag in post.tags.slice(0, 3)" :key="tag"
                                class="font-sans text-xs text-text-muted">{{ tag }}</span>
                        </div>
                    </div>
                </router-link>
            </li>
            <li v-if="filteredPosts.length === 0" class="py-10 text-sm text-text-muted">
                No posts match “{{ search }}”.
            </li>
        </ul>
    </div>
</template>
