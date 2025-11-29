<template>
  <nav class="space-y-2 fade-in-up" style="animation-delay: 200ms;">
    <NavGroup ref="groupEngineering" num="01" title="Engineering">
      <NavItem :icon="CodeIcon" label="Projects" code="DIR_01 [02]" href="/projects" />
      <NavItem :icon="FlaskIcon" label="Experience" code="GIT_REPO [03]" href="/experience" />
    </NavGroup>

    <NavGroup ref="groupKnowledge" num="04" title="Knowledge">
      <NavItem :icon="PenIcon" label="Blog" code="LOGS [05]" href="/blog" />
      <NavItem :icon="BookIcon" label="Docs" code="MAN [06]" href="/docs" />
    </NavGroup>

    <NavGroup ref="groupStudio" num="07" title="Studio">
      <NavItem :icon="CameraIcon" label="Photography" code="RAW [08]" href="/photography" />
      <NavItem :icon="VideoIcon" label="Services" code="EXEC [09]" href="/services" />
    </NavGroup>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import NavGroup from './NavGroup.vue'
import NavItem from './NavItem.vue'
import CodeIcon from './icons/CodeIcon.vue'
import FlaskIcon from './icons/FlaskIcon.vue'
import PenIcon from './icons/PenIcon.vue'
import BookIcon from './icons/BookIcon.vue'
import CameraIcon from './icons/CameraIcon.vue'
import VideoIcon from './icons/VideoIcon.vue'

const router = useRouter()
const groupEngineering = ref(null)
const groupKnowledge = ref(null)
const groupStudio = ref(null)

const handleKeydown = (e) => {
  if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return

  switch(e.key) {
    case '1':
      groupEngineering.value?.toggle()
      break
    case '2':
      router.push('/projects')
      break
    case '3':
      router.push('/experience')
      break
    case '4':
      groupKnowledge.value?.toggle()
      break
    case '5':
      router.push('/blog')
      break
    case '6':
      router.push('/docs')
      break
    case '7':
      groupStudio.value?.toggle()
      break
    case '8':
      router.push('/photography')
      break
    case '9':
      router.push('/services')
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
