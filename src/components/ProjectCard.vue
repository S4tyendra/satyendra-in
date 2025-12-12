<template>
  <div
    class="group/project p-4 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all duration-300">
    <div class="flex justify-between items-start mb-2">
      <component :is="link.startsWith('http') ? 'a' : 'router-link'" :to="link.startsWith('http') ? undefined : link"
        :href="link.startsWith('http') ? link : undefined" :target="link.startsWith('http') ? '_blank' : undefined"
        class="font-medium text-text-main text-sm hover:underline cursor-pointer">
        {{ title }}
      </component>
      <component :is="link.startsWith('http') ? 'a' : 'router-link'" :to="link.startsWith('http') ? undefined : link"
        :href="link.startsWith('http') ? link : undefined" :target="link.startsWith('http') ? '_blank' : undefined"
        class="text-zinc-400 hover:text-zinc-300 transition-colors cursor-pointer">
        →
      </component>
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
