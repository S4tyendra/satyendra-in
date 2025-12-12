<template>
    <div class="w-full">
        <!-- Loading State -->
        <div v-if="loading"
            class="w-full h-[155px] bg-[#161b22]/50 border border-[#30363d] rounded-xl p-4 flex items-center justify-center animate-pulse">
            <div class="text-xs font-mono text-gray-500 flex flex-col items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-gray-700/50"></div>
                <span>Loading contribution data...</span>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error"
            class="flex items-center gap-2 bg-red-900/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-md text-sm">
            <span class="text-xs">{{ error }}</span>
        </div>

        <!-- Graph Container -->
        <div v-else
            class="w-full bg-[#161b22]/20 backdrop-blur-md border border-[#30363d] rounded-xl shadow-2xl overflow-hidden relative fade-in group transition-all duration-300 hover:border-text-main/20">

            <!-- Header (Always Visible) -->
            <div class="px-4 py-3 flex justify-between items-baseline cursor-default">
                <h2 class="text-xs font-normal text-gray-400">
                    <span class="text-white font-semibold text-sm">{{ totalContributions?.toLocaleString() || 0
                        }}</span>
                    contributions last year
                </h2>
                <span class="text-[10px] text-gray-500 font-mono">{{ yearRange }}</span>
            </div>

            <!-- Collapsible Body -->
            <div class="accordion-wrapper">
                <div class="accordion-inner">
                    <div class="px-4 pb-4 space-y-4 accordion-content">
                        <!-- Scrollable Container -->
                        <div class="relative group/graph">
                            <!-- Left/Right Fade Indicators -->
                            <div
                                class="absolute left-0 top-0 bottom-0 w-4 bg-linear-to-r from-[#161b22] to-transparent z-10 pointer-events-none">
                            </div>
                            <div
                                class="absolute right-0 top-0 bottom-0 w-4 bg-linear-to-l from-[#161b22] to-transparent z-10 pointer-events-none">
                            </div>

                            <!-- The Graph -->
                            <div class="overflow-x-auto graph-scroll pb-2">
                                <div class="flex gap-[3px] min-w-max p-1 items-center mx-auto w-fit">
                                    <!-- Loop through week pairs instead of single weeks -->
                                    <div v-for="(pair, pIndex) in weekPairs" :key="pIndex"
                                        class="flex flex-col gap-[3px]">
                                        <!-- Render each week in the pair -->
                                        <div v-for="(week, wIndex) in pair" :key="wIndex"
                                            class="flex flex-col gap-[3px]">
                                            <div v-for="(day, dIndex) in week.contributionDays" :key="day.date"
                                                class="w-[10px] h-[10px] rounded-[2px] cursor-pointer border border-transparent hover:border-[rgba(255,255,255,0.4)] transition day-cell"
                                                :style="{
                                                    backgroundColor: getColor(day),
                                                    border: day.contributionCount === 0 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                                                    animationDelay: `${(pIndex * 5) + (wIndex * 2 + dIndex) * 5}ms`
                                                }" @mouseenter="showTooltip($event, day)" @mouseleave="hideTooltip"
                                                @touchstart="showTooltip($event, day)"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>

        <!-- Floating Tooltip -->
        <Teleport to="body">
            <div ref="tooltipRef"
                class="fixed hidden z-9999 px-3 py-2 text-xs font-semibold text-white rounded-md shadow-xl pointer-events-none custom-tooltip text-center leading-tight">
                <div class="text-gray-200">{{ tooltipContent.count }}</div>
                <div class="text-gray-400 font-normal mt-0.5">{{ tooltipContent.date }}</div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const loading = ref(true)
const error = ref(null)
const calendar = ref({ weeks: [] })
const totalContributions = ref(0)
const yearRange = ref('')
const tooltipRef = ref(null)
const tooltipContent = ref({ count: '', date: '' })

// API Endpoint
const API_URL = 'https://portfoliogo3apiforai.satyendra.in/github-graph'

// Color Map
const colorMap = {
    '#ebedf0': '#161b22', // Empty (Light) -> Empty (Dark)
    '#9be9a8': '#0e4429', // L1 (Light) -> L1 (Dark)
    '#40c463': '#006d32', // L2 (Light) -> L2 (Dark)
    '#30a14e': '#26a641', // L3 (Light) -> L3 (Dark)
    '#216e39': '#39d353'  // L4 (Light) -> L4 (Dark)
}

const getColor = (day) => {
    let finalColor = colorMap[day.color] || day.color
    if (day.contributionCount === 0) finalColor = '#161b22'
    return finalColor
}

const fetchGraph = async () => {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`)

        const data = await response.json()
        if (data.errors) throw new Error(data.errors[0].message)
        if (!data.data?.user) throw new Error("User not found")

        const contribCalendar = data.data.user.contributionsCollection.contributionCalendar
        calendar.value = contribCalendar
        totalContributions.value = contribCalendar.totalContributions

        if (contribCalendar.weeks.length > 0) {
            const first = new Date(contribCalendar.weeks[0].contributionDays[0].date)
            const last = new Date(contribCalendar.weeks[contribCalendar.weeks.length - 1].contributionDays.slice(-1)[0].date)
            const opts = { month: 'short', day: 'numeric' }
            yearRange.value = `${first.toLocaleDateString('en-US', opts)} - ${last.toLocaleDateString('en-US', opts)}`
        }
    } catch (err) {
        error.value = err.message
    } finally {
        // Intentional delay of 1.5 seconds after data is ready (or error) to match request
        setTimeout(() => {
            loading.value = false
        }, 1500)
    }
}

// Compute week pairs for vertical stacking
const weekPairs = computed(() => {
    const pairs = []
    const weeks = calendar.value.weeks || []
    for (let i = 0; i < weeks.length; i += 2) {
        pairs.push(weeks.slice(i, i + 2))
    }
    return pairs
})

const showTooltip = (e, day) => {
    const dateStr = new Date(day.date).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    const countStr = day.contributionCount === 0 ? 'No contributions' :
        `${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'}`

    tooltipContent.value = {
        count: countStr,
        date: dateStr
    }

    // Use interaction to set position, but ensure ref is available
    // We use nextTick or just direct DOM manipulation if needed, but ref is safest
    if (tooltipRef.value) {
        tooltipRef.value.style.display = 'block' // Ensure it's visible to measure

        const target = e.target
        const rect = target.getBoundingClientRect()
        const tooltipRect = tooltipRef.value.getBoundingClientRect()

        let top = rect.top - tooltipRect.height - 10
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2)

        // Boundary checks
        if (left < 10) left = 10
        if (left + tooltipRect.width > window.innerWidth - 10) left = window.innerWidth - tooltipRect.width - 10
        if (top < 10) top = rect.bottom + 10

        tooltipRef.value.style.top = `${top}px`
        tooltipRef.value.style.left = `${left}px`
    }
}

const hideTooltip = () => {
    if (tooltipRef.value) {
        tooltipRef.value.style.display = 'none'
    }
}

onMounted(() => {
    fetchGraph()
})
</script>

<style scoped>
.graph-scroll::-webkit-scrollbar {
    height: 4px;
}

.graph-scroll::-webkit-scrollbar-track {
    background: rgba(48, 54, 61, 0.4);
    border-radius: 3px;
}

.graph-scroll::-webkit-scrollbar-thumb {
    background: #30363d;
    border-radius: 3px;
}

.graph-scroll::-webkit-scrollbar-thumb:hover {
    background: #58a6ff;
}

.custom-tooltip {
    background: rgba(110, 118, 129, 0.95);
    backdrop-filter: blur(4px);
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.custom-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: rgba(110, 118, 129, 0.95) transparent transparent transparent;
}

@keyframes popIn {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.day-cell {
    animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    opacity: 0;
}

.fade-in {
    animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Accordion Logic */
.accordion-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.5s cubic-bezier(0.2, 0.0, 0.2, 1);
}

.accordion-inner {
    overflow: hidden;
    min-height: 0;
}

.accordion-content {
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease-out;
}

/* On specific group hover, expand */
.group:hover .accordion-wrapper {
    grid-template-rows: 1fr;
}

.group:hover .accordion-content {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.3s;
}
</style>
