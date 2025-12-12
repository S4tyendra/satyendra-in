<template>
  <div>
    <!-- Main Background -->
    <div class="fixed top-0 left-0 w-full h-full z-[-1] bg-bg-main/20 "></div>
    <!-- Green blur -->
    <div
      class="fixed top-[-20%] right-[-10%] w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none z-0 animate-blob">
    </div>
    <!-- Blue blur -->
    <div
      class="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0 animate-blob animation-delay-2000">
    </div>
    <!-- Noise overlay -->
    <div class="fixed top-0 left-0 w-full h-full -z-10 dot-bg "></div>
  </div>
</template>
