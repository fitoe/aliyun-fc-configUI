<script setup lang='ts'>
import { computed } from 'vue'

const model = defineModel<Nas>({
  default: defaultNas,
})

// 添加计算属性
const nasConfig = computed(() => {
  if (model.value.auto)
    return 'auto'
  const { auto, enable, ...nasProps } = model.value
  nasProps.mountPoints = nasProps.mountPoints.map(item => ({
    enableTLS: item.enableTLS,
    serverAddr: `${item.serverAddr}:${item.localDir}`,
    mountDir: item.mountDir,
  }))
  return nasProps
})

// 向父组件暴露nasConfig
defineExpose({
  nasConfig,
})

const rules = {
  enable: [{ required: true, message: '请选择启用', trigger: 'blur' }],
  mountPoints: [{ required: true, message: '请添加挂载点', trigger: 'blur' }],
}

function addMountPoint() {
  model.value.mountPoints.push({
    enableTLS: false,
    serverAddr: '',
    mountDir: '',
    localDir: '',
  })
}

function deleteMountPoint(index: number) {
  model.value.mountPoints.splice(index, 1)
}
</script>

<template>
  <div>
    <el-form :model="model" label-width="auto" :rule="rules">
      <el-form-item label="挂载NAS">
        <el-switch v-model="model.enable" />
      </el-form-item>
      <el-form-item v-if="model.enable" label="自动配置">
        <el-switch v-model="model.auto" />
      </el-form-item>
      <template v-if="!model.auto && model.enable">
        <el-form-item label="用户组" prop="groupId">
          <el-input v-model.number="model.groupId" placeholder="0" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model.number="model.userId" placeholder="0" />
        </el-form-item>
        <div class="block w-full space-y-3">
          <el-button type="primary" size="small" icon="i-ep-plus" @click="addMountPoint">添加挂载点</el-button>
          <div v-for="(item, index) in model.mountPoints" :key="index" class="rounded-md bg-gray-100 p-3">
            <el-form-item label="挂载点" prop="mountPoints">
              <el-input v-model="model.mountPoints[index].serverAddr" placeholder="" />
            </el-form-item>
            <el-form-item label="远端目录" prop="mountPoints">
              <el-input v-model="model.mountPoints[index].mountDir" placeholder="" />
            </el-form-item>
            <el-form-item label="本地目录" prop="mountPoints">
              <el-input v-model="model.mountPoints[index].localDir" placeholder="" />
            </el-form-item>
            <el-form-item label="是否启用TLS" prop="mountPoints">
              <el-switch v-model="model.mountPoints[index].enableTLS" />
            </el-form-item>
            <el-link type="danger" icon="i-ep-delete" class="flex items-center gap-x-2" @click="deleteMountPoint(index)">删除</el-link>
          </div>
        </div>
      </template>
    </el-form>
  </div>
</template>
