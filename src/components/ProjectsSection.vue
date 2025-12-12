<template>
  <section class="flex flex-col gap-4 fade-in-up" style="animation-delay: 100ms;">
    <div class="flex items-center gap-2 mb-2">
      <span class="text-[10px] font-mono text-text-main/60 border border-zinc-800 rounded px-1.5 py-0.5">DIR_01</span>
      <span class="font-medium text-[13px] text-text-main tracking-wide uppercase">Projects</span>
    </div>
    <div v-if="projects.length" class="grid gap-4" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
      <ProjectCard v-for="project in projects" :key="project.link" :title="project.title" :description="project.desc"
        :tags="project.tags" :link="`/project/${getRepoName(project.link)}`" />
    </div>
    <div v-else class="text-text-muted text-sm italic py-4">
      No projects match your search.
    </div>
  </section>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'

defineProps({
  projects: {
    type: Array,
    required: true
  }
})

const getRepoName = (link) => {
  if (!link) return '';
  const parts = link.split('/');
  return parts[parts.length - 1] || parts[parts.length - 2];
}
</script>
