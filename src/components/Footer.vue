<template>
  <div class="footer-wrapper">
    <div v-if="isScrolled" class="h-[120px] w-full"></div>

    <footer 
      :class="[
        'transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'fixed bottom-0 left-0 w-full z-50 bg-[#082026]/95 backdrop-blur-md border-t border-[#E6DEC8]/10 px-4 h-8 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]' 
          : 'fade-in-up pt-8 border-t border-[#E6DEC8]/10 flex flex-col gap-4'
      ]"
      :style="!isScrolled ? { animationDelay: '300ms' } : {}"
    >
      <div v-if="!isScrolled" class="w-full flex flex-col gap-4">
        <div class="flex justify-between items-center font-mono text-[9px] uppercase tracking-wider text-[#E6DEC8]/40">
          <div class="flex items-center gap-2">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6DEC8]"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[#E6DEC8]"></span>
            </span>
            <span>System Online</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[#E6DEC8]/50">{{ latency }}</span>
            <span class="text-[#E6DEC8]/70">{{ currentTime }}</span>
          </div>
        </div>

        <div class="flex justify-between items-end">
          <div class="flex flex-col gap-1">
            <span class="text-[10px] text-[#E6DEC8]/50">Last commit: today</span>
            <a href="mailto:hello@satyendra.in" class="text-xs text-[#E6DEC8]/80 hover:text-green-400 transition-colors flex items-center gap-1 group">
              <span>hello@satyendra.in</span>
              <ArrowRightIcon />
            </a>
          </div>
          <div class="flex flex-col items-end gap-1">
            <div class="px-1.5 py-0.5 rounded border border-green-500/20 bg-green-500/5 text-[9px] font-mono text-text-main/80 flex items-center gap-1 cursor-help" title="Available for hire">
              <div class="w-1.5 h-1.5 bg-text-main/50 rounded-sm animate-pulse"></div>
              <span>HIRE ME</span>
            </div>
            <div class="font-mono text-[9px] text-text-main/40">© {{ new Date().getFullYear() }} SATYENDRA</div>
          </div>
        </div>
      </div>

      <div v-else class="w-full flex justify-between items-center font-mono text-[10px] text-[#E6DEC8]/60">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <span class="relative flex h-1.5 w-1.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span>Online</span>
          </div>
          <span class="text-[#E6DEC8]/20">|</span>
          <span>{{ currentTime }}</span>
        </div>
        
        <div class="flex items-center gap-3">
          <a href="mailto:hello@satyendra.in" class="hover:text-green-400 transition-colors">Contact</a>
          <span class="text-[#E6DEC8]/20">|</span>
          <span>© {{ new Date().getFullYear() }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'

defineProps({
  isScrolled: Boolean
})

const currentTime = ref(new Date().toISOString().split('T')[1].split('.')[0] + ' UTC')
const latency = ref('12ms')
let timeInterval
let latencyInterval

onMounted(() => {
  timeInterval = setInterval(() => {
    currentTime.value = new Date().toISOString().split('T')[1].split('.')[0] + ' UTC'
  }, 1000)

  latencyInterval = setInterval(() => {
    const ms = Math.floor(Math.random() * (24 - 8 + 1) + 8)
    latency.value = `${ms}ms`
  }, 2000)
})

onUnmounted(() => {
  clearInterval(timeInterval)
  clearInterval(latencyInterval)
})
</script>
