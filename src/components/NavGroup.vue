<template>
  <div
    :class="['nav-group group rounded-md border transition-all duration-300 bg-bg-raised/40 backdrop-blur-sm border-text-main/10', { active: isActive }]"
    @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <button
      class="w-full h-[52px] flex items-center justify-between px-4 cursor-pointer outline-none select-none nav-trigger"
      @click="handleClick">
      <div class="flex items-center gap-4">
        <span
          class="text-text-main/40 text-[10px] font-mono border border-text-main/20 rounded px-1.5 py-0.5 group-hover:text-phosphor group-hover:border-phosphor/35 group-[.active]:text-phosphor group-[.active]:border-phosphor/35 transition-colors">{{
            num }}</span>
        <span class="font-medium text-[13px] text-text-main/90 tracking-[0.08em] uppercase">{{ title }}</span>
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

const props = defineProps({
  num: String,
  title: String,
  isDefaultOpen: {
    type: Boolean,
    default: false
  }
})

const isActive = ref(props.isDefaultOpen)

const handleClick = (e) => {
  e.stopPropagation()
  isActive.value = !isActive.value
}

const handleMouseEnter = () => {
  if (window.innerWidth > 768) isActive.value = true
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
