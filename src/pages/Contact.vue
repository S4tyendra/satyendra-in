<script setup>
import { useHead } from '@vueuse/head'
import { ref, onMounted } from 'vue'

useHead({
    title: 'Contact | Satyendra',
    meta: [
        { name: 'description', content: 'Get in touch with Satyendra for collaborations, hiring, or just to say hello.' },
        { property: 'og:title', content: 'Contact | Satyendra' },
        { property: 'og:description', content: 'Reach out via email, LinkedIn, GitHub, or WhatsApp.' },
        { property: 'og:url', content: 'https://satyendra.in/contact' },
        { property: 'og:image', content: 'https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/contact.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
        { rel: 'canonical', href: 'https://satyendra.in/contact' }
    ]
})

const terminalLines = ref([])
const typingComplete = ref(false)
const hoveredCard = ref(null)

const contactData = {
    greet: [
        { text: '$ whoami', delay: 0, type: 'command' },
        { text: 'satyendra@devh.in', delay: 400, type: 'output' },
        { text: '$ cat /etc/contact.conf', delay: 800, type: 'command' },
        { text: '# Loading contact endpoints...', delay: 1200, type: 'comment' },
    ]
}

const channels = [
    {
        id: 'hello',
        icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        label: 'Say Hello',
        value: 'hello@satyendra.in',
        href: 'mailto:hello@satyendra.in',
        desc: 'General inquiries & conversations'
    },
    {
        id: 'hire',
        icon: 'M20 7h-3a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2ZM9 7h6v2H9V7Zm11 12H4v-8h16v8Z',
        label: 'Hire Me',
        value: 'dev@satyendra.in',
        href: 'mailto:dev@satyendra.in',
        desc: 'Freelance & contract opportunities'
    },
    {
        id: 'team',
        icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M16 3.13a4 4 0 0 1 0 7.75 M23 21v-2a4 4 0 0 0-3-3.87',
        label: 'DevH Team',
        value: 'devh.in',
        href: 'https://devh.in/contact',
        desc: 'Full team for enterprise projects',
        external: true
    },
    {
        id: 'whatsapp',
        icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.355-5.033c0-5.458 4.441-9.913 9.914-9.913 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.458-4.445 9.913-9.965 9.913M12.054 2.5C6.805 2.5 2.534 6.771 2.534 12.02c0 1.681.427 3.275 1.17 4.673l-1.235 4.512 4.621-1.213c1.35.698 2.872 1.077 4.469 1.077h.005c5.249 0 9.519-4.271 9.519-9.52 0-2.544-1.012-4.966-2.812-6.766a9.522 9.522 0 01-6.765-2.812',
        label: 'WhatsApp',
        value: '+91 87908 63694',
        href: 'https://wa.me/918790863694',
        desc: 'Quick chats & urgent matters',
        external: true
    }
]

const socials = [
    {
        id: 'github',
        icon: 'github',
        label: 'GitHub',
        username: '@s4tyendra',
        href: 'https://github.com/s4tyendra'
    },
    {
        id: 'linkedin',
        icon: 'linkedin',
        label: 'LinkedIn',
        username: '@s4tyendra',
        href: 'https://linkedin.com/in/s4tyendra'
    },
    {
        id: 'reddit',
        icon: 'reddit',
        label: 'Reddit',
        username: 'u/s4tyendra',
        href: 'https://reddit.com/u/s4tyendra'
    }
]

onMounted(() => {
    let currentIndex = 0
    const typeWriter = () => {
        if (currentIndex < contactData.greet.length) {
            setTimeout(() => {
                terminalLines.value.push(contactData.greet[currentIndex])
                currentIndex++
                typeWriter()
            }, contactData.greet[currentIndex].delay)
        } else {
            setTimeout(() => {
                typingComplete.value = true
            }, 500)
        }
    }
    typeWriter()
})
</script>

<template>
    <div class="min-h-[70vh] relative overflow-hidden">
        <div class="relative z-10 max-w-5xl mx-auto py-6">
            <!-- Terminal Header -->
            <div class="mb-12">
                <div
                    class="rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl font-mono text-sm max-w-2xl mx-auto">
                    <div class="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500/60"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500/60"></div>
                        <span class="ml-4 text-xs text-text-muted opacity-50">contact — satyendra@devh — fish</span>
                    </div>
                    <div class="p-6 space-y-2 text-left min-h-[120px]">
                        <div v-for="(line, index) in terminalLines" :key="index" class="flex gap-2 animate-fadeIn">
                            <span v-if="line.type === 'command'" class="text-green-400">➜</span>
                            <span v-if="line.type === 'command'" class="text-cyan-400">~</span>
                            <span :class="{
                                'text-gray-300': line.type === 'command',
                                'text-teal-300 pl-4': line.type === 'output',
                                'text-gray-500 italic': line.type === 'comment'
                            }">{{ line.text }}</span>
                        </div>
                        <div v-if="!typingComplete" class="text-teal-500 animate-pulse">▋</div>
                    </div>
                </div>
            </div>

            <!-- Main Title -->
            <div class="text-center mb-12" v-if="typingComplete">
                <h1
                    class="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-linear-to-r from-cyan-300 via-teal-300 to-emerald-300 animate-fadeInUp">
                    Let's Connect
                </h1>
                <p class="text-base text-text-muted max-w-md mx-auto animate-fadeInUp" style="animation-delay: 0.2s;">
                    Pick your preferred channel. All roads lead to <span class="text-teal-400">collaboration</span>.
                </p>
            </div>

            <!-- Contact Cards (Fixed CSS to work as List on Narrow and Grid on Expanded) -->
            <div v-if="typingComplete" class="grid grid-cols-1 @lg:grid-cols-2 gap-4 mb-12 animate-fadeInUp"
                style="animation-delay: 0.4s;">
                <a v-for="channel in channels" :key="channel.id" :href="channel.href"
                    :target="channel.external ? '_blank' : '_self'"
                    class="group relative p-5 rounded-2xl bg-bg-main/60 border border-white/5 hover:bg-white/5 hover:border-teal-500/30 transition-all duration-300 backdrop-blur-sm shadow-sm"
                    @mouseenter="hoveredCard = channel.id" @mouseleave="hoveredCard = null">

                    <div class="flex items-center gap-5">
                        <div
                            class="relative w-14 h-14 shrink-0 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-white/5 group-hover:border-teal-500/20 group-hover:scale-105 transition-all duration-300">
                            <svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                                <path :d="channel.icon" />
                            </svg>
                        </div>

                        <div class="flex-1 min-w-0 text-left">
                            <div class="flex items-center gap-2 mb-1">
                                <h3
                                    class="text-lg font-bold text-text-main group-hover:text-teal-200 transition-colors whitespace-nowrap">
                                    {{ channel.label }}</h3>
                                <svg v-if="channel.external"
                                    class="w-3.5 h-3.5 text-text-muted opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </div>
                            <p
                                class="text-teal-400 font-mono text-sm leading-tight truncate group-hover:text-teal-300 transition-colors">
                                {{ channel.value }}</p>
                            <p
                                class="text-[10px] text-text-muted/60 mt-1 truncate group-hover:text-text-muted transition-colors">
                                {{ channel.desc }}</p>
                        </div>

                        <div class="self-center pl-2">
                            <div
                                class="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-white/20 group-hover:bg-teal-500/10 group-hover:text-teal-400 transition-all duration-300 transform group-hover:-rotate-45">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <!-- Social Links -->
            <div v-if="typingComplete" class="animate-fadeInUp" style="animation-delay: 0.6s;">
                <div class="text-center mb-8">
                    <div class="inline-flex items-center gap-3 text-text-muted text-sm font-mono">
                        <span class="w-12 h-px bg-white/10"></span>
                        <span class="uppercase tracking-widest">Find me elsewhere</span>
                        <span class="w-12 h-px bg-white/10"></span>
                    </div>
                </div>

                <div class="flex justify-center gap-4 flex-wrap">
                    <a v-for="social in socials" :key="social.id" :href="social.href" target="_blank"
                        class="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                        <!-- GitHub Icon -->
                        <svg v-if="social.icon === 'github'"
                            class="w-5 h-5 text-text-muted group-hover:text-white transition-colors" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <!-- LinkedIn Icon -->
                        <svg v-if="social.icon === 'linkedin'"
                            class="w-5 h-5 text-text-muted group-hover:text-[#0a66c2] transition-colors"
                            viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <!-- Reddit Icon -->
                        <svg v-if="social.icon === 'reddit'"
                            class="w-5 h-5 text-text-muted group-hover:text-[#ff4500] transition-colors"
                            viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                        </svg>
                        <div>
                            <p class="text-sm font-bold text-text-main group-hover:text-white transition-colors">{{
                                social.label }}</p>
                            <p class="text-xs text-text-muted font-mono">{{ social.username }}</p>
                        </div>
                    </a>
                </div>
            </div>

            <!-- DevH CTA -->
            <div v-if="typingComplete" class="mt-20 animate-fadeInUp" style="animation-delay: 0.8s;">
                <a href="https://devh.in" target="_blank"
                    class="group block max-w-2xl mx-auto p-8 rounded-2xl bg-linear-to-br from-purple-900/20 via-bg-main/60 to-teal-900/20 border border-white/10 hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden">
                    <div
                        class="absolute inset-0 bg-linear-to-r from-purple-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>

                    <div class="relative z-10 flex items-center gap-6">
                        <div
                            class="w-16 h-16 rounded-xl bg-linear-to-br from-purple-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <span class="text-3xl">⚡</span>
                        </div>
                        <div class="flex-1 text-left">
                            <h3 class="text-xl font-bold text-text-main group-hover:text-white transition-colors mb-1">
                                Need a full team?
                            </h3>
                            <p class="text-text-muted text-sm">
                                Check out <span class="text-purple-400 font-mono">devh.in</span> — We turn ideas into
                                production-ready solutions.
                            </p>
                        </div>
                        <div class="text-white/20 group-hover:text-purple-400 transition-colors">
                            <svg class="w-8 h-8 transform group-hover:translate-x-2 transition-transform"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </a>
            </div>

            <!-- ASCII Art Footer -->
            <div v-if="typingComplete" class="mt-20 text-center animate-fadeInUp" style="animation-delay: 1s;">
                <pre
                    class="text-[8px] sm:text-[10px] text-teal-500/30 font-mono leading-tight select-none mx-auto inline-block">
 ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝
██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║   
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║   
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║   
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝   
                </pre>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
}

.animate-fadeInUp {
    animation: fadeInUp 0.6s cubic-bezier(0.2, 0, 0.2, 1) forwards;
    opacity: 0;
}
</style>
