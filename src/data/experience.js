// Experience/Timeline data from 2018-2025

export const heroData = {
    title: "Full-Stack Backend Security Engineer & Researcher",
    tagline: "I don't just build applications; I harden them. From reverse-engineering APIs to securing LLMs against prompt injection, I bridge the gap between theoretical computer science and production warfare.",
    status: "Available for Remote/On-site Opportunities",
    location: "India",
}

export const philosophyData = {
    quote: "I break things to understand them, and I build things to stop others from breaking them.",
    principles: ["Readable", "Performant", "Secure"],
    description: "Whether it's optimizing database indexes to shave off milliseconds or hunting vulnerabilities for law enforcement, I focus on shipping code that works in the real world, not just on localhost."
}

export const timelineData = [
    {
        year: "2025",
        title: "AI Security & Advanced Research",
        subtitle: "Current Focus: Adversarial Machine Learning",
        description: "Moving beyond standard cybersecurity into the chaos of AI. LLMs are leaking sieves; I'm building the patch.",
        highlights: [
            { label: "Prompt Defense", text: "Architected a security framework that neutralizes prompt injection and context overflow attacks, preventing output manipulation and reducing token costs." },
            { label: "Research", text: "Leading initiatives in OSINT methodologies and AI bias detection." },
            { label: "Mentorship", text: "Conducted security workshops for 200+ students, teaching offensive and defensive coding practices." },
        ],
        tags: ["AI", "LLM Security", "Research"],
        color: "#ef4444" // red
    },
    {
        year: "2024",
        title: "DevOps & Infrastructure Scale",
        subtitle: 'The "99.9% Uptime" Era',
        description: "Transitioned from writing code to owning the metal it runs on. Mastered the art of keeping servers alive when traffic spikes.",
        highlights: [
            { label: "Reliability", text: "Achieved 99.9% uptime across high-traffic production applications." },
            { label: "Speed", text: "Slashed deployment times by 70% via CI/CD pipeline optimization." },
            { label: "Optimization", text: "Managed cloud costs through strategic edge deployments and DNS security." },
        ],
        tags: ["DevOps", "CI/CD", "Cloud"],
        color: "#3b82f6" // blue
    },
    {
        year: "2023",
        title: "Full-Stack Production Engineering",
        subtitle: "Scaling Logic",
        description: "Built backend systems that don't crumble under load. Decomposed monoliths and fixed the latency issues that kill products.",
        highlights: [
            { label: "Backend", text: "Engineered scalable microservices and optimized SQL queries for raw speed." },
            { label: "UX/UI", text: "Delivered responsive, intuitive interfaces that handle complex data without lag." },
            { label: "Architecture", text: "Solved critical microservice latency bottlenecks." },
        ],
        tags: ["Backend", "Microservices", "SQL"],
        color: "#8b5cf6" // violet
    },
    {
        year: "2022-2023",
        title: "Security-First Development",
        subtitle: "Offensive Security for Defensive Engineering",
        description: "Went deep into the attacker mindset. If you can't hack it, you can't secure it.",
        highlights: [
            { label: "Law Enforcement", text: "Built automated OSINT tools for C-TRACE (Mumbai Police) to aid in digital tracking and investigations." },
            { label: "Vulnerability Mgmt", text: "Identified, reported, and patched 50+ security vulnerabilities." },
            { label: "Training", text: "Trained teams on OWASP Top 10 and OSINT methodologies." },
        ],
        tags: ["Security", "OSINT", "OWASP"],
        color: "#f59e0b" // amber
    },
    {
        year: "2022",
        title: "Network & Signals Intelligence",
        subtitle: "The Physical Layer",
        description: 'Understood that "the cloud" is just computers connected by physics.',
        highlights: [
            { label: "Cell.Devh.in", text: "Built a security-optimized public cell tower database for Indian infrastructure." },
            { label: "Deep Tech", text: "Reverse-engineered the relationship between GPS coordinates, atomic clock synchronization, and network latency." },
        ],
        tags: ["Networking", "Telecom", "GPS"],
        color: "#10b981" // emerald
    },
    {
        year: "2021",
        title: "Mobile Engineering (Flutter)",
        subtitle: "Native Performance",
        description: "Built production mobile applications with Flutter, mastering cross-platform development.",
        highlights: [
            { label: "BroBuddy", text: "Developed a location-tracking application for cyclist groups with real-time updates." },
            { label: "Systems", text: "Built a custom music player featuring local SQLite databases and aggressive caching strategies." },
            { label: "Internals", text: "Mastered Android platform channels and Dart." },
        ],
        tags: ["Flutter", "Mobile", "Android"],
        color: "#06b6d4" // cyan
    },
    {
        year: "2020",
        title: "Automation & Reverse Engineering",
        subtitle: 'The "Script Kiddie" to Engineer Pipeline',
        description: "Transitioned from writing scripts to understanding the systems behind them.",
        highlights: [
            { label: "Botnets", text: "Deployed asynchronous Telegram bots handling thousands of requests using Python (Async/Await)." },
            { label: "Reversing", text: "Reverse-engineered private APIs to build custom scrapers and modules." },
            { label: "Freelancing", text: "Managed servers and automation scripts for international clients." },
        ],
        tags: ["Python", "Bots", "APIs"],
        color: "#ec4899" // pink
    },
    {
        year: "2018-2019",
        title: "The Linux Origin (Root)",
        subtitle: "Where it started",
        description: "Migrated to Fedora, bricked a few phones, and learned how operating systems actually work.",
        highlights: [
            { label: "Linux", text: "Mastered partitioning, drivers, and file system permissions (ext4 vs NTFS)." },
            { label: "Android", text: "Custom ROMs, rooting, SELinux enforcement, and virtualization (VMOS)." },
            { label: "Hardware", text: "Self-repair and unbricking devices via ADB/Fastboot." },
        ],
        tags: ["Linux", "Android", "Hardware"],
        color: "#6366f1" // indigo
    },
]

export const ctaData = {
    text: "Send me your hardest problems.",
    email: "hello@satyendra.in"
}
