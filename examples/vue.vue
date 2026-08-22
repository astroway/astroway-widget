<template>
  <div data-astroway-widget="natal" :data-lang="lang" :data-theme="theme"></div>
</template>

<script setup>
import { onMounted } from 'vue'

const SRC = 'https://app.astroway.info/widget.js'
const props = defineProps({
  lang: { type: String, default: 'en' },
  theme: { type: String, default: 'dark' },
})

onMounted(() => {
  if (document.querySelector(`script[src="${SRC}"]`)) return
  const s = document.createElement('script')
  s.src = SRC
  s.async = true
  document.body.appendChild(s)
})
</script>
