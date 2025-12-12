<template>
    <div class="w-full font-mono text-xs relative select-none">
        <div :class="['flex items-center gap-1.5 px-3 py-2 border transition-all cursor-text text-[#c9d1d9]',
            shouldShowPanel ? 'rounded-t-xl border-[#30363d] bg-[#0d1117]/90 border-b-0' : 'rounded-xl',
            !shouldShowPanel && isFocused ? 'border-[#30363d] bg-[#0d1117]/70' : '',
            !shouldShowPanel && !isFocused ? 'border-transparent bg-[#0d1117]/35 hover:border-[#30363d]/40' : ''
        ]" @click="handleContainerClick">
            <span class="text-[#7ee787] font-semibold text-[11px]">satya@web</span>
            <span class="text-zinc-600 text-[11px]">:</span>
            <PathBreadcrumb />
            <span class="text-zinc-600">$</span>
            <div class="flex-1 min-w-[90px]">
                <input id="terminal-input"
                    class="w-full bg-transparent border-none outline-none text-[#c9d1d9] placeholder-zinc-600 text-[11px]"
                    placeholder="type help for commands" v-model="inputValue" @input="handleInput"
                    @keydown="handleKeyDown" @focus="handleFocus" @blur="handleBlur" spellcheck="false"
                    autocomplete="off" />
            </div>
            <kbd class="flex items-center gap-1 text-[10px] text-zinc-500 px-1.5 py-0.5 rounded-md border border-[#30363d]/60 bg-[#05070b]/70 hover:border-[#58a6ff]/50 cursor-pointer"
                @click.stop="focusInput">
                <span class="px-1 py-0.5 bg-transparent">/</span>
            </kbd>
        </div>
        <Transition name="terminal-expand" @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
            <div v-if="shouldShowPanel"
                class="border border-[#30363d] border-t-0 bg-[#0d1117]/90 rounded-b-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                <SuggestionsPanel :inputValue="inputValue" :terminalOutput="terminalOutput" :suggestions="suggestions"
                    :selectedIndex="selectedIndex" @applySuggestion="applySuggestion"
                    @setSelectedIndex="setSelectedIndex" />
            </div>
        </Transition>
        <Popover :hoveredDir="hoveredDir" @navigate="navigate" @clearHover="hoveredDir = null" />
    </div>
</template>

<style scoped>
.terminal-expand-enter-active,
.terminal-expand-leave-active {
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    overflow: hidden;
}

.terminal-expand-enter-from,
.terminal-expand-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { resolvePath } from '../paths.js'
import PathBreadcrumb from './terminal/PathBreadcrumb.vue'
import SuggestionsPanel from './terminal/SuggestionsPanel.vue'
import Popover from './terminal/Popover.vue'

const router = useRouter()
const route = useRoute()

const currentPath = ref(route.path)
const inputValue = ref("")
const suggestions = ref([])
const selectedIndex = ref(0)
const isExpanded = ref(false)
const terminalOutput = ref([])
const isFocused = ref(false)
const hoveredDir = ref(null)
let outputCounter = 0

const COMMANDS = [
    { name: "help", desc: "Show available commands" },
    { name: "ls", desc: "List directory contents" },
    { name: "cd", desc: "Change directory" },
    { name: "clear", desc: "Clear terminal output" },
]

const NAV_SHORTCUTS = [
    { name: "..", desc: "Go up one level" },
    { name: "~", desc: "Go to home" },
]

const updatePath = () => {
    currentPath.value = route.path
}

watch(() => route.path, () => {
    updatePath()
})

const focusInput = () => document.getElementById("terminal-input")?.focus()
const blurInput = () => document.getElementById("terminal-input")?.blur()

const handleContainerClick = (e) => {
    if (e.target.id !== "terminal-input") focusInput()
}

const handleGlobalKeydown = (e) => {
    const terminalInput = document.getElementById("terminal-input")
    if (e.key === "/" && document.activeElement !== terminalInput && !e.ctrlKey && !e.metaKey) {
        const tag = document.activeElement?.tagName?.toLowerCase()
        if (tag !== "input" && tag !== "textarea") {
            e.preventDefault()
            terminalInput?.focus()
        }
    }
}

onMounted(() => {
    window.addEventListener("keydown", handleGlobalKeydown)
    refreshSuggestions()
})

onUnmounted(() => {
    window.removeEventListener("keydown", handleGlobalKeydown)
})

const navigate = (path) => {
    router.push(path)
    inputValue.value = ""
    refreshSuggestions()
    selectedIndex.value = 0
}

const getChildren = () => {
    const resolved = resolvePath(currentPath.value)
    if (resolved && resolved.node && resolved.node.children) {
        return Object.entries(resolved.node.children).map(([name, node]) => ({
            name,
            type: node.type,
            path: node.path
        }))
    }
    return []
}

const classifyInput = (value) => {
    const trimmed = value.replace(/^\s+/, "")
    if (!trimmed) return { mode: "default", query: "" }
    if (trimmed.startsWith("cd ")) {
        return { mode: "cd", query: trimmed.slice(3).trimStart() }
    }
    return { mode: "default", query: trimmed }
}

const filterMatches = (items, query, key = "name") => {
    if (!query) return items
    const q = query.toLowerCase()
    return items
        .map((item) => {
            const target = (item[key] || "").toLowerCase()
            const idx = target.indexOf(q)
            if (idx === -1) return null
            return { item, score: idx }
        })
        .filter(Boolean)
        .sort((a, b) => a.score - b.score || (a.item[key] || "").localeCompare(b.item[key] || ""))
        .map(({ item }) => item)
}

const buildSuggestions = (mode, query) => {
    const children = getChildren()
    const dirItems = children
        .filter((child) => child.type === "dir")
        .map((child) => ({ ...child, desc: child.desc || "directory" }))
    const fileItems = children
        .filter((child) => child.type === "file")
        .map((child) => ({ ...child, desc: child.desc || "file" }))

    const commandItems = COMMANDS.map((cmd) => ({ ...cmd, type: "cmd" }))
    const navItems = NAV_SHORTCUTS.map((shortcut) => ({ ...shortcut, type: "nav" }))

    if (mode === "cd") {
        return [
            ...filterMatches(dirItems, query),
            ...filterMatches(navItems, query),
        ]
    }

    const commandMatches = filterMatches(commandItems, query)
    const navMatches = filterMatches(navItems, query)
    const dirMatches = filterMatches(dirItems, query)
    const fileMatches = filterMatches(fileItems, query)

    return [
        ...commandMatches,
        ...navMatches,
        ...dirMatches,
        ...fileMatches,
    ]
}

const refreshSuggestions = () => {
    const { mode, query } = classifyInput(inputValue.value)
    suggestions.value = buildSuggestions(mode, query)
    selectedIndex.value = suggestions.value.length ? 0 : 0
}

const clearOutput = () => {
    terminalOutput.value = []
    if (!isFocused.value) {
        isExpanded.value = false
    }
}

const shouldShowPanel = computed(() => isFocused.value || inputValue.value.length > 0 || terminalOutput.value.length > 0 || isExpanded.value)

const pushOutput = (entry) => {
    isExpanded.value = true
    terminalOutput.value = [...terminalOutput.value, { id: ++outputCounter, ...entry }].slice(-6)
}

const executeCommand = (cmd) => {
    const trimmed = cmd.trim()

    if (!trimmed) return

    // handle navigation shortcuts
    if (trimmed === ".." || trimmed === "cd ..") {
        const parts = currentPath.value.split("/").filter(Boolean)
        parts.pop()
        const newPath = "/" + parts.join("/")
        navigate(newPath || "/")
        return
    }

    if (trimmed === "~" || trimmed === "cd ~") {
        navigate("/")
        return
    }

    if (trimmed.startsWith("cd ")) {
        const target = trimmed.slice(3).trim()
        const child = getChildren().find(c => c.name === target && c.type === "dir")
        if (child) navigate(child.path)
        return
    }

    if (trimmed === "ls") {
        const items = getChildren()
        if (items.length > 0) {
            pushOutput({ type: "ls", label: "ls", items })
        } else {
            pushOutput({ type: "text", label: "ls", text: "(empty directory)" })
        }
        inputValue.value = ""
        refreshSuggestions()
        return
    }

    if (trimmed === "help") {
        pushOutput({
            type: "help",
            label: "help",
            items: [
                { cmd: "help", desc: "Show commands" },
                { cmd: "ls", desc: "List current directory" },
                { cmd: "clear", desc: "Clear terminal output" },
                { cmd: ".. / cd ..", desc: "Go up one level" },
                { cmd: "~ / cd ~", desc: "Go home" },
                { cmd: "<dir>", desc: "Jump directly" },
                { cmd: "Tab", desc: "Pick suggestion" },
                { cmd: "Shift+Tab", desc: "Previous suggestion" },
                { cmd: "Esc", desc: "Close panel" },
            ]
        })
        inputValue.value = ""
        refreshSuggestions()
        return
    }

    if (trimmed === "clear") {
        inputValue.value = ""
        clearOutput()
        refreshSuggestions()
        return
    }

    // direct directory navigation
    const dir = getChildren().find(c => c.name === trimmed)
    if (dir && dir.path) navigate(dir.path)
}

const handleInput = (e) => {
    // inputValue is updated by v-model
    if (inputValue.value.length && !isExpanded.value) {
        isExpanded.value = true
    }
    refreshSuggestions()
}

const applySuggestion = (item, { fillOnly = false } = {}) => {
    if (!item) return

    const context = classifyInput(inputValue.value).mode

    if (item.type === "cmd") {
        inputValue.value = item.name + (item.name === "cd" ? " " : "")
        refreshSuggestions()
        if (!fillOnly) executeCommand(item.name)
        else focusInput()
        return
    }

    if (item.type === "nav") {
        const value = context === "cd" ? `cd ${item.name}` : item.name
        if (fillOnly) {
            inputValue.value = value
            refreshSuggestions()
            focusInput()
        } else {
            executeCommand(value)
        }
        return
    }

    if (item.type === "dir") {
        if (fillOnly) {
            inputValue.value = context === "cd" ? `cd ${item.name}` : item.name
            refreshSuggestions()
            focusInput()
        } else if (item.path) {
            navigate(item.path)
        }
        return
    }

    if (item.type === "file") {
        if (fillOnly) {
            inputValue.value = item.name
            refreshSuggestions()
            focusInput()
        } else if (item.path) {
            navigate(item.path)
        }
    }
}

const handleKeyDown = (e) => {
    if (e.key === "Escape") {
        e.preventDefault()
        if (terminalOutput.value.length) {
            clearOutput()
        } else if (inputValue.value) {
            inputValue.value = ""
            refreshSuggestions()
            if (!isFocused.value) isExpanded.value = false
        } else {
            isExpanded.value = false
            blurInput()
        }
        return
    }

    if (e.key === "Tab") {
        e.preventDefault()
        if (!suggestions.value.length) return
        applySuggestion(suggestions.value[selectedIndex.value], { fillOnly: true })
        return
    }

    if (e.key === "ArrowDown") {
        e.preventDefault()
        if (suggestions.value.length) {
            selectedIndex.value = (selectedIndex.value + 1) % suggestions.value.length
        }
        return
    }

    if (e.key === "ArrowUp") {
        e.preventDefault()
        if (suggestions.value.length) {
            selectedIndex.value = (selectedIndex.value - 1 + suggestions.value.length) % suggestions.value.length
        }
        return
    }

    if (e.key === "Enter") {
        e.preventDefault()
        const typed = inputValue.value.trim()
        const selected = suggestions.value[selectedIndex.value]

        if (!typed && selected) {
            applySuggestion(selected)
            return
        }

        if (selected && typed && selected.name.toLowerCase() === typed.toLowerCase()) {
            executeCommand(selected.name)
            return
        }

        executeCommand(typed)
        return
    }
}

const handleFocus = () => {
    isFocused.value = true
    if (!isExpanded.value) isExpanded.value = true
    refreshSuggestions()
}

const handleBlur = () => {
    isFocused.value = false
    setTimeout(() => {
        if (!isFocused.value && !inputValue.value && !terminalOutput.value.length) {
            isExpanded.value = false
        }
    }, 120)
}

const setSelectedIndex = (index) => {
    selectedIndex.value = index
}

const onEnter = (el) => {
    el.style.height = '0'
    el.offsetHeight // trigger reflow
    el.style.height = el.scrollHeight + 'px'
}

const onAfterEnter = (el) => {
    el.style.height = 'auto'
}

const onLeave = (el) => {
    el.style.height = el.scrollHeight + 'px'
    el.offsetHeight // trigger reflow
    el.style.height = '0'
}
</script>
