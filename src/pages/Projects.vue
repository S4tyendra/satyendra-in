<script setup>
import SiteIcon from '../components/SiteIcon.vue'
import CompanyStoreLinks from '../components/CompanyStoreLinks.vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import projects from '../data/projects.js'
import closedProjects from '../data/closedSrcProjects.js'
import { companyProducts, projectPath, personalProducts } from '../data/featuredWork.js'
const route = useRoute()
const router = useRouter()
const search = ref('')
const categories = [{ id: 'all', label: 'All work' }, { id: 'products', label: 'Personal products' }, { id: 'opensource', label: 'Open source' }, { id: 'professional', label: 'Professional work' }]
const active = computed(() => categories.some(category => category.id === route.query.type) ? route.query.type : 'all')
const selectCategory = type => router.replace({ query: { ...route.query, type: type === 'all' ? undefined : type } })
const records = [
  ...personalProducts.map(p => ({ ...p, category: 'products' })),
  ...projects.map(p => ({ ...p, category: 'opensource' })),
  ...companyProducts.map(p => ({ title: p.title, desc: p.description, link: p.href, category: 'professional', tags: ['Neosurge'], stores: p.stores, external: true })),
  ...closedProjects.filter(p => !personalProducts.includes(p)).map(p => ({ ...p, category: 'professional' })),
]
const filtered = computed(() => records.filter(p => (active.value === 'all' || p.category === active.value) && `${p.title} ${p.desc} ${p.tags.join(' ')}`.toLowerCase().includes(search.value.trim().toLowerCase())))
const categoryLabel = id => categories.find(category => category.id === id)?.label
useHead({ title: 'Projects | Bongi Satyendra', meta: [{ name: 'description', content: 'Personal products to use, open-source repositories to explore, and professional work at Neosurge and IIIT Kota.' }], link: [{ rel: 'canonical', href: 'https://satyendra.in/projects' }] })
</script>

<template>
  <div class="project-directory">
    <header class="directory-heading"><p class="eyebrow">Selected work & project archive</p><h1 class="page-title">Projects.</h1><p>Apps, tools, and infrastructure. Find something to use, explore the source, or see what I build at work.</p></header>
    <div class="project-controls">
      <div class="category-filters" role="group" aria-label="Project category"><button v-for="category in categories" :key="category.id" type="button" :aria-pressed="active === category.id" @click="selectCategory(category.id)">{{ category.label }}</button></div>
      <label class="project-search"><span class="sr-only">Search projects by name or technology</span><input v-model="search" type="search" placeholder="Search projects or technologies"></label>
    </div>
    <p class="result-count" role="status">{{ filtered.length }} {{ filtered.length === 1 ? 'project' : 'projects' }}<span v-if="search"> matching “{{ search }}”</span></p>
    <div v-if="filtered.length" class="directory-grid">
      <article v-for="project in filtered" :key="project.link" class="directory-card">
        <p class="eyebrow">{{ categoryLabel(project.category) }}</p><h2>{{ project.title }}</h2><p class="project-description">{{ project.desc }}</p>
        <div class="project-technologies"><span v-for="tag in project.tags.slice(0, 4)" :key="tag">{{ tag }}</span></div>
        <div class="project-actions">
          <router-link v-if="!project.external" :to="projectPath(project)">Project details <SiteIcon name="right" /></router-link>
          <CompanyStoreLinks v-if="project.stores" :product="project" />
          <a v-else :href="project.deployment_url || project.link" target="_blank" rel="noopener noreferrer">{{ project.category === 'opensource' ? 'Source code' : 'Visit website' }} <SiteIcon name="external" /></a>
        </div>
      </article>
    </div>
    <div v-else class="empty-results"><h2>No matching projects.</h2><p>Try a different name or technology, or reset the filters.</p><button class="button-primary" @click="search = ''; selectCategory('all')">Reset filters</button></div>
  </div>
</template>

<style scoped>
.directory-heading { max-width: 700px; }
.directory-heading h1 { margin: 14px 0 20px; }
.directory-heading > p:last-child { color: var(--paper-dim); font-size: 18px; line-height: 1.65; }
.project-controls { margin-top: 40px; display: flex; flex-direction: column; gap: 24px; }
.category-filters { display: flex; flex-wrap: wrap; gap: 8px; }
.category-filters button { padding: 12px 18px; min-height: 46px; border: 1px solid var(--line); border-radius: 3px; font-size: 14px; }
.category-filters button[aria-pressed=true] { background: var(--paper); color: var(--bg); }
.project-search { max-width: 480px; }
.project-search input { width: 100%; border: 1px solid var(--line); background: var(--bg-raised); padding: 14px 16px; border-radius: 3px; font-size: 16px; }
.result-count { margin: 24px 0 16px; font-size: 14px; color: var(--paper-dim); }
.directory-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.directory-card { padding: 28px; border: 1px solid var(--line); display: flex; flex-direction: column; background: var(--bg-raised); border-radius: 3px; }
.directory-card h2 { font-size: 25px; letter-spacing: -.6px; margin: 16px 0 12px; overflow-wrap: anywhere; }
.project-description { font-size: 16px; color: var(--paper-dim); line-height: 1.6; }
.project-technologies { display: flex; flex-wrap: wrap; gap: 8px 16px; padding: 20px 0 24px; font-size: 12px; color: var(--paper-dim); }
.project-actions { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px 20px; margin-top: auto; border-top: 1px solid var(--line); padding-top: 8px; }
.project-actions a { min-height: 44px; display: inline-flex; align-items: center; font-size: 14px; }
.project-actions a:hover { text-decoration: underline; }
.empty-results { padding: 48px 0; }
.empty-results h2 { font-size: 24px; }
.empty-results p { margin: 12px 0 24px; color: var(--paper-dim); }
@media (max-width: 700px) { .directory-grid { grid-template-columns: 1fr; } .directory-card { padding: 24px; } .category-filters button { padding: 10px 12px; } .directory-heading > p:last-child { font-size: 16px; } }
</style>
