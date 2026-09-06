<script setup>
import SiteIcon from './SiteIcon.vue'
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const menuOpen = ref(false)
const menuButton = ref(null)
const menuPanel = ref(null)
const links = [
  { href: '/', label: 'Home', note: 'A quick introduction' },
  { href: '/projects', label: 'Projects', note: 'Products & open source' },
  { href: '/experience', label: 'Experience', note: 'Roles & responsibilities' },
  { href: '/blog', label: 'Writing', note: 'Articles & practical guides' },
]
const isActive = href => href === '/' ? route.path === '/' : route.path === href || route.path.startsWith(href + '/')
async function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) { await nextTick(); menuPanel.value?.querySelector('a')?.focus() }
}
function closeMenu(restoreFocus = false) {
  menuOpen.value = false
  if (restoreFocus) menuButton.value?.focus()
}
function keydown(event) { if (event.key === 'Escape' && menuOpen.value) closeMenu(true) }
function resize() { if (window.innerWidth > 800 && menuOpen.value) closeMenu() }
watch(() => route.fullPath, () => closeMenu())
onMounted(() => { window.addEventListener('keydown', keydown); window.addEventListener('resize', resize) })
onUnmounted(() => { window.removeEventListener('keydown', keydown); window.removeEventListener('resize', resize) })
</script>
<template>
  <header class="site-header" @focusout="event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeMenu() }">
    <div class="header-inner">
      <router-link to="/" class="site-brand" aria-label="Satyendra — home"><span class="brand-mark" aria-hidden="true">s.</span><span>Satyendra<span class="brand-dot">.</span></span></router-link>
      <nav class="primary-nav" aria-label="Main navigation"><router-link v-for="link in links" :key="link.href" :to="link.href" :class="{ 'nav-active': isActive(link.href) }" :aria-current="isActive(link.href) ? 'page' : undefined">{{ link.label }}</router-link></nav>
      <router-link to="/contact" class="contact-link">Get in touch <span aria-hidden="true"><SiteIcon name="external" /></span></router-link>
      <button ref="menuButton" class="mobile-menu-button" type="button" :aria-expanded="menuOpen" aria-controls="mobile-navigation" @click="toggleMenu">{{ menuOpen ? 'Close' : 'Menu' }}<span class="menu-icon" :class="{ 'is-open': menuOpen }" aria-hidden="true"><i></i><i></i></span></button>
    </div>
    <Transition name="mobile-menu"><nav v-if="menuOpen" id="mobile-navigation" ref="menuPanel" class="mobile-navigation" aria-label="Mobile navigation"><router-link v-for="(link, index) in links" :key="link.href" :to="link.href" :aria-current="isActive(link.href) ? 'page' : undefined" @click="closeMenu()"><span class="mobile-nav-number">0{{ index + 1 }}</span><span><strong>{{ link.label }}</strong><small>{{ link.note }}</small></span><span aria-hidden="true"><SiteIcon name="external" /></span></router-link><router-link to="/contact" class="mobile-contact" @click="closeMenu()">Get in touch <span aria-hidden="true"><SiteIcon name="external" /></span></router-link><div class="mobile-secondary"><router-link to="/docs" @click="closeMenu()">Docs</router-link><router-link to="/photography" @click="closeMenu()">Photography</router-link><router-link to="/services" @click="closeMenu()">Services</router-link></div></nav></Transition>
  </header>
</template>
