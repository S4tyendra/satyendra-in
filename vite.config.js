import { defineConfig } from 'vite'
import path from 'node:path'
import fs from 'node:fs'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { codeToHtml, bundledLanguages } from 'shiki'
import MarkdownItAnchor from 'markdown-it-anchor'

const SITE_URL = 'https://satyendra.in'

// Generate sitemap.xml after all pages are built
function generateSitemap() {
  const distDir = path.resolve(__dirname, 'dist')
  const routes = []

  // Recursively find all HTML files
  function findHtmlFiles(dir, basePath = '') {
    if (!fs.existsSync(dir)) return

    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = path.join(basePath, entry.name)

      if (entry.isDirectory()) {
        // Skip assets directory
        if (entry.name === 'assets') continue
        findHtmlFiles(fullPath, relativePath)
      } else if (entry.name.endsWith('.html')) {
        // Convert path to URL
        let urlPath
        if (entry.name === 'index.html') {
          urlPath = basePath ? `/${basePath.replace(/\\/g, '/')}` : '/'
        } else {
          // page.html -> /page
          const pageName = entry.name.replace('.html', '')
          urlPath = basePath
            ? `/${basePath.replace(/\\/g, '/')}/${pageName}`
            : `/${pageName}`
        }

        // Skip routes with :params (dynamic placeholders not replaced)
        if (urlPath.includes(':')) continue

        const stat = fs.statSync(fullPath)
        routes.push({
          url: urlPath,
          lastmod: stat.mtime.toISOString().split('T')[0],
        })
      }
    }
  }

  findHtmlFiles(distDir)

  // Sort routes (home first, then alphabetically)
  routes.sort((a, b) => {
    if (a.url === '/') return -1
    if (b.url === '/') return 1
    return a.url.localeCompare(b.url)
  })

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${SITE_URL}${r.url}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.url === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${r.url === '/' ? '1.0' : r.url.startsWith('/docs') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml)
  console.log(`✓ Sitemap generated with ${routes.length} routes`)
}

// Cache for shiki highlighter
let highlighterPromise = null

// https://vite.dev/config/
export default defineConfig({
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
    },
    includedRoutes(paths, routes) {
      // This is called dynamically, use the export from main.js
      return paths
    },
    onFinished() {
      // Sitemap is generated here after all pages are built
      generateSitemap()
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    tailwindcss(),
    Markdown({
      headEnabled: true,
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        // Anchor links for headers
        md.use(MarkdownItAnchor, {
          permalink: MarkdownItAnchor.permalink.ariaHidden({
            placement: 'before',
            class: 'header-anchor',
            symbol: '#',
          }),
          level: [2, 3, 4],
          slugify: (s) => s.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, ''),
        })
      },

      transforms: {
        async after(code, id) {
          // Extract code blocks and highlight with shiki
          const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g
          let match
          const replacements = []

          while ((match = codeBlockRegex.exec(code)) !== null) {
            const lang = match[1]
            const rawCode = match[2]
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&amp;/g, '&')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")

            if (bundledLanguages[lang]) {
              try {
                const highlighted = await codeToHtml(rawCode, {
                  lang,
                  theme: 'github-dark-dimmed',
                })
                replacements.push({
                  original: match[0],
                  replacement: `<div class="shiki-wrapper">${highlighted}</div>`,
                })
              } catch (e) {
                // Fallback to original if highlighting fails
              }
            }
          }

          for (const { original, replacement } of replacements) {
            code = code.replace(original, replacement)
          }

          return code
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress gray-matter eval warning (build-time only, not shipped)
        if (warning.code === 'EVAL' && warning.id?.includes('gray-matter')) return
        warn(warning)
      },
      output: {
        manualChunks(id) {
          // Only split for client build (node_modules)
          if (id.includes('node_modules')) {
            // Vue ecosystem
            if (id.includes('vue') || id.includes('@vueuse')) {
              return 'vue-vendor'
            }
            // UI libraries
            if (id.includes('reka-ui') || id.includes('vaul-vue') || id.includes('lucide')) {
              return 'ui'
            }
            // Markdown processing (skip shiki - too heavy to chunk safely)
            if (id.includes('markdown-it') || id.includes('gray-matter')) {
              return 'markdown'
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 300,
  },
})
