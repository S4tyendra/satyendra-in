import { ViteSSG } from 'vite-ssg'
import './base.css'
import App from './App.vue'
import Home from './pages/Home.vue'
import Projects from './pages/Projects.vue'
import ProjectDetail from './pages/ProjectDetail.vue'
import Experience from './pages/Experience.vue'
import Blog from './pages/Blog.vue'
import Docs from './pages/Docs.vue'
import Photography from './pages/Photography.vue'
import Services from './pages/Services.vue'
import DevSecOps from './pages/DevSecOps.vue'
import ReportDetail from './pages/ReportDetail.vue'
import projectsData from './data/projects.js'
import closedData from './data/closedSrcProjects.js'

const routes = [
    { path: '/', component: Home },
    { path: '/projects', component: Projects },
    { path: '/projects/:repo', component: ProjectDetail, props: true },
    { path: '/experience', component: Experience },
    { path: '/blog', component: Blog },
    { path: '/docs', component: Docs },
    { path: '/photography', component: Photography },
    { path: '/services', component: Services },
    { path: '/devsecops', component: DevSecOps },
    { path: '/devsecops/reports/:id', component: ReportDetail, props: true }
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

    return routes.flatMap(route => {
        return route.path === '/projects/:repo'
            ? projectRoutes
            : route.path
    })
}
