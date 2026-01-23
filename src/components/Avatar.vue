<template>
  <div :class="['relative w-20 h-20 avatar-container group cursor-pointer', { processing: store.isAvatarProcessing }]"
    @click="triggerAvatar">
    <div class="fantasy-border"></div>

    <!-- LQIP Placeholder with blur + shimmer -->
    <div class="absolute inset-0 z-10 rounded-2xl overflow-hidden transition-opacity duration-700"
      :class="{ 'opacity-0 pointer-events-none': isLoaded }">
      <img :src="lqipSrc" alt="" aria-hidden="true"
        class="w-full h-full object-cover blur-sm scale-110 grayscale brightness-90 contrast-125" />
      <div class="absolute inset-0 shimmer-overlay"></div>
    </div>

    <!-- Full quality image -->
    <img :src="fullSrc" alt="Satyendra"
      class="img-main relative w-full h-full rounded-2xl object-cover grayscale brightness-90 contrast-125 border border-white/10 z-20 group-hover:grayscale-0 transition-all duration-500 shadow-none bg-zinc-900"
      :class="{ 'opacity-0': !isLoaded }" @load="isLoaded = true" />
    <div
      class="absolute -bottom-1 -right-1 z-30 w-4 h-4 bg-bg-main rounded-full flex items-center justify-center transition-colors duration-500">
      <div class="w-2 h-2 bg-text-main rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../store.js'

const isLoaded = ref(false)
const fullSrc = 'https://images.satyendra.in/Satyendra.webp'
const lqipSrc = 'https://images.satyendra.in/cdn-cgi/image/width=16,quality=10/Satyendra.webp'

const triggerAvatar = () => {
  if (store.isAvatarProcessing) return
  store.isAvatarProcessing = true
  setTimeout(() => { store.isAvatarProcessing = false }, 3000)
}
</script>

<style scoped>
.shimmer-overlay {
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.08) 50%,
      transparent 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
