<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    currentPath: {
        type: String,
        required: true,
    },
    isMobile: {
        type: Boolean,
        default: false,
    },
    depth: {
        type: Number,
        default: 0,
    },
})

const emit = defineEmits(['navigate'])

// Track expanded state for folders
const expandedFolders = ref(new Set())

function toggleFolder(index) {
    const key = `${props.depth}-${index}`
    if (expandedFolders.value.has(key)) {
        expandedFolders.value.delete(key)
    } else {
        expandedFolders.value.add(key)
    }
}

function isFolderExpanded(index) {
    return expandedFolders.value.has(`${props.depth}-${index}`)
}

function handleNavigate() {
    emit('navigate')
}
</script>

<template>
    <ul :class="[
        'space-y-1',
        depth === 0 ? 'max-h-[40vh] overflow-y-auto' : '',
        depth > 0 ? 'ml-3 mt-1 border-l border-white/10 pl-2' : ''
    ]">
        <li v-for="(item, index) in items" :key="item.path">
            <!-- Folder -->
            <div v-if="item.type === 'folder'">
                <button @click="toggleFolder(index)" :class="[
                    'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200',
                    isMobile ? 'text-sm' : 'text-xs',
                    'text-text-muted hover:text-text-main hover:bg-white/5'
                ]">
                    <svg :class="['w-3 h-3 transition-transform', isFolderExpanded(index) ? 'rotate-90' : '']"
                        fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" />
                    </svg>
                    <svg class="w-4 h-4 text-cyan-400/70" fill="none" stroke="currentColor" stroke-width="2"
                        viewBox="0 0 24 24">
                        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span class="flex-1 text-left truncate">{{ item.title }}</span>
                </button>

                <!-- Nested children -->
                <div v-if="isFolderExpanded(index) && item.children && item.children.length > 0">
                    <NavTree :items="item.children" :current-path="currentPath" :is-mobile="isMobile" :depth="depth + 1"
                        @navigate="handleNavigate" />
                </div>
            </div>

            <!-- File -->
            <router-link v-else :to="item.path" :class="[
                'block px-2 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-2',
                isMobile ? 'text-sm px-3 py-2.5' : 'text-xs',
                currentPath === item.path
                    ? isMobile
                        ? 'bg-cyan-500/20 text-cyan-400 font-medium border-l-2 border-cyan-400'
                        : 'bg-cyan-500/20 text-cyan-400 font-medium'
                    : 'text-text-muted hover:text-text-main hover:bg-white/5'
            ]" @click="handleNavigate">
                <svg v-if="!item.isIndex" class="w-3.5 h-3.5 text-cyan-400/50" fill="none" stroke="currentColor"
                    stroke-width="2" viewBox="0 0 24 24">
                    <path
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="flex-1 truncate">{{ item.title }}</span>
            </router-link>
        </li>
    </ul>
</template>
