<template>
    <div v-if="project" class="max-w-4xl mx-auto px-4 py-12 fade-in">
        <router-link to="/projects"
            class="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main mb-8 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Projects
        </router-link>

        <header class="mb-12">
            <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tag in project.tags" :key="tag"
                    class="px-2 py-1 text-xs font-mono border border-border-color rounded-md text-text-muted bg-bg-secondary/30">
                    {{ tag }}
                </span>
            </div>
            <h1
                class="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-text-main to-text-muted">
                {{ project.title }}</h1>
            <p class="text-xl text-text-muted leading-relaxed max-w-2xl">{{ project.desc }}</p>

            <div class="flex gap-4 mt-6">
                <a :href="project.link" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-text-main text-bg-main font-medium rounded hover:bg-white/90 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    View on GitHub
                </a>
                <a v-if="project.deployment_url" :href="project.deployment_url" target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 border border-border-color text-text-main font-medium rounded hover:bg-bg-secondary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                </a>
            </div>
        </header>

        <div class="grid @3xl:grid-cols-3 gap-8 @3xl:gap-12">
            <div class="@3xl:col-span-2 space-y-8">
                <section v-if="project.detail && project.detail.length">
                    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="text-accent-blue">
                            <line x1="8" y1="6" x2="21" y2="6" />
                            <line x1="8" y1="12" x2="21" y2="12" />
                            <line x1="8" y1="18" x2="21" y2="18" />
                            <line x1="3" y1="6" x2="3.01" y2="6" />
                            <line x1="3" y1="12" x2="3.01" y2="12" />
                            <line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                        Key Features
                    </h2>
                    <ul class="space-y-3">
                        <li v-for="(item, idx) in project.detail" :key="idx"
                            class="flex gap-3 text-text-muted/90 group">
                            <span
                                class="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-blue/50 shrink-0 group-hover:bg-accent-blue transition-colors"></span>
                            <span class="leading-relaxed">{{ item }}</span>
                        </li>
                    </ul>
                </section>

                <!-- Placeholder for Readme or more content -->
                <div class="p-6 border border-border-color rounded-lg bg-bg-secondary/20">
                    <p class="text-sm text-text-muted italic text-center">
                        More detailed documentation and setup instructions are available on the source repository.
                    </p>
                </div>
            </div>

            <aside class="space-y-6">
                <div class="p-5 rounded-lg border border-border-color bg-bg-secondary/10">
                    <h3 class="text-sm font-semibold text-text-main mb-3 uppercase tracking-wider">Project Info</h3>
                    <dl class="space-y-3 text-sm">
                        <div class="flex justify-between items-center" v-if="project.deployment_url">
                            <dt class="text-text-muted">Status</dt>
                            <dd class="text-green-400 font-medium">Live</dd>
                        </div>
                        <div class="flex justify-between items-center">
                            <dt class="text-text-muted">Type</dt>
                            <dd class="text-text-main text-right wrap-break-word max-w-[50%]">
                                {{ project.link.includes('github.com') ? 'Open Source' : 'Closed Source' }}
                            </dd>
                        </div>
                    </dl>
                </div>
            </aside>
        </div>
    </div>
    <div v-else class="min-h-[50vh] flex items-center justify-center">
        <div class="text-center">
            <h2 class="text-2xl font-bold mb-2">Project Not Found</h2>
            <router-link to="/projects" class="text-accent-blue hover:underline">Return to Projects</router-link>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import projectsData from '../data/projects.js'
import closedData from '../data/closedSrcProjects.js'

const route = useRoute()
const repoName = route.params.repo

const allProjects = [...projectsData, ...closedData]

const project = computed(() => {
    return allProjects.find(p => {
        // Try to match by repo name extracted from link
        if (!p.link) return false;
        const parts = p.link.split('/')
        const name = parts[parts.length - 1] || parts[parts.length - 2] // handle trailing slash
        return name === repoName || p.title.toLowerCase().replace(/\s+/g, '-') === repoName
    })
})

const defaultImage = 'https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/default.png';

useHead({
    title: computed(() => project.value?.title ? `${project.value.title} | Satyendra` : 'Loading...'),
    meta: [
        {
            name: 'description',
            content: computed(() => project.value?.desc || 'Detailed view of this engineering project.')
        },
        {
            name: 'keywords',
            content: computed(() => project.value?.tags?.join(', ') || 'Go, Linux, Open Source')
        },
        // Open Graph
        {
            property: 'og:title',
            content: computed(() => project.value?.title || 'Project Detail')
        },
        {
            property: 'og:description',
            content: computed(() => project.value?.desc || 'Detailed view of this engineering project.')
        },
        {
            property: 'og:image',
            content: computed(() => {
                if (!project.value?.title) return defaultImage;
                // Ensure slug safety
                const slug = project.value.title.trim().toLowerCase().replace(/\s+/g, '-');
                return `https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/projects/${slug}.png`;
            })
        },
        {
            property: 'og:url',
            content: computed(() => `https://satyendra.in/projects/${repoName}`)
        },
        // Twitter
        {
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:title',
            content: computed(() => project.value?.title || 'Project Detail')
        },
        {
            name: 'twitter:description',
            content: computed(() => project.value?.desc || 'Detailed view of this engineering project.')
        },
        {
            name: 'twitter:image',
            content: computed(() => {
                if (!project.value?.title) return defaultImage;
                const slug = project.value.title.trim().toLowerCase().replace(/\s+/g, '-');
                return `https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/projects/${slug}.png`;
            })
        }
    ],
    link: [
        {
            rel: 'canonical',
            href: computed(() => `https://satyendra.in/projects/${repoName}`)
        }
    ]
})
</script>
