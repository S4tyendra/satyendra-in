<template>
  <router-link
    :to="href"
    class="nav-item flex items-center justify-between hover:bg-[#E6DEC8]/10 text-xs py-2.5 px-3 rounded-md text-[#E6DEC8]/70 hover:text-[#E6DEC8] transition-all group/link"
  >
    <div class="nav-bg"></div>
    <div class="flex items-center gap-3 relative z-10">
      <component :is="icon" />
      <span>{{ label }}</span>
    </div>
    <span class="relative z-10 text-[9px] font-mono text-[#E6DEC8]/40 opacity-0 group-hover/link:opacity-100 transition-opacity">{{ code }}</span>
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
