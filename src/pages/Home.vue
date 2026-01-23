<template>
  <div class="flex flex-col gap-3 fade-in-up">
    <BioSection />
    <Navigation class="space-y-2 fade-in-up" />
    <GithubGraph />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { useHead } from '@vueuse/head'
import BioSection from '../components/BioSection.vue'
import Navigation from '../components/Navigation.vue'
import GithubGraph from '../components/GithubGraph.vue'

useHead({
  title: 'Bongi Satyendra | Systems Engineer & Cloud Architect',
  meta: [
    { name: 'description', content: 'Bongi Satyendra is a Systems Engineer specializing in Cloud Architecture, DevSecOps, Infrastructure Security, Go, and Linux systems.' },
    { property: 'og:title', content: 'Bongi Satyendra | Systems Engineer & Cloud Architect' },
    { property: 'og:description', content: 'Systems Engineer specializing in Cloud Architecture, DevSecOps, Infrastructure Security, Go, and Linux systems.' },
    { property: 'og:image', content: 'https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/index.png' },
    { property: 'og:url', content: 'https://satyendra.in' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [
    { rel: 'canonical', href: 'https://satyendra.in' }
  ]
})
</script>
