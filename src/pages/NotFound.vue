<template>
  <div class="not-found fade-in-up">
    <!-- Glitch 404 -->
    <div class="error-code" data-text="404">
      <span>4</span>
      <span class="zero">0</span>
      <span>4</span>
    </div>

    <!-- Message -->
    <div class="message">
      <h1>Page Not Found</h1>
      <p class="sub">The page you're looking for doesn't exist or has been moved.</p>
    </div>

    <!-- Terminal-style hint -->
    <div class="terminal-hint">
      <code>$ cd <span class="path">{{ attemptedPath }}</span></code>
      <code class="error-line">-bash: cd: {{ attemptedPath }}: No such file or directory</code>
    </div>

    <!-- Actions -->
    <div class="actions">
      <router-link to="/" class="btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Go Home
      </router-link>
      <button @click="goBack" class="btn-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Go Back
      </button>
    </div>

    <!-- Floating particles -->
    <div class="particles">
      <span v-for="n in 20" :key="n" class="particle" :style="particleStyle(n)"></span>
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

const particleStyle = (n) => ({
  '--delay': `${(n * 0.3) % 6}s`,
  '--x': `${Math.random() * 100}%`,
  '--y': `${Math.random() * 100}%`,
  '--size': `${2 + Math.random() * 4}px`,
  '--duration': `${10 + Math.random() * 20}s`
})

useHead({
  title: '404 - Page Not Found | Satyendra',
  meta: [
    { name: 'description', content: 'The page you are looking for does not exist.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<style scoped>
.not-found {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

/* 404 Error Code */
.error-code {
  font-size: clamp(6rem, 20vw, 12rem);
  font-weight: 900;
  font-family: var(--font-mono);
  letter-spacing: -0.02em;
  color: transparent;
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  position: relative;
  line-height: 1;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.1em;
}

.error-code span {
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

.error-code span:nth-child(1) { animation-delay: 0s; }
.error-code span.zero { 
  animation-delay: 0.2s;
  animation-name: pulse-zero;
}
.error-code span:nth-child(3) { animation-delay: 0.4s; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-zero {
  0%, 100% { 
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% { 
    transform: translateY(-10px) scale(1.1);
    opacity: 0.8;
  }
}

/* Glitch effect on hover */
.error-code::before,
.error-code::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  opacity: 0;
  pointer-events: none;
}

.not-found:hover .error-code::before {
  animation: glitch-1 0.3s linear infinite;
  opacity: 0.8;
}

.not-found:hover .error-code::after {
  animation: glitch-2 0.3s linear infinite;
  opacity: 0.8;
}

@keyframes glitch-1 {
  0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
  20% { clip-path: inset(92% 0 1% 0); transform: translate(1px, -1px); }
  40% { clip-path: inset(43% 0 1% 0); transform: translate(-1px, 2px); }
  60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, -2px); }
  80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, 1px); }
  100% { clip-path: inset(58% 0 43% 0); transform: translate(2px, 2px); }
}

@keyframes glitch-2 {
  0% { clip-path: inset(65% 0 35% 0); transform: translate(2px, -1px); }
  20% { clip-path: inset(15% 0 75% 0); transform: translate(-1px, 2px); }
  40% { clip-path: inset(80% 0 5% 0); transform: translate(1px, -2px); }
  60% { clip-path: inset(30% 0 60% 0); transform: translate(-2px, 1px); }
  80% { clip-path: inset(5% 0 85% 0); transform: translate(2px, 2px); }
  100% { clip-path: inset(45% 0 45% 0); transform: translate(-1px, -1px); }
}

/* Message */
.message {
  margin-bottom: 2rem;
}

.message h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--foreground);
  margin-bottom: 0.5rem;
}

.message .sub {
  color: var(--muted-foreground);
  font-size: 1rem;
  max-width: 400px;
}

/* Terminal hint */
.terminal-hint {
  background: oklch(0.15 0 0);
  border: 1px solid oklch(1 0 0 / 10%);
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  text-align: left;
  max-width: 100%;
  overflow-x: auto;
}

.terminal-hint code {
  display: block;
  color: var(--muted-foreground);
}

.terminal-hint .path {
  color: #10b981;
}

.terminal-hint .error-line {
  color: #ef4444;
  margin-top: 0.25rem;
}

/* Actions */
.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px oklch(0.6 0.2 170 / 30%);
}

.btn-secondary {
  background: oklch(1 0 0 / 5%);
  color: var(--foreground);
  border: 1px solid oklch(1 0 0 / 15%);
}

.btn-secondary:hover {
  background: oklch(1 0 0 / 10%);
  border-color: oklch(1 0 0 / 25%);
}

.icon {
  width: 18px;
  height: 18px;
}

/* Particles */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
}

.particle {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: linear-gradient(135deg, #10b981, #8b5cf6);
  border-radius: 50%;
  opacity: 0.4;
  animation: drift-particle var(--duration) linear infinite;
  animation-delay: var(--delay);
}

@keyframes drift-particle {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.4;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    transform: translate(50px, -100px) scale(0.5);
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 480px) {
  .terminal-hint {
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
  }
  
  .actions {
    flex-direction: column;
    width: 100%;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
