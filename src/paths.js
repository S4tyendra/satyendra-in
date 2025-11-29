export const fileSystem = {
    "~": {
        type: "dir",
        path: "/",
        children: {
            "projects": {
                type: "dir",
                path: "/projects",
                children: {
                    "web-experiments": { type: "file", path: "/projects/web-experiments" },
                    "ai-agents": { type: "file", path: "/projects/ai-agents" }
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
            "contact": { type: "file", path: "/contact" }
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
