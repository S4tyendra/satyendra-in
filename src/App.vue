<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import BackgroundAtmosphere from './components/BackgroundAtmosphere.vue'
import Header from './components/Header.vue'
import TerminalBreadcrumb from './components/TerminalBreadcrumb.vue'
import Footer from './components/Footer.vue'
import './assets/home.css'

const isScrolled = ref(false)
const terminalRef = ref(null)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleTerminalFocus = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  setTimeout(() => {
    const input = document.getElementById('terminal-input')
    if (input) input.focus()
  }, 500)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="min-h-screen w-full flex flex-col justify-center py-12 px-4 relative bg-bg-main text-text-main overflow-x-hidden selection:bg-text-muted/40 selection:text-text-main">
    <main class="w-full mx-auto relative z-10 flex flex-col gap-6 transition-all duration-500 ease-in-out @container"
      :class="isScrolled ? 'max-w-5xl' : 'max-w-[460px]'">
      <BackgroundAtmosphere />
      <Header :is-scrolled="isScrolled" @focus-terminal="handleTerminalFocus" />
      <TerminalBreadcrumb ref="terminalRef" />

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

      <Footer :is-scrolled="isScrolled" />
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
