<template>
  <div class="flex flex-col gap-3 fade-in-up min-h-[200px]">
    <BioSection />
    <Navigation class="space-y-2 fade-in-up min-h-[300px]" />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import BioSection from '../components/BioSection.vue'
import Navigation from '../components/Navigation.vue'
</script>
