<script setup lang='ts'>
const model = defineModel<string[]>({
  default: [],
})
function addLayer() {
  model.value.push('')
}
function removeLayer(index: number) {
  model.value.splice(index, 1)
}
</script>

<template>
  <div>
    <el-button type="default" plain size="small" icon="i-ep-plus" @click="addLayer">添加层</el-button>
    <div class="py-3 space-y-3">
      <div v-for="(item, index) in model" :key="index" class="flex gap-x-3">
        <el-input v-model="model[index]" placeholder="名称" />
        <el-link type="danger" icon="i-ep-delete" @click="removeLayer(index)" />
      </div>
    </div>
  </div>
</template>
