<script setup>
import { useHead } from '@vueuse/head'
import { ref, onMounted } from 'vue'

useHead({
    title: 'Mobile Architecture & Android Systems | Satyendra',
    meta: [
        { name: 'description', content: 'Advanced Android Systems Engineering, Flutter Architecture, and Security Research by Satyendra. Building performant, secure, and resilient mobile experiences.' },
        { name: 'keywords', content: 'Android, Kotlin, Flutter, NDK, Security, Reverse Engineering, BLE, Systems Programming, Bongi Satyendra' },
        { property: 'og:title', content: 'Mobile Systems Engineering | Satyendra' },
        { property: 'og:description', content: 'Architecting the bridge between silicon and soul. Android internals, Flutter performance, and security research.' },
        { property: 'og:image', content: 'https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/android-flutter.png' },
        { property: 'og:url', content: 'https://satyendra.in/mobile' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
        { rel: 'canonical', href: 'https://satyendra.in/mobile' }
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
    <div class="flex flex-col items-center justify-center min-h-screen text-center relative overflow-hidden w-full">
        <!-- Enhanced Background -->
        <div class="fixed inset-0 pointer-events-none z-0">
            <!-- Animated Orbs -->
            <div
                class="absolute top-[10%] right-[15%] w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[100px] animate-blob">
            </div>
            <div
                class="absolute top-[50%] left-[10%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] animate-blob animation-delay-2000">
            </div>
            <div
                class="absolute bottom-[10%] right-[20%] w-[350px] h-[350px] bg-green-600/10 rounded-full blur-[90px] animate-blob animation-delay-4000">
            </div>

            <!-- Grid -->
            <div
                class="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
            </div>
        </div>

        <!-- HERO SECTION -->
        <div class="relative z-10 pt-28 pb-16 px-6 max-w-5xl mx-auto w-full">
            <!-- Floating Icon -->
            <div class="relative mb-8 group inline-block">
                <div
                    class="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-green-600/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 scale-150">
                </div>
                <div
                    class="relative p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl shadow-2xl animate-float">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="w-14 h-14 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M12 2a2 2 0 0 1 2 2v2h-4V4a2 2 0 0 1 2-2z" />
                        <rect x="5" y="6" width="14" height="16" rx="2" />
                        <line x1="9" y1="11" x2="9" y2="13" />
                        <line x1="15" y1="11" x2="15" y2="13" />
                    </svg>
                </div>
            </div>

            <h1 class="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                <span class="text-white">Mobile </span>
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 animate-gradient-x">Architect</span>
            </h1>

            <div class="relative mb-20 max-w-2xl mx-auto">
                <p class="text-lg md:text-xl font-light text-gray-400 leading-relaxed font-mono">
                    > Systems Engineering <span class="text-emerald-400">//</span> Kernel Interactions <span
                        class="text-emerald-400">//</span> Cross-Platform
                </p>
                <div class="mt-10 flex justify-center gap-4 flex-wrap">
                    <a href="https://github.com/S4tyendra" target="_blank"
                        class="group px-6 py-3 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 font-mono text-sm flex items-center gap-3 hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span class="group-hover:tracking-wider transition-all">github.com/S4tyendra</span>
                    </a>
                </div>
            </div>

            <!-- SKILLS MATRIX -->
            <div :ref="setSectionRef"
                class="scroll-section grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 w-full text-left">
                <!-- Android Native -->
                <div
                    class="skill-card group p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 hover:border-emerald-500/40 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden backdrop-blur-sm">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div
                        class="absolute -right-8 -top-8 opacity-5 group-hover:opacity-15 transition-opacity duration-500">
                        <svg class="w-40 h-40 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M17.523 15.3414C17.523 16.7118 16.4026 17.8229 15.0205 17.8229C13.6384 17.8229 12.5173 16.7118 12.5173 15.3414C12.5173 13.9717 13.6384 12.8605 15.0205 12.8605C16.4026 12.8605 17.523 13.9717 17.523 15.3414Z" />
                        </svg>
                    </div>
                    <div class="relative z-10">
                        <div
                            class="mb-5 text-emerald-400 font-mono text-[10px] tracking-[0.2em] uppercase bg-emerald-900/30 w-fit px-3 py-1.5 rounded-full border border-emerald-500/20 shimmer-badge">
                            NATIVE</div>
                        <h3 class="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                            Android Internals</h3>
                        <p class="text-sm text-gray-400 leading-relaxed mb-5">Deep diving into the OS. Root/Shizuku
                            privileges, NDK integration, and hidden API exploitation.</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="tag">Smali</span>
                            <span class="tag">Broadcasts</span>
                            <span class="tag">TelephonyManager</span>
                        </div>
                    </div>
                </div>

                <!-- Flutter -->
                <div
                    class="skill-card group p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden backdrop-blur-sm">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div class="relative z-10">
                        <div
                            class="mb-5 text-cyan-400 font-mono text-[10px] tracking-[0.2em] uppercase bg-cyan-900/30 w-fit px-3 py-1.5 rounded-full border border-cyan-500/20">
                            CROSS-PLATFORM</div>
                        <h3 class="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                            Flutter Architecture</h3>
                        <p class="text-sm text-gray-400 leading-relaxed mb-5">Building pixel-perfect interfaces at
                            120fps. Method channels, FFI, and complex state management.</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="tag">RenderObjects</span>
                            <span class="tag">FFI</span>
                            <span class="tag">Isolates</span>
                        </div>
                    </div>
                </div>

                <!-- Security -->
                <div
                    class="skill-card group p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 hover:border-red-500/40 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden backdrop-blur-sm">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div class="relative z-10">
                        <div
                            class="mb-5 text-red-400 font-mono text-[10px] tracking-[0.2em] uppercase bg-red-900/30 w-fit px-3 py-1.5 rounded-full border border-red-500/20">
                            OFFENSIVE</div>
                        <h3 class="text-xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">Mobile
                            Security</h3>
                        <p class="text-sm text-gray-400 leading-relaxed mb-5">Analyzing attack surfaces. Intent
                            interception, downgrade attacks, and forensic data recovery.</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="tag">Burp Suite</span>
                            <span class="tag">ADB</span>
                            <span class="tag">Reverse Eng</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SYSTEM INTERCEPTION -->
        <div :ref="setSectionRef"
            class="scroll-section w-full py-24 border-t border-white/5 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-12 items-center">
                <div class="text-left space-y-6 order-2 lg:order-1">
                    <div class="flex items-center gap-3 text-emerald-400 font-mono text-sm tracking-wider">
                        <span class="w-10 h-[2px] bg-gradient-to-r from-emerald-400 to-transparent"></span>
                        SYSTEM INTERCEPTION
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-white">Ai-Eze & Intent Hooks</h2>
                    <p class="text-lg text-gray-400 leading-relaxed">
                        Why open an app when the system can do it for you? <strong
                            class="text-emerald-300">Ai-Eze</strong> hooks directly into the Android <code
                            class="text-xs bg-white/10 px-2 py-0.5 rounded">PROCESS_TEXT</code> intent.
                    </p>
                    <ul class="space-y-5 pt-4">
                        <li class="flex items-start gap-4 text-gray-400 group/item">
                            <div
                                class="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.6)] group-hover/item:scale-125 transition-transform">
                            </div>
                            <div>
                                <strong class="text-white block mb-1">Context Menu Integration</strong>
                                <span class="text-sm">Select text -> "Ai-Eze" -> Instant Summary/Translation.</span>
                                <a href="https://github.com/S4tyendra/Ai-Eze" target="_blank"
                                    class="text-xs text-emerald-400 flex items-center gap-1 mt-2 hover:underline opacity-80 hover:opacity-100">View
                                    Source →</a>
                            </div>
                        </li>
                        <li class="flex items-start gap-4 text-gray-400 group/item">
                            <div
                                class="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.6)] group-hover/item:scale-125 transition-transform">
                            </div>
                            <div>
                                <strong class="text-white block mb-1">URL Check Interceptor</strong>
                                <span class="text-sm">Catches all <code class="text-xs">http://</code> intents to
                                    prevent malicious clicks.</span>
                                <div class="flex gap-3 mt-2">
                                    <a href="https://github.com/S4tyendra/URL-Check" target="_blank"
                                        class="text-xs text-emerald-400 hover:underline">Code</a>
                                    <span class="text-white/20">|</span>
                                    <a href="https://github.com/S4tyendra/MessMenuApk" target="_blank"
                                        class="text-xs text-emerald-400 hover:underline">MessMenu</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Code Block -->
                <div
                    class="order-1 lg:order-2 code-window rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl shadow-emerald-900/10 font-mono text-xs relative group">
                    <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-25 transition-opacity">
                        <span class="text-emerald-500 font-black text-7xl">}</span>
                    </div>
                    <div class="flex items-center px-4 py-3 bg-white/5 border-b border-white/5">
                        <div class="flex gap-1.5">
                            <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
                            <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
                            <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
                        </div>
                        <span class="ml-4 text-gray-500 text-xs">AndroidManifest.xml</span>
                    </div>
                    <div class="p-6 text-gray-400 overflow-x-auto text-left">
                        <pre class="leading-6"><code><span class="text-purple-400">&lt;activity</span> <span class="text-cyan-400">android:name</span>=<span class="text-emerald-400">".ProcessTextActivity"</span><span class="text-purple-400">&gt;</span>
    <span class="text-purple-400">&lt;intent-filter&gt;</span>
        <span class="text-purple-400">&lt;action</span> <span class="text-cyan-400">android:name</span>=<span class="text-emerald-400">"android.intent.action.PROCESS_TEXT"</span> <span class="text-purple-400">/&gt;</span>
        <span class="text-purple-400">&lt;category</span> <span class="text-cyan-400">android:name</span>=<span class="text-emerald-400">"android.intent.category.DEFAULT"</span> <span class="text-purple-400">/&gt;</span>
        <span class="text-purple-400">&lt;data</span> <span class="text-cyan-400">android:mimeType</span>=<span class="text-emerald-400">"text/plain"</span> <span class="text-purple-400">/&gt;</span>
    <span class="text-purple-400">&lt;/intent-filter&gt;</span>
<span class="text-purple-400">&lt;/activity&gt;</span></code></pre>
                    </div>
                </div>
            </div>
        </div>

        <!-- PROTOCOL ENGINEERING -->
        <div :ref="setSectionRef" class="scroll-section w-full py-24 bg-gradient-to-b from-white/[0.02] to-transparent">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-12 items-center">
                <!-- Code Block -->
                <div
                    class="code-window rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl shadow-cyan-900/10 font-mono text-xs">
                    <div class="flex items-center px-4 py-3 bg-white/5 border-b border-white/5">
                        <div class="flex gap-1.5">
                            <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
                            <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
                            <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
                        </div>
                        <span class="ml-4 text-gray-500 text-xs">📡 ble_controller.dart</span>
                    </div>
                    <div class="p-6 text-gray-400 overflow-x-auto text-left">
                        <pre class="leading-6"><code><span class="text-gray-500">// Collision Resistance Algorithm</span>
<span class="text-purple-400">void</span> <span class="text-cyan-400">startAdvertising</span>() {
  <span class="text-purple-400">final</span> <span class="text-orange-400">baseInterval</span> = <span class="text-orange-400">200</span>;
  <span class="text-purple-400">final</span> <span class="text-orange-400">jitter</span> = <span class="text-cyan-400">Random</span>().<span class="text-cyan-400">nextInt</span>(<span class="text-orange-400">100</span>);
  
  <span class="text-gray-500">// Staggered advertising prevents</span>
  <span class="text-gray-500">// packet collision in 200+ device environments</span>
  _ble.<span class="text-cyan-400">advertise</span>(
    <span class="text-orange-400">interval:</span> <span class="text-orange-400">baseInterval</span> + <span class="text-orange-400">jitter</span>,
    <span class="text-orange-400">data:</span> <span class="text-cyan-400">_getEncryptedPayload</span>(),
  );
}</code></pre>
                    </div>
                </div>

                <div class="text-left space-y-6">
                    <div class="flex items-center gap-3 text-cyan-400 font-mono text-sm tracking-wider">
                        <span class="w-10 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent"></span>
                        PROTOCOL ENGINEERING
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-white">Attend & AnonChat</h2>
                    <p class="text-lg text-gray-400 leading-relaxed">
                        Handling <strong class="text-cyan-300">200+</strong> concurrent devices isn't just an app
                        problem; it's a physics problem.
                    </p>
                    <p class="text-gray-400 leading-relaxed">
                        Engineered a custom BLE protocol achieving <strong class="text-cyan-300">~55% collision
                            reduction</strong> and implemented <strong>SSE</strong> for battery-efficient real-time
                        updates.
                    </p>
                    <div class="flex gap-3 pt-4 flex-wrap">
                        <a href="https://github.com/S4tyendra/attend-app" target="_blank"
                            class="btn-outline border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">Attend Code →</a>
                        <a href="https://blog.satyendra.in/ble-flutter-attendance" target="_blank"
                            class="btn-outline">Write-up</a>
                        <a href="https://github.com/s4tyendra/anonchatapp" target="_blank"
                            class="btn-outline">AnonChat</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- OPEN SOURCE & R&D -->
        <div :ref="setSectionRef" class="scroll-section w-full py-24 bg-black/30 border-y border-white/5">
            <div class="max-w-6xl mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Open Source & R&D</h2>
                    <p class="text-gray-400 max-w-2xl mx-auto">Pushing boundaries on mobile and web.</p>
                </div>

                <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
                    <a href="https://play.google.com/store/apps/details?id=app.adityaprasad502.pu94x" target="_blank"
                        class="project-card group border-emerald-500/20 hover:border-emerald-500/50">
                        <div class="glow-bar bg-emerald-500"></div>
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="font-bold text-white text-lg group-hover:text-emerald-400 transition-colors">
                                InfiniKit</h3>
                            <span class="badge bg-emerald-900/30 text-emerald-400 border-emerald-500/20">PLAY
                                STORE</span>
                        </div>
                        <p class="text-sm text-gray-400">Advanced Power Tools with Lockdown Mode and Hidden API
                            shortcuts.</p>
                    </a>

                    <a href="https://github.com/S4tyendra/IIITK-res" target="_blank"
                        class="project-card group border-cyan-500/20 hover:border-cyan-500/50">
                        <div class="glow-bar bg-cyan-500"></div>
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">IIITK
                                Resources</h3>
                            <span class="badge bg-cyan-900/30 text-cyan-400 border-cyan-500/20">FLUTTER</span>
                        </div>
                        <p class="text-sm text-gray-400">Academic hub serving 800+ students with CI/CD auto-builds.</p>
                    </a>

                    <a href="https://github.com/aunchagaonkar/NetworkSwitch/pull/15" target="_blank"
                        class="project-card group border-orange-500/20 hover:border-orange-500/50">
                        <div class="glow-bar bg-orange-500"></div>
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="font-bold text-white text-lg group-hover:text-orange-400 transition-colors">
                                NetworkSwitch</h3>
                            <span
                                class="badge bg-orange-900/30 text-orange-400 border-orange-500/20">CONTRIBUTION</span>
                        </div>
                        <p class="text-sm text-gray-400">Refactored Root/Shizuku logic for Android 14+ restrictions.</p>
                    </a>

                    <a href="https://github.com/S4tyendra/smart-pdf" target="_blank"
                        class="project-card group border-yellow-500/20 hover:border-yellow-500/50">
                        <div class="glow-bar bg-yellow-500"></div>
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="font-bold text-white text-lg group-hover:text-yellow-400 transition-colors">Smart
                                PDF</h3>
                            <span class="badge bg-yellow-900/30 text-yellow-400 border-yellow-500/20">GEMINI RAG</span>
                        </div>
                        <p class="text-sm text-gray-400">Split-screen RAG tool for high-accuracy document querying.</p>
                    </a>

                    <a href="https://blog.satyendra.in/Enhancing-SEO-in-Flutter-Web-Projects-with-Nextjs-Integration"
                        target="_blank" class="project-card group border-purple-500/20 hover:border-purple-500/50">
                        <div class="glow-bar bg-purple-500"></div>
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="font-bold text-white text-lg group-hover:text-purple-400 transition-colors">
                                Flutter Web SEO</h3>
                            <span class="badge bg-purple-900/30 text-purple-400 border-purple-500/20">NEXT.JS
                                PROXY</span>
                        </div>
                        <p class="text-sm text-gray-400">Solved SEO limitations via reverse-proxy architecture.</p>
                    </a>
                </div>
            </div>
        </div>

        <!-- SECURITY RESEARCH -->
        <div :ref="setSectionRef" class="scroll-section w-full py-24 border-b border-white/5">
            <div class="max-w-5xl mx-auto px-6 text-center">
                <div
                    class="inline-flex items-center gap-3 text-red-400 font-mono text-sm tracking-wider justify-center mb-6">
                    <span class="w-10 h-[2px] bg-gradient-to-r from-transparent to-red-400"></span>
                    SECURITY RESEARCH
                    <span class="w-10 h-[2px] bg-gradient-to-l from-transparent to-red-400"></span>
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-12">The art of "Breaking In"</h2>

                <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 text-left">
                    <div
                        class="security-card group p-7 rounded-2xl bg-gradient-to-br from-red-950/20 to-transparent border border-white/10 hover:border-red-500/40 transition-all">
                        <div class="flex items-start justify-between mb-5">
                            <div class="p-3 rounded-xl bg-red-900/20 text-red-400 border border-red-500/20">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                                    </path>
                                </svg>
                            </div>
                            <span
                                class="text-[10px] font-mono text-red-500 bg-red-900/20 px-2.5 py-1 rounded border border-red-500/20">VULNERABILITY</span>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                            WhatsApp Downgrade Attack</h3>
                        <p class="text-sm text-gray-400 leading-relaxed">
                            Automated extraction of encryption keys using ADB backup/restore exploits. Force-downgrades
                            to a debuggable version to dump <code
                                class="text-xs bg-white/10 px-1 rounded">.crypt14/15</code> databases.
                        </p>
                    </div>

                    <div
                        class="security-card group p-7 rounded-2xl bg-gradient-to-br from-yellow-950/20 to-transparent border border-white/10 hover:border-yellow-500/40 transition-all">
                        <div class="flex items-start justify-between mb-5">
                            <div class="p-3 rounded-xl bg-yellow-900/20 text-yellow-400 border border-yellow-500/20">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <span
                                class="text-[10px] font-mono text-yellow-500 bg-yellow-900/20 px-2.5 py-1 rounded border border-yellow-500/20">TELEPHONY</span>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                            TowerLink Cellular Monitor</h3>
                        <p class="text-sm text-gray-400 leading-relaxed mb-4">
                            Bypassing Android's background execution limits with persistent Foreground Services to log
                            real-time LTE/5G signal strength and cell handover events.
                        </p>
                        <a href="https://github.com/S4tyendra/kt-TowerLink" target="_blank"
                            class="text-xs text-yellow-400 flex items-center gap-1 hover:underline">View Code →</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- FOOTER / CTA -->
        <div :ref="setSectionRef" class="scroll-section py-28 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">Ready to build something robust?</h2>
            <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a href="/contact" class="cta-primary">
                    <span>Initiate Handshake</span>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
                <a href="https://github.com/S4tyendra" target="_blank" class="btn-outline">View Source</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scroll-section {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.9s cubic-bezier(0.2, 0, 0.2, 1), transform 0.9s cubic-bezier(0.2, 0, 0.2, 1);
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
        transform: translateY(-12px);
    }
}

.animate-gradient-x {
    background-size: 200% auto;
    animation: gradient-x 4s ease infinite;
}

@keyframes gradient-x {

    0%,
    100% {
        background-position: 0% center;
    }

    50% {
        background-position: 100% center;
    }
}

.tag {
    font-size: 10px;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.25rem 0.625rem;
    border-radius: 0.375rem;
    color: #d1d5db;
    transition: background-color 0.15s ease;
}

.tag:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.badge {
    font-size: 10px;
    padding: 0.25rem 0.625rem;
    border-radius: 0.375rem;
    border-width: 1px;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.btn-outline {
    padding: 0.625rem 1.25rem;
    border-radius: 0.75rem;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #d1d5db;
    font-size: 0.875rem;
    font-family: var(--font-mono);
    transition: all 0.15s ease;
}

.btn-outline:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
}

.project-card {
    padding: 1.5rem;
    border-radius: 1rem;
    background-color: #0a0a0a;
    border-width: 1px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.project-card:hover {
    transform: translateY(-0.25rem);
}

.project-card .glow-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    opacity: 0.4;
    transition: opacity 0.15s ease;
}

.project-card:hover .glow-bar {
    opacity: 1;
}

.cta-primary {
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    background: linear-gradient(to right, #059669, #16a34a);
    color: white;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s ease;
}

.cta-primary:hover {
    box-shadow: 0 0 40px rgba(52, 211, 153, 0.3);
    transform: scale(1.05);
}

.code-window {
    transition: all 0.3s ease;
}

.code-window:hover {
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.5);
}

.shimmer-badge {
    position: relative;
    overflow: hidden;
}

.shimmer-badge::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: shimmer 3s infinite;
}

@keyframes shimmer {
    100% {
        left: 100%;
    }
}
</style>
