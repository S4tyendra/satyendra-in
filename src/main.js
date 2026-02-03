import { ViteSSG } from 'vite-ssg'
import './base.css'
import App from './App.vue'
import projectsData from './data/projects.js'
import closedData from './data/closedSrcProjects.js'
import { getAllDocRoutes } from './utils/docs.js'

// Dynamic imports for code-splitting - each page gets its own chunk
const Home = () => import('./pages/Home.vue')
const Projects = () => import('./pages/Projects.vue')
const ProjectDetail = () => import('./pages/ProjectDetail.vue')
const Experience = () => import('./pages/Experience.vue')
const Blog = () => import('./pages/Blog.vue')
const DocsPage = () => import('./pages/DocsPage.vue')
const Photography = () => import('./pages/Photography.vue')
const Services = () => import('./pages/Services.vue')
const DevSecOps = () => import('./pages/DevSecOps.vue')
const ReportDetail = () => import('./pages/ReportDetail.vue')
const Mobile = () => import('./pages/Mobile.vue')
const Contact = () => import('./pages/Contact.vue')

const routes = [
    { path: '/', component: Home },
    { path: '/projects', component: Projects },
    { path: '/projects/:repo', component: ProjectDetail, props: true },
    { path: '/experience', component: Experience },
    { path: '/blog', component: Blog },
    // Docs routes - index, section, and nested slugs
    { path: '/docs', component: DocsPage },
    { path: '/docs/:section', component: DocsPage, props: true },
    { path: '/docs/:section/:slug+', component: DocsPage, props: true },
    { path: '/photography', component: Photography },
    { path: '/services', component: Services },
    { path: '/devsecops', component: DevSecOps },
    { path: '/devsecops/reports/:id', component: ReportDetail, props: true },
    { path: '/mobile', component: Mobile },
    { path: '/contact', component: Contact }
]

// Export for SSG
export const createApp = ViteSSG(
    App,
    { routes, base: import.meta.env.BASE_URL },
    ({ app, router, routes, isClient, initialState }) => {
        // Custom setup hooks can go here
    },
)

export const includedRoutes = (paths, routes) => {
    const allProjects = [...projectsData, ...closedData]
    const projectRoutes = allProjects.map(p => {
        if (!p.link) return null
        const parts = p.link.split('/')
        const name = parts[parts.length - 1] || parts[parts.length - 2]
        return `/projects/${name}`
    }).filter(p => p !== null)

    // Get all doc routes for SSG
    const docRoutes = getAllDocRoutes().map(r => r.path)

    return routes.flatMap(route => {
        if (route.path === '/projects/:repo') {
            return projectRoutes
        }
        // For docs routes with params, return the statically generated paths
        if (route.path.includes('/docs/:')) {
            return docRoutes
        }
        // Skip auth-gated dynamic routes - they can't be pre-rendered
        if (route.path === '/devsecops/reports/:id') {
            return [] // Exclude from SSG, handled client-side only
        }
        return route.path
    })
}
