<template>
  <div class="flex items-center flex-wrap gap-x-0.5">
    <span v-if="!resolved" class="text-[#79c0ff] text-[11px]">{{ currentPath }}</span>
    <template v-else>
      <span v-for="(crumb, index) in resolved.breadcrumbs" :key="index" class="flex items-center">
        <span v-if="index > 0" class="text-zinc-700 text-[10px] mx-0.5">/</span>
        <span 
          :class="['px-0.5 rounded cursor-pointer transition-colors text-[11px]', isLast(index) ? 'text-[#79c0ff] font-medium' : 'text-[#79c0ff]/70 hover:text-[#79c0ff] hover:bg-white/5']"
          @mouseenter="(e) => handleMouseEnter(e, crumb)"
          @mouseleave="handleMouseLeave"
          @click="navigate(crumb.node.path)"
        >
          {{ getShortName(crumb.name) }}
        </span>
      </span>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { resolvePath } from '../../paths.js'

const route = useRoute()
const router = useRouter()

const currentPath = computed(() => route.path)
const resolved = computed(() => resolvePath(currentPath.value))

const isLast = (index) => index === resolved.value.breadcrumbs.length - 1

const getShortName = (name) => name.length > 18 ? `${name.slice(0, 15)}…` : name

const emit = defineEmits(['hover', 'leave'])

const handleMouseEnter = (e, crumb) => {
  if (crumb.node.children) {
    const rect = e.target.getBoundingClientRect()
    emit('hover', { node: crumb.node, rect, id: crumb.path })
  }
}

const handleMouseLeave = () => {
  emit('leave')
}

const navigate = (path) => {
  router.push(path)
}
</script>
