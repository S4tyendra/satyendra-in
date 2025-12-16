<template>
    <div class="flex flex-col gap-8 fade-in-up">
        <!-- Hero Section -->
        <section class="flex flex-col gap-4">
            <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-text-muted/60">
                <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>{{ heroData.status }}</span>
            </div>

            <h1 class="text-xl md:text-2xl font-bold text-text-main leading-tight">
                {{ heroData.title }}
            </h1>

            <p class="text-[13px] leading-relaxed text-text-muted/80">
                {{ heroData.tagline }}
            </p>
        </section>

        <!-- Philosophy Card -->
        <section
            class="relative bg-text-main/[0.03] border border-text-main/10 rounded-lg p-6 overflow-hidden fade-in-up"
            style="animation-delay: 100ms;">
            <span
                class="absolute -top-2 left-4 text-[4rem] text-text-main/[0.08] font-serif leading-none select-none">"</span>

            <blockquote class="text-[14px] font-medium text-text-main mb-4 pl-4 relative z-10">
                "{{ philosophyData.quote }}"
            </blockquote>

            <div class="flex gap-2 mb-3 flex-wrap">
                <span
                    class="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-semibold rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                    {{ philosophyData.principles[0] }}
                </span>
                <span
                    class="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-semibold rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {{ philosophyData.principles[1] }}
                </span>
                <span
                    class="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-semibold rounded bg-red-500/15 text-red-400 border border-red-500/30">
                    {{ philosophyData.principles[2] }}
                </span>
            </div>

            <p class="text-[12px] text-text-muted/70 leading-relaxed">
                {{ philosophyData.description }}
            </p>
        </section>

        <!-- Timeline Header -->
        <div class="flex items-center gap-3 fade-in-up" style="animation-delay: 200ms;">
            <h2 class="text-sm font-mono uppercase tracking-wider text-text-main/80">Professional Evolution</h2>
            <div class="flex-1 h-px bg-linear-to-r from-text-main/20 to-transparent"></div>
        </div>

        <!-- Timeline -->
        <div class="relative pl-8">
            <!-- Vertical line -->
            <div
                class="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-text-main/30 to-transparent">
            </div>

            <div class="flex flex-col gap-6">
                <article v-for="(item, index) in timelineData" :key="item.year"
                    class="timeline-item relative fade-in-up group"
                    :style="{ animationDelay: (index + 3) * 100 + 'ms' }">
                    <!-- Node dot -->
                    <div class="absolute -left-8 top-0 w-4 h-4 rounded-full bg-bg-main border-2 border-text-main/40 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-125"
                        :style="{ borderColor: item.color }">
                        <div class="w-1.5 h-1.5 rounded-full bg-text-main/60 transition-all duration-300 group-hover:shadow-lg"
                            :style="{ backgroundColor: item.color, boxShadow: 'none' }"></div>
                    </div>

                    <!-- Card -->
                    <div
                        class="relative bg-text-main/[0.02] border border-text-main/[0.08] rounded-lg p-5 transition-all duration-300 group-hover:bg-text-main/[0.04] group-hover:border-text-main/15 group-hover:translate-x-1 overflow-hidden">
                        <!-- Left accent bar -->
                        <div class="absolute left-0 top-0 w-[3px] h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            :style="{ backgroundColor: item.color }"></div>

                        <div class="flex flex-wrap items-center gap-2 mb-3">
                            <span
                                class="inline-flex items-center gap-2 px-3 py-1 bg-text-main/[0.08] rounded font-mono text-xs border border-text-main/10 transition-all duration-300 group-hover:text-bg-main"
                                :style="{ color: item.color }" :class="{ 'group-hover:bg-current': true }">
                                <span class="font-bold group-hover:text-bg-main">{{ item.year }}</span>
                            </span>
                            <span class="text-[10px] font-mono text-text-muted/50 italic">{{ item.subtitle }}</span>
                        </div>

                        <h3 class="text-base font-semibold text-text-main mb-2">{{ item.title }}</h3>
                        <p class="text-[12px] text-text-muted/70 mb-4 leading-relaxed">{{ item.description }}</p>

                        <ul class="space-y-2 mb-4">
                            <li v-for="highlight in item.highlights" :key="highlight.label"
                                class="relative pl-4 text-[12px] text-text-muted/80 transition-all duration-200 hover:translate-x-0.5">
                                <span class="absolute left-0 text-text-main/40 transition-colors duration-200"
                                    :style="{ color: item.color }">▹</span>
                                <span class="font-semibold text-text-main/90">{{ highlight.label }}:</span>
                                {{ highlight.text }}
                            </li>
                        </ul>

                        <div class="flex flex-wrap gap-1.5">
                            <span v-for="tag in item.tags" :key="tag"
                                class="inline-block px-2 py-0.5 text-[10px] font-mono uppercase rounded-sm bg-text-main/[0.06] text-text-main/60 border border-text-main/10 transition-all duration-300 group-hover:bg-text-main/10 group-hover:text-text-main/90">
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </div>

        <!-- CTA Section -->
        <section class="relative text-center py-8 px-4 border-t border-text-main/10 mt-8 fade-in-up"
            style="animation-delay: 800ms;">
            <p class="text-lg italic text-text-main/80 mb-4">{{ ctaData.text }}</p>
            <a :href="'mailto:' + ctaData.email"
                class="inline-flex items-center gap-2 px-6 py-3 bg-text-main/10 border border-text-main/20 rounded-md text-text-main font-mono text-sm transition-all duration-300 hover:bg-text-main/15 hover:border-text-main/40 hover:-translate-y-0.5 hover:shadow-lg">
                <span>→</span>
                <span>{{ ctaData.email }}</span>
            </a>
        </section>
    </div>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import { heroData, philosophyData, timelineData, ctaData } from '../data/experience.js'

useHead({
    title: 'Experience - Satyendra',
    meta: [
        { name: 'description', content: 'Full-Stack Backend Security Engineer & Researcher. Professional journey from 2018-2025 covering AI Security, DevOps, and more.' }
    ]
})
</script>

<style scoped>
.timeline-item:hover .year-badge-inner {
    background-color: currentColor;
    color: #082026;
}
</style>
