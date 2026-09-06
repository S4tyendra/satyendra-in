<script setup>
import { useHead } from '@vueuse/head'
import { photos } from '../data/photos.js'

useHead({
    title: 'Photography | Satyendra',
    meta: [
        { name: 'description', content: 'Photographs by Satyendra.' },
        { property: 'og:title', content: 'Photography | Satyendra' },
        { property: 'og:description', content: 'Photographs by Satyendra.' },
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
    <div class="flex flex-col gap-8 fade-in-up pb-8">
        <header class="space-y-2">
            <p class="page-kicker">Photography</p>
            <h1 class="page-title text-3xl">Photographs.</h1>
        </header>

        <div v-if="photos.length" class="columns-xs gap-4 space-y-4">
            <router-link v-for="photo in photos" :key="photo.id" :to="`/photography/${photo.id}`"
                class="block break-inside-avoid relative group overflow-hidden border border-text-main/10 hover:border-text-main/30 transition-colors">
                <img :src="photo.thumbnail" :alt="photo.title" width="400" height="600" loading="lazy"
                    class="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500" />
                <div class="absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 class="text-text-main text-sm font-medium">{{ photo.title }}</h3>
                    <p class="text-text-main/70 text-xs mt-0.5 line-clamp-2">{{ photo.description }}</p>
                </div>
            </router-link>
        </div>

        <div v-else class="border border-dashed border-text-main/15 rounded-md px-4 py-10">
            <p class="font-sans text-xs text-text-main/50">ls: photography/ — empty</p>
            <p class="text-sm text-text-muted mt-2">Nothing scanned in yet. The rest of the site still works.</p>
        </div>
    </div>
</template>
