<script setup lang='ts'>
import TriggerHttp from '@/components/trigger/http.vue'
import TriggerTimer from '@/components/trigger/timer.vue'

const model = defineModel<TriggerItem[]>({
  default: [],
})
function addTrigger(command: string) {
  if (command === 'http') {
    model.value.push({
      type: markRaw(TriggerHttp),
      title: 'HTTP触发器',
      config: {
        triggerName: 'defaultTrigger',
        triggerType: 'http',
        qualifier: 'LATEST',
        triggerConfig: {
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
          authType: 'anonymous',
          disableURLInternet: false,
        },
      },
    })
  }
  if (command === 'timer') {
    model.value.push({
      type: markRaw(TriggerTimer),
      title: '定时触发器',
      config: {
        triggerName: 'timerTrigger',
        triggerType: 'timer',
        qualifier: 'LATEST',
        triggerConfig: {
          enable: true,
          cronExpression: '@every 4m',
          payload: '',
        },
      },
    })
  }
}
function removeTrigger(index: number) {
  model.value.splice(index, 1)
}
defineExpose({
  addTrigger,
})
</script>

<template>
  <div>
    <el-dropdown @command="addTrigger">
      <el-button type="primary" size="small">
        <div class="mr-2">添加触发器</div>
        <div class="i-ep-arrow-down" />
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="http">http触发器</el-dropdown-item>
          <el-dropdown-item command="timer">定时触发器</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-descriptions v-for="(item, index) in model" :key="index" :title="item.title" :column="1" class="py-3 pl-3">
      <template #extra>
        <el-link type="danger" icon="i-ep-delete" @click="removeTrigger(index)" />
      </template>
      <el-descriptions-item>
        <component :is="item.type" v-model="model[index].config" />
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
