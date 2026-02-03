import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { codeToHtml, bundledLanguages } from 'shiki'
import MarkdownItAnchor from 'markdown-it-anchor'

// Cache for shiki highlighter
let highlighterPromise = null

// https://vite.dev/config/
export default defineConfig({
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
})
