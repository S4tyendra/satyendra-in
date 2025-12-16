<template>
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div class="space-y-2">
            <h1 class="text-3xl text-text-main font-bold">Blog</h1>
            <p class="text-text-main/60">Read my thoughts and tutorials on my external blog.</p>
        </div>

        <a href="https://blog.satyendra.in" target="_blank" rel="noopener noreferrer"
            class="group relative inline-flex items-center gap-2 px-6 py-3 bg-text-main/5 hover:bg-text-main/10 border border-text-main/10 rounded-lg text-text-main transition-all duration-300">
            <span>Visit blog.satyendra.in</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
        </a>
    </div>
</template>
