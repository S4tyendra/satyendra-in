<template>
  <div 
    :class="['relative w-20 h-20 avatar-container group cursor-pointer', { processing: store.isAvatarProcessing }]"
    @click="triggerAvatar"
  >
    <div class="fantasy-border"></div>
    <img
      src="https://images.satyendra.in/Satyendra.webp"
      alt="Satyendra"
      class="img-main relative w-full h-full rounded-2xl object-cover grayscale brightness-90 contrast-125 border border-white/10 z-20 group-hover:grayscale-0 transition-all duration-500 shadow-none bg-zinc-900"
    />
    <div class="absolute -bottom-1 -right-1 z-30 w-4 h-4 bg-[#082026] rounded-full flex items-center justify-center transition-colors duration-500">
      <div class="w-2 h-2 bg-[#E6DEC8] rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
    </div>
  </div>
</template>

<script setup>
import { store } from '../store.js'

const triggerAvatar = () => {
  if (store.isAvatarProcessing) return
  store.isAvatarProcessing = true
  setTimeout(() => { store.isAvatarProcessing = false }, 3000)
}
</script>
