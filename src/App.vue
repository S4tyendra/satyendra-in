<script setup>
import { RouterView } from 'vue-router'
import { useHead } from '@vueuse/head'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import './assets/site.css'

useHead({
  title: 'Bongi Satyendra | Software Development Engineer',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Bongi Satyendra' },
    { name: 'keywords', content: 'Satyendra, Systems Engineer, Cloud Architect, DevSecOps, SRE, Golang, Linux, Cybersecurity, Infrastructure' },
    { name: 'application-name', content: 'Satyendra' },
    { name: 'theme-color', content: '#082026' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://satyendra.in/' },
    { property: 'og:image', content: 'https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/default.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@s4tyendra' },
    { name: 'twitter:creator', content: '@s4tyendra' },
  ],
  link: [
    { rel: 'canonical', href: 'https://satyendra.in' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})

</script>

<template>
  <div class="site-shell">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <Header />
    <main id="main-content" tabindex="-1" class="site-main @container">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
