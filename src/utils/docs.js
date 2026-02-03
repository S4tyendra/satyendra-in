// Docs utility - generates navigation structure and fetches doc content
import matter from 'gray-matter'

// Static doc structure - updated at build time via SSG
export const docsConfig = {
    iiitkota: {
        title: 'IIIT Kota Sites Documentation',
        description: 'Technical documentation for all IIIT Kota web infrastructure, APIs, and internal tools.',
        basePath: '/docs/iiitkota',
        icon: '🏛️',
    },
    personal: {
        title: "Personal API's Documentation",
        description: "Documentation for Satyendra's personal APIs and public services.",
        basePath: '/docs/personal',
        icon: '🔧',
    },
    'devh-api': {
        title: 'DEVH API Documentation',
        description: 'Complete API reference for DEVH API Gateway services.',
        basePath: '/docs/devh-api',
        icon: '⚡',
    },
}

// Import all markdown files at build time
const docModules = import.meta.glob('/src/resources/docs/**/*.md', { eager: true, query: '?raw', import: 'default' })
const docComponents = import.meta.glob('/src/resources/docs/**/*.md', { eager: true })

// Parse frontmatter from raw content
function parseFrontmatter(raw) {
    try {
        const { data, content } = matter(raw)

        // If no title in frontmatter, extract from first # heading
        if (!data.title) {
            const h1Match = content.match(/^#\s+(.+)$/m)
            if (h1Match) {
                data.title = h1Match[1].trim()
            }
        }

        return { frontmatter: data, content }
    } catch {
        return { frontmatter: {}, content: raw }
    }
}

// Build hierarchical navigation tree from file paths
export function buildNavTree(section) {
    const basePath = `/src/resources/docs/${section}/`
    const tree = []

    // First, collect all files with metadata
    const allFiles = []
    for (const [path, raw] of Object.entries(docModules)) {
        if (!path.startsWith(basePath)) continue

        const relativePath = path.replace(basePath, '').replace('.md', '')
        const { frontmatter } = parseFrontmatter(raw)

        const isIndex = relativePath === 'index' || relativePath.endsWith('/index')
        const urlPath = isIndex
            ? `/docs/${section}${relativePath === 'index' ? '' : '/' + relativePath.replace('/index', '')}`
            : `/docs/${section}/${relativePath}`

        allFiles.push({
            title: frontmatter.title || relativePath.split('/').pop(),
            path: urlPath,
            relativePath,
            isIndex,
            order: frontmatter.order || 999,
            parts: relativePath.split('/'),
        })
    }

    // Build nested structure
    function buildNode(pathPrefix = '', depth = 0) {
        const nodes = []
        const folders = new Set()
        const files = []

        // Separate folders and files at this level
        for (const file of allFiles) {
            if (pathPrefix && !file.relativePath.startsWith(pathPrefix)) continue

            const remainingPath = pathPrefix
                ? file.relativePath.slice(pathPrefix.length).replace(/^\//, '')
                : file.relativePath

            const parts = remainingPath.split('/')

            if (parts.length === 1) {
                // Direct file at this level
                files.push(file)
            } else if (parts.length > 1) {
                // File in subfolder
                folders.add(parts[0])
            }
        }

        // Add folders first
        for (const folder of Array.from(folders).sort()) {
            const folderPath = pathPrefix ? `${pathPrefix}/${folder}` : folder
            const folderIndex = allFiles.find(f =>
                f.relativePath === `${folderPath}/index` || f.relativePath === folderPath
            )

            nodes.push({
                type: 'folder',
                title: folderIndex?.title || folder.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                path: folderIndex?.path || `/docs/${section}/${folderPath}`,
                order: folderIndex?.order || 999,
                children: buildNode(folderPath, depth + 1),
                isExpanded: false, // Can be controlled via frontmatter later
            })
        }

        // Add files (excluding index files that represent folders)
        for (const file of files) {
            if (file.isIndex && folders.size > 0) continue // Skip folder index if it has children

            nodes.push({
                type: 'file',
                title: file.title,
                path: file.path,
                order: file.order,
                isIndex: file.isIndex,
            })
        }

        // Sort: index first, then by order, then alphabetically
        return nodes.sort((a, b) => {
            if (a.isIndex && !b.isIndex) return -1
            if (!a.isIndex && b.isIndex) return 1
            if (a.order !== b.order) return a.order - b.order
            return a.title.localeCompare(b.title)
        })
    }

    return buildNode()
}

// Get directory contents for dynamic index generation
export function getDirectoryContents(section, dirPath = '') {
    const basePath = `/src/resources/docs/${section}/`
    const targetPath = dirPath ? `${basePath}${dirPath}/` : basePath
    const contents = { folders: [], files: [] }

    for (const [path, raw] of Object.entries(docModules)) {
        if (!path.startsWith(targetPath)) continue

        const relativePath = path.replace(targetPath, '').replace('.md', '')
        if (relativePath.includes('/')) {
            // It's in a subfolder
            const folderName = relativePath.split('/')[0]
            if (!contents.folders.find(f => f.name === folderName)) {
                const { frontmatter } = parseFrontmatter(raw)
                contents.folders.push({
                    name: folderName,
                    title: frontmatter.title || folderName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                    path: `/docs/${section}/${dirPath ? dirPath + '/' : ''}${folderName}`,
                })
            }
        } else if (relativePath !== 'index') {
            // It's a file at this level (not index)
            const { frontmatter } = parseFrontmatter(raw)
            contents.files.push({
                name: relativePath,
                title: frontmatter.title || relativePath,
                description: frontmatter.description || '',
                path: `/docs/${section}/${dirPath ? dirPath + '/' : ''}${relativePath}`,
            })
        }
    }

    return contents
}

// Get document component by path
export function getDocComponent(section, slug = 'index') {
    const path = `/src/resources/docs/${section}/${slug}.md`
    return docComponents[path] || null
}

// Get raw doc content with frontmatter
export function getDocContent(section, slug = 'index') {
    const path = `/src/resources/docs/${section}/${slug}.md`
    const raw = docModules[path]
    if (!raw) return null

    return parseFrontmatter(raw)
}

// Get all doc routes for SSG
export function getAllDocRoutes() {
    const routes = []

    for (const path of Object.keys(docModules)) {
        const match = path.match(/\/src\/resources\/docs\/([^/]+)\/(.+)\.md$/)
        if (!match) continue

        const [, section, slug] = match
        const isIndex = slug === 'index'

        routes.push({
            path: isIndex ? `/docs/${section}` : `/docs/${section}/${slug}`,
            section,
            slug: isIndex ? 'index' : slug,
        })
    }

    return routes
}

// Get all sections
export function getAllSections() {
    return Object.entries(docsConfig).map(([key, config]) => ({
        key,
        ...config,
    }))
}
