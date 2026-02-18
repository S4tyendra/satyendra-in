<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import NavGroup from './NavGroup.vue'
import NavItem from './NavItem.vue'
import CodeIcon from './icons/CodeIcon.vue'
import FlaskIcon from './icons/FlaskIcon.vue'
import PenIcon from './icons/PenIcon.vue'
import BookIcon from './icons/BookIcon.vue'
import CameraIcon from './icons/CameraIcon.vue'
import VideoIcon from './icons/VideoIcon.vue'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

const route = useRoute()

// Only show on non-home pages
const isHome = computed(() => route.path === '/')
const show = computed(() => !isHome.value)

// Desktop panel open/close
const panelOpen = ref(false)

// Mobile drawer
const drawerOpen = ref(false)

// Responsive
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
const isDesktop = computed(() => windowWidth.value > 768)

const handleResize = () => { windowWidth.value = window.innerWidth }
onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))
</script>

<template>
    <Transition name="nav-fade">
        <div v-if="show" class="fixed z-40" style="bottom: 5.5rem; right: 1.5rem;">

            <!-- ── DESKTOP: collapsible panel ── -->
            <div v-if="isDesktop" class="flex flex-col items-end gap-2">
                <!-- Panel -->
                <Transition name="panel-slide">
                    <div v-if="panelOpen"
                        class="w-56 rounded-2xl bg-bg-main/95 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden p-3 space-y-2">
                        <NavGroup num="01" title="Engineering" :is-default-open="false">
                            <NavItem :icon="CodeIcon" label="Projects" code="DIR_01 [02]" href="/projects" />
                            <NavItem :icon="FlaskIcon" label="Experience" code="GIT_REPO [03]" href="/experience" />
                        </NavGroup>
                        <NavGroup num="04" title="Knowledge" :is-default-open="false">
                            <NavItem :icon="PenIcon" label="Blog" code="LOGS [05]" href="/blog" />
                            <NavItem :icon="BookIcon" label="Docs" code="MAN [06]" href="/docs" />
                        </NavGroup>
                        <NavGroup num="07" title="Studio" :is-default-open="false">
                            <NavItem :icon="CameraIcon" label="Photography" code="RAW [08]" href="/photography" />
                            <NavItem :icon="VideoIcon" label="Services" code="EXEC [09]" href="/services" />
                        </NavGroup>
                    </div>
                </Transition>

                <!-- Toggle button -->
                <button @click="panelOpen = !panelOpen"
                    class="w-12 h-12 rounded-full bg-bg-main/95 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center text-text-muted hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300 active:scale-95"
                    :class="panelOpen ? 'border-cyan-500/40 text-cyan-400' : ''" aria-label="Toggle navigation">
                    <!-- Grid icon when closed, X when open -->
                    <svg v-if="!panelOpen" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8"
                        viewBox="0 0 24 24">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- ── MOBILE: drawer trigger ── -->
            <div v-else>
                <Drawer v-model:open="drawerOpen">
                    <DrawerTrigger as-child>
                        <button
                            class="w-12 h-12 rounded-full bg-bg-main/95 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center text-text-muted hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300 active:scale-95"
                            aria-label="Navigation">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8"
                                viewBox="0 0 24 24">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                            </svg>
                        </button>
                    </DrawerTrigger>
                    <DrawerContent class="bg-bg-main border-white/10 text-text-main">
                        <DrawerHeader class="border-b border-white/5 pb-4">
                            <div class="flex items-center justify-between">
                                <DrawerTitle class="text-base font-bold text-text-main">Navigate</DrawerTitle>
                                <DrawerDescription class="sr-only">Site navigation</DrawerDescription>
                                <DrawerClose as-child>
                                    <button class="p-2 rounded-lg hover:bg-white/5 transition-colors">
                                        <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor"
                                            stroke-width="2" viewBox="0 0 24 24">
                                            <path d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </DrawerClose>
                            </div>
                        </DrawerHeader>
                        <div class="p-4 space-y-2 pb-8" @click="drawerOpen = false">
                            <NavGroup num="01" title="Engineering" :is-default-open="false">
                                <NavItem :icon="CodeIcon" label="Projects" code="DIR_01 [02]" href="/projects" />
                                <NavItem :icon="FlaskIcon" label="Experience" code="GIT_REPO [03]" href="/experience" />
                            </NavGroup>
                            <NavGroup num="04" title="Knowledge" :is-default-open="false">
                                <NavItem :icon="PenIcon" label="Blog" code="LOGS [05]" href="/blog" />
                                <NavItem :icon="BookIcon" label="Docs" code="MAN [06]" href="/docs" />
                            </NavGroup>
                            <NavGroup num="07" title="Studio" :is-default-open="false">
                                <NavItem :icon="CameraIcon" label="Photography" code="RAW [08]" href="/photography" />
                                <NavItem :icon="VideoIcon" label="Services" code="EXEC [09]" href="/services" />
                            </NavGroup>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>

        </div>
    </Transition>
</template>

<style scoped>
.nav-fade-enter-active,
.nav-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.nav-fade-enter-from,
.nav-fade-leave-to {
    opacity: 0;
    transform: translateY(0.5rem);
}

.panel-slide-enter-active,
.panel-slide-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.panel-slide-enter-from,
.panel-slide-leave-to {
    opacity: 0;
    transform: translateY(0.5rem) scale(0.97);
    transform-origin: bottom right;
}
</style>
