<template>
  <div class="flex flex-col w-full">
    <div class="flex items-center justify-between px-3 py-2 border-b border-text-main/10 text-[11px] text-text-main/40 uppercase tracking-widest bg-bg-main/40">
      <span>Command palette</span>
      <span class="text-text-main/30 lowercase">{{ inputValue ? `filter: "${inputValue}"` : "showing everything" }}</span>
    </div>
    
    <div v-if="terminalOutput.length > 0" class="max-h-[260px] overflow-y-auto border-b border-text-main/10" ref="outputContainer">
      <div v-for="item in terminalOutput" :key="item.id" class="border-b border-text-main/8 last:border-0">
        <div class="px-3 py-1.5 text-[10px] uppercase tracking-widest text-text-main/40 border-b border-text-main/8 bg-bg-main/30">$ {{ item.label || "" }}</div>
        
        <div v-if="item.type === 'ls'" class="p-3 grid grid-cols-2 gap-1">
          <div 
            v-for="entry in item.items" 
            :key="entry.name"
            :class="['flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors text-xs', entry.type === 'dir' ? 'text-phosphor hover:bg-phosphor/10' : 'text-text-main/80 hover:bg-text-main/5']"
            @click="entry.path && navigate(entry.path)"
          >
            <span class="font-mono text-[10px] text-text-main/35">{{ entry.type === 'dir' ? 'd' : '-' }}</span>
            <span class="font-medium">{{ entry.name }}</span>
          </div>
        </div>

        <div v-if="item.type === 'help'" class="p-3 space-y-1.5">
          <div v-for="helpItem in item.items" :key="helpItem.cmd" class="flex items-center gap-3 text-xs">
            <span class="text-phosphor font-mono min-w-[80px]">{{ helpItem.cmd }}</span>
            <span class="text-text-main/55">{{ helpItem.desc }}</span>
          </div>
        </div>

        <div v-if="item.type === 'text'" class="p-3 text-xs text-text-main/40 italic">
          {{ item.text }}
        </div>
      </div>
    </div>

    <div class="max-h-[260px] overflow-y-auto" ref="suggestionsContainer">
      <template v-if="suggestions.length">
        <div 
          v-for="(item, idx) in suggestions" 
          :key="idx"
          :class="['flex items-center gap-3 px-3 py-2 text-xs cursor-pointer transition-colors border-l-2', selectedIndex === idx ? 'bg-text-main/8 border-text-main text-text-main' : 'border-transparent text-text-main/50 hover:bg-text-main/5']"
          @click="$emit('applySuggestion', item, { fillOnly: false })"
          @mouseenter="$emit('setSelectedIndex', idx)"
        >
          <span :class="['font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider min-w-[36px] text-center', getTypeClass(item.type)]">
            {{ item.type.toUpperCase() }}
          </span>
          <span class="flex-1 font-medium">{{ item.name }}</span>
          <span v-if="item.desc" class="text-[10px] text-text-main/35">{{ item.desc }}</span>
          <span v-if="item.type === 'dir' && item.path" class="text-[9px] text-phosphor">↵</span>
        </div>
      </template>
      <div v-else class="px-4 py-6 text-center text-[11px] text-text-main/30">Start typing or hit Tab to accept suggestions</div>
    </div>

    <div class="flex flex-wrap items-center gap-3 px-3 py-1.5 text-[10px] text-text-main/40 border-t border-text-main/10 bg-bg-main/40 rounded-b-lg">
      <span class="flex items-center gap-1"><kbd class="px-1 py-0.5 bg-text-main/8 rounded font-sans">↑↓</kbd> <span>browse</span></span>
      <span class="flex items-center gap-1"><kbd class="px-1 py-0.5 bg-text-main/8 rounded font-sans">Tab</kbd> <span>fill</span></span>
      <span class="flex items-center gap-1"><kbd class="px-1 py-0.5 bg-text-main/8 rounded font-sans">Enter</kbd> <span>run</span></span>
      <span class="flex items-center gap-1"><kbd class="px-1 py-0.5 bg-text-main/8 rounded font-sans">Esc</kbd> <span>hide</span></span>
    </div>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  inputValue: String,
  terminalOutput: Array,
  suggestions: Array,
  selectedIndex: Number
})

defineEmits(['applySuggestion', 'setSelectedIndex'])

const router = useRouter()
const navigate = (path) => router.push(path)

const outputContainer = ref(null)
const suggestionsContainer = ref(null)

watch(() => props.terminalOutput, async () => {
  await nextTick()
  if (outputContainer.value) {
    outputContainer.value.scrollTop = outputContainer.value.scrollHeight
  }
}, { deep: true })

watch(() => props.selectedIndex, async (newIndex) => {
  await nextTick()
  if (suggestionsContainer.value && props.suggestions.length) {
    const el = suggestionsContainer.value.children[newIndex]
    if (el) {
      el.scrollIntoView({ block: 'nearest' })
    }
  }
})

const getTypeClass = (type) => {
  if (type === 'cmd') return 'bg-phosphor/10 text-phosphor border border-phosphor/20'
  if (type === 'nav') return 'bg-text-main/8 text-text-main/80 border border-text-main/15'
  if (type === 'dir') return 'bg-text-main/6 text-text-main/70 border border-text-main/12'
  return 'bg-text-main/5 text-text-main/60 border border-text-main/10'
}
</script>
