<template>
  <footer class="fade-in-up pt-8 border-t border-[#E6DEC8]/10 flex flex-col gap-4" style="animation-delay: 300ms;">
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
        <div class="px-1.5 py-0.5 rounded border border-green-500/20 bg-green-500/5 text-[9px] font-mono text-[#E6DEC8]/80 flex items-center gap-1 cursor-help" title="Page is lighter than 14KB">
          <div class="w-1.5 h-1.5 bg-[#E6DEC8]/50 rounded-sm animate-pulse"></div>
          <span>&lt; TCP_INIT_CWND</span>
        </div>
        <div class="font-mono text-[9px] text-[#E6DEC8]/40">©2025 SATYA.LABS</div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'

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
