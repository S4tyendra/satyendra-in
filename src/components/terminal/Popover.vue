<template>
  <div 
    :class="['fixed z-50 bg-bg-inset/95 backdrop-blur-md border border-text-main/15 rounded-md shadow-2xl p-2 min-w-[180px] transition-all duration-200 ease-out transform', hoveredDir ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible']"
    :style="hoveredDir ? `top: ${hoveredDir.rect.bottom + 10}px; left: ${hoveredDir.rect.left}px;` : 'top: 0; left: 0;'"
    @mouseenter="clearTimeout"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="hoveredDir">
      <span v-if="!hoveredDir.node.children" class="text-text-main/40 text-xs px-2 italic">No subdirectories</span>
      <ul v-else class="flex flex-col gap-1">
        <li v-for="(childNode, name) in hoveredDir.node.children" :key="name">
          <a 
            class="block px-3 py-1.5 text-sm text-text-main/80 hover:bg-text-main/8 hover:text-text-main rounded transition-colors cursor-pointer flex items-center gap-2"
            @click.stop="handleClick(childNode.path)"
          >
            <span class="font-mono text-[10px] text-text-main/35">{{ childNode.type === 'dir' ? 'd' : '-' }}</span>
            {{ name }}
          </a>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  hoveredDir: Object
})

const emit = defineEmits(['navigate', 'clearHover'])

let hoverTimeout

const clearTimeout = () => {
  // Logic handled in parent or just preventing close here
}

const handleMouseLeave = () => {
  emit('clearHover')
}

const handleClick = (path) => {
  emit('navigate', path)
  emit('clearHover')
}
</script>
