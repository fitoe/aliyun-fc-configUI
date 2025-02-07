<script setup lang='ts'>
function loadfile() {
  console.log('loadfile')
}
</script>

<template>
  <div class="pb-3">
    <el-button type="default" icon="i-ep-upload" @click="loadfile">导入 s.yaml</el-button>
  </div>
</template>
