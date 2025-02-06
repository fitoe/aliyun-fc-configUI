<script setup lang='ts'>
const props = defineProps<{
  basic: Basic
}>()
const model = defineModel<Runtime>({
  default: defaultRuntime,
})
watch(() => props.basic.functionType, (n) => {
  if (n === 'event') {
    model.value.instanceConcurrency = 1 // 内置运行时只能设置为1
  }
}, { immediate: true, deep: true })
const rules = reactive({
  runtime: [{ required: true, message: '请选择运行环境', trigger: 'change' }],
  command: [{ required: true, message: '请输入启动命令', trigger: 'blur' }],
  port: [{ required: true, message: '请输入监听端口', trigger: 'blur' }],
  instanceConcurrency: [{ required: true, message: '请输入单实例并发度', trigger: 'blur' }],
  timeout: [{ required: true, message: '请输入超时时间', trigger: 'blur' }],
  code: [{ required: true, message: '请输入代码目录', trigger: 'blur' }],
  handler: [{ required: true, message: '请输入处理函数', trigger: 'blur' }],
})
</script>

<template>
  <div>
    <el-form :model="model" label-width="auto" :rule="rules">
      <el-form-item label="运行环境">
        <el-cascader v-model="model.runtime" class="w-full" :options="runtimes" :props="{ expandTrigger: 'hover' }" />
      </el-form-item>
      <template v-if="['event', 'web'].includes(props.basic.functionType)">
        <el-form-item label="启动命令" prop="command">
          <el-input v-model="model.command" placeholder="node ./index.js" />
        </el-form-item>
      </template>
      <template v-if="props.basic.functionType === 'web'">
        <el-form-item label="监听端口" prop="port">
          <el-input v-model.number="model.port" placeholder="3000" />
        </el-form-item>
        <el-form-item label="单实例并发度" prop="instanceConcurrency">
          <el-input v-model.number="model.instanceConcurrency" placeholder="请输入超时时间" />
        </el-form-item>
      </template>
      <el-form-item label="超时时间" prop="timeout">
        <el-input v-model.number="model.timeout" placeholder="请输入超时时间" />
      </el-form-item>
      <el-form-item label="代码目录" prop="code">
        <el-input v-model="model.code" placeholder="./" />
      </el-form-item>
    </el-form>
  </div>
</template>
