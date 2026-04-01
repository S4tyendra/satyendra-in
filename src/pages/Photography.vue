<script setup>
import { useHead } from '@vueuse/head'
import { photos } from '../data/photos.js'

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
    <div class="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div class="w-full mx-auto mb-12 text-center">
            <h1 class="text-4xl font-bold text-text-main mb-4 tracking-tight">Visual Journal</h1>
            <p class="text-lg text-text-main/60 max-w-2xl mx-auto">
                A collection of fleeting moments, quiet details, and grand landscapes.
                Captured to tell a story beyond words.
            </p>
        </div>

        <div class="columns-xs gap-6 space-y-6">
            <template v-for="photo in photos" :key="photo.id">
                <router-link :to="`/photography/${photo.id}`"
                    class="block break-inside-avoid relative group rounded-xl overflow-hidden shadow-lg bg-surface-lighter/5 ring-1 ring-white/5 hover:ring-white/20 transition-all duration-300 transform hover:-translate-y-1">
                    <img :src="photo.thumbnail" :alt="photo.title" width="400" height="600" loading="lazy"
                        class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />

                    <!-- Overlay -->
                    <div
                        class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h3
                            class="text-white text-xl font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            {{ photo.title }}</h3>
                        <p
                            class="text-white/80 text-sm mt-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-2">
                            {{ photo.description }}</p>
                    </div>
                </router-link>
            </template>
        </div>

        <div v-if="photos.length === 0" class="text-center py-24">
            <p class="text-xl text-text-main/50">Gallery is being curated. Check back soon.</p>
        </div>
    </div>
</template>

<style scoped>
/* Smooth masonry layout */
.columns-1 {
    column-fill: balance;
}
</style>
