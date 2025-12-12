<template>
  <div class="header-wrapper">
    <div v-if="isScrolled" class="h-[100px] w-full"></div>
    
    <header 
      :class="[
        'transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'fixed top-0 left-0 w-full z-50 bg-[#082026]/95 backdrop-blur-md border-b border-text-main/10 px-4 h-12 flex justify-between items-center shadow-lg' 
          : 'flex items-center gap-6 fade-in-up relative'
      ]"
    >
      <router-link to="/" class="flex items-center gap-4 cursor-pointer group">
        <Avatar :class="{ '!w-10 !h-10': isScrolled }" class="transition-all duration-300" />
        <div class="flex flex-col transition-all" :class="isScrolled ? 'gap-0' : 'gap-2'">
          <div class="h-8 flex items-center group/name">
            <h1 class="text-text-main font-bold tracking-tight flex items-center transition-all" :class="isScrolled ? 'text-base' : 'text-3xl'">
              <span class="name-expandable">Bongi</span>
              <span class="ml-1.5">Satyendra.</span>
            </h1>
          </div>
          <div v-if="!isScrolled" class="pill-container inline-flex items-center gap-1.5 text-[11px] font-mono text-text-main/60 uppercase tracking-wider px-1 py-1.5 w-max group/pill">
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

      <button 
        v-if="isScrolled"
        @click="$emit('focus-terminal')"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-text-main/10 text-text-main/80 transition-colors border border-text-main/10 bg-[#082026]/50 text-xs font-mono"
        title="Open Terminal"
      >
        <CodeIcon class="w-3.5 h-3.5" />
        <span class="hidden sm:inline">Terminal</span>
      </button>
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
