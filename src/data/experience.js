import { companyProducts } from './featuredWork.js'

export const introData = {
    title: "Software Development Engineer",
    subtitle: "Neosurge · Apr 2026–present",
    description: "Cloud infrastructure, security, backend services, and applications.",
    availability: "SDE @ Neosurge"
};

export const experienceData = [
    {
        year: "Apr 2026–present",
        title: "Software Development Engineer",
        subtitle: "Neosurge",
        keyPoints: [
            { text: "Reduced cloud costs, improved backend security, and introduced HTTP/3 where it improved performance." },
            { text: "Built internal reverse proxies and a customer support portal designed for high traffic." },
            { text: "Built a production telemetry system handling approximately 50,000 requests per second on a machine with 1 GB of RAM." },
            { text: "Developed and released Aavak and Octaraa. Built Mino Money across the mobile app, backend API, and cloud infrastructure." },
        ],
        links: [
            ...companyProducts.flatMap(product => product.stores.map(store => ({ label: `${product.title} · ${store.label}`, href: store.href }))),
            { label: "50k RPS notes", href: "/blog/50k-rps-on-1gb" },
        ]
    },
    {
        year: "2024–present",
        title: "Infrastructure Lead",
        subtitle: "IIIT Kota",
        keyPoints: [
            { text: "Managed campus web infrastructure on bare-metal servers with 99.9% uptime." },
            { text: "Combined edge and local hosting to reduce deployment overhead by approximately 70%." },
            { text: "Recruited and trained more than 20 student developers." },
        ]
    },
    {
        year: "2022–23",
        title: "Security Consultant",
        subtitle: "Government / C-TRACE",
        keyPoints: [
            { text: "Built open-source intelligence pipelines for Mumbai Police C-TRACE." },
            { text: "Helped resolve more than 50 vulnerabilities in production government systems." },
            { text: "Delivered training on OWASP, secure coding, and open-source intelligence." },
        ]
    },
    {
        year: "2020–present",
        title: "Freelance Developer",
        subtitle: "Independent work",
        keyPoints: [
            { text: "Developed Go and Python backend services and optimized database queries and indexes." },
            { text: "Built offline-first Flutter applications and concurrent web scrapers." },
        ]
    },
    {
        year: "2018–19",
        title: "Linux & Android",
        subtitle: "Early technical work",
        keyPoints: [
            { text: "Worked with Debian and Fedora internals, custom Android ROMs, SELinux, and ADB recovery." },
        ]
    }
];
