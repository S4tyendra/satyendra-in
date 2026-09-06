<script setup>
import SiteIcon from '../components/SiteIcon.vue'
import { onMounted, onUnmounted } from 'vue'
import CompanyStoreLinks from '../components/CompanyStoreLinks.vue'
import EngineeringDesk from '../components/EngineeringDesk.vue'
import ProductExplorer from '../components/ProductExplorer.vue'
import { useHead } from '@vueuse/head'
import { getAllPosts } from '../utils/blog.js'
import { selectedOpenSource, companyProducts, projectPath } from '../data/featuredWork.js'
import { experienceData } from '../data/experience.js'
const posts = getAllPosts().filter(post => !post.wip || post.wip === 'false').slice(0, 3)
const dateLabel = date => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
useHead({
  title: 'Bongi Satyendra | Software Development Engineer',
  meta: [
    { name: 'description', content: 'Software Development Engineer at Neosurge. Explore my apps, open-source tools, work experience, and writing on software and infrastructure.' },
    { property: 'og:title', content: 'Bongi Satyendra | Software Development Engineer' },
    { property: 'og:description', content: 'Cloud, security, APIs, and applications. Work at Neosurge, independent products, open source, and technical writing.' },
    { property: 'og:url', content: 'https://satyendra.in/' },
  ],
  link: [{ rel: 'canonical', href: 'https://satyendra.in/' }],
})
let observer
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-arrived')
        observer.unobserve(entry.target)
      }
    }
  }, { threshold: 0.08 })
  document.querySelectorAll('.home-page > section:not(.intro-section)').forEach(section => observer.observe(section))
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="home-page">
    <section class="intro-section" aria-labelledby="intro-heading">
      <div class="intro-copy">
        <div class="hero-identity"><img src="https://images.satyendra.in/Satyendra.webp" alt="" width="44" height="44"><p class="eyebrow">Bongi Satyendra<span>Software Development Engineer · Neosurge</span></p></div>
        <h1 id="intro-heading">Cloud &amp; security.<br>APIs.<br><span>Apps &amp; web.</span></h1>
        <p class="intro-description">My focus is cloud infrastructure and security. At <a href="#company-work">Neosurge</a>, I also build backend services and applications. Outside work, I maintain personal products and open-source tools, and write about what I learn.</p>
        <div class="intro-actions">
          <a href="#products" class="button-primary">Explore my work <span aria-hidden="true"><SiteIcon name="down" /></span></a>
          <router-link to="/experience" class="text-link">View experience <span aria-hidden="true"><SiteIcon name="right" /></span></router-link>
        </div>
      </div>
      <EngineeringDesk />
    </section>

    <section id="company-work" class="company-section" aria-labelledby="company-heading">
      <div><p class="eyebrow">At Neosurge</p><h2 id="company-heading">Products I work on.</h2><router-link to="/experience" class="text-link">My role & responsibilities <SiteIcon name="right" /></router-link></div>
      <article v-for="product in companyProducts" :key="product.title" class="company-product">
        <h3>{{ product.title }}</h3><p>{{ product.description }}</p><CompanyStoreLinks :product="product" />
      </article>
    </section>

    <section id="products" class="products-section" aria-labelledby="products-heading">
      <div class="section-heading"><div><p class="eyebrow">Independent products</p><h2 id="products-heading">A few things of my own.</h2></div><router-link to="/projects?type=products" class="text-link">All products <SiteIcon name="right" /></router-link></div>
      <p class="section-description">Personal projects I maintain alongside my day job.</p>
      <ProductExplorer />
    </section>

    <section class="open-section" aria-labelledby="open-heading">
      <div class="section-heading"><div><p class="eyebrow">Open source</p><h2 id="open-heading">The code is open.</h2></div><router-link to="/projects?type=opensource" class="text-link">All open source <SiteIcon name="right" /></router-link></div>
      <p class="section-description">Tools for developers, campus systems, and mobile applications. Explore the implementation or contribute.</p>
      <router-link to="/blog/why-i-built-latch" class="latch-feature">
        <div class="latch-image"><img src="/blog-images/why-i-built-latch/image.png" alt="Latch: shared terminal, files, and applications in a browser" loading="lazy" width="1200" height="700"><span class="image-label">Explore the build <SiteIcon name="external" /></span></div>
        <div class="latch-caption"><div><p class="eyebrow">Featured build · Rust / Vue / WebSockets</p><h3>Latch. A shared workspace in your browser.</h3></div><span class="round-arrow" aria-hidden="true"><SiteIcon name="external" /></span></div>
      </router-link>
      <div class="open-list">
        <article v-for="project in selectedOpenSource" :key="project.link" class="open-row">
          <div><router-link :to="projectPath(project)"><h3>{{ project.title }}</h3></router-link><p>{{ project.desc }}</p></div>
          <span class="technology">{{ project.tags.slice(0, 3).join(' / ') }}</span>
          <a :href="project.link" target="_blank" rel="noopener noreferrer" :aria-label="`${project.title} source on GitHub`">Source <SiteIcon name="external" /></a>
        </article>
      </div>
    </section>

    <section class="home-experience" aria-labelledby="experience-heading">
      <div class="experience-intro"><p class="eyebrow">Experience</p><h2 id="experience-heading">From campus systems<br>to production apps.</h2><p>Cloud infrastructure and security, followed by backend and application development.</p><router-link to="/experience" class="text-link">Full experience <SiteIcon name="right" /></router-link></div>
      <div class="experience-accordions"><details v-for="(role, index) in experienceData.slice(0, 3)" :key="role.subtitle" :open="index === 0"><summary><span>{{ role.year }}</span><div><h3>{{ role.subtitle }}</h3><p>{{ role.title }}</p></div><span class="expand-symbol"><SiteIcon name="plus" /></span></summary><ul><li v-for="point in role.keyPoints.slice(0, 2)" :key="point.text">{{ point.text }}</li></ul></details></div>
    </section>

    <section class="writing-section" aria-labelledby="writing-heading">
      <div class="section-heading"><div><p class="eyebrow">Writing</p><h2 id="writing-heading">What I learn along the way.</h2></div><router-link to="/blog" class="text-link">All articles <SiteIcon name="right" /></router-link></div>
      <p class="section-description">Practical guides, project write-ups, and a closer look at how systems work.</p>
      <router-link v-for="post in posts" :key="post.slug" :to="`/blog/${post.slug}`" class="writing-row"><time :datetime="new Date(post.date).toISOString()">{{ dateLabel(post.date) }}</time><h3>{{ post.title }}</h3><span aria-hidden="true"><SiteIcon name="external" /></span></router-link>
      <div class="more-writing"><span>Looking for setup instructions?</span><router-link to="/docs" class="text-link">Browse the documentation <SiteIcon name="right" /></router-link></div>
    </section>
  </div>
</template>
