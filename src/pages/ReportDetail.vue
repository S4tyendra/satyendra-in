<script setup>
import { useHead } from '@vueuse/head'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const reportId = route.params.id || 'buyhatke-2026-01-23-22-00'

// Technical mapping - if we have more reports, we can map them here
// For now, mapping this specific ID to the buyhatke-application.data
const reportMapping = {
    'buyhatke-2026-01-23-22-00': 'buyhatke-application.data'
}

const fileKey = reportMapping[reportId] || reportId

useHead({
    title: `Security Report: ${reportId} | Satyendra`,
    meta: [
        { name: 'robots', content: 'noindex, nofollow' }
    ],
    script: [
        { src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit', async: true, defer: true }
    ]
})

const isLoading = ref(true)
const isSecured = ref(false)
const isAuthenticated = ref(false)
const content = ref('')
const error = ref('')

// Login form
const username = ref('')
const password = ref('')
const turnstileToken = ref('')
const turnstileWidgetId = ref(null)

async function fetchStatus() {
    try {
        const res = await fetch(`https://portfoliogo3apiforai.satyendra.in/iframestatus/${fileKey}`)
        if (!res.ok) throw new Error('Report not found')
        const data = await res.json()

        isSecured.value = data.is_secured
        mimeType.value = data.mime_type

        if (!isSecured.value) {
            await fetchContent()
        } else {
            // Wait for DOM and render Turnstile
            setTimeout(renderTurnstile, 100)
        }
    } catch (e) {
        error.value = e.message
    } finally {
        isLoading.value = false
    }
}

function renderTurnstile() {
    if (window.turnstile) {
        const container = document.querySelector('.cf-turnstile-container')
        if (container && !turnstileWidgetId.value) {
            try {
                turnstileWidgetId.value = window.turnstile.render(container, {
                    sitekey: '0x4AAAAAACLPGzri6Ijzvw5D',
                    theme: 'dark',
                    callback: (token) => {
                        turnstileToken.value = token
                    },
                })
            } catch (e) {
                console.error('Turnstile render failed:', e)
                turnstileWidgetId.value = null
                setTimeout(renderTurnstile, 1000)
            }
        }
    } else {
        // Retry if script not loaded yet
        setTimeout(renderTurnstile, 250)
    }
}

async function handleRetry() {
    error.value = ''
    isAuthenticated.value = false
    turnstileToken.value = ''
    turnstileWidgetId.value = null

    await nextTick()
    setTimeout(renderTurnstile, 150)
}

async function fetchContent() {
    isLoading.value = true
    error.value = ''

    try {
        let options = { method: 'GET' }

        if (isSecured.value) {
            // XOR Login Logic
            const XOR_KEY = "satya"
            const raw = `${username.value}|${password.value}`
            let xor = ""
            for (let i = 0; i < raw.length; i++) {
                xor += String.fromCharCode(raw.charCodeAt(i) ^ XOR_KEY.charCodeAt(i % XOR_KEY.length))
            }
            const loginPayload = btoa(xor)

            options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login: loginPayload,
                    cf_turnstile_response: turnstileToken.value
                })
            }
        }

        const res = await fetch(`https://portfoliogo3apiforai.satyendra.in/iframe/${fileKey}`, options)

        if (res.status === 403) {
            const errData = await res.json()
            throw new Error(errData.error || 'Access Denied')
        }

        if (!res.ok) throw new Error('Failed to load content')

        const text = await res.text()
        content.value = text
        isAuthenticated.value = true
    } catch (e) {
        error.value = e.message
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchStatus()
})

onUnmounted(() => {
    if (turnstileWidgetId.value && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.value)
    }
})
</script>

<template>
    <div class="w-full min-h-[60vh] flex flex-col items-center py-12 px-6">
        <div class="max-w-5xl w-full">
            <!-- Loading -->
            <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 gap-4">
                <div class="w-10 h-10 border-2 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
                <p class="text-teal-500/50 font-mono text-xs animate-pulse">Loading report...</p>
            </div>

            <!-- Error -->
            <div v-else-if="error && !isAuthenticated"
                class="p-8 rounded-2xl bg-red-500/5 border border-red-500/20 text-center">
                <div class="text-red-400 mb-4">
                    <svg class="w-12 h-12 mx-auto mb-2" viewbox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <path
                            d="M12 9v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p class="font-bold text-lg">Failed to authenticate</p>
                </div>
                <p class="text-text-muted mb-6">{{ error }}</p>
                <button v-if="error.includes('Denied') || error.includes('token')" @click="handleRetry"
                    class="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm">
                    Retry login?
                </button>
            </div>

            <!-- Content (renders inline with parent scroll) -->
            <div v-else-if="isAuthenticated" class="w-full">
                <div v-if="fileKey.endsWith('.data')" v-html="content" class="report-content"></div>
                <pre v-else
                    class="font-mono text-sm leading-relaxed text-teal-50/90 whitespace-pre-wrap p-6 bg-white/5 rounded-xl border border-white/10">{{ content }}</pre>
            </div>

            <!-- Login Form -->
            <div v-else-if="isSecured" class="max-w-md mx-auto w-full">
                <div class="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <div class="text-center mb-8">
                        <div
                            class="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-500/20">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" class="text-teal-400">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h2 class="text-xl font-bold text-text-main mb-2">Failed to authenticate</h2>
                        <p class="text-sm text-text-muted">Enter credentials to unlock this security audit report.</p>
                    </div>

                    <form @submit.prevent="fetchContent" class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-xs font-mono uppercase tracking-wider text-text-muted ml-1">Username
                                Provided</label>
                            <input v-model="username" type="text" required placeholder="X-ID-029"
                                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 transition-all font-mono text-sm" />
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-mono uppercase tracking-wider text-text-muted ml-1">Password
                                Provided</label>
                            <input v-model="password" type="password" required placeholder="••••••••"
                                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 transition-all font-mono text-sm" />
                        </div>

                        <div class="flex justify-center pt-4">
                            <!-- Cloudflare Turnstile (Manually Rendered) -->
                            <div class="cf-turnstile-container"></div>
                        </div>

                        <p v-if="error" class="text-red-400 text-xs text-center font-mono">{{ error }}</p>

                        <button type="submit" :disabled="isLoading || !turnstileToken"
                            class="w-full py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-900/20 mt-4 flex items-center justify-center gap-2">
                            <span>Get Report</span>
                            <svg v-if="isLoading" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
                                    fill="none"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.1);
}
</style>
