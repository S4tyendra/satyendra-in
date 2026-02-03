<template>
  <div class="sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" :class="[
    isScrolled
      ? 'w-full py-2 bg-bg-main/90 backdrop-blur-md border-b border-text-main/10 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.5)]'
      : 'w-full max-w-[460px] mx-auto py-0 bg-transparent'
  ]">
    <header class="flex items-center justify-between transition-all duration-500 mx-auto"
      :class="isScrolled ? 'max-w-5xl px-4' : 'w-full px-0'">
      <router-link to="/" class="flex items-center gap-4 cursor-pointer group">
        <Avatar :class="[
          'transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          isScrolled ? '!w-10 !h-10' : ''
        ]" />
        <div class="flex flex-col transition-all duration-500" :class="isScrolled ? 'gap-0' : 'gap-2'">
          <div class="h-8 flex items-center group/name">
            <h1
              class="text-text-main font-bold tracking-tight flex items-center transition-all duration-500 origin-left"
              :class="isScrolled ? 'text-base scale-100' : 'text-3xl'">
              <span class="name-expandable">Bongi</span>
              <span class="ml-1.5">Satyendra.</span>
            </h1>
          </div>

          <div
            class="pill-container inline-flex items-center gap-1.5 text-[11px] font-mono text-text-main/60 uppercase tracking-wider overflow-hidden transition-all duration-500 group/pill"
            :class="isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100 px-1 py-1.5'">
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
        <!-- Add other nav items here if needed -->

        <transition name="fade">
          <button v-if="isScrolled" @click="$emit('focus-terminal')"
            class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-text-main/10 text-text-main/80 transition-all duration-300 border border-text-main/10 bg-[#082026]/50 text-xs font-mono active:scale-95"
            title="Open Terminal">
            <CodeIcon class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">Terminal</span>
          </button>
        </transition>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
