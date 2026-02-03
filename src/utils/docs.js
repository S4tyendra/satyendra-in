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
        return { frontmatter: data, content }
    } catch {
        return { frontmatter: {}, content: raw }
    }
}

// Build navigation tree from file paths
export function buildNavTree(section) {
    const basePath = `/src/resources/docs/${section}/`
    const items = []

    for (const [path, raw] of Object.entries(docModules)) {
        if (!path.startsWith(basePath)) continue

        const relativePath = path.replace(basePath, '').replace('.md', '')
        const { frontmatter } = parseFrontmatter(raw)

        // Determine if it's an index file
        const isIndex = relativePath === 'index' || relativePath.endsWith('/index')
        const urlPath = isIndex
            ? `/docs/${section}${relativePath === 'index' ? '' : '/' + relativePath.replace('/index', '')}`
            : `/docs/${section}/${relativePath}`

        items.push({
            title: frontmatter.title || relativePath.split('/').pop(),
            path: urlPath,
            relativePath,
            isIndex,
            order: frontmatter.order || 999,
        })
    }

    // Sort: index first, then by order, then alphabetically
    return items.sort((a, b) => {
        if (a.isIndex && !b.isIndex) return -1
        if (!a.isIndex && b.isIndex) return 1
        if (a.order !== b.order) return a.order - b.order
        return a.title.localeCompare(b.title)
    })
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
