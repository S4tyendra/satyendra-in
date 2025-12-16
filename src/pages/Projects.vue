<template>
  <div class="flex flex-col gap-6 fade-in-up min-h-[400px]">

    <!-- Search and Filter Controls -->
    <div class="flex flex-col md:flex-row justify-between gap-4 mb-4">
      <div class="relative w-full md:w-96">
        <input v-model="searchQuery" type="text" placeholder="Search projects by name, description or tech..."
          class="w-full bg-bg-secondary/10 border border-border-color rounded-md py-2 px-4 pl-10 text-text-main placeholder-text-muted/60 focus:outline-none focus:border-text-muted transition-colors text-sm" />
        <svg class="absolute left-3 top-2.5 text-text-muted/50" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

    </div>

    <div v-if="allTags.length" class="flex gap-2 flex-wrap mb-6">
      <button v-for="tag in allTags" :key="tag" @click="toggleTag(tag)"
        :class="['px-2.5 py-1 text-[11px] font-mono rounded border transition-all', selectedTags.includes(tag) ? 'bg-text-main text-bg-main border-text-main' : 'bg-transparent text-text-muted/80 border-border-color hover:border-text-muted']">
        {{ tag }}
      </button>
    </div>

    <ProjectsSection :projects="filteredProjects" />
    <div class="my-16 py-16 h-[400px] flex justify-center items-center">

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHead } from '@vueuse/head'
import ProjectsSection from '../components/ProjectsSection.vue'
import projectsData from '../data/projects.js'
import closedData from '../data/closedSrcProjects.js'
import '../assets/projects.css'

const allProjects = [...projectsData, ...closedData]

const searchQuery = ref('')
const selectedTags = ref([])

useHead({
  title: 'Engineering Projects | Satyendra',
  meta: [
    { name: 'description', content: 'A catalog of open-source tools, cloud infrastructure utilities, and system software built with Go, Vue, and Linux.' },
    { property: 'og:title', content: 'Engineering Projects | Satyendra' },
    { property: 'og:description', content: 'Open-source tools, cloud infrastructure utilities, and system software.' },
    { property: 'og:url', content: 'https://satyendra.in/projects' },
    { property: 'og:image', content: 'https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/projects/index.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [
    { rel: 'canonical', href: 'https://satyendra.in/projects' }
  ]
})

// Extract most popular tags
const allTags = computed(() => {
  const tagCounts = {}
  allProjects.forEach(p => {
    p.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  // Sort by count desc, then alpha
  return Object.keys(tagCounts)
    .sort((a, b) => tagCounts[b] - tagCounts[a])
    .slice(0, 20) // Top 20 tags
})

const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
}

const filteredProjects = computed(() => {
  return allProjects.filter(p => {
    const query = searchQuery.value.toLowerCase()
    const matchesSearch = p.title.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))

    const matchesTags = selectedTags.value.length === 0 ||
      p.tags.some(tag => selectedTags.value.includes(tag)) // OR logic (Union)

    return matchesSearch && matchesTags
  })
})
</script>
