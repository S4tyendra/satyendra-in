<template>
    <div class="w-full">
        <!-- Error State -->
        <div v-if="error"
            class="flex items-center gap-2 bg-red-900/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-md text-sm">
            <span class="text-xs">{{ error }}</span>
        </div>

        <!-- Graph Container (Always rendered, blurred when loading) -->
        <div v-else
            class="w-full relative fade-in">

            <!-- Shimmer Overlay when loading -->
            <div v-if="loading" class="absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-xl">
                <div class="shimmer-overlay"></div>
            </div>

            <!-- Header -->
            <div class="pb-2 flex justify-between items-baseline cursor-default">
                <h2 class="text-[13px] text-text-main/55">
                    <span class="text-text-main font-medium">{{ displayContributions.toLocaleString() }}</span>
                    contributions last year
                </h2>
                <span class="text-[12px] text-text-main/40">{{ displayYearRange }}</span>
            </div>

            <div class="overflow-x-auto graph-scroll">
                <div class="graph-weeks">
                    <div v-for="(day, index) in displayDays" :key="day.date || index"
                        class="graph-day day-cell"
                        :style="{
                            backgroundColor: getColor(day),
                            animationDelay: loading ? '0ms' : `${index * 2}ms`
                        }" @mouseenter="day.date && showTooltip($event, day)" @mouseleave="hideTooltip"
                        @touchstart="day.date && showTooltip($event, day)"></div>
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

const API_URL = 'https://portfoliogo3apiforai.satyendra.in/github-graph'

// Generate random placeholder data
const generatePlaceholderData = () => {
    const weeks = []
    const now = new Date()
    const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']

    for (let w = 0; w < 53; w++) {
        const days = []
        for (let d = 0; d < 7; d++) {
            const date = new Date(now)
            date.setDate(date.getDate() - (52 - w) * 7 - (6 - d))
            const count = Math.random() > 0.6 ? Math.floor(Math.random() * 15) : 0
            days.push({
                date: date.toISOString().split('T')[0],
                contributionCount: count,
                color: colors[Math.min(Math.floor(count / 3), 4)]
            })
        }
        weeks.push({ contributionDays: days })
    }
    return { weeks, totalContributions: Math.floor(Math.random() * 800) + 200 }
}

const placeholderData = generatePlaceholderData()

// Color Map
const colorMap = {
    '#ebedf0': '#161b22',
    '#9be9a8': '#0e4429',
    '#40c463': '#006d32',
    '#30a14e': '#26a641',
    '#216e39': '#39d353'
}

const getColor = (day) => {
    let finalColor = colorMap[day.color] || day.color
    if (day.contributionCount === 0) finalColor = '#161b22'
    return finalColor
}

// Display values - show placeholder when loading, real data when loaded
const displayContributions = computed(() => {
    return loading.value ? placeholderData.totalContributions : totalContributions.value
})

const displayYearRange = computed(() => {
    if (loading.value) {
        const now = new Date()
        const past = new Date(now)
        past.setFullYear(past.getFullYear() - 1)
        const opts = { month: 'short', day: 'numeric' }
        return `${past.toLocaleDateString('en-US', opts)} - ${now.toLocaleDateString('en-US', opts)}`
    }
    return yearRange.value
})

const displayWeeks = computed(() => {
    return loading.value ? placeholderData.weeks : (calendar.value.weeks || [])
})

const displayDays = computed(() => {
    return displayWeeks.value.flatMap((week) => {
        const days = [...(week.contributionDays || [])]
        while (days.length < 7) {
            days.push({ date: '', contributionCount: 0, color: '#161b22' })
        }
        return days.slice(0, 7)
    })
})

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

        loading.value = false
    } catch (err) {
        error.value = err.message
        loading.value = false
    }
}

const showTooltip = (e, day) => {
    if (loading.value) return

    const dateStr = new Date(day.date).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    const countStr = day.contributionCount === 0 ? 'No contributions' :
        `${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'}`

    tooltipContent.value = { count: countStr, date: dateStr }

    if (tooltipRef.value) {
        tooltipRef.value.style.display = 'block'
        const target = e.target
        const rect = target.getBoundingClientRect()
        const tooltipRect = tooltipRef.value.getBoundingClientRect()

        let top = rect.top - tooltipRect.height - 10
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2)

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
.graph-weeks {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(7, 1fr);
    grid-auto-columns: minmax(0, 1fr);
    gap: 3px;
    width: 100%;
}

.graph-day {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 2px;
    cursor: pointer;
}

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
    background: rgba(230, 222, 200, 0.4);
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

.shimmer-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.04) 50%,
            transparent 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
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

.day-cell:hover {
    outline: 1px solid rgba(230, 222, 200, 0.45);
}
</style>
