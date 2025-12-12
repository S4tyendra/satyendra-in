<template>
  <div class="flex flex-col gap-3 fade-in-up">
    <BioSection />
    <Navigation class="space-y-2 fade-in-up" />
    <GithubGraph />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import BioSection from '../components/BioSection.vue'
import Navigation from '../components/Navigation.vue'
import GithubGraph from '../components/GithubGraph.vue'
</script>
