<script setup>
import { useHead } from '@vueuse/head'

useHead({
    title: 'Services & Consulting | Satyendra',
    meta: [
        { name: 'description', content: 'Freelance consulting for Cloud Architecture, DevSecOps automation, Security Auditing, and Backend Development.' },
        { property: 'og:title', content: 'Services & Consulting | Satyendra' },
        { property: 'og:description', content: 'Cloud Architecture, DevSecOps automation, Security Auditing, and Backend Development.' },
        { property: 'og:url', content: 'https://satyendra.in/services' },
        { property: 'og:image', content: 'https://og-images-cdn.satyendra.in/cdn-cgi/image/width=1200,format=avif,quality=1/services.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
        { rel: 'canonical', href: 'https://satyendra.in/services' }
    ]
})

const offerings = [
    {
        num: '01',
        title: 'Infrastructure',
        text: 'Deployment and administration of bare-metal and cloud infrastructure, including Nginx, Docker, edge caching, and authentication portals.'
    },
    {
        num: '02',
        title: 'DevSecOps',
        text: 'CI/CD pipelines with application security testing, container image scanning, and deployment policies. Monitoring and observability for production systems.'
    },
    {
        num: '03',
        title: 'Backend',
        text: 'Go and Python backend services, API gateways, and background jobs. Database indexing, caching, and performance optimization.'
    },
    {
        num: '04',
        title: 'Security work',
        text: 'Security audits, open-source intelligence tools, and developer training, informed by work on government and law-enforcement systems.'
    },
]
</script>

<template>
    <div class="flex flex-col gap-8 fade-in-up pb-8">
        <header class="space-y-2">
            <p class="page-kicker">Services</p>
            <h1 class="page-title text-3xl">Services & consulting.</h1>
            <p class="text-sm text-text-muted leading-relaxed">
                For development and consulting enquiries,
                Write to <a href="mailto:dev@satyendra.in" class="text-text-main underline decoration-text-main/30 underline-offset-3 hover:decoration-text-main">dev@satyendra.in</a>.
            </p>
        </header>

        <ol class="flex flex-col gap-6">
            <li v-for="item in offerings" :key="item.num" class="grid grid-cols-[2.5rem_1fr] gap-3">
                <span class="font-sans text-[11px] text-text-main/35 pt-1">{{ item.num }}</span>
                <div>
                    <h2 class="font-serif text-lg text-text-main mb-1">{{ item.title }}</h2>
                    <p class="text-sm text-text-muted leading-relaxed">{{ item.text }}</p>
                </div>
            </li>
        </ol>

        <p class="text-xs font-sans text-text-main/40 border-t border-text-main/10 pt-4">
            Include a short description of your project, its current stage, and the help you need.
        </p>
    </div>
</template>
