<template>
  <div :class="['bio-card pl-4 py-3 pr-2 cursor-default rounded-r-lg group/item relative hover:bg-zinc-900/50 transition-colors', extraClass]">
    <div class="bio-line"></div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  extraClass: {
    type: String,
    default: ""
  }
})
</script>
