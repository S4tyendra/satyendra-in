<template>
  <div
    class="group/project border border-text-main/10 bg-bg-raised/30 hover:border-text-main/25 hover:bg-bg-raised/50 transition-colors overflow-hidden text-left flex flex-col h-full rounded-md">
    <div class="p-4 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-2">
        <component :is="link.startsWith('http') ? 'a' : 'router-link'" :to="link.startsWith('http') ? undefined : link"
          :href="link.startsWith('http') ? link : undefined" :target="link.startsWith('http') ? '_blank' : undefined"
          class="font-medium text-text-main text-sm hover:underline underline-offset-4 decoration-text-main/30 cursor-pointer">
          {{ title }}
        </component>
        <component :is="link.startsWith('http') ? 'a' : 'router-link'" :to="link.startsWith('http') ? undefined : link"
          :href="link.startsWith('http') ? link : undefined" :target="link.startsWith('http') ? '_blank' : undefined"
          class="text-text-main/40 hover:text-text-main transition-colors cursor-pointer" aria-hidden="true">
          →
        </component>
      </div>
      <p class="text-[12px] text-text-muted mb-3 leading-relaxed flex-grow">{{ description }}</p>
      <div class="flex flex-wrap gap-1.5 mt-auto">
        <span v-for="tag in tags" :key="tag"
          class="px-1.5 py-0.5 text-[10px] font-mono text-text-main/45 border border-text-main/10 rounded-sm">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  image: String,
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
