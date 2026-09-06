<script setup>
import { ArrowUpRight, ArrowRight, ArrowDown, ArrowUp, ArrowDownLeft, ArrowLeftRight, CornerDownRight, Gem, Network, Server, Plus } from 'lucide-vue-next'
defineProps({ name: { type: String, default: 'external' } })
const icons = { external: ArrowUpRight, right: ArrowRight, down: ArrowDown, up: ArrowUp, downLeft: ArrowDownLeft, exchange: ArrowLeftRight, branch: CornerDownRight, gem: Gem, network: Network, server: Server, plus: Plus }
</script>
<template><component :is="icons[name] || ArrowUpRight" class="site-icon" :size="16" :stroke-width="1.7" aria-hidden="true" focusable="false" /></template>
<style scoped>.site-icon { display: inline-block; width: 1em; height: 1em; flex-shrink: 0; vertical-align: -.13em; }</style>
