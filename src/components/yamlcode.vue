<script setup lang='ts'>
// 需要等这个提议合并才能往md文件中传值，到时候就可以自动渲染代码了 https://github.com/unplugin/unplugin-vue-markdown/issues/45
import markdownit from 'markdown-it'

const props = defineProps<{
  code: string
}>()
const result = ref('')
onMounted(async () => {
  // await nextTick()
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
  })
  result.value = md.render(`\`\`\`yaml ${props.code}\`\`\``)
})
</script>

<template>
  <div v-html="result" />
</template>
