<script setup lang='ts'>
const everyminute = ref(4)
const model = defineModel<TriggerTimer>({
  default: {
    triggerName: '',
    triggerType: 'timer',
    qualifier: 'LATEST',
    description: '',
    triggerConfig: {
      enable: true,
      cronExpression: '@every 4m',
      payload: '',
    },
  },
})
watchEffect(() => {
  model.value.triggerConfig.cronExpression = `@every ${everyminute.value}m`
})

const type = ref('every')
const typeList = [{ label: '时间间隔', value: 'every' }, { label: '指定时间', value: 'cron' }, { label: '自定义', value: 'custom' }]
</script>

<template>
  <div class="">
    <el-form :model="model" label-width="auto">
      <el-form-item label="名称">
        <el-input v-model="model.triggerName" />
      </el-form-item>
      <el-form-item label="版本">
        <el-input v-model="model.qualifier" />
      </el-form-item>
      <el-form-item label="触发方式">
        <el-radio-group v-model="type" size="large">
          <el-radio-button v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="时间间隔">
        <el-input-number v-model="everyminute" :min="1" :max="1000000" />
      </el-form-item>
      <el-form-item label="触发消息">
        <el-input v-model="model.triggerConfig.payload" type="textarea" placeholder="{foo: 'bar'}" />
      </el-form-item>
    </el-form>
  </div>
</template>

interface TriggerTimer {
triggerName: string
triggerType: 'timer'
qualifier: string
description: string
triggerConfig: {
enable: boolean
cronExpression: string
payload: string
}
}
