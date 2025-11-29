<script setup>
import { RouterView } from 'vue-router'
import BackgroundAtmosphere from './components/BackgroundAtmosphere.vue'
import Header from './components/Header.vue'
import TerminalBreadcrumb from './components/TerminalBreadcrumb.vue'
import Footer from './components/Footer.vue'
import './assets/home.css'
</script>

<template>
  <div class="min-h-screen w-full flex flex-col justify-center py-12 px-4 relative bg-[#082026] text-[#E6DEC8] overflow-x-hidden selection:bg-green-500/30 selection:text-green-400">
    <main class="w-full max-w-[420px] mx-auto relative z-10 flex flex-col gap-6">
      <BackgroundAtmosphere />
      <Header />
      <TerminalBreadcrumb />
      
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      
      <Footer />
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
