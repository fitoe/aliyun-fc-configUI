<script setup lang='ts'>
interface TriggerHttp {
  triggerName: string
  triggerType: 'http'
  qualifier: string
  description: string
  triggerConfig: {
    methods: string[]
    authType: 'anonymous' | 'function'
    disableURLInternet: boolean
  }
}

const model = defineModel<TriggerHttp>({
  default: {
    triggerName: '',
    triggerType: 'http',
    qualifier: 'LATEST',
    description: '',
    triggerConfig: {
      methods: ['GET', 'POST'],
      authType: 'anonymous',
      disableURLInternet: false,
    },
  },
})

const methodsList = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH']
const authList = [
  { label: '匿名访问', value: 'anonymous' },
  { label: '函数计算', value: 'function' },
]

const rules = {
  'triggerName': [{ required: true, message: '请输入名称', trigger: 'blur' }],
  'qualifier': [{ required: true, message: '请输入版本', trigger: 'blur' }],
  'triggerConfig.methods': [{ required: true, message: '请至少选择一个请求方法', trigger: 'change', type: 'array', min: 1 }],
}
</script>

<template>
  <div class="">
    <el-form :model="model" :rule="rules" label-width="auto">
      <el-form-item label="名称" prop="triggerName">
        <el-input v-model="model.triggerName" />
      </el-form-item>
      <el-form-item label="版本" prop="qualifier">
        <el-input v-model="model.qualifier" />
      </el-form-item>
      <el-form-item label="请求方法" prop="triggerConfig.methods">
        <el-select v-model="model.triggerConfig.methods" multiple placeholder="请选择">
          <el-option v-for="item in methodsList" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="禁用公网">
        <el-switch v-model="model.triggerConfig.disableURLInternet" />
      </el-form-item>
      <el-form-item label="认证方式">
        <el-radio-group v-model="model.triggerConfig.authType">
          <el-radio v-for="item in authList" :key="item.value" :value="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
