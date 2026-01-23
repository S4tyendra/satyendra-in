<script setup>
import { useHead } from '@vueuse/head'
import ShieldIcon from '../components/icons/ShieldIcon.vue'
import { ref, onMounted } from 'vue'

useHead({
    title: 'DevSecOps & Cloud | Satyendra',
    meta: [
        { name: 'description', content: 'Advanced DevSecOps: Kernel-level security, Infrastructure as Code, and High-Performance Orchestration.' },
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
    }, { threshold: 0.15 })

    sections.value.forEach(section => {
        if (section) observer.observe(section)
    })
})

const setSectionRef = (el) => {
    if (el) sections.value.push(el)
}
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-[70vh] text-center relative overflow-hidden w-full">
        <!-- Background Elements -->
        <div class="fixed inset-0 pointer-events-none z-0">
            <div
                class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-900/10 rounded-full blur-[100px] opacity-30 animate-pulse">
            </div>
            <div
                class="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px] opacity-30 animate-pulse delay-700">
            </div>
        </div>

        <!-- HERO SECTION -->
        <div class="relative z-10 py-20 px-6 max-w-5xl mx-auto w-full">
            <div class="relative mb-8 group inline-block">
                <div
                    class="absolute inset-0 bg-teal-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-50">
                </div>
                <div
                    class="relative p-4 rounded-2xl bg-bg-main/40 border border-white/10 shadow-2xl backdrop-blur-sm animate-float">
                    <ShieldIcon
                        class="w-12 h-12 text-teal-200/80 group-hover:text-teal-400 transition-colors duration-500" />
                </div>
            </div>

            <h1
                class="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-transparent bg-clip-text bg-linear-to-br from-teal-50 to-teal-400/60 pb-2">
                DevSecOps
            </h1>

            <div class="relative mb-20 max-w-3xl mx-auto">
                <p class="text-lg md:text-xl font-light text-text-muted italic leading-relaxed">
                    Security is not a checkbox,<br class="md:hidden" /> it's a culture.
                </p>
                <div class="absolute -top-4 -left-4 text-5xl text-teal-500/10 font-serif font-black">"</div>
                <div class="absolute -bottom-4 -right-4 text-5xl text-teal-500/10 font-serif font-black">"</div>
            </div>

            <!-- SECTION 1: CORE TRIAD -->
            <div :ref="setSectionRef"
                class="scroll-section grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 w-full text-left">
                <!-- Proactive Defense -->
                <div
                    class="p-8 rounded-2xl bg-bg-main/50 border border-white/5 hover:border-teal-500/30 hover:bg-white/5 transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" class="text-teal-400">
                            <path stroke="currentColor" stroke-width="2"
                                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <div
                        class="mb-4 text-teal-400 font-mono text-xs tracking-widest uppercase bg-teal-900/30 w-fit px-3 py-1 rounded-full border border-teal-500/20">
                        01. Shield</div>
                    <h3 class="text-2xl font-bold text-text-main mb-3">Defensive Architecture</h3>
                    <p class="text-base text-text-muted leading-relaxed">
                        Shift-left security integration. Vulnerabilities are caught during architecture and code phases,
                        not after deployment.
                    </p>
                </div>

                <!-- Automation -->
                <div
                    class="p-8 rounded-2xl bg-bg-main/50 border border-white/5 hover:border-teal-500/30 hover:bg-white/5 transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" class="text-teal-400">
                            <path stroke="currentColor" stroke-width="2"
                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline stroke="currentColor" stroke-width="2" points="14 2 14 8 20 8" />
                            <path stroke="currentColor" stroke-width="2" d="M16 13H8" />
                            <path stroke="currentColor" stroke-width="2" d="M16 17H8" />
                            <path stroke="currentColor" stroke-width="2" d="M10 9H8" />
                        </svg>
                    </div>
                    <div
                        class="mb-4 text-teal-400 font-mono text-xs tracking-widest uppercase bg-teal-900/30 w-fit px-3 py-1 rounded-full border border-teal-500/20">
                        02. Pipeline</div>
                    <h3 class="text-2xl font-bold text-text-main mb-3">CI/CD Governance</h3>
                    <p class="text-base text-text-muted leading-relaxed">
                        Automated policy enforcement. Every commit undergoes rigorous auditing, SAST/DAST, and
                        regression testing.
                    </p>
                </div>

                <!-- Resilience -->
                <div
                    class="p-8 rounded-2xl bg-bg-main/50 border border-white/5 hover:border-teal-500/30 hover:bg-white/5 transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" class="text-teal-400">
                            <path stroke="currentColor" stroke-width="2"
                                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div
                        class="mb-4 text-teal-400 font-mono text-xs tracking-widest uppercase bg-teal-900/30 w-fit px-3 py-1 rounded-full border border-teal-500/20">
                        03. Scale</div>
                    <h3 class="text-2xl font-bold text-text-main mb-3">Immutable Infra</h3>
                    <p class="text-base text-text-muted leading-relaxed">
                        Drift detection and zero-trust orchestration. Infrastructure regenerates rather than repairs.
                    </p>
                </div>
            </div>
        </div>

        <!-- SECTION 2: KERNEL & SECURITY DEEP DIVE -->
        <div :ref="setSectionRef"
            class="scroll-section w-full bg-white/5 border-y border-white/5 py-24 relative overflow-hidden backdrop-blur-sm">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div class="text-left space-y-6">
                    <div class="flex items-center gap-3 text-teal-400 font-mono text-sm tracking-wider">
                        <span class="w-8 h-[2px] bg-teal-400"></span>
                        KERNEL LEVEL VISIBILITY
                    </div>
                    <h2 class="text-4xl font-bold text-text-main">eBPF & Runtime Security</h2>
                    <p class="text-lg text-text-muted leading-relaxed">
                        Implementing security observability at the kernel layer using <strong
                            class="text-teal-300">Tetragon</strong> and <strong class="text-teal-300">Falco</strong>.
                        We move beyond simple log parsing to enforce policies directly on syscalls.
                    </p>
                    <ul class="space-y-4 pt-4">
                        <li class="flex items-center gap-4 text-text-muted">
                            <span
                                class="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></span>
                            Real-time syscall tracing & enforcement
                        </li>
                        <li class="flex items-center gap-4 text-text-muted">
                            <span
                                class="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></span>
                            CVE Database Integration (Trivy/Grype)
                        </li>
                        <li class="flex items-center gap-4 text-text-muted">
                            <span
                                class="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></span>
                            Container Hardening (Distroless/Chainguard)
                        </li>
                    </ul>
                </div>

                <!-- MOCK TERMINAL UI -->
                <div
                    class="rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl font-mono text-sm text-left">
                    <div class="bg-white/5 px-4 py-2 border-b border-white/5 flex gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
                        <div class="ml-4 text-xs text-text-muted opacity-50">tetragon-monitor — -zsh — 80x24</div>
                    </div>
                    <div class="p-6 space-y-2 text-gray-300">
                        <div class="flex gap-2"><span class="text-green-400">➜</span> <span
                                class="text-blue-400">~</span> tetra getevents -o compact</div>
                        <div class="opacity-50 text-xs py-1">Thinking...</div>
                        <div><span class="text-teal-500">🚀 process_exec</span> /usr/bin/curl <span
                                class="text-gray-500">parent:</span> nginx</div>
                        <div><span class="text-red-400">🛑 syscall_reject</span> open /etc/shadow <span
                                class="text-gray-500">process:</span> malware</div>
                        <div><span class="text-yellow-400">⚠️ k8s_audit</span> Pod: payment-service <span
                                class="text-gray-500">User:</span> system:serviceaccount</div>
                        <div class="text-teal-500 animate-pulse">_</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 3: ORCHESTRATION & OPTIMIZATION -->
        <div :ref="setSectionRef" class="scroll-section py-24 px-6 max-w-6xl mx-auto w-full">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4">Orchestration & Performance</h2>
                <p class="text-text-muted max-w-2xl mx-auto">Optimizing output under extreme load conditions.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <!-- Feature 1 -->
                <div
                    class="group p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-teal-500/30 transition-all">
                    <div
                        class="h-12 w-12 rounded-lg bg-teal-900/40 flex items-center justify-center mb-6 text-teal-400">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="stroke-current stroke-2">
                            <path d="M4 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                            <path d="M12 14v7" />
                            <path d="M9.3 21h5.3" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Traffic Management</h3>
                    <p class="text-sm text-text-muted leading-relaxed">
                        Advanced load balancing with Envoy/Istio. Circuit breaking and rate limiting to prevent
                        cascading failures.
                    </p>
                </div>

                <!-- Feature 2 -->
                <div
                    class="group p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-teal-500/30 transition-all">
                    <div
                        class="h-12 w-12 rounded-lg bg-teal-900/40 flex items-center justify-center mb-6 text-teal-400">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="stroke-current stroke-2">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Kubernetes Tuning</h3>
                    <p class="text-sm text-text-muted leading-relaxed">
                        HPA/VPA scaling policies. Resource quota enforcement and node affinity optimization for
                        bandwidth heavy workloads.
                    </p>
                </div>

                <!-- Feature 3 -->
                <div
                    class="group p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-teal-500/30 transition-all">
                    <div
                        class="h-12 w-12 rounded-lg bg-teal-900/40 flex items-center justify-center mb-6 text-teal-400">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="stroke-current stroke-2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Cloud Agnostic</h3>
                    <p class="text-sm text-text-muted leading-relaxed">
                        Deployments across AWS, GCP, and bare-metal VPS. Unified control plane using Crossplane and
                        Anthos.
                    </p>
                </div>
            </div>
        </div>

        <!-- SECTION 4: INFRASTRUCTURE CODE -->
        <div :ref="setSectionRef" class="scroll-section w-full py-24 bg-black/20 border-t border-white/5">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <!-- CODE BLOCK -->
                <div
                    class="order-2 lg:order-1 rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-xl font-mono text-xs">
                    <div class="flex items-center px-4 py-3 bg-white/5 border-b border-white/5 text-text-muted">
                        <span class="mr-2">📄</span> main.tf
                    </div>
                    <div class="p-6 text-gray-400 overflow-x-auto text-left">
                        <pre><code><span class="text-purple-400">resource</span> <span class="text-green-400">"aws_security_group"</span> <span class="text-blue-400">"allow_tls"</span> {
  <span class="text-purple-400">name</span>        = <span class="text-green-400">"allow_tls"</span>
  <span class="text-purple-400">description</span> = <span class="text-green-400">"Allow TLS inbound traffic"</span>
  
  <span class="text-purple-400">ingress</span> {
    <span class="text-purple-400">from_port</span>   = <span class="text-orange-400">443</span>
    <span class="text-purple-400">to_port</span>     = <span class="text-orange-400">443</span>
    <span class="text-purple-400">protocol</span>    = <span class="text-green-400">"tcp"</span>
    <span class="text-purple-400">cidr_blocks</span> = [<span class="text-green-400">"0.0.0.0/0"</span>]
  }

  <span class="text-gray-500">// Automated Drift Detection Enabled</span>
}</code></pre>
                    </div>
                </div>

                <!-- TEXT -->
                <div class="order-1 lg:order-2 text-left space-y-6">
                    <div class="flex items-center gap-3 text-teal-400 font-mono text-sm tracking-wider">
                        <span class="w-8 h-[2px] bg-teal-400"></span>
                        INFRASTRUCTURE AS CODE
                    </div>
                    <h2 class="text-4xl font-bold text-text-main">Automated Provisioning</h2>
                    <p class="text-lg text-text-muted leading-relaxed">
                        Managing infrastructure complexity with <strong class="text-teal-300">Terraform</strong> and
                        <strong class="text-teal-300">Ansible</strong>.
                        We treat servers like cattle, not pets.
                    </p>
                    <ul class="space-y-4 pt-4">
                        <li class="flex items-center gap-4 text-text-muted">
                            <div class="p-2 rounded bg-white/5"><svg width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2">
                                    <path
                                        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                </svg></div>
                            <div>
                                <div class="text-text-main font-bold">State Management</div>
                                <div class="text-sm">Remote backends with locking & encryption</div>
                            </div>
                        </li>
                        <li class="flex items-center gap-4 text-text-muted">
                            <div class="p-2 rounded bg-white/5"><svg width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2">
                                    <path
                                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                    <line x1="12" y1="22.08" x2="12" y2="12" />
                                </svg></div>
                            <div>
                                <div class="text-text-main font-bold">Multi-Cloud Modules</div>
                                <div class="text-sm">Standardized blueprints for AWS, GCP & VPS</div>
                            </div>
                        </li>

                    </ul>
                </div>
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
