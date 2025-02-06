<script setup lang='ts'>
const model = defineModel<Log>({
  default: defaultLog,
})
const rules = {
  enable: [{ required: true, message: '请选择启用', trigger: 'blur' }],
  project: [{ required: true, message: '请输入日志项目', trigger: 'blur' }],
  logstore: [{ required: true, message: '请输入日志库', trigger: 'blur' }],
}
</script>

<template>
  <div>
    <el-form :model="model" label-width="auto" :rule="rules">
      <el-form-item label="启用">
        <el-switch v-model="model.enable" />
      </el-form-item>
      <el-form-item v-if="model.enable" label="自动配置">
        <el-switch v-model="model.auto" />
      </el-form-item>
      <template v-if="!model.auto && model.enable">
        <el-form-item label="日志项目" prop="project">
          <el-input v-model="model.project" placeholder="" />
        </el-form-item>
        <el-form-item label="日志库" prop="logstore">
          <el-input v-model="model.logstore" placeholder="" />
        </el-form-item>
        <el-form-item label="日志分割规则">
          <el-switch v-model="model.logBeginRule" />
        </el-form-item>
        <el-form-item label="请求级别指标">
          <el-switch v-model="model.enableRequestMetrics" />
        </el-form-item>
        <el-form-item label="实例级别指标">
          <el-switch v-model="model.enableInstanceMetrics" />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
