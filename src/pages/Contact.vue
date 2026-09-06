<script setup>
import SiteIcon from '../components/SiteIcon.vue'
import { useHead } from '@vueuse/head'

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

const channels = [
    {
        id: 'hello',
        label: 'hello@',
        value: 'hello@satyendra.in',
        href: 'mailto:hello@satyendra.in',
        desc: 'General'
    },
    {
        id: 'hire',
        label: 'dev@',
        value: 'dev@satyendra.in',
        href: 'mailto:dev@satyendra.in',
        desc: 'Work'
    },
    {
        id: 'whatsapp',
        label: 'wa',
        value: '+91 87908 63694',
        href: 'https://wa.me/918790863694',
        desc: 'Quick',
        external: true
    },
    {
        id: 'team',
        label: 'devh',
        value: 'devh.in/contact',
        href: 'https://devh.in/contact',
        desc: 'Team',
        external: true
    }
]

const socials = [
    { label: 'GitHub', username: '@s4tyendra', href: 'https://github.com/s4tyendra' },
    { label: 'LinkedIn', username: '@s4tyendra', href: 'https://linkedin.com/in/s4tyendra' },
    { label: 'Reddit', username: 'u/s4tyendra', href: 'https://reddit.com/u/s4tyendra' },
]
</script>

<template>
    <div class="flex flex-col gap-8 fade-in-up pb-8">
        <header class="space-y-2">
            <p class="page-kicker">Contact</p>
            <h1 class="page-title text-3xl">Reach me.</h1>
            <p class="text-sm text-text-muted leading-relaxed">
                For roles, projects, or questions about my work, email me below. You can also connect on LinkedIn.
            </p>
        </header>

        <ul class="flex flex-col border-t border-text-main/10">
            <li v-for="channel in channels" :key="channel.id">
                <a :href="channel.href" :target="channel.external ? '_blank' : '_self'" rel="noopener noreferrer"
                    class="group flex items-baseline gap-4 py-3 border-b border-text-main/10 hover:bg-text-main/[0.03] transition-colors px-1">
                    <span class="font-sans text-[11px] text-text-main/40 w-12 shrink-0">{{ channel.label }}</span>
                    <span class="flex-1 min-w-0">
                        <span class="block text-sm text-text-main font-sans truncate">{{ channel.value }}</span>
                        <span class="block text-[11px] text-text-main/40 mt-0.5">{{ channel.desc }}</span>
                    </span>
                    <span class="text-text-main/30 group-hover:text-text-main transition-colors"><SiteIcon /></span>
                </a>
            </li>
        </ul>

        <div>
            <p class="page-kicker mb-3">elsewhere</p>
            <div class="flex flex-col gap-1">
                <a v-for="social in socials" :key="social.href" :href="social.href" target="_blank" rel="noopener noreferrer"
                    class="group flex items-baseline justify-between py-1.5 text-sm hover:text-text-main text-text-muted transition-colors">
                    <span>{{ social.label }}</span>
                    <span class="font-sans text-[11px] text-text-main/40 group-hover:text-text-main/70">{{ social.username }}</span>
                </a>
            </div>
        </div>
    </div>
</template>
