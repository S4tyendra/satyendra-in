<template>
  
    <section class="flex flex-col gap-3 fade-in-up" style="animation-delay: 100ms;">
      
    <BioCard>
      <p class="text-[13px] leading-relaxed">
        I break things to see how they work, then 
        <span class="highlighter-effect font-medium text-[#082026] dark:text-[#E6DEC8]">fix them better</span>
        than before.
      </p>
    </BioCard>

    <BioCard>
      <p class="text-[13px] leading-relaxed">
        Focusing on high-scale 
        <span class="highlight-base hl-violet font-medium text-[#082026] dark:text-[#E6DEC8] cursor-default">backend</span>, 
        <span class="cyber-wrapper">
          <span class="icon-reveal-container text-red-500">🔒</span>
          <span class="cyber-text transition-all duration-300 font-medium font-mono text-[12px]">cybersecurity</span>
        </span>, 
        <span class="cyber-wrapper">
          <span class="icon-reveal-container text-blue-500">🐬</span>
          <span class="devops-text transition-all duration-300 font-medium text-[#082026] dark:text-[#E6DEC8]">DevOps</span>
        </span>, and 
        <span class="line-through decoration-[#082026]/30 dark:decoration-[#E6DEC8]/30 group-hover/item:decoration-red-500 group-hover/item:text-[#082026]/60 dark:group-hover/item:text-[#E6DEC8]/60 decoration-2 transition-colors text-[12px]">bad opinions</span>.
      </p>
    </BioCard>

    <div class="bio-card pl-4 py-3 pr-2 cursor-default rounded-r-lg flex items-center gap-3 group/loc relative hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors h-[48px]">
      <div class="bio-line"></div>
      <div class="relative w-3 h-3 flex items-center justify-center flex-shrink-0">
        <div class="absolute w-full h-full bg-[#082026]/70 dark:bg-[#E6DEC8]/70 rounded-full opacity-20 animate-ping"></div>
        <div class="w-1.5 h-1.5 bg-[#082026]/70 dark:bg-[#E6DEC8]/70 rounded-full relative z-10 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></div>
      </div>
      <div class="text-[13px] relative overflow-hidden h-full w-full flex items-center">
        <p class="absolute transition-transform duration-500 group-hover/loc:-translate-y-[150%] text-[#082026]/60 dark:text-[#E6DEC8]/60 font-mono text-[12px]">UID: IND_NO_20.5937 // RAW</p>
        <p class="absolute transition-transform duration-500 translate-y-[150%] group-hover/loc:translate-y-0 text-[#082026] dark:text-[#E6DEC8] font-medium">Operating from India. Shipping impact.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import BioCard from './BioCard.vue'
</script>
