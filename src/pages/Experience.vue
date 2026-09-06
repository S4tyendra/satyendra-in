<script setup>
import SiteIcon from '../components/SiteIcon.vue'
import { useHead } from '@vueuse/head'
import { experienceData } from '../data/experience.js'
const isExternal = href => href.startsWith('http')
useHead({ title: 'Experience | Bongi Satyendra', meta: [{ name: 'description', content: 'Software development at Neosurge, campus infrastructure at IIIT Kota, and security consulting with Mumbai Police C-TRACE.' }], link: [{ rel: 'canonical', href: 'https://satyendra.in/experience' }] })
</script>
<template>
  <div class="experience-page">
    <header class="experience-header"><p class="eyebrow">Professional background</p><h1 class="page-title">Experience.</h1><p>Cloud infrastructure, security, and software development. Currently a Software Development Engineer at Neosurge.</p><a href="https://linkedin.com/in/s4tyendra" target="_blank" rel="noopener noreferrer" class="text-link">Connect on LinkedIn <SiteIcon name="external" /></a></header>
    <ol class="career-list"><li v-for="item in experienceData" :key="item.subtitle" class="career-row"><span class="career-date">{{ item.year }}</span><div><p class="eyebrow">{{ item.subtitle }}</p><h2>{{ item.title }}</h2><ul><li v-for="point in item.keyPoints" :key="point.text">{{ point.text }}</li></ul><div v-if="item.links?.length" class="career-links"><component :is="isExternal(link.href) ? 'a' : 'router-link'" v-for="link in item.links" :key="link.href" :href="isExternal(link.href) ? link.href : undefined" :to="isExternal(link.href) ? undefined : link.href" :target="isExternal(link.href) ? '_blank' : undefined" :rel="isExternal(link.href) ? 'noopener noreferrer' : undefined">{{ link.label }} <SiteIcon :name="isExternal(link.href) ? 'external' : 'right'" /></component></div></div></li></ol>
  </div>
</template>
<style scoped>
.experience-header { max-width: 700px; margin-bottom: 36px; }
.experience-header h1 { margin: 14px 0 20px; }
.experience-header > p:not(.eyebrow) { font-size: 18px; line-height: 1.6; color: var(--paper-dim); margin-bottom: 12px; }
.career-row { display: grid; grid-template-columns: 150px 1fr; gap: 40px; padding: 36px 0; border-top: 1px solid var(--line); }
.career-date { color: var(--paper-dim); font-size: 14px; padding-top: 4px; }
.career-row h2 { font-size: 28px; letter-spacing: -.7px; line-height: 1.2; margin: 10px 0 20px; }
.career-row ul { list-style: disc; padding-left: 19px; max-width: 740px; }
.career-row ul li { font-size: 16px; color: var(--paper-dim); line-height: 1.7; padding-left: 5px; margin-bottom: 10px; }
.career-row li::marker { color: var(--phosphor); }
.career-links { display: flex; gap: 12px 24px; flex-wrap: wrap; margin-top: 20px; }
.career-links a { font-size: 14px; min-height: 44px; display: inline-flex; align-items: center; text-decoration: underline; text-decoration-color: var(--line); }
@media (max-width: 700px) { .career-row { grid-template-columns: 1fr; gap: 12px; padding: 28px 0; } .career-row h2 { font-size: 24px; } .experience-header > p:not(.eyebrow) { font-size: 16px; } }
</style>
