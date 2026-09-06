<template>
  <div class="not-found fade-in-up">
    <div class="error-code" aria-hidden="true">404</div>

    <div class="message">
      <h1 class="page-title text-2xl mb-2">No such file.</h1>
      <p class="sub">That path isn’t in this tree.</p>
    </div>

    <div class="terminal-hint">
      <code>$ cd <span class="path">{{ attemptedPath }}</span></code>
      <code class="error-line">cd: {{ attemptedPath }}: No such file or directory</code>
    </div>

    <div class="actions">
      <router-link to="/" class="btn-primary">cd ~</router-link>
      <button @click="goBack" class="btn-secondary">cd ..</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'

const route = useRoute()
const router = useRouter()

const attemptedPath = computed(() => route.fullPath)

const goBack = () => {
  if (window.history.length > 2) {
    router.back()
  } else {
    router.push('/')
  }
}

useHead({
  title: '404 | Satyendra',
  meta: [
    { name: 'description', content: 'The page you are looking for does not exist.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem 0 3rem;
}

.error-code {
  font-size: clamp(4.5rem, 18vw, 8rem);
  font-weight: 600;
  font-family: var(--font-serif);
  letter-spacing: -0.06em;
  color: var(--color-text-main);
  line-height: 0.9;
  margin-bottom: 1.25rem;
}

.message {
  margin-bottom: 1.5rem;
}

.message .sub {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.terminal-hint {
  background: var(--color-bg-inset);
  border: 1px solid var(--color-line);
  border-radius: 0.4rem;
  padding: 0.85rem 1rem;
  margin-bottom: 1.5rem;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  width: 100%;
  overflow-x: auto;
}

.terminal-hint code {
  display: block;
  color: var(--color-text-muted);
}

.terminal-hint .path {
  color: var(--color-text-main);
}

.terminal-hint .error-line {
  color: #c45c5c;
  margin-top: 0.25rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.35rem;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background: var(--color-text-main);
  color: var(--color-bg-main);
  border: 1px solid var(--color-text-main);
}

.btn-primary:hover {
  background: #f3ecda;
}

.btn-secondary {
  background: transparent;
  color: var(--color-text-main);
  border: 1px solid var(--color-line);
}

.btn-secondary:hover {
  border-color: var(--color-text-main);
}
</style>
