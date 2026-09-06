<template>

  <section class="flex flex-col gap-3 fade-in-up" style="animation-delay: 100ms;">

    <BioCard>
      <p class="text-[13px] leading-relaxed">
        I break things to see how they work, then
        <span class="highlighter-effect font-medium text-text-main">fix them cheaper and tighter</span>
        than before.
      </p>
    </BioCard>

    <BioCard>
      <p class="text-[13px] leading-relaxed">
        Now:
        <span class="highlight-base hl-violet font-medium text-text-main cursor-default">security</span>,
        <span class="cyber-wrapper">
          <span class="icon-reveal-container text-red-500">↓</span>
          <span class="cyber-text transition-all duration-300 font-medium font-mono text-[12px]">cloud cost</span>
        </span>,
        <span class="cyber-wrapper">
          <span class="icon-reveal-container text-blue-500">⚡</span>
          <span class="devops-text transition-all duration-300 font-medium text-text-main">latency</span>
        </span>,
        and
        <span
          class="line-through decoration-text-main/30 group-hover/item:decoration-red-500 group-hover/item:text-text-main/60 decoration-2 transition-colors text-[12px]">bad
          opinions</span>.
      </p>
    </BioCard>

    <div
      class="bio-card pl-4 py-3 pr-2 cursor-default rounded-r-md flex items-center gap-3 group/loc relative hover:bg-text-main/[0.035] transition-colors h-[48px]">
      <div class="bio-line"></div>
      <div class="relative w-3 h-3 flex items-center justify-center shrink-0">
        <div class="w-1.5 h-1.5 bg-phosphor rounded-full relative z-10"></div>
      </div>
      <div class="text-[13px] relative overflow-hidden h-full w-full flex items-center">
        <p
          class="absolute transition-transform duration-500 group-hover/loc:-translate-y-[150%] text-text-main/60 font-mono text-[12px]">
          SDE — Neosurge</p>
        <p
          class="absolute transition-transform duration-500 translate-y-[150%] group-hover/loc:translate-y-0 text-text-main font-medium">
          India. Currently starving a heap.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import BioCard from './BioCard.vue'
</script>
