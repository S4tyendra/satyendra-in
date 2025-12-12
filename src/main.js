import { ViteSSG } from 'vite-ssg'
import './base.css'
import App from './App.vue'
import Home from './pages/Home.vue'
import Projects from './pages/Projects.vue'
import ProjectDetail from './pages/ProjectDetail.vue'

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
