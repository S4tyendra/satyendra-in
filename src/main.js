import { ViteSSG } from 'vite-ssg'
import './base.css'
import App from './App.vue'
import Home from './pages/Home.vue'
import Projects from './pages/Projects.vue'
import ProjectDetail from './pages/ProjectDetail.vue'
import projectsData from './data/projects.js'
import closedData from './data/closedSrcProjects.js'

const routes = [
    { path: '/', component: Home },
    { path: '/projects', component: Projects },
    { path: '/project/:repo', component: ProjectDetail, props: true }
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
        return `/project/${name}`
    }).filter(p => p !== null)

    return routes.flatMap(route => {
        return route.path === '/project/:repo'
            ? projectRoutes
            : route.path
    })
}
