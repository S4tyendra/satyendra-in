
// Import all markdown files at build time
const blogModules = import.meta.glob('/src/resources/blog/*.md', { eager: true, query: '?raw', import: 'default' })
const blogComponents = import.meta.glob('/src/resources/blog/*.md', { eager: true })

// Parse frontmatter from raw content (manual parser — no gray-matter needed in browser)
function parseFrontmatter(raw) {
    if (!raw) return { frontmatter: {}, content: '' }

    // Normalize newlines and remove BOM
    const normalized = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n')

    const startRegex = /^\s*---\s*\n/
    if (!startRegex.test(normalized)) return { frontmatter: {}, content: raw }

    const contentWithoutStart = normalized.replace(startRegex, '')
    const endRegex = /\n\s*---\s*\n/
    const endMatch = contentWithoutStart.match(endRegex)
    if (!endMatch) return { frontmatter: {}, content: raw }

    const frontmatterBlock = contentWithoutStart.slice(0, endMatch.index)
    const content = contentWithoutStart.slice(endMatch.index + endMatch[0].length).trim()

    const frontmatter = {}
    frontmatterBlock.split('\n').forEach(line => {
        line = line.trim()
        if (!line || line.startsWith('#')) return
        const colonIndex = line.indexOf(':')
        if (colonIndex === -1) return
        const key = line.slice(0, colonIndex).trim()
        let value = line.slice(colonIndex + 1).trim()
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
        }
        frontmatter[key] = value
    })

    return { frontmatter, content }
}

// Get all blog posts with frontmatter
export function getAllPosts() {
    const posts = []

    for (const [path, content] of Object.entries(blogModules)) {
        const raw = typeof content === 'string' ? content : (content && content.default) || ''
        if (typeof raw !== 'string') continue

        const { frontmatter } = parseFrontmatter(raw)
        const slug = path.split('/').pop().replace('.md', '')

        if (frontmatter.status === 'Published' && (!frontmatter.type || frontmatter.type.toLowerCase() === 'post')) {
            posts.push({
                slug,
                title: frontmatter.title || slug,
                date: frontmatter.date ? new Date(frontmatter.date) : new Date(),
                summary: frontmatter.summary || '',
                tags: frontmatter.tags ? frontmatter.tags.split(',').map(t => t.trim()) : [],
                ...frontmatter
            })
        }
    }

    return posts.sort((a, b) => b.date - a.date)
}

// Get single post Vue component (for rendering)
export function getPostComponent(slug) {
    const path = `/src/resources/blog/${slug}.md`
    return blogComponents[path] || null
}

// Get single post frontmatter + content
export function getPost(slug) {
    const path = `/src/resources/blog/${slug}.md`
    const raw = blogModules[path]
    if (!raw) return null
    return parseFrontmatter(raw)
}
