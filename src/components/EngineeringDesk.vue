<script setup>
import SiteIcon from './SiteIcon.vue'
import { ref, computed } from 'vue'
const selected = ref(0)
const layers = [
  { name: 'Cloud & security', short: 'Cloud & security', title: 'Cloud infrastructure & security', description: 'Deployments, reverse proxies, monitoring, and security. My work includes campus servers at IIIT Kota and cloud infrastructure at Neosurge.', tags: ['Linux', 'Docker', 'Security'], href: '/devsecops', action: 'View infrastructure work', symbol: '01' },
  { name: 'APIs', short: 'APIs', title: 'Backend development', description: 'APIs, background jobs, and data services. I built the backend behind Mino Money and maintain my own developer tools.', tags: ['Go', 'Python', 'APIs'], href: '/projects?type=opensource', action: 'Explore the source', symbol: '02' },
  { name: 'Apps & web', short: 'Apps / web', title: 'Application development', description: 'Mobile and web interfaces, application logic, and releases. At Neosurge, my app work includes Aavak, Octaraa, and Mino Money.', tags: ['Flutter', 'Vue', 'Applications'], href: '/projects', action: 'View application projects', symbol: '03' },
]
const current = computed(() => layers[selected.value])
function move(event) {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  selected.value = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (selected.value + (event.key === 'ArrowRight' ? 1 : 2)) % 3
  event.currentTarget.querySelectorAll('[role=tab]')[selected.value].focus()
}
</script>
<template>
  <div class="engineering-desk">
    <div class="desk-heading"><span class="desk-dot"></span><span>What I work on</span><span aria-hidden="true"><SiteIcon name="downLeft" /></span></div>
    <div class="layer-tabs" role="tablist" aria-label="Explore my engineering work" @keydown="move">
      <button v-for="(layer, index) in layers" :id="`layer-tab-${index}`" :key="layer.name" role="tab" :aria-selected="selected === index" :tabindex="selected === index ? 0 : -1" aria-controls="layer-panel" @click="selected = index"><span>{{ layer.symbol }}</span>{{ layer.short }}</button>
    </div>
    <div id="layer-panel" role="tabpanel" :aria-labelledby="`layer-tab-${selected}`" tabindex="0" class="layer-panel">
      <div class="stack-drawing" :class="`layer-selected-${selected}`" aria-hidden="true">
        <div class="stack-sheet sheet-cloud"><span>Cloud &amp; security</span><i></i><i></i><i></i></div>
        <div class="stack-sheet sheet-api"><span>Backend</span><b><SiteIcon name="exchange" /></b><i></i><i></i></div>
        <div class="stack-sheet sheet-app"><span>Application</span><div class="mini-layout"><i></i><i></i><i></i></div></div>
      </div>
      <Transition name="desk-copy" mode="out-in"><div :key="selected" class="layer-copy"><p class="desk-counter">{{ current.symbol }} / {{ current.name }}</p><h2>{{ current.title }}</h2><p>{{ current.description }}</p><div class="desk-tags"><span v-for="tag in current.tags" :key="tag">{{ tag }}</span></div><router-link :to="current.href">{{ current.action }} <span aria-hidden="true"><SiteIcon name="external" /></span></router-link></div></Transition>
    </div>
    <p class="desk-hint">Pick a layer to explore my work <span aria-hidden="true"><SiteIcon name="up" /></span></p>
  </div>
</template>
<style scoped>
.engineering-desk { background: #123139; border: 1px solid #355057; padding: 22px; border-radius: 8px; box-shadow: 12px 12px 0 #04171c; transform: rotate(1deg); }
.desk-heading { display: flex; align-items: center; gap: 9px; color: #b9c9c6; font-size: 12px; }
.desk-heading > span:last-child { margin-left: auto; font-size: 22px; color: #efb17c; }
.desk-dot { width: 7px; height: 7px; border-radius: 50%; background: #efb17c; }
.layer-tabs { display: grid; grid-template-columns: 1.5fr .7fr 1fr; gap: 6px; margin-top: 20px; }
.layer-tabs button { padding: 10px 8px; min-height: 52px; font-size: 12px; border: 1px solid #426068; border-radius: 3px; text-align: left; transition: background .2s, color .2s; }
.layer-tabs button span { display: block; font-size: 10px; margin-bottom: 4px; opacity: .65; }
.layer-tabs button[aria-selected=true] { background: #e6dec8; color: #082026; border-color: #e6dec8; }
.stack-drawing { position: relative; height: 235px; margin: 4px 0 10px; perspective: 700px; }
.stack-sheet { position: absolute; width: 210px; height: 105px; left: calc(50% - 105px); border: 1px solid #809b96; border-radius: 6px; background: #23464c; transform: rotateX(48deg) rotateZ(-25deg); transition: transform .5s, background .5s, border-color .5s; box-shadow: -6px 10px 0 #071e2455; padding: 12px 16px; }
.stack-sheet > span { font-size: 12px; }
.sheet-cloud { top: 115px; }
.sheet-api { top: 69px; }
.sheet-app { top: 23px; }
.stack-sheet i { display: inline-block; width: 34px; height: 13px; border: 1px solid currentColor; opacity: .5; margin: 8px 4px 0 0; border-radius: 2px; }
.sheet-cloud i { display: block; width: 90%; height: 7px; margin-top: 7px; }
.sheet-api b { float: right; font-size: 40px; font-weight: 400; line-height: 1; }
.mini-layout { display: flex; gap: 8px; }
.mini-layout i:first-child { width: 45px; height: 42px; }
.mini-layout i { width: 70px; height: 22px; }
.layer-selected-0 .sheet-cloud, .layer-selected-1 .sheet-api, .layer-selected-2 .sheet-app { background: #d4dfb6; color: #183b37; border-color: #eaf4cf; transform: translateY(-12px) translateX(14px) rotateX(42deg) rotateZ(-20deg); }
.layer-panel:focus-visible { outline-offset: 5px; }
.layer-copy { min-height: 218px; }
.desk-counter { font-size: 11px; color: #efb17c; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
.layer-copy h2 { font-size: 25px; letter-spacing: -.8px; margin-bottom: 12px; }
.layer-copy > p:not(.desk-counter) { font-size: 14px; line-height: 1.65; color: #c0cecb; }
.desk-tags { display: flex; gap: 8px; margin: 14px 0 8px; flex-wrap: wrap; }
.desk-tags span { font-size: 11px; padding: 4px 8px; border: 1px solid #426068; border-radius: 3px; }
.layer-copy a { min-height: 44px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; }
.layer-copy a:hover { color: #efb17c; }
.desk-hint { font-size: 11px; color: #9fb5b0; padding-top: 14px; border-top: 1px solid #355057; display: flex; justify-content: space-between; }
.desk-copy-enter-active,.desk-copy-leave-active { transition: opacity .13s, transform .13s; }
.desk-copy-enter-from { opacity: 0; transform: translateY(6px); }
.desk-copy-leave-to { opacity: 0; transform: translateY(-6px); }
@media(max-width:700px) { .engineering-desk { transform: none; box-shadow: 6px 6px 0 #04171c; padding: 18px; } .stack-drawing { height: 210px; } .layer-copy { min-height: 235px; } }
@media(prefers-reduced-motion: reduce) { .stack-sheet { transition: none; } }
</style>
