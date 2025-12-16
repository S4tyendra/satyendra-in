<script setup>
import { useHead } from '@vueuse/head'

useHead({
    title: 'Photography | Satyendra',
    meta: [
        { name: 'description', content: 'A collection of moments and perspectives captured through my lens.' }
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
