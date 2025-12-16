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
  title: 'Satyendra | Full Stack Developer',
  meta: [
    { name: 'description', content: 'Portfolio of Satyendra, a Full Stack Developer and Cybersecurity Enthusiast. Explore my projects, skills, and experience.' },
    { property: 'og:title', content: 'Satyendra | Full Stack Developer' },
    { property: 'og:description', content: 'Portfolio of Satyendra, a Full Stack Developer and Cybersecurity Enthusiast.' },
    { property: 'og:image', content: 'https://og-images-cdn.satyendra.in/og-image/home.png' },
    { property: 'og:url', content: 'https://satyendra.in' },
  ],
  link: [
    { rel: 'canonical', href: 'https://satyendra.in' }
  ]
})
</script>
