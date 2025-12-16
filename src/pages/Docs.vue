<script setup>
import { useHead } from '@vueuse/head'

useHead({
    title: 'Documentation & Guides | Satyendra',
    meta: [
        { name: 'description', content: 'Technical manuals, API references, and deployment guides for my open-source tools and infrastructure projects.' },
        { property: 'og:title', content: 'Documentation & Guides | Satyendra' },
        { property: 'og:description', content: 'Technical manuals, API references, and deployment guides.' },
        { property: 'og:url', content: 'https://satyendra.in/docs' },
        { property: 'og:image', content: 'https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/docs.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
        { rel: 'canonical', href: 'https://satyendra.in/docs' }
    ]
})
</script>

<template>
    <div class="container mx-auto max-w-4xl px-6 py-12 space-y-12">
        <div class="space-y-6">
            <h1 class="text-4xl font-bold text-text-main">Documentation</h1>
            <p class="text-xl text-text-main/60">Technical guides, API references, and project documentation.</p>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
            <!-- Primary Docs Link -->
            <a href="https://internal-docs.iiitkota.ac.in/" target="_blank" rel="noopener noreferrer"
                class="block p-6 rounded-xl border border-text-main/10 bg-text-main/5 hover:bg-text-main/10 transition-all group">
                <div class="flex items-start justify-between mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="text-text-main">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="text-text-main/40 group-hover:text-text-main group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                        <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                </div>
                <h2 class="text-lg font-semibold text-text-main mb-2">Internal Docs</h2>
                <p class="text-sm text-text-main/60">Access internal documentation for IIIT Kota projects
                    (Authentication not required for public docs, but required for confidential docs).</p>
            </a>

            <!-- Coming Soon Card -->
            <div
                class="p-6 rounded-xl border border-dashed border-text-main/10 bg-transparent flex flex-col justify-center items-center text-center opacity-60">
                <div class="mb-4 p-3 rounded-full bg-text-main/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="text-text-main/40">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                </div>
                <h2 class="text-lg font-semibold text-text-main mb-1">More Coming Soon</h2>
                <p class="text-sm text-text-main/60">Additional guides and public documentation are being written.</p>
            </div>
        </div>
    </div>
</template>
