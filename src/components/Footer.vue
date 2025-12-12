<template>
  <div class="footer-wrapper">
    <div v-if="isScrolled" class="h-[120px] w-full"></div>

    <footer :class="[
      'transition-all duration-300 ease-in-out',
      isScrolled
        ? 'fixed bottom-0 left-0 w-full z-50 bg-bg-main/95 backdrop-blur-md border-t border-text-main/10 px-4 h-8 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'
        : 'fade-in-up pt-8 border-t border-text-main/10 flex flex-col gap-4'
    ]" :style="!isScrolled ? { animationDelay: '300ms' } : {}">
      <div v-if="!isScrolled" class="w-full flex flex-col gap-4">
        <div class="flex justify-between items-center font-mono text-[9px] uppercase tracking-wider text-text-main/40">
          <div class="flex items-center gap-2">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-text-main"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-text-main"></span>
            </span>
            <span>System Online</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-text-main/70">{{ currentTime }}</span>
          </div>
        </div>

        <div class="flex justify-between items-end">
          <div class="flex flex-col gap-1">
            <span class="text-[10px] text-text-main/50">Last commit:
              <a v-if="lastCommitUrl" :href="lastCommitUrl" target="_blank" rel="noopener noreferrer"
                class="hover:text-green-400 transition-colors">{{ lastCommitText }}</a>
              <span v-else>{{ lastCommitText }}</span>
            </span>
            <a href="mailto:hello@satyendra.in"
              class="text-xs text-text-main/80 hover:text-green-400 transition-colors flex items-center gap-1 group">
              <span>hello@satyendra.in</span>
              <ArrowRightIcon />
            </a>
          </div>
          <div class="flex flex-col items-end gap-1">
            <div class="flex items-center gap-2">
              <a href="https://github.com/s4tyendra" target="_blank" rel="noopener noreferrer"
                class="text-text-main/80 hover:text-green-400 transition-colors">
                <GithubIcon class="w-3 h-3" />
              </a>
              <a href="https://linkedin.com/in/s4tyendra" target="_blank" rel="noopener noreferrer"
                class="text-text-main/80 hover:text-green-400 transition-colors">
                <LinkedinIcon class="w-3 h-3" />
              </a>
              <div
                class="px-1.5 py-1.5 rounded border border-green-500/20 bg-green-500/5 text-[9px] font-mono text-text-main/80 flex items-center gap-1 cursor-help"
                title="Available for hire">
                <div class="w-1.5 h-1.5 bg-text-main/50 rounded-sm animate-pulse"></div>
                <span>HIRE ME</span>
              </div>
            </div>
            <div class="font-mono text-[9px] text-text-main/40">© {{ new Date().getFullYear() }} SATYENDRA</div>
          </div>
        </div>
      </div>

      <div v-else class="w-full flex justify-between items-center font-mono text-[10px] text-text-main/60">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <span class="relative flex h-1.5 w-1.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span>Online</span>
          </div>
          <span class="text-text-main/20">|</span>
          <span>{{ currentTime }}</span>
        </div>

        <div class="flex items-center gap-3">
          <a href="mailto:hello@satyendra.in" class="hover:text-green-400 transition-colors">Contact</a>
          <span class="text-text-main/20">|</span>
          <span>© {{ new Date().getFullYear() }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'
import GithubIcon from './icons/GithubIcon.vue'
import LinkedinIcon from './icons/LinkedinIcon.vue'

defineProps({
  isScrolled: Boolean
})

const currentTime = ref(new Date().toISOString().split('T')[1].split('.')[0] + ' UTC')
const lastCommitText = ref('today')
const lastCommitUrl = ref('')
let timeInterval

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + " years ago"

  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + " months ago"

  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + " days ago"

  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + " hours ago"

  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + " minutes ago"

  return "just now"
}

onMounted(() => {
  timeInterval = setInterval(() => {
    currentTime.value = new Date().toISOString().split('T')[1].split('.')[0] + ' UTC'
  }, 1000)

  fetch('https://api.github.com/users/s4tyendra/events')
    .then(res => res.json())
    .then(events => {
      if (!Array.isArray(events)) return

      const lastPush = events
        .filter(e => e.type === "PushEvent")
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

      if (lastPush) {
        lastCommitText.value = formatTimeAgo(lastPush.created_at)
        lastCommitUrl.value = `https://github.com/${lastPush.repo.name}/compare/${lastPush.payload.before}...${lastPush.payload.head}`
      }
    })
    .catch(e => console.error(e))
})

onUnmounted(() => {
  clearInterval(timeInterval)
})
</script>
