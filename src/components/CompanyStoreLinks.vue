<script setup>
import SiteIcon from './SiteIcon.vue'
defineProps({ product: { type: Object, required: true } })
</script>
<template><div class="company-store-links"><a v-for="store in product.stores" :key="store.href" :href="store.href" :aria-label="`${product.title} on ${store.label}`" target="_blank" rel="noopener noreferrer">{{ store.label }} <SiteIcon /></a></div></template>
<style scoped>
.company-store-links { display: flex; gap: 4px 16px; flex-wrap: wrap; margin-top: 10px; }
.company-store-links a { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; min-height: 44px; color: var(--paper); }
.company-store-links a:hover { color: #efb17c; text-decoration: underline; }
</style>
