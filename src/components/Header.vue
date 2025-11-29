<template>
  <header class="flex items-center gap-6 cursor-default fade-in-up">
    <Avatar />
    <div class="flex flex-col space-y-2">
      <div class="h-8 flex items-center group/name cursor-help">
        <h1 class="text-[#082026] dark:text-[#E6DEC8] font-bold tracking-tight text-3xl flex items-center">
          <span class="name-expandable">Bongi</span>
          <span>Satyendra.</span>
        </h1>
      </div>
      <div class="pill-container inline-flex items-center gap-1.5 text-[11px] font-mono text-[#082026]/60 dark:text-[#E6DEC8]/60 uppercase tracking-wider px-1 py-1.5 w-max group/pill">
        <div class="flex items-center">
          <span class="font-semibold text-[#082026]/80 dark:text-[#E6DEC8]/80">Eng</span>
          <span class="pill-expandable">ineer</span>
        </div>
        <span class="text-[#082026]/40 dark:text-[#E6DEC8]/40">/</span>
        <div class="flex items-center">
          <span class="font-semibold text-[#082026]/80 dark:text-[#E6DEC8]/80">Student</span>
        </div>
        <span class="text-[#082026]/40 dark:text-[#E6DEC8]/40">/</span>
        <div class="flex items-center">
          <span class="font-semibold text-[#082026]/80 dark:text-[#E6DEC8]/80">Dev</span>
          <span class="pill-expandable">eloper</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import Avatar from './Avatar.vue'
</script>
