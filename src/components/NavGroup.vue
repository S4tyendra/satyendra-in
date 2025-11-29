<template>
  <div 
    :class="['nav-group rounded-lg border transition-all duration-300 bg-zinc-900/20 backdrop-blur-sm border-[#E6DEC8]/10', { active: isActive }]"
    @mouseleave="handleMouseLeave"
  >
    <button 
      class="w-full h-[52px] flex items-center justify-between px-4 cursor-pointer outline-none select-none nav-trigger"
      @click="handleClick"
    >
      <div class="flex items-center gap-4">
        <span class="text-[#E6DEC8]/40 text-[10px] font-mono border border-[#E6DEC8]/20 rounded px-1.5 py-0.5 group-hover:text-green-500 group-hover:border-green-500/30 transition-colors">{{ num }}</span>
        <span class="font-medium text-[13px] text-[#E6DEC8]/90 tracking-wide uppercase">{{ title }}</span>
      </div>
      <ArrowIcon />
    </button>
    <div class="accordion-wrapper">
      <div class="accordion-inner">
        <div class="px-3 pb-3 flex flex-col gap-1">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ArrowIcon from './icons/ArrowIcon.vue'

defineProps({
  num: String,
  title: String
})

const isActive = ref(false)

const handleClick = (e) => {
  if (window.matchMedia('(hover: hover)').matches) return
  e.stopPropagation()
  isActive.value = !isActive.value
}

const handleMouseLeave = () => {
  if (window.innerWidth > 768) isActive.value = false
}

const toggle = () => {
  isActive.value = !isActive.value
}

const open = () => {
  isActive.value = true
}

const close = () => {
  isActive.value = false
}

defineExpose({
  toggle,
  open,
  close
})
</script>
