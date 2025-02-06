<script setup lang='ts'>
const model = defineModel<KeyValue[]>({
  default: [],
})
function addEnv() {
  model.value.push({ key: '', value: '' })
}
function removeEnv(index: number) {
  model.value.splice(index, 1)
}
</script>

<template>
  <div>
    <el-button type="default" plain size="small" icon="i-ep-plus" @click="addEnv">添加变量</el-button>
    <div class="grid grid-cols-12 gap-3 py-3">
      <template v-for="(item, index) in model" :key="index">
        <div class="col-span-5">
          <el-input v-model="item.key" placeholder="名称" />
        </div>
        <div class="col-span-6">
          <el-input v-model="item.value" placeholder="值" />
        </div>
        <el-link class="col-span-1" type="danger" icon="i-ep-delete" @click="removeEnv(index)" />
      </template>
    </div>
  </div>
</template>
