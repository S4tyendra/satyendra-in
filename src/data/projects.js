<script lang="js">
export default projects = [
    {
        "link": "https://github.com/s4tyendra/generate.gitignore",
        "title": "generate.gitignore",
        "desc": "Modern tool to generate .gitignore files using Cloudflare Workers and React.",
        "detail": [
            "Backend built on Cloudflare Workers for edge performance.",
            "Frontend uses React, Vite, and Tailwind CSS.",
            "Features search, preview, and download functionality.",
            "Utilizes shadcn/ui for components and Bun as the package manager."
        ],
        "tags": ["React", "Cloudflare Workers", "Vite", "Tailwind CSS", "Bun", "Serverless"]
    },
    {
        "link": "https://github.com/s4tyendra/newscan-ai",
        "title": "NewScan AI",
        "desc": "FastAPI web app that digitizes newspapers using Computer Vision, OCR, and GenAI.",
        "detail": [
            "Custom YOLOv8 model for news article segmentation/detection.",
            "Tesseract OCR for English, Hindi, and Telugu text extraction.",
            "Gemini 2.0 Flash Lite integration for article summarization.",
            "Google TTS for audio playback and background async processing."
        ],
        "tags": ["Python", "FastAPI", "Computer Vision", "YOLOv8", "OCR", "GenAI", "Docker"]
    },
    {
        "link": "https://github.com/s4tyendra/MultiFeatures",
        "title": "MultiFeatures",
        "desc": "Python library wrapper for fetching Indian Railway live status.",
        "detail": [
            "Simple interface for PNR and live train status checks.",
            "Handles API exceptions and connectivity errors gracefully.",
            "Documentation hosted independently.",
            "pip-installable utility package."
        ],
        "tags": ["Python", "Library", "Indian Railways", "API Wrapper"]
    },
    {
        "link": "https://github.com/s4tyendra/stress-test",
        "title": "Server Stress Test Tool",
        "desc": "Comprehensive server stress testing tool written in Go.",
        "detail": [
            "Supports HTTP/TCP/UDP/SYN floods and Slowloris attacks.",
            "Features progressive load testing, API fuzzing, and HTTP/2 Rapid Reset.",
            "Provides detailed metrics (RPS, latency) and concurrency controls.",
            "Includes IP masking and random user-agent rotation."
        ],
        "tags": ["Go", "Cybersecurity", "DDoS", "Stress Testing", "Networking", "CLI"]
    },
    {
        "link": "https://github.com/s4tyendra/envman",
        "title": "envman",
        "desc": "Linux CLI tool to manage and switch environment variable profiles.",
        "detail": [
            "Create, edit, list, and delete environment profiles.",
            "Interactive text-based editor for quick config changes.",
            "Streamlines workflow for multiple deployment environments.",
            "Built in Go with simple curl installation."
        ],
        "tags": ["Go", "CLI", "Linux", "DevOps", "Productivity"]
    },
    {
        "link": "https://github.com/s4tyendra/url-shortner",
        "title": "URL Shortener",
        "desc": "Simple self-hosted URL shortener using Next.js and MongoDB.",
        "detail": [
            "Custom short slugs and redirection logic.",
            "MongoDB backend for persistent storage.",
            "Next.js for server-side rendering and API routes.",
            "Easy self-hosting with Docker support."
        ],
        "tags": ["Next.js", "MongoDB", "Node.js", "Self-Hosted", "Web App"]
    },
    {
        "link": "https://github.com/S4tyendra/wa-decryptor",
        "title": "WhatsApp Decryptor",
        "desc": "Web tool to decrypt WhatsApp backups (.crypt14/15) and export to HTML.",
        "detail": [
            "Decrypts msgstore.db using extracted keys.",
            "Converts chat history to browsable HTML format.",
            "Supports legacy and modern database schemas.",
            "Includes guide for key extraction via downgrade attack (Android <16)."
        ],
        "tags": ["Python", "FastAPI", "Forensics", "WhatsApp", "Decryption", "Android"]
    },
    {
        "link": "https://github.com/S4tyendra/public-vc",
        "title": "LanCall",
        "desc": "Real-time video chat app using Go (Fiber), WebRTC, and MongoDB.",
        "detail": [
            "Peer-to-peer video/audio using WebRTC.",
            "WebSockets for signaling and real-time text chat.",
            "Admin controls for room management (mute/unmute).",
            "Dockerized setup with HTTPS/TLS support."
        ],
        "tags": ["Go", "WebRTC", "WebSockets", "MongoDB", "Fiber", "Docker"]
    },
    {
        "link": "https://github.com/s4tyendra/tex-compiler",
        "title": "LaTeX Compiler Service",
        "desc": "Containerized Go service for concurrent LaTeX compilation.",
        "detail": [
            "Supports pdflatex, lualatex, and xelatex compilers.",
            "Handles concurrent jobs with queue management.",
            "Multi-pass compilation for bibliography resolution.",
            "Secure execution with resource limits and zip-slip protection."
        ],
        "tags": ["Go", "LaTeX", "Docker", "Microservice", "API", "Backend"]
    },
    {
        "link": "https://github.com/S4tyendra/attend-app",
        "title": "Attend",
        "desc": "Enterprise attendance Flutter app using BLE and QR codes.",
        "detail": [
            "Hybrid BLE/QR tracking for high-density classrooms (200+ devices).",
            "Collision-resistant BLE logic with staggered advertising.",
            "Offline-first architecture using Hive database.",
            "Platform-adaptive logic for iOS vs Android restrictions."
        ],
        "tags": ["Flutter", "BLE", "GetX", "Mobile", "IoT", "Offline-first"]
    },
    {
        "link": "https://github.com/s4tyendra/smart-pdf",
        "title": "PDF-Chat",
        "desc": "AI document assistant to chat with PDFs and generate study aids.",
        "detail": [
            "RAG pipeline using Gemini 1.5 Flash and vector search.",
            "Converts PDF to Markdown for accurate context ingestion.",
            "Renders LaTeX and images in chat responses.",
            "FastAPI backend with Flutter frontend."
        ],
        "tags": ["Flutter", "FastAPI", "GenAI", "RAG", "Gemini", "Python"]
    },
    {
        "link": "https://github.com/S4tyendra/IIITK-res",
        "title": "IIITK Resources",
        "desc": "Academic resource app for IIIT Kota with AI note generation.",
        "detail": [
            "Generates Markdown notes from audio/images using Gemini.",
            "Curriculum-mapped resource organization.",
            "Automated CI/CD pipeline for Android (Indus Store) and Linux.",
            "Built-in AI chatbot and rich text rendering."
        ],
        "tags": ["Flutter", "Education", "AI", "CI/CD", "Gemini", "Mobile"]
    },
    {
        "link": "https://github.com/S4tyendra/nfc-gatekeeper",
        "title": "NFC Gatekeeper",
        "desc": "Hardened NFC kiosk system for campus gatekeeping on Debian.",
        "detail": [
            "Production-grade Kiosk setup on Debian 12.",
            "Kernel module blacklisting for exclusive NFC reader access.",
            "Systemd service management and Polkit overrides.",
            "Hardened Chromium frontend with restricted permissions."
        ],
        "tags": ["Linux", "NFC", "Security", "Kiosk", "System Admin", "Python"]
    },
    {
        "link": "https://github.com/s4tyendra/NLP-Unit-Converter",
        "title": "NLP Unit Converter",
        "desc": "Natural language unit converter written in Go.",
        "detail": [
            "Parses complex phrases (e.g., 'two pints and a half cup').",
            "Supports text numbers, fractions, and scientific notation.",
            "Handles Volume, Length, Weight, Temp, and Speed conversions.",
            "Includes Web API and CLI interface."
        ],
        "tags": ["Go", "NLP", "Regex", "Unit Conversion", "API", "Algorithm"]
    },
    {
        "link": "https://github.com/s4tyendra/iiitkota-docker-manager",
        "title": "IIITK Docker Manager",
        "desc": "Dashboard to manage Docker containers with GHCR integration.",
        "detail": [
            "Auto-configures Nginx reverse proxies for containers.",
            "Compares local images with GHCR registry for updates.",
            "Manages persistent env vars and container lifecycles.",
            "Built with Bun and Hono as a single-binary service."
        ],
        "tags": ["Bun", "Hono", "Docker", "Nginx", "DevOps", "GHCR"]
    },
    {
        "link": "https://github.com/S4tyendra/s.devh.in",
        "title": "s.devh.in (DevH MiNi)",
        "desc": "A fast and clean URL shortener service built with Nuxt 3 and modern web technologies.",
        "detail": [
            "Supports single and bulk URL shortening with a responsive bulk interface.",
            "Includes a reporting system for flagging abusive or malicious links.",
            "Features a protected admin dashboard for link management and statistics.",
            "Built with Shadcn Vue and Tailwind CSS for a modern, accessible UI with dark mode.",
            "Utilizes Nuxt 3 server-side API routes and MongoDB for data persistence."
        ],
        "tags": ["Nuxt 3", "TypeScript", "MongoDB", "Tailwind CSS", "Shadcn Vue", "Full Stack"]
    }
];
</script>