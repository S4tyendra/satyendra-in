export const fileSystem = {
    "~": {
        type: "dir",
        path: "/",
        children: {
            "projects": {
                type: "dir",
                path: "/projects",
                children: {
                    // Open Source Projects
                    "generate-gitignore": { type: "file", path: "/projects/generate-gitignore" },
                    "newscan-ai": { type: "file", path: "/projects/newscan-ai" },
                    "multifeatures": { type: "file", path: "/projects/multifeatures" },
                    "stress-test": { type: "file", path: "/projects/stress-test" },
                    "envman": { type: "file", path: "/projects/envman" },
                    "url-shortener": { type: "file", path: "/projects/url-shortener" },
                    "whatsapp-decryptor": { type: "file", path: "/projects/whatsapp-decryptor" },
                    "lancall": { type: "file", path: "/projects/lancall" },
                    "latex-compiler": { type: "file", path: "/projects/latex-compiler" },
                    "attend": { type: "file", path: "/projects/attend" },
                    "pdf-chat": { type: "file", path: "/projects/pdf-chat" },
                    "iiitk-resources": { type: "file", path: "/projects/iiitk-resources" },
                    "nfc-gatekeeper": { type: "file", path: "/projects/nfc-gatekeeper" },
                    "nlp-unit-converter": { type: "file", path: "/projects/nlp-unit-converter" },
                    "iiitk-docker-manager": { type: "file", path: "/projects/iiitk-docker-manager" },
                    "s-devh-in": { type: "file", path: "/projects/s-devh-in" },
                    // Closed Source Projects
                    "devh-api-gateway": { type: "file", path: "/projects/devh-api-gateway" },
                    "iiitk-web-infrastructure": { type: "file", path: "/projects/iiitk-web-infrastructure" },
                    "edge-proxy-image-cache": { type: "file", path: "/projects/edge-proxy-image-cache" }
                }
            },
            "blog": {
                type: "dir",
                path: "/blog",
                children: {
                    "docker-best-practices": { type: "file", path: "/blog/docker-best-practices" },
                    "future-of-web": { type: "file", path: "/blog/future-of-web" }
                }
            },
            "about": { type: "file", path: "/about" },
            "contact": { type: "file", path: "/contact" },
            "experience": { type: "file", path: "/experience" }
        }
    }
};

export const resolvePath = (currentPath) => {
    // Simple helper to find the node in the fileSystem based on the URL path
    // This assumes paths match the structure in fileSystem
    if (currentPath === "/" || currentPath === "") return { node: fileSystem["~"], breadcrumbs: [{ name: "~", node: fileSystem["~"] }] };

    const parts = currentPath.split("/").filter(p => p);
    let currentNode = fileSystem["~"];
    const breadcrumbs = [{ name: "~", node: currentNode }];

    for (const part of parts) {
        if (currentNode.children && currentNode.children[part]) {
            currentNode = currentNode.children[part];
            breadcrumbs.push({ name: part, node: currentNode });
        } else {
            // Path not found in our defined structure, maybe return null or best effort
            return null;
        }
    }
    return { node: currentNode, breadcrumbs };
};
