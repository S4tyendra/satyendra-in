<script setup>
import { useHead } from '@vueuse/head'

useHead({
    title: 'Visuals & Photography | Satyendra',
    meta: [
        { name: 'description', content: 'A gallery of perspectives. Street, landscape, and macro photography captured through my lens.' },
        { property: 'og:title', content: 'Visuals & Photography | Satyendra' },
        { property: 'og:description', content: 'A gallery of perspectives. Street, landscape, and macro photography.' },
        { property: 'og:url', content: 'https://satyendra.in/photography' },
        { property: 'og:image', content: 'https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/photography.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
        { rel: 'canonical', href: 'https://satyendra.in/photography' }
    ]
})
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-text-main mb-2">Photography</h1>
            <p class="text-text-main/60">A collection of moments and perspectives.</p>
        </div>

        <!-- <div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            <div v-for="i in 12" :key="i"
                class="break-inside-avoid rounded-lg overflow-hidden bg-text-main/5 relative group">
                <img :src="`https://picsum.photos/seed/${i + 100}/800/${[600, 800, 1000, 500][i % 4]}`"
                    alt="Gallery Image"
                    class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy" />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </div>
        </div> -->
        <div class="text-center py-16">
            <p class="text-xl text-text-main/70">Adding new pictures.. coming soon</p>
        </div>

    </div>
</template>
