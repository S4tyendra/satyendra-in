<script setup>
import SiteIcon from './SiteIcon.vue'
import { ref, computed } from 'vue'
import { personalProducts, projectPath } from '../data/featuredWork.js'
const selected = ref(0)
const products = [
  { name: 'GemHub', audience: 'For Gemini users', intro: 'Discover Gemini Gems.', description: 'Discover custom Gemini personas, save the useful ones, and share your own with the community.', features: ['Browse community Gems', 'Save your favourites', 'Share your own creations'], action: 'Explore GemHub', icon: 'gem', colour: '#d8dcb8', record: personalProducts[0] },
  { name: 'Edge Proxy', audience: 'For developers', intro: 'Cross-origin requests & image caching.', description: 'A proxy for cross-origin requests, with an image caching layer to reduce repeat downloads.', features: ['Cross-origin requests', 'Image caching', 'HTTP methods & headers'], action: 'Use Edge Proxy', icon: 'network', colour: '#efb17c', record: personalProducts[1] },
  { name: 'DevH', audience: 'Developer infrastructure', intro: 'APIs & developer utilities.', description: 'API endpoints, utility libraries, and installation scripts used across my personal projects.', features: ['Utility APIs', 'Installation scripts', 'Project documentation'], action: 'Visit DevH', icon: 'server', colour: '#b9d4d3', record: personalProducts[2] },
]
const current = computed(() => products[selected.value])
function move(event) {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  selected.value = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (selected.value + (event.key === 'ArrowDown' ? 1 : 2)) % 3
  event.currentTarget.querySelectorAll('[role=tab]')[selected.value].focus()
}
</script>
<template>
  <div class="product-explorer" :style="{ '--product-accent': current.colour }">
    <div class="product-select" role="tablist" aria-label="Explore personal products" aria-orientation="vertical" @keydown="move"><button v-for="(product, index) in products" :id="`product-tab-${index}`" :key="product.name" role="tab" :aria-selected="selected === index" :tabindex="selected === index ? 0 : -1" aria-controls="product-panel" @click="selected = index"><span class="product-number">0{{ index + 1 }}</span><span><strong>{{ product.name }}</strong><small>{{ product.audience }}</small></span><span class="select-arrow" aria-hidden="true"><SiteIcon name="external" /></span></button></div>
    <div id="product-panel" role="tabpanel" :aria-labelledby="`product-tab-${selected}`" tabindex="0" class="product-stage">
      <Transition name="product-switch" mode="out-in"><div :key="selected" class="product-stage-inner"><div class="product-art" aria-hidden="true"><span><SiteIcon :name="current.icon" /></span><div class="art-caption">{{ current.name }}</div></div><div class="product-story"><p class="eyebrow">Independent product · {{ current.audience }}</p><h3>{{ current.intro }}</h3><p>{{ current.description }}</p><ul><li v-for="feature in current.features" :key="feature"><span aria-hidden="true"><SiteIcon name="branch" /></span> {{ feature }}</li></ul><div class="explorer-actions"><a :href="current.record.deployment_url" target="_blank" rel="noopener noreferrer" class="button-primary">{{ current.action }} <SiteIcon name="external" /></a><router-link :to="projectPath(current.record)" class="text-link">Details <SiteIcon name="right" /></router-link></div></div></div></Transition>
    </div>
  </div>
</template>
<style scoped>
.product-explorer { display: grid; grid-template-columns: 250px minmax(0,1fr); border: 1px solid #426068; border-radius: 6px; overflow: hidden; }
.product-select { display: flex; flex-direction: column; background: #0b272e; }
.product-select button { text-align: left; display: flex; gap: 14px; align-items: center; padding: 26px 20px; border-bottom: 1px solid #355057; min-height: 108px; transition: background .2s; }
.product-select button:last-child { border-bottom: 0; }
.product-select button[aria-selected=true] { background: var(--product-accent); color: #082026; }
.product-number { font-size: 11px; opacity: .6; align-self: start; padding-top: 5px; }
.product-select strong { font-size: 21px; font-weight: 500; display: block; }
.product-select small { font-size: 11px; display: block; margin-top: 5px; opacity: .7; }
.select-arrow { margin-left: auto; transition: transform .2s; }
.product-select button[aria-selected=true] .select-arrow { transform: rotate(45deg); }
.product-stage { background: #123139; padding: 32px; }
.product-stage-inner { display: grid; grid-template-columns: 160px minmax(0,1fr); gap: 30px; align-items: center; min-height: 300px; }
.product-art { color: var(--product-accent); position: relative; text-align: center; border: 1px solid #426068; aspect-ratio: 1; display: grid; align-content: center; transform: rotate(-5deg); transition: transform .4s; border-radius: 50%; }
.product-art > span { display: block; font-size: 100px; line-height: 1; }
.art-caption { font-size: 12px; margin-top: 8px; }
.product-stage:hover .product-art { transform: rotate(5deg); }
.product-story .eyebrow { font-size: 10px; color: var(--product-accent); }
.product-story h3 { font-size: 31px; letter-spacing: -1px; line-height: 1.13; margin: 12px 0 16px; }
.product-story > p:not(.eyebrow) { font-size: 15px; color: #c0cecb; line-height: 1.65; }
.product-story ul { margin: 16px 0 20px; display: flex; gap: 7px; flex-direction: column; font-size: 13px; }
.product-story li span { color: var(--product-accent); margin-right: 7px; }
.explorer-actions { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; }
.explorer-actions .button-primary { background: var(--product-accent); border-color: var(--product-accent); font-size: 14px; }
.product-switch-enter-active,.product-switch-leave-active { transition: transform .15s,opacity .15s; }
.product-switch-enter-from { opacity: 0; transform: translateX(8px); }
.product-switch-leave-to { opacity: 0; transform: translateX(-8px); }
@media(max-width:1000px) { .product-stage-inner { grid-template-columns: minmax(0,1fr); } .product-art { display: none; } }
@media(max-width:700px) { .product-explorer { grid-template-columns: 1fr; } .product-select button { min-height: 72px; padding: 14px 20px; } .product-select strong { font-size: 19px; } .product-select small { margin: 2px 0 0; } .product-stage { padding: 24px; } .product-story h3 { font-size: 28px; } .product-stage-inner { min-height: 340px; } }
</style>
