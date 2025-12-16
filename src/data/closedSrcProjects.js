const closedSrcProjects = [
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