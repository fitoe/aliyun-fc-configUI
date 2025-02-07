<script setup lang='ts'>
import { createHighlighter } from 'shiki'
import { parse, stringify } from 'yaml'

const triggerRef = ref()
const activeNames = ref([])

// 各模块
const basic = reactive<Basic>(defaultBasic)

const runtime = ref<Runtime>(defaultRuntime)
const runtimeRef = ref()

const triggers = reactive<TriggerItem[]>([])

const environmentVariables = reactive<KeyValue[]>([])

const layers = reactive([])

const log = ref<Log>(defaultLog)
const logRef = ref()

const network = ref<Network>(defaultNetwork)
const networkRef = ref()

const nas = ref<Nas>(defaultNas)
const nasRef = ref()

const oss = ref<Oss>(defaultOss)
const ossRef = ref()

// 代码高亮
const result = ref({})
const htmlresult = ref('')
const highlight = ref()
async function initHighlighter() {
  highlight.value = await createHighlighter({
    themes: ['dark-plus'],
    langs: ['yaml'],
  })
}
async function generate() {
  const { functionType, role, ...basicProps } = basic
  result.value = {
    edition: '3.0.0',
    name: basic.functionName,
    access: 'default',
    resources: {
      fcDemo: {
        component: 'fc3',
        props: {
          ...basicProps,
          role,
          triggers: triggers.map(item => item.config),
          environmentVariables: Object.fromEntries(environmentVariables.filter(v => v.key && v.value).map(v => [v.key, v.value])),
          layers: layers.filter(Boolean),
          ...runtimeRef.value?.runtimeConfig,
          ...(log.value.enable ? { logConfig: logRef.value?.logConfig } : {}),
          ...(network.value.enable ? { networkConfig: networkRef.value?.networkConfig } : {}),
          internetAccess: !!network.value.internetAccess,
          ...(nas.value.enable && nas.value.mountPoints.length ? { nasConfig: nasRef.value?.nasConfig } : {}),
          ...(oss.value.enable && oss.value.mountPoints.length ? { ossConfig: ossRef.value?.ossConfig } : {}),
        },
      },
    },
  }

  const html = highlight.value.codeToHtml(stringify(result.value), {
    lang: 'yaml',
    theme: 'dark-plus',
  })
  htmlresult.value = html
}
watchDebounced(
  () => result.value,
  () => generate(),
  { debounce: 500, maxWait: 1000 },
)
onMounted(async () => {
  await nextTick()
  await initHighlighter()
  triggerRef.value?.addTrigger('http')
  generate()
})
// load yaml配置
function handleLoad(data: any) {
  // 更新基础配置
  Object.assign(basic, data.basic)

  // 更新运行时配置
  runtime.value = data.runtime

  // 更新触发器
  triggers.length = 0

  // 添加新的触发器
  data.triggers.forEach((trigger: any) => {
    if (trigger.config.triggerType === 'http') {
      triggerRef.value?.addTrigger('http')
    }
    else if (trigger.config.triggerType === 'timer') {
      triggerRef.value?.addTrigger('timer')
    }

    const lastIndex = triggers.length - 1
    if (lastIndex >= 0) {
      Object.assign(triggers[lastIndex].config, trigger.config)
    }
  })

  // 更新环境变量
  environmentVariables.length = 0
  environmentVariables.push(...data.environmentVariables)

  // 更新层配置
  layers.length = 0
  layers.push(...data.layers)

  // 更新日志配置
  log.value = data.log

  // 更新网络配置
  if (data.network) {
    // 先设置基本状态
    console.log(data.network)

    network.value.enable = data.network.enable
    network.value.auto = data.network.auto
    network.value.internetAccess = data.network.internetAccess

    // 如果不是auto模式且启用了网络配置，则设置详细配置
    if (!data.network.auto && data.network.enable) {
      network.value.securityGroupId = data.network.securityGroupId || ''
      network.value.vpcId = data.network.vpcId || ''
      network.value.vSwitchIds = data.network.vSwitchIds || []
    }
  }

  // 更新 NAS 配置
  nas.value = data.nas

  // 更新 OSS 配置
  oss.value = data.oss

  // 重新生成配置
  generate()
}
</script>

<template>
  <div class="pt-10">
    <div class="grid grid-cols-3 gap-10">
      <div class="col-span-1">
        <Loadconfig @loaded="handleLoad" />
        <el-collapse v-model="activeNames">
          <el-collapse-item title="基础配置" name="basic">
            <Basic v-model="basic" />
          </el-collapse-item>
          <el-collapse-item title="触发器" name="triggers">
            <Trigger ref="triggerRef" v-model="triggers" />
          </el-collapse-item>
          <el-collapse-item title="运行时" name="runtime">
            <Runtime ref="runtimeRef" v-model="runtime" :basic="basic" />
          </el-collapse-item>
          <el-collapse-item title="环境变量" name="env">
            <Env v-model="environmentVariables" />
          </el-collapse-item>
          <el-collapse-item title="层" name="layers">
            <Layer v-model="layers" />
          </el-collapse-item>
          <el-collapse-item title="日志" name="log">
            <Log ref="logRef" v-model="log" />
          </el-collapse-item>
          <el-collapse-item title="网络" name="network">
            <Network ref="networkRef" v-model="network" />
          </el-collapse-item>
          <el-collapse-item title="NAS" name="nas">
            <Nas ref="nasRef" v-model="nas" />
          </el-collapse-item>
          <el-collapse-item title="OSS" name="oss">
            <Oss ref="ossRef" v-model="oss" />
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="col-span-2">
        <div class="" v-html="htmlresult" />
      </div>
    </div>
  </div>
</template>

<route lang='yaml'>
meta:
  title: '首页'
</route>
