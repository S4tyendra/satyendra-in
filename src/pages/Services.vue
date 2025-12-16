<script setup>
import { useHead } from '@vueuse/head'

useHead({
    title: 'Services | Satyendra',
    meta: [
        { name: 'description', content: 'Professional services and collaboration opportunities.' }
    ]
})
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div class="p-4 rounded-full bg-text-main/5 mb-6 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="text-text-main/40">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h10" />
                <path d="M7 12h10" />
                <path d="M7 17h10" />
            </svg>
        </div>
        <h1 class="text-3xl font-bold text-text-main mb-3">Services</h1>
        <p class="text-lg text-text-main/60 max-w-md">
            I'm currently structuring my service offerings. Check back soon for collaboration opportunities.
        </p>
    </div>
</template>
