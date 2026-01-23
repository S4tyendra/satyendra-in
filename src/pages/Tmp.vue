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

const handleLoad = () => {
    isLoading.value = false
}
</script>

<template>
    <div class="w-full min-h-screen flex flex-col items-center justify-start relative">
        <div class="w-full h-full transition-all duration-700 ease-in-out"
            :class="isLoading ? 'blur-xl scale-[0.98] opacity-50' : 'blur-0 scale-100 opacity-100'">
            <iframe src="https://portfoliogo3apiforai.satyendra.in/iframe/buyhatkeACCESS.txt"
                class="w-full min-h-screen border-none" title="Temporary Resource" @load="handleLoad"></iframe>
        </div>

        <!-- Progress context for interactions -->
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-8 h-8 border-2 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
        </div>
    </div>
</template>

<style scoped>
iframe {
    color-scheme: dark;
}
</style>
