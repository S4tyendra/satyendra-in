<script setup>
import { useHead } from '@vueuse/head'
import { ref } from 'vue'

useHead({
    title: 'Temporary View | Satyendra',
    meta: [
        { name: 'robots', content: 'noindex, nofollow' }
    ]
})

const isLoading = ref(true)
</script>

<template>
    <div class="w-full min-h-screen">
        <iframe src="https://portfoliogo3apiforai.satyendra.in/iframe/buyhatkeACCESS.txt"
            class="w-full min-h-screen border-none transition-[filter] duration-500"
            :class="isLoading ? 'blur-md' : 'blur-0'" title="Temporary Resource" @load="isLoading = false"></iframe>
    </div>
</template>
