<template>
  <router-link
  to="/"
  class="cursor-pointer"
  >
  <header class="flex items-center gap-6 fade-in-up">
    <Avatar />
    <div class="flex flex-col space-y-2">
      <div class="h-8 flex items-center group/name">
        <h1 class="text-text-main font-bold tracking-tight text-3xl flex items-center">
          <span class="name-expandable">Bongi</span>
          <span>Satyendra.</span>
        </h1>
      </div>
      <div class="pill-container inline-flex items-center gap-1.5 text-[11px] font-mono text-text-main/60 uppercase tracking-wider px-1 py-1.5 w-max group/pill">
        <div class="flex items-center">
          <span class="font-semibold text-text-main/80">Eng</span>
          <span class="pill-expandable">ineer</span>
        </div>
        <span class="text-text-main/40">/</span>
        <div class="flex items-center">
          <span class="font-semibold text-text-main/80">Student</span>
        </div>
        <span class="text-text-main/40">/</span>
        <div class="flex items-center">
          <span class="font-semibold text-text-main/80">Dev</span>
          <span class="pill-expandable">eloper</span>
        </div>
      </div>
    </div>
  </header>
  </router-link>
</template>

<script setup>
import Avatar from './Avatar.vue'
</script>
