<template>
  <nav class="space-y-2 fade-in-up" style="animation-delay: 200ms;">
    <NavGroup num="01" title="Engineering">
      <NavItem :icon="CodeIcon" label="Projects" code="DIR_01" href="/projects" />
      <NavItem :icon="FlaskIcon" label="Open Source" code="GIT_REPO" />
    </NavGroup>

    <NavGroup num="02" title="Knowledge">
      <NavItem :icon="PenIcon" label="Writing" code="LOGS" />
      <NavItem :icon="BookIcon" label="Docs" code="MAN" />
    </NavGroup>

    <NavGroup num="03" title="Studio">
      <NavItem :icon="CameraIcon" label="Photography" code="RAW" />
      <NavItem :icon="VideoIcon" label="Videos" code="EXEC" />
    </NavGroup>
  </nav>
</template>

<script setup>
import NavGroup from './NavGroup.vue'
import NavItem from './NavItem.vue'
import CodeIcon from './icons/CodeIcon.vue'
import FlaskIcon from './icons/FlaskIcon.vue'
import PenIcon from './icons/PenIcon.vue'
import BookIcon from './icons/BookIcon.vue'
import CameraIcon from './icons/CameraIcon.vue'
import VideoIcon from './icons/VideoIcon.vue'
</script>
