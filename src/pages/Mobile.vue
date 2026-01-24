<script setup>
import { useHead } from '@vueuse/head'
import { ref, onMounted } from 'vue'

useHead({
    title: 'Mobile Architecture & Android Systems | Satyendra',
    meta: [
        { name: 'description', content: 'Advanced Android Systems Engineering, Flutter Architecture, and Security Research. Building performant, secure, and resilient mobile experiences.' },
        { name: 'keywords', content: 'Android, Kotlin, Flutter, NDK, Security, Reverse Engineering, BLE, Systems Programming' },
        { property: 'og:title', content: 'Mobile Systems Engineering | Satyendra' },
        { property: 'og:description', content: 'Architecting the bridge between silicon and soul. Android internals, Flutter performance, and security research.' },
    ]
})

const sections = ref([])

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
            }
        })
    }, { threshold: 0.1 })

    sections.value.forEach(section => {
        if (section) observer.observe(section)
    })
})

const setSectionRef = (el) => {
    if (el) sections.value.push(el)
}
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen text-center relative overflow-hidden w-full ">
        <!-- Background Elements -->
        <div class="fixed inset-0 pointer-events-none z-0">
            <!-- Android Green Glow -->
            <div
                class="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] opacity-20 animate-pulse">
            </div>
            <!-- Deep Purple/Blue Glow -->
            <div
                class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] opacity-20 delay-1000 animate-pulse">
            </div>

            <!-- Grid Pattern -->
            <div
                class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_80%)]">
            </div>
        </div>

        <!-- HERO SECTION -->
        <div class="relative z-10 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
            <div class="relative mb-6 group inline-block">
                <div
                    class="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-700 opacity-60">
                </div>
                <div class="relative p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md animate-float">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-green-400" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M12 2a2 2 0 0 1 2 2v2h-4V4a2 2 0 0 1 2-2z" /> <!-- Antenna -->
                        <rect x="5" y="6" width="14" height="16" rx="2" /> <!-- Body -->
                        <line x1="9" y1="11" x2="9" y2="13" /> <!-- Eye -->
                        <line x1="15" y1="11" x2="15" y2="13" /> <!-- Eye -->
                    </svg>
                </div>
            </div>

            <h1 class="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                Mobile <span
                    class="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-600">Architect</span>
            </h1>

            <div class="relative mb-24 max-w-2xl mx-auto">
                <p class="text-lg md:text-xl font-light text-gray-400 leading-relaxed font-mono">
                    > Systems Engineering <span class="text-green-500">//</span> Kernel Interactions <span
                        class="text-green-500">//</span> Cross-Platform Power
                </p>
                <div class="mt-8 flex justify-center gap-4">
                    <a href="https://github.com/S4tyendra" target="_blank"
                        class="px-6 py-2 rounded-full border border-green-500/30 text-green-400 bg-green-500/10 hover:bg-green-500/20 transition-all font-mono text-sm group flex items-center gap-2">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        github.com/S4tyendra
                    </a>
                </div>
            </div>

            <!-- SKILLS MATRIX -->
            <div :ref="setSectionRef"
                class="scroll-section grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-full text-left">
                <!-- Android Native -->
                <div
                    class="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-green-500/30 hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                    <div class="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg class="w-32 h-32 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M17.523 15.3414C17.523 16.7118 16.4026 17.8229 15.0205 17.8229C13.6384 17.8229 12.5173 16.7118 12.5173 15.3414C12.5173 13.9717 13.6384 12.8605 15.0205 12.8605C16.4026 12.8605 17.523 13.9717 17.523 15.3414ZM7.49756 15.3414C7.49756 16.7118 6.37646 17.8229 4.99438 17.8229C3.6123 17.8229 2.49121 16.7118 2.49121 15.3414C2.49121 13.9717 3.6123 12.8605 4.99438 12.8605C6.37646 12.8605 7.49756 13.9717 7.49756 15.3414Z" />
                        </svg>
                    </div>
                    <div
                        class="mb-4 text-green-400 font-mono text-xs tracking-widest uppercase bg-green-900/20 w-fit px-3 py-1 rounded-full border border-green-500/20">
                        NATIVE
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Android Internals</h3>
                    <p class="text-sm text-gray-400 leading-relaxed mb-4">
                        Deep diving into the OS. Root/Shizuku privileges, NDK integration, and hidden API exploitation.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span
                            class="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">Smali</span>
                        <span
                            class="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">Broadcasts</span>
                        <span
                            class="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">TelephonyManager</span>
                    </div>
                </div>

                <!-- Flutter -->
                <div
                    class="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                    <div
                        class="mb-4 text-blue-400 font-mono text-xs tracking-widest uppercase bg-blue-900/20 w-fit px-3 py-1 rounded-full border border-blue-500/20">
                        CROSS-PLATFORM
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Flutter Architecture</h3>
                    <p class="text-sm text-gray-400 leading-relaxed mb-4">
                        Building pixel-perfect interfaces that run at 120fps. Method channels, FFI, and complex state
                        management.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span
                            class="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">RenderObjects</span>
                        <span
                            class="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">FFI</span>
                        <span
                            class="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">Isolates</span>
                    </div>
                </div>

                <!-- Security -->
                <div
                    class="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-red-500/30 hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                    <div
                        class="mb-4 text-red-400 font-mono text-xs tracking-widest uppercase bg-red-900/20 w-fit px-3 py-1 rounded-full border border-red-500/20">
                        OFFENSIVE
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Mobile Security</h3>
                    <p class="text-sm text-gray-400 leading-relaxed mb-4">
                        Analyzing attack surfaces. Intent interception, downgrade attacks, and forensic data recovery.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">Burp
                            Suite</span>
                        <span
                            class="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">ADB</span>
                        <span
                            class="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">Reverse
                            Eng</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- DEEP DIVE SECTIONS -->
        <!-- 1. SYSTEM INTERCEPTION -->
        <div :ref="setSectionRef" class="scroll-section w-full py-24 border-t border-white/5 bg-black/20">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-12 items-center">
                <div class="text-left space-y-6 order-2 lg:order-1">
                    <div class="flex items-center gap-3 text-green-400 font-mono text-sm tracking-wider">
                        <span class="w-8 h-[2px] bg-green-400"></span>
                        SYSTEM INTERCEPTION
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-white">Ai-Eze & Intent Hooks</h2>
                    <p class="text-lg text-gray-400 leading-relaxed">
                        Why open an app when the system can do it for you? <strong
                            class="text-green-300">Ai-Eze</strong> hooks directly into the Android <span
                            class="font-mono text-sm bg-white/10 px-1 rounded">PROCESS_TEXT</span> intent, allowing AI
                        processing on any selected text, system-wide.
                    </p>
                    <ul class="space-y-4 pt-4">
                        <li class="flex items-start gap-4 text-gray-400">
                            <div class="mt-1 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                            </div>
                            <div>
                                <strong class="text-white block group-hover:text-green-400 transition-colors">Context
                                    Menu Integration</strong>
                                Select text -> "Ai-Eze" -> Instant Summary/Translation.
                                <a href="https://github.com/S4tyendra/Ai-Eze" target="_blank"
                                    class="text-xs text-green-400 flex items-center gap-1 mt-1 hover:underline">
                                    View Source ->
                                </a>
                            </div>
                        </li>
                        <li class="flex items-start gap-4 text-gray-400">
                            <div class="mt-1 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                            </div>
                            <div>
                                <strong class="text-white block">URL Check Interceptor</strong>
                                Catches all <span class="font-mono text-xs">http://</span> intents to prevent accidental
                                malicious clicks before the browser even opens.
                                <div class="flex gap-3 mt-1">
                                    <a href="https://github.com/S4tyendra/URL-Check" target="_blank"
                                        class="text-xs text-green-400 hover:underline">Code</a>
                                    <span class="text-white/20">|</span>
                                    <a href="https://github.com/S4tyendra/MessMenuApk" target="_blank"
                                        class="text-xs text-green-400 hover:underline">MessMenu</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Code/Visual Block -->
                <div
                    class="order-1 lg:order-2 rounded-xl overflow-hidden bg-[#0d0d0d] border border-white/10 shadow-2xl font-mono text-xs relative group">
                    <div class="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                        <span class="text-green-500 font-black text-6xl">}</span>
                    </div>
                    <div class="flex items-center px-4 py-3 bg-white/5 border-b border-white/5 text-gray-500">
                        <span class="mr-2">⚡</span> AndroidManifest.xml
                    </div>
                    <div class="p-6 text-gray-400 overflow-x-auto text-left">
                        <pre><code><span class="text-purple-400">&lt;activity</span> <span class="text-blue-400">android:name</span>=<span class="text-green-400">".ProcessTextActivity"</span><span class="text-purple-400">&gt;</span>
    <span class="text-purple-400">&lt;intent-filter&gt;</span>
        <span class="text-purple-400">&lt;action</span> <span class="text-blue-400">android:name</span>=<span class="text-green-400">"android.intent.action.PROCESS_TEXT"</span> <span class="text-purple-400">/&gt;</span>
        <span class="text-purple-400">&lt;category</span> <span class="text-blue-400">android:name</span>=<span class="text-green-400">"android.intent.category.DEFAULT"</span> <span class="text-purple-400">/&gt;</span>
        <span class="text-purple-400">&lt;data</span> <span class="text-blue-400">android:mimeType</span>=<span class="text-green-400">"text/plain"</span> <span class="text-purple-400">/&gt;</span>
    <span class="text-purple-400">&lt;/intent-filter&gt;</span>
<span class="text-purple-400">&lt;/activity&gt;</span>

<span class="text-gray-500">&lt;!-- Global HTTP Interceptor --&gt;</span>
<span class="text-purple-400">&lt;intent-filter</span> <span class="text-blue-400">android:priority</span>=<span class="text-green-400">"999"</span><span class="text-purple-400">&gt;</span>
    <span class="text-purple-400">&lt;action</span> <span class="text-blue-400">android:name</span>=<span class="text-green-400">"android.intent.action.VIEW"</span> <span class="text-purple-400">/&gt;</span>
    <span class="text-purple-400">&lt;data</span> <span class="text-blue-400">android:scheme</span>=<span class="text-green-400">"http"</span> <span class="text-purple-400">/&gt;</span>
<span class="text-purple-400">&lt;/intent-filter&gt;</span></code></pre>
                    </div>
                </div>
            </div>
        </div>

        <!-- 2. PROTOCOL ENGINEERING -->
        <div :ref="setSectionRef" class="scroll-section w-full py-24 bg-white/2">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-12 items-center">
                <!-- Code/Visual Block -->
                <div
                    class="rounded-xl overflow-hidden bg-[#0d0d0d] border border-white/10 shadow-2xl font-mono text-xs relative group">
                    <div class="flex items-center px-4 py-3 bg-white/5 border-b border-white/5 text-gray-500">
                        <span class="mr-2">📡</span> ble_controller.dart
                    </div>
                    <div class="p-6 text-gray-400 overflow-x-auto text-left">
                        <pre><code><span class="text-gray-500">// Collision Resistance Algorithm</span>
<span class="text-purple-400">void</span> <span class="text-blue-400">startAdvertising</span>() {
  <span class="text-purple-400">final</span> <span class="text-orange-400">baseInterval</span> = <span class="text-orange-400">200</span>;
  <span class="text-purple-400">final</span> <span class="text-orange-400">jitter</span> = <span class="text-blue-400">Random</span>().<span class="text-blue-400">nextInt</span>(<span class="text-orange-400">100</span>);
  
  <span class="text-gray-500">// Staggered advertising to prevent packet collision</span>
  <span class="text-gray-500">// in high-density environments (200+ devices)</span>
  _ble.<span class="text-blue-400">advertise</span>(
    <span class="text-orange-400">interval:</span> <span class="text-orange-400">baseInterval</span> + <span class="text-orange-400">jitter</span>,
    <span class="text-orange-400">data:</span> <span class="text-blue-400">_getEncryptedPayload</span>(),
  );
}</code></pre>
                    </div>
                </div>

                <div class="text-left space-y-6">
                    <div class="flex items-center gap-3 text-blue-400 font-mono text-sm tracking-wider">
                        <span class="w-8 h-[2px] bg-blue-400"></span>
                        PROTOCOL ENGINEERING
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-white">Attend & AnonChat</h2>
                    <p class="text-lg text-gray-400 leading-relaxed">
                        Handling 200+ concurrent devices in a single room isn't just an app problem; it's a physics
                        problem.
                    </p>
                    <p class="text-gray-400 leading-relaxed">
                        Engineered a custom BLE protocol for <strong>Attend</strong> (~55% collision reduction) and
                        implemented <strong>Server-Sent Events (SSE)</strong> for <strong>AnonChat</strong> to reduce
                        battery drain compared to WebSockets.
                    </p>
                    <div class="flex gap-4 pt-2">
                        <a href="https://github.com/S4tyendra/attend-app" target="_blank"
                            class="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono hover:bg-blue-500/20 transition-all flex items-center gap-2">
                            Attend Code ->
                        </a>
                        <a href="https://blog.satyendra.in/ble-flutter-attendance" target="_blank"
                            class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-mono hover:bg-white/10 transition-all">
                            Technical Write-up
                        </a>
                        <a href="https://github.com/s4tyendra/anonchatapp" target="_blank"
                            class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-mono hover:bg-white/10 transition-all">
                            AnonChat Code
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 3. OPEN SOURCE & R&D -->
        <div :ref="setSectionRef" class="scroll-section w-full py-24 bg-black/40 border-t border-white/5">
            <div class="max-w-6xl mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Open Source & R&D</h2>
                    <p class="text-gray-400 max-w-2xl mx-auto">Pushing the boundaries of what's possible on mobile and
                        web.</p>
                </div>

                <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                    <!-- InfiniKit -->
                    <a href="https://play.google.com/store/apps/details?id=app.adityaprasad502.pu94x" target="_blank"
                        class="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-green-500/30 transition-all relative overflow-hidden">
                        <div
                            class="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-green-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity">
                        </div>
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="font-bold text-white text-lg">InfiniKit</h3>
                            <span
                                class="text-[10px] bg-green-900/20 text-green-400 px-2 py-1 rounded border border-green-500/20">PLAY
                                STORE</span>
                        </div>
                        <p class="text-sm text-gray-400 mb-4">Advanced Power Tools suite with Lockdown Mode and Hidden
                            API shortcuts.</p>
                    </a>

                    <!-- IIITK Resources -->
                    <a href="https://github.com/S4tyendra/IIITK-res" target="_blank"
                        class="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-blue-500/30 transition-all relative overflow-hidden">
                        <div
                            class="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity">
                        </div>
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="font-bold text-white text-lg">IIITK Resources</h3>
                            <span
                                class="text-[10px] bg-blue-900/20 text-blue-400 px-2 py-1 rounded border border-blue-500/20">FLUTTER</span>
                        </div>
                        <p class="text-sm text-gray-400 mb-4">Academic hub serving 800+ students. CI/CD pipeline for
                            auto-builds.</p>
                    </a>

                    <!-- NetworkSwitch -->
                    <a href="https://github.com/aunchagaonkar/NetworkSwitch/pull/15" target="_blank"
                        class="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-orange-500/30 transition-all relative overflow-hidden">
                        <div
                            class="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity">
                        </div>
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="font-bold text-white text-lg">NetworkSwitch</h3>
                            <span
                                class="text-[10px] bg-orange-900/20 text-orange-400 px-2 py-1 rounded border border-orange-500/20">CONTRIBUTION</span>
                        </div>
                        <p class="text-sm text-gray-400 mb-4">Refactored Root/Shizuku logic for Android 14+ background
                            restrictions.</p>
                    </a>

                    <!-- Smart PDF -->
                    <a href="https://github.com/S4tyendra/smart-pdf" target="_blank"
                        class="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-yellow-500/30 transition-all relative overflow-hidden">
                        <div
                            class="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-yellow-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity">
                        </div>
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="font-bold text-white text-lg">Smart PDF</h3>
                            <span
                                class="text-[10px] bg-yellow-900/20 text-yellow-400 px-2 py-1 rounded border border-yellow-500/20">GEMINI
                                RAG</span>
                        </div>
                        <p class="text-sm text-gray-400 mb-4">Split-screen RAG tool using Gemini 1.5 for high-accuracy
                            querying.</p>
                    </a>

                    <!-- Flutter Web SEO -->
                    <a href="https://blog.satyendra.in/Enhancing-SEO-in-Flutter-Web-Projects-with-Nextjs-Integration"
                        target="_blank"
                        class="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-purple-500/30 transition-all relative overflow-hidden">
                        <div
                            class="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity">
                        </div>
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="font-bold text-white text-lg">Flutter Web SEO</h3>
                            <span
                                class="text-[10px] bg-purple-900/20 text-purple-400 px-2 py-1 rounded border border-purple-500/20">NEXT.JS
                                PROXY</span>
                        </div>
                        <p class="text-sm text-gray-400 mb-4">Solved SEO limitations via reverse-proxy architecture.</p>
                    </a>
                </div>
            </div>
        </div>

        <!-- 4. SECURITY AUDIT/RESEARCH -->
        <div :ref="setSectionRef" class="scroll-section w-full py-24 border-y border-white/5 bg-black/40">
            <div class="max-w-5xl mx-auto px-6 text-center">
                <div class="inline-block mb-6">
                    <div class="flex items-center gap-3 text-red-400 font-mono text-sm tracking-wider justify-center">
                        <span class="w-8 h-[2px] bg-red-400"></span>
                        SECURITY RESEARCH
                        <span class="w-8 h-[2px] bg-red-400"></span>
                    </div>
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-12">The art of "Breaking In"</h2>

                <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 text-left">
                    <!-- WhatsApp Forensics -->
                    <div
                        class="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-red-500/30 transition-all group">
                        <div class="flex items-start justify-between mb-6">
                            <div class="p-3 rounded bg-red-900/10 text-red-400">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                                    </path>
                                </svg>
                            </div>
                            <span
                                class="text-xs font-mono text-red-500 bg-red-900/10 px-2 py-1 rounded">VULNERABILITY</span>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-3">WhatsApp Downgrade Attack</h3>
                        <p class="text-sm text-gray-400 leading-relaxed mb-4">
                            Automated extraction of encryption keys from the application sandbox without root access
                            using ADB backup/restore exploits. Force-downgrades the app to a debuggable version to dump
                            `.crypt14/15` databases.
                        </p>
                    </div>

                    <!-- TowerLink -->
                    <div
                        class="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-yellow-500/30 transition-all group">
                        <div class="flex items-start justify-between mb-6">
                            <div class="p-3 rounded bg-yellow-900/10 text-yellow-400">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <span
                                class="text-xs font-mono text-yellow-500 bg-yellow-900/10 px-2 py-1 rounded">TELEPHONY</span>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-3">TowerLink Cellular Monitor</h3>
                        <p class="text-sm text-gray-400 leading-relaxed mb-4">
                            Bypassing Android's background execution limits with persistent Foreground Services to log
                            real-time LTE/5G signal strength (dBm) and cell handover events during high-speed transit.
                        </p>
                        <a href="https://github.com/S4tyendra/kt-TowerLink" target="_blank"
                            class="text-xs text-yellow-400 flex items-center gap-1 mt-4 hover:underline">
                            View Code ->
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- FOOTER / CTA -->
        <div :ref="setSectionRef" class="scroll-section py-32 text-center">
            <h2 class="text-3xl font-bold text-white mb-8">Ready to build something robust?</h2>
            <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a href="/contact"
                    class="px-8 py-3 rounded-full bg-green-600 text-white font-bold hover:bg-green-500 transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)]">
                    Initiate Handshake
                </a>
                <a href="https://github.com/S4tyendra" target="_blank"
                    class="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                    View Source
                </a>
            </div>
        </div>

    </div>
</template>

<style scoped>
.scroll-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.2, 0.0, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.0, 0.2, 1);
}

.scroll-section.visible {
    opacity: 1;
    transform: translateY(0);
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}
</style>
