<template>
  <div class="sticky top-0 z-50 w-full transition-all duration-500 -z-10 ease-in-out">
    <!-- Full-width background backdrop -->
    <div class="absolute inset-0 transition-all duration-500 ease-in-out" :class="isScrolled
      ? 'bg-bg-main/95 backdrop-blur-md border-b border-text-main/10 shadow-lg'
      : 'bg-transparent border-transparent'">
    </div>

    <!-- Content Container -->
    <header class="mx-auto relative transition-all duration-500 ease-in-out flex items-center justify-between"
      :class="isScrolled ? 'max-w-5xl h-14 px-4' : 'max-w-[460px] h-20'">

      <router-link to="/" class="flex items-center gap-4 cursor-pointer group">
        <Avatar :class="{ 'w-9! h-9!': isScrolled }" class="transition-all duration-500" />
        <div class="flex flex-col transition-all duration-500" :class="isScrolled ? 'gap-0' : 'gap-1'">
          <div class="h-8 flex items-center group/name">
            <h1 class="text-text-main font-bold tracking-tight flex items-center transition-all duration-500"
              :class="isScrolled ? 'text-lg' : 'text-3xl'">
              <span class="name-expandable">Bongi</span>
              <span class="ml-1.5">Satyendra.</span>
            </h1>
          </div>
          <div
            class="pill-container inline-flex items-center gap-1.5 text-[11px] font-mono text-text-main/60 uppercase tracking-wider overflow-hidden transition-all duration-500 ease-in-out"
            :class="isScrolled ? 'max-h-0 opacity-0' : 'max-h-8 opacity-100 px-1 py-1'">
            <div class="flex items-center">
              <span class="font-semibold text-text-main/80">Eng</span>
              <span class="pill-expandable">ineer</span>
            </div>
            <span class="text-text-main/40">/</span>
            <div class="flex items-center">
              <span class="font-semibold text-text-main/80">Student</span>
            </div>
            <span class="text-text-main/40">/</span>
            <div class="flex items-center">
              <span class="font-semibold text-text-main/80">Dev</span>
              <span class="pill-expandable">eloper</span>
            </div>
          </div>
        </div>
      </router-link>

      <div class="flex items-center gap-4">
        <button
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-text-main/10 text-text-main/80 transition-all duration-300 border border-text-main/10 bg-[#082026]/50 text-xs font-mono group"
          :class="isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'"
          @click="$emit('focus-terminal')" title="Open Terminal">
          <CodeIcon class="w-3.5 h-3.5 group-hover:text-green-400 transition-colors" />
          <span class="hidden sm:inline">Terminal</span>
        </button>
      </div>
    </header>
  </div>
</template>

<script setup>
import Avatar from './Avatar.vue'
import CodeIcon from './icons/CodeIcon.vue'

defineProps({
  isScrolled: Boolean
})

defineEmits(['focus-terminal'])
</script>
