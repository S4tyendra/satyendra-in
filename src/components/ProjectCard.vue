<template>
  <div
    class="group/project rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all duration-300 overflow-hidden text-left flex flex-col h-full">

    <!-- Project Image -->
    <!-- <div v-if="image" class="aspect-square w-full overflow-hidden border-b border-zinc-800/50 bg-zinc-900">
      <img :src="image" :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover/project:scale-105"
        loading="lazy" />
    </div> -->

    <div class="p-4 flex flex-col flex-grow">
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
      <p class="text-[12px] text-zinc-400 mb-3 leading-relaxed flex-grow">{{ description }}</p>
      <div class="flex flex-wrap gap-1.5 mt-auto">
        <span v-for="tag in tags" :key="tag"
          class="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-800 text-zinc-400">
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
  image: String, // Added image prop
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
