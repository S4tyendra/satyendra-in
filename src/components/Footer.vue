<script setup>
import SiteIcon from './SiteIcon.vue'
</script>
<template>
  <footer class="site-footer">
    <div class="footer-top"><div><p class="eyebrow">Get in touch</p><h2>Have a role or a project in mind?</h2></div><a href="mailto:hello@satyendra.in" class="footer-email">hello@satyendra.in <SiteIcon name="external" /></a></div>
    <div class="footer-bottom"><span>© {{ new Date().getFullYear() }} Bongi Satyendra</span><nav aria-label="More links"><router-link to="/docs">Docs</router-link><router-link to="/photography">Photography</router-link><router-link to="/services">Services</router-link><a href="https://github.com/s4tyendra" target="_blank" rel="noopener noreferrer">GitHub <SiteIcon name="external" /></a><a href="https://linkedin.com/in/s4tyendra" target="_blank" rel="noopener noreferrer">LinkedIn <SiteIcon name="external" /></a></nav></div>
  </footer>
</template>
