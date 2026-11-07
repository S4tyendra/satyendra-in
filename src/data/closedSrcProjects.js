const closedSrcProjects = [
    {
        "link": "https://kv.devh.in",
        "deployment_url": "https://kv.devh.in",
        "title": "kv.devh.in",
        "desc": "HTTP key-value store for feature flags, remote config and small JSON. No SDK, and reads are free.",
        "featured": true,
        "detail": [
            "Write a key with PUT and a token, then read it back with a plain GET from anywhere.",
            "REST and Connect RPC APIs, with curl, JavaScript and Python examples.",
            "Plans from Hobby to Scale, with values up to 2 KB and free reads on every plan.",
            "Hitting a write or storage limit returns HTTP 429 instead of an overage bill."
        ],
        "tags": ["API", "Key-Value Store", "SaaS", "Backend", "Connect RPC"]
    },
    {
        "link": "https://play.google.com/store/apps/details?id=in.devh.getui",
        "slug": "getui",
        "deployment_url": "https://play.google.com/store/apps/details?id=in.devh.getui",
        "title": "GetUI",
        "desc": "Android app that recreates any screen's layout as clean Tailwind and Lucide code using Gemini.",
        "featured": true,
        "detail": [
            "Reads the on-screen layout through Android's Accessibility Service and turns the raw XML into a visual recreation.",
            "Runs on Gemini with your own API key. Nothing is stored or sent to our servers.",
            "Useful for inspecting layouts, accessibility labels and UI hierarchies.",
            "A Quick Settings tile captures any screen in one tap, and saved dumps can be revisited later."
        ],
        "tags": ["Android", "Gemini", "Accessibility", "Tailwind CSS", "Developer Tools"],
        "stores": [{ "label": "Google Play", "href": "https://play.google.com/store/apps/details?id=in.devh.getui" }]
    },
    {
        "link": "https://devh.in",
        "deployment_url": "https://devh.in",
        "title": "DevH API Gateway",
        "desc": "Centralized API infrastructure serving utility libraries, installer scripts, and internal microservices.",
        "featured": false,
        "detail": [
            "Acts as the backend backbone for the 'MultiFeatures' library and 'envman' tool.",
            "Hosts documentation and installation scripts (e.g., curl | bash pipelines).",
            "Provides data aggregation endpoints for various personal projects."
        ],
        "tags": ["API Gateway", "Microservices", "Infrastructure", "Backend", "Docs"]
    },
    {
        "link": "https://iiitkota.ac.in",
        "deployment_url": "https://login.iiitkota.ac.in",
        "title": "IIIT Kota Web Infrastructure",
        "desc": "Complete management of the institute's web presence, authentication portals, and server infrastructure.",
        "featured": true,
        "detail": [
            "Managed the main institute website and subdomains as the Webmaster.",
            "Maintained 'login.iiitkota.ac.in' for secure student and faculty authentication.",
            "Handled server administration, uptime monitoring, and security patching.",
            "Orchestrated deployment of internal tools and services for the campus."
        ],
        "tags": ["Webmaster", "System Admin", "Nginx", "Authentication", "EduTech", "Production"]
    },
    {
        "link": "https://proxy.satyendra.in",
        "deployment_url": "https://proxy.satyendra.in",
        "title": "Edge Proxy & Image Cache",
        "desc": "High-performance universal proxy service for CORS handling and intelligent image optimization.",
        "featured": false,
        "detail": [
            "Bypasses CORS restrictions for frontend applications via simple query parameters.",
            "Implements an image caching layer with automatic error handling and fallback images.",
            "Supports all HTTP methods (GET, POST, etc.) and headers for cross-origin resource sharing.",
            "Designed to reduce latency and bandwidth usage for client-side apps."
        ],
        "tags": ["Proxy", "CORS", "Caching", "Edge Computing", "Performance", "Infrastructure"]
    },
    {
        "link": "https://gems.devh.in",
        "deployment_url": "https://gems.devh.in",
        "title": "GemHub",
        "desc": "A community-driven platform to discover, share, and manage custom Google Gemini 'Gems' (AI personas).",
        "featured": true,
        "detail": [
            "Functions as a centralized repository for browsing and searching user-created Gemini Gems.",
            "Features a 'Favorites' system allowing users to bookmark and organize useful prompts.",
            "Includes submission functionality ('Add Gem') for the community to share their own creations.",
            "Displays detailed metadata for each Gem, including creator attribution, creation date, and popularity metrics.",
            "Hosts your personal suite of high-utility Gems like 'LinuxCommandAI', 'Lyra - Prompt Architect', and 'ESP Architect'."
        ],
        "tags": ["AI", "Google Gemini", "Prompt Engineering", "Community Platform", "Web App", "Repository"]
    }
]

export default closedSrcProjects;