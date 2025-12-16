<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useHead } from '@vueuse/head'
import { introData, aboutData, experienceData } from '../data/experience.js'

useHead({
    title: 'Professional Experience | Satyendra',
    meta: [
        { name: 'description', content: 'Track record in Systems Engineering, Cloud Security, and SRE. History of managing large-scale infrastructure and DevOps pipelines.' },
        { property: 'og:title', content: 'Professional Experience | Satyendra' },
        { property: 'og:description', content: 'Track record in Systems Engineering, Cloud Security, and SRE.' },
        { property: 'og:url', content: 'https://satyendra.in/experience' },
        { property: 'og:image', content: 'https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/experience.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
        { rel: 'canonical', href: 'https://satyendra.in/experience' }
    ]
})

const typeWriterText = ref('')
const fullText = introData.subtitle
const isTypingDone = ref(false)
const timelineRef = ref(null)
const scrollProgress = ref(0)
const timelineHeight = ref(0)

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
}

const handleScroll = () => {
    if (!timelineRef.value) return

    const rect = timelineRef.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const elementTop = rect.top
    const elementHeight = rect.height

    // Calculate how much we've scrolled past the start of the element relative to viewport
    // We start the dot when the element is halfway up the viewport (or slightly earlier)
    const startOffset = viewportHeight * 0.8
    const scrolled = startOffset - elementTop

    // Clamp between 0 and 1
    let progress = scrolled / elementHeight
    progress = Math.max(0, Math.min(1, progress))

    scrollProgress.value = progress
    timelineHeight.value = elementHeight
}

onMounted(() => {
    // Typewriter effect
    let i = 0
    const typeInterval = setInterval(() => {
        if (i < fullText.length) {
            typeWriterText.value += fullText.charAt(i)
            i++
        } else {
            clearInterval(typeInterval)
            isTypingDone.value = true
        }
    }, 30)

    // Scroll Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view')
                observer.unobserve(entry.target)
            }
        })
    }, observerOptions)

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el))

    // Scroll Listener for Dot
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <div class="flex flex-col gap-12 pb-20">
        <!-- Hero Section -->
        <!-- Hero Section -->
        <header class="relative flex flex-col gap-6 pt-8 pb-4 group scroll-reveal delay-100 pl-2">

            <div
                class="relative z-10 flex flex-col gap-6 bg-linear-to-b from-text-muted/5 via-transparent to-transparent p-2 rounded-md">
                <!-- ID Badge -->
                <div class="flex items-center gap-3">
                    <span class="relative flex h-2 w-2">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>

                    <span
                        class="text-accent-primary font-mono text-xs tracking-[0.2em] uppercase opacity-80">System.Identity</span>
                </div>

                <div class="flex flex-col gap-10">
                    <h1 class="text-4xl md:text-5xl font-bold text-text-main tracking-tight">
                        {{ introData.title }}
                    </h1>
                    <div class="h-8 flex items-center">
                        <h2
                            class="text-lg md:text-xl text-text-muted bg-linear-to-r from-text-muted/20 to-transparent font-mono border-l-2 border-accent-primary pl-2 ml-2">
                            {{ typeWriterText }}<span class="animate-pulse"
                                :class="{ 'opacity-0': isTypingDone }">|</span>
                        </h2>
                    </div>
                </div>

                <p class="text-base text-text-muted/80 leading-relaxed max-w-2xl mt-2">
                    {{ introData.description }}
                </p>

                <!-- Minimal Availability Indicator -->
                <div
                    class="flex items-center gap-3 mt-4 backdrop-blur-lg p-2 bg-linear-to-r from-text-muted/10 via-transparent to-transparent rounded-2xl">
                    <span class="relative flex h-2 w-2">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span class="text-text-muted font-mono text-xs tracking-wide">
                        {{ introData.availability }}
                    </span>
                </div>
            </div>
        </header>

        <!-- About Section (Clean Terminal) -->
        <section class="flex flex-col gap-6 scroll-reveal delay-200">
            <div class="flex items-center gap-4 group">
                <span
                    class="text-accent-primary font-mono text-sm opacity-60 group-hover:opacity-100 transition-opacity">01.</span>
                <h3 class="text-xl font-bold text-text-main">Kernel / Philosophy</h3>
                <div class="h-px flex-1 bg-linear-to-r from-border-main to-transparent opacity-50"></div>
            </div>

            <div
                class="relative bg-[#0d1117]/80 border border-white/10 rounded-lg overflow-hidden shadow-xl backdrop-blur-md transform transition-transform hover:scale-[1.01] duration-500">
                <!-- Mac-like Header (Simplified) -->
                <div class="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                    <div class="flex gap-1.5">
                        <div class="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                    </div>
                    <div class="text-[10px] text-text-muted font-mono opacity-40">~/me/philosophy.txt</div>
                    <div class="w-8"></div>
                </div>

                <div class="p-6 flex flex-col gap-4 font-mono text-xs md:text-sm">
                    <div class="flex flex-col gap-3 text-text-muted/90">
                        <p v-for="(paragraph, index) in aboutData.content" :key="index"
                            class="leading-relaxed flex gap-3">
                            <span class="text-accent-secondary opacity-50 select-none">{{ index + 1 }}</span>
                            <span :class="{ 'text-text-main font-medium': index === 1 }">{{ paragraph }}</span>
                        </p>
                    </div>

                    <div class="mt-2 text-accent-primary opacity-90">
                        <span class="text-accent-secondary opacity-50 mr-3 select-none">5</span>
                        <span class="tracking-wide"> -> {{ aboutData.philosophy }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Timeline Section -->
        <section class="flex flex-col gap-8" ref="timelineRef">
            <div class="flex items-center gap-4 group scroll-reveal delay-300">
                <span
                    class="text-accent-primary font-mono text-sm opacity-60 group-hover:opacity-100 transition-opacity">02.</span>
                <h3 class="text-xl font-bold text-text-main">System Logs</h3>
                <div class="h-px flex-1 bg-linear-to-r from-border-main to-transparent opacity-50"></div>
            </div>

            <div class="flex flex-col gap-8 relative pl-2 md:pl-0">
                <!-- Vertical Line (Subtler) -->
                <div class="absolute left-[20px] md:left-[100px] top-6 bottom-6 w-px bg-white/5 hidden md:block"></div>

                <!-- Glowing Scroll Dot -->
                <div class="absolute left-[16px] md:left-[96px] w-[9px] h-[9px] rounded-full bg-accent-primary shadow-[0_0_10px_rgba(var(--color-accent-primary),0.8)] z-20 pointer-events-none transition-transform duration-75 hidden md:block"
                    :style="{ transform: `translateY(${scrollProgress * (timelineHeight - 48)}px)` }">
                    <div class="absolute inset-0 animate-ping rounded-full bg-accent-primary opacity-50"></div>
                </div>

                <div v-for="(item, index) in experienceData" :key="index"
                    class="group relative flex flex-col md:flex-row gap-6 items-start scroll-reveal"
                    :style="{ transitionDelay: `${index * 100}ms` }">

                    <!-- Date Node (Desktop) -->
                    <!-- Fixed width container to prevent cutting off -->
                    <div class="hidden md:flex flex-col items-end w-[80px] shrink-0 pt-1 relative z-10 mr-8">
                        <span
                            class="font-mono text-text-muted/60 text-sm group-hover:text-text-main transition-colors duration-300 w-full text-right">{{
                                item.year }}</span>
                        <!-- Node Dot -->
                        <div
                            class="absolute top-2.5 -right-[20px] w-[9px] h-[9px] rounded-full bg-border-main group-hover:bg-accent-primary transition-all duration-300 ring-4 ring-bg-main group-hover:ring-teal-500 transform translate-x-1/2 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_12px_4px_rgba(59,130,246,0.8)]">
                        </div>
                    </div>

                    <!-- Content Card -->
                    <div class="flex-1 w-full min-w-0 ">
                        <div
                            class="relative bg-surface-card/10 hover:bg-text-muted/5 backdrop-blur-xs border border-white/5 rounded-lg p-5 hover:border-accent-primary/30 transition-all duration-300 group-hover:translate-x-1">

                            <!-- Mobile Date -->
                            <div class="md:hidden flex items-center gap-2 mb-3">
                                <div class="w-1.5 h-1.5 rounded-full bg-accent-primary"></div>
                                <span class="font-mono text-accent-primary text-xs">{{ item.year }}</span>
                            </div>

                            <div class="flex flex-col gap-2">
                                <div>
                                    <h4
                                        class="text-lg font-bold text-text-main group-hover:text-accent-primary transition-colors duration-300">
                                        {{ item.title }}
                                    </h4>
                                    <p class="text-text-muted font-medium text-sm mt-0.5 flex items-center gap-2">
                                        {{ item.subtitle }}
                                    </p>
                                </div>

                                <p v-if="item.description" class="text-text-muted/80 text-sm leading-relaxed mt-1">
                                    {{ item.description }}
                                </p>

                                <div v-if="item.keyPoints && item.keyPoints.length" class="mt-3 grid gap-2">
                                    <div v-for="(point, pIndex) in item.keyPoints" :key="pIndex"
                                        class="flex gap-2 text-xs md:text-sm text-text-muted/70 hover:text-text-muted transition-colors">
                                        <span class="text-accent-primary mt-0.5">›</span>
                                        <span>
                                            <strong class="text-text-main/80 font-normal">{{ point.label }}:</strong>
                                            <span class="ml-1">{{ point.text }}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.scroll-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s cubic-bezier(0.2, 0.0, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.0, 0.2, 1);
}

.scroll-reveal.in-view {
    opacity: 1;
    transform: translateY(0);
}

.delay-100 {
    transition-delay: 100ms;
}

.delay-200 {
    transition-delay: 200ms;
}

.delay-300 {
    transition-delay: 300ms;
}
</style>
