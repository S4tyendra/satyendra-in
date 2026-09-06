<template>
  <div :class="['relative w-20 h-20 avatar-container group cursor-pointer', { processing: store.isAvatarProcessing }]"
    @click="triggerAvatar">
    <div class="avatar-ring"></div>

    <div class="absolute inset-0 z-10 rounded-2xl overflow-hidden transition-opacity duration-700"
      :class="{ 'opacity-0 pointer-events-none': isLoaded }">
      <img :src="lqipSrc" alt="" aria-hidden="true"
        class="w-full h-full object-cover blur-sm scale-110 grayscale brightness-90 contrast-125" />
    </div>

    <img :src="fullSrc" alt="Satyendra"
      class="img-main relative w-full h-full rounded-2xl object-cover grayscale brightness-90 contrast-125 border border-text-main/15 z-20 group-hover:grayscale-0 transition-all duration-500 bg-bg-raised"
      :class="{ 'opacity-0': !isLoaded }" @load="isLoaded = true" />
    <div
      class="absolute -bottom-1 -right-1 z-30 w-4 h-4 bg-bg-main rounded-full flex items-center justify-center">
      <div class="w-2 h-2 bg-phosphor rounded-full shadow-[0_0_8px_rgba(143,188,122,0.55)]"></div>
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
  setTimeout(() => { store.isAvatarProcessing = false }, 1800)
}
</script>
