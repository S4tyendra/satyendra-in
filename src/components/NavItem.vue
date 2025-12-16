<template>
  <router-link :to="href"
    class="nav-item flex items-center justify-between hover:bg-text-main/10 text-xs py-2.5 px-3 rounded-md text-text-main/70 hover:text-text-main transition-all group/link">
    <div class="nav-bg"></div>
    <div class="flex items-center gap-3 relative z-10">
      <component :is="icon" />
      <span>{{ label }}</span>
    </div>
    <span
      class="relative z-10 text-[9px] font-mono text-text-main/40 opacity-0 group-hover/link:opacity-100 transition-opacity">{{
        code }}</span>
  </router-link>
</template>

<script setup>
defineProps({
  icon: Object,
  label: String,
  code: String,
  href: {
    type: String,
    default: "#"
  }
})
</script>
