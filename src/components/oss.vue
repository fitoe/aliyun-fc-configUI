<script setup lang='ts'>
import { computed } from 'vue'

const model = defineModel<Oss>({
  default: defaultOss,
})

// 添加计算属性
const ossConfig = computed(() => {
  const { enable, mountPoints, ...ossProps } = model.value
  return {
    ...ossProps,
    mountPoints: mountPoints.map(item => ({
      bucketName: item.bucketName,
      endpoint: `http://oss-${item.region}-internal.aliyuncs.com`,
      bucketPath: item.bucketPath,
      mountDir: item.mountDir,
      readOnly: item.readOnly,
    })),
  }
})

// 向父组件暴露ossConfig
defineExpose({
  ossConfig,
})

const rules = {
  enable: [{ required: true, message: '请选择启用', trigger: 'blur' }],
  mountPoints: [{ required: true, message: '请添加挂载点', trigger: 'blur' }],
}

function addMountPoint() {
  model.value.mountPoints.push({
    region: '',
    bucketName: 'bucketname',
    bucketPath: '/',
    mountDir: '/oss',
    readOnly: false,
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
      <template v-if="model.enable">
        <div class="block w-full space-y-3">
          <el-button type="primary" size="small" icon="i-ep-plus" @click="addMountPoint">添加挂载点</el-button>
          <div v-for="(item, index) in model.mountPoints" :key="index" class="rounded-md bg-gray-100 p-3">
            <el-form-item label="所在区域" prop="region">
              <el-select v-model="model.mountPoints[index].region" placeholder="请选择">
                <el-option-group v-for="item in regions" :key="item.label" :label="item.label">
                  <el-option v-for="child in item.children" :key="child.value" :label="child.label" :value="child.value" />
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item label="Bucket名称" prop="mountPoints">
              <el-input v-model="model.mountPoints[index].bucketName" placeholder="" />
            </el-form-item>
            <el-form-item label="Bucket子目录" prop="mountPoints">
              <el-input v-model="model.mountPoints[index].bucketPath" placeholder="" />
            </el-form-item>
            <el-form-item label="本地目录" prop="mountPoints">
              <el-input v-model="model.mountPoints[index].mountDir" placeholder="" />
            </el-form-item>
            <el-form-item label="是否只读" prop="mountPoints">
              <el-switch v-model="model.mountPoints[index].readOnly" />
            </el-form-item>
            <el-link type="danger" icon="i-ep-delete" class="flex items-center gap-x-2" @click="deleteMountPoint(index)">删除</el-link>
          </div>
        </div>
      </template>
    </el-form>
  </div>
</template>
