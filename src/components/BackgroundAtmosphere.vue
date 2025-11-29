<template>
  <div>
    <!-- Light gradient -->
    <div class="fixed top-0 left-0 w-full h-full z-0 bg-gradient-to-br from-[#E6DEC8] to-[#E6DEC8] dark:opacity-0 transition-opacity duration-500"></div>
    <!-- Dark gradient -->
    <div class="fixed top-0 left-0 w-full h-full z-0 bg-gradient-to-br from-[#082026] via-[#082026] to-[#082026] opacity-0 dark:opacity-100 transition-opacity duration-500"></div>
    <!-- Green blur -->
    <div class="fixed top-[-20%] right-[-10%] w-[500px] h-[500px] bg-green-500/[0.04] dark:bg-green-500/[0.05] rounded-full blur-[100px] pointer-events-none z-0"></div>
    <!-- Blue blur -->
    <div class="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/[0.04] dark:bg-blue-500/[0.05] rounded-full blur-[100px] pointer-events-none z-0"></div>
    <!-- Noise overlay -->
    <div class="noise-bg"></div>
  </div>
</template>
