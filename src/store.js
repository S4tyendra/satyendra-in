import { reactive, watchEffect } from 'vue'

const getInitialTheme = () => {
    if (typeof localStorage !== 'undefined' && 'theme' in localStorage) {
        return localStorage.theme === 'dark'
    }
    if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
}

export const store = reactive({
    isDark: getInitialTheme(),
    isAvatarProcessing: false
})

watchEffect(() => {
    if (store.isDark) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
    }
})
