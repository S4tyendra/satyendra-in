<template>
  <section class="flex flex-col gap-4 fade-in-up" style="animation-delay: 100ms;">
    <div class="flex items-center gap-2 mb-2">
      <span class="text-[10px] font-mono text-text-main/60 border border-zinc-800 rounded px-1.5 py-0.5">DIR_01</span>
      <span class="font-medium text-[13px] text-text-main tracking-wide uppercase">Projects</span>
    </div>
    <ProjectCard
      title="Project Alpha"
      description="A high-performance backend service built with modern technologies."
      :tags="['Go', 'PostgreSQL', 'Redis']"
      link="#"
    />
    
    
  </section>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'
</script>
