import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './base.css'
import App from './App.vue'
import './store.js'

const routes = [
    { path: '/', component: () => import('./pages/Home.vue') },
    { path: '/projects', component: () => import('./pages/Projects.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .mount('#app')
