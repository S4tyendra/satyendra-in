<template>
  <div class="group/project p-4 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all duration-300">
    <div class="flex justify-between items-start mb-2">
      <h2 class="font-medium text-[#E6DEC8] text-sm">{{ title }}</h2>
      <a :href="link" target="_blank" class="text-zinc-400 hover:text-zinc-300 transition-colors">→</a>
    </div>
    <p class="text-[12px] text-zinc-400 mb-3 leading-relaxed">{{ description }}</p>
    <div class="flex flex-wrap gap-1.5">
      <span v-for="tag in tags" :key="tag" class="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-800 text-zinc-400">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  tags: {
    type: Array,
    default: () => []
  },
  link: {
    type: String,
    default: "#"
  }
})
</script>
