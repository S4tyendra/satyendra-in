<script setup>
import { introData, aboutData, experienceData } from '../data/experience.js'
</script>

<template>
    <div class="flex flex-col gap-16 animate-fade-in pb-20">
        <!-- Hero Section -->
        <header class="relative flex flex-col gap-8 p-8 rounded-2xl overflow-hidden group">
            <!-- Background Elements -->
            <div class="absolute inset-0 bg-surface-card/30 backdrop-blur-sm border border-white/5 rounded-2xl z-0">
            </div>
            <div
                class="absolute -top-24 -right-24 w-64 h-64 bg-accent-primary/10 rounded-full blur-[80px] group-hover:bg-accent-primary/20 transition-colors duration-700">
            </div>

            <div class="relative z-10 flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-3">
                        <div class="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></div>
                        <span
                            class="text-accent-primary font-mono text-sm tracking-wider uppercase opacity-80">System.Identity</span>
                    </div>
                    <h1
                        class="text-4xl md:text-6xl font-bold bg-linear-to-r from-text-main via-text-main to-text-muted bg-clip-text text-transparent tracking-tight">
                        {{ introData.title }}
                    </h1>
                    <h2 class="text-xl md:text-2xl text-accent-secondary font-mono">
                        {{ introData.subtitle }}
                    </h2>
                </div>

                <p
                    class="text-lg text-text-muted/90 leading-relaxed max-w-3xl border-l-2 border-accent-primary/30 pl-6 py-2">
                    {{ introData.description }}
                </p>

                <div
                    class="flex items-center gap-3 text-accent-primary font-mono text-sm bg-accent-primary/5 w-fit px-5 py-2.5 rounded-lg border border-accent-primary/20 backdrop-blur-md shadow-lg shadow-accent-primary/5 hover:shadow-accent-primary/10 transition-shadow">
                    <span class="relative flex h-2.5 w-2.5">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-primary"></span>
                    </span>
                    {{ introData.availability }}
                </div>
            </div>
        </header>

        <!-- About Section (Terminal Style) -->
        <section class="flex flex-col gap-8">
            <div class="flex items-center gap-4">
                <span class="text-accent-primary font-mono text-lg">01.</span>
                <h3 class="text-2xl font-bold text-text-main">Kernel / Philosophy</h3>
                <div class="h-px flex-1 bg-linear-to-r from-border-main to-transparent"></div>
            </div>

            <div class="relative bg-[#0d1117] border border-border-main rounded-xl overflow-hidden shadow-2xl">
                <!-- Terminal Header -->
                <div class="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                    <div class="flex gap-2">
                        <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <div class="text-xs text-text-muted font-mono opacity-50">user@devh.in:~</div>
                    <div class="w-12"></div>
                </div>

                <div class="p-6 md:p-8 flex flex-col gap-6 font-mono text-sm md:text-base">
                    <div class="flex flex-col gap-4 text-text-muted/90">
                        <p v-for="(paragraph, index) in aboutData.content" :key="index" class="leading-relaxed">
                            <span class="text-accent-secondary mr-2">$</span>
                            <span :class="{ 'text-text-main font-semibold': index === 1 }">{{ paragraph }}</span>
                        </p>
                    </div>

                    <div
                        class="mt-4 p-4 border border-accent-primary/20 rounded bg-accent-primary/5 text-accent-primary">
                        <span class="mr-2">>>></span>
                        <span class="tracking-wide font-bold">{{ aboutData.philosophy }}</span>
                        <span class="animate-pulse">_</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Timeline Section -->
        <section class="flex flex-col gap-10">
            <div class="flex items-center gap-4">
                <span class="text-accent-primary font-mono text-lg">02.</span>
                <h3 class="text-2xl font-bold text-text-main">System Logs</h3>
                <div class="h-px flex-1 bg-linear-to-r from-border-main to-transparent"></div>
            </div>

            <div class="flex flex-col gap-8 relative pl-4 md:pl-0">
                <!-- Vertical Line (Connectors) -->
                <div
                    class="absolute left-[19px] md:left-[139px] top-6 bottom-6 w-px bg-linear-to-b from-accent-primary/50 via-border-main to-transparent hidden md:block">
                </div>

                <div v-for="(item, index) in experienceData" :key="index"
                    class="group relative flex flex-col md:flex-row gap-8 md:gap-16 items-start transition-all duration-300">

                    <!-- Date Node (Desktop) -->
                    <div class="hidden md:flex flex-col items-end min-w-[120px] pt-2 relative z-10">
                        <span
                            class="font-mono text-accent-primary font-bold text-lg group-hover:text-white transition-colors">{{
                                item.year }}</span>
                        <!-- Node Dot -->
                        <div
                            class="absolute top-4 -right-[9px] w-[18px] h-[18px] rounded-full bg-bg-main border-2 border-accent-primary group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(var(--color-accent-primary),0.5)] transition-all duration-300">
                            <div
                                class="w-full h-full rounded-full bg-accent-primary/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            </div>
                        </div>
                    </div>

                    <!-- Content Card -->
                    <div class="flex-1 w-full group-hover:-translate-y-1 transition-transform duration-300">
                        <div
                            class="relative bg-surface-card/40 backdrop-blur-md border border-white/5 rounded-xl p-6 md:p-7 hover:border-accent-primary/30 hover:bg-surface-card/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-accent-primary/5">

                            <!-- Mobile Date -->
                            <div class="md:hidden flex items-center gap-3 mb-4">
                                <div class="w-2 h-2 rounded-full bg-accent-primary"></div>
                                <span class="font-mono text-accent-primary font-bold">{{ item.year }}</span>
                            </div>

                            <div class="flex flex-col gap-3">
                                <div>
                                    <h4
                                        class="text-xl md:text-2xl font-bold text-text-main group-hover:text-accent-primary transition-colors">
                                        {{ item.title }}
                                    </h4>
                                    <p
                                        class="text-text-muted font-medium text-sm md:text-base mt-1 flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-accent-secondary"></span>
                                        {{ item.subtitle }}
                                    </p>
                                </div>

                                <p v-if="item.description"
                                    class="text-text-muted/80 text-sm md:text-base leading-relaxed mt-2 border-l-2 border-white/5 pl-4">
                                    {{ item.description }}
                                </p>

                                <div v-if="item.keyPoints && item.keyPoints.length" class="mt-4 grid gap-3">
                                    <div v-for="(point, pIndex) in item.keyPoints" :key="pIndex"
                                        class="flex gap-3 text-sm bg-black/20 p-3 rounded border border-white/5 hover:border-white/10 transition-colors">
                                        <span class="text-accent-primary font-mono mt-0.5">></span>
                                        <span>
                                            <strong class="text-text-main/90">{{ point.label }}:</strong>
                                            <span class="text-text-muted/80 ml-1">{{ point.text }}</span>
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
.animate-fade-in {
    animation: fadeIn 0.6s cubic-bezier(0.2, 0.0, 0.2, 1);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
