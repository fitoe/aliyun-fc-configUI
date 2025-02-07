<script setup lang='ts'>
import { createHighlighter } from 'shiki'
import { parse, stringify } from 'yaml'

const triggerRef = ref()
const activeNames = ref([])
// const router = useRouter()
const basic = reactive<Basic>(defaultBasic)
const runtime = ref<Runtime>(defaultRuntime)
const runtimeConfig = computed(() => {
  const baseRuntime = {
    runtime: runtime.value.runtime[2],
    timeout: runtime.value.timeout,
    code: runtime.value.code,
  }
  switch (basic.functionType) {
    case 'web':
      return { ...baseRuntime, port: runtime.value.port, command: runtime.value.command.split(' ').filter(Boolean), instanceConcurrency: runtime.value.instanceConcurrency }
    default:
      return { ...baseRuntime, handler: runtime.value.handler } // 默认内置运行时
  }
})
const triggers = reactive<TriggerItem[]>([])
const environmentVariables = reactive<KeyValue[]>([])
const layers = reactive([])
const result = ref({})
const htmlresult = ref('')
const log = ref<Log>(defaultLog)
const logConfig = computed(() => {
  if (log.value.auto)
    return 'auto'
  const { auto, enable, logBeginRule, ...logs } = log.value
  return {
    ...logs,
    logBeginRule: logBeginRule ? 'DefaultRegex' : 'None',
  }
})
const network = ref<Network>(defaultNetwork)
const networkConfig = computed(() => {
  if (network.value.auto)
    return 'auto'
  const { auto, enable, vSwitchIds, internetAccess, ...networkProps } = network.value
  return {
    ...networkProps,
    vSwitchIds: vSwitchIds.filter(Boolean),
  }
})
const nas = ref<Nas>(defaultNas)
const nasConfig = computed(() => {
  if (nas.value.auto)
    return 'auto'
  const { auto, enable, ...nasProps } = nas.value
  nasProps.mountPoints = nasProps.mountPoints.map(item => ({
    enableTLS: item.enableTLS,
    serverAddr: `${item.serverAddr}:${item.localDir}`,
    mountDir: item.mountDir,
  }))
  return nasProps
})
const oss = ref<Oss>(defaultOss)
const ossConfig = computed(() => {
  const { enable, mountPoints, ...ossProps } = oss.value
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
          ...runtimeConfig.value,
          ...(log.value.enable ? { logConfig: logConfig.value } : {}),
          ...(network.value.enable ? { networkConfig: networkConfig.value } : {}),
          internetAccess: !!network.value.internetAccess,
          ...(nas.value.enable && nas.value.mountPoints.length ? { nasConfig: nasConfig.value } : {}),
          ...(oss.value.enable && oss.value.mountPoints.length ? { ossConfig: ossConfig.value } : {}),
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
</script>

<template>
  <div class="pt-10">
    <div class="grid grid-cols-3 gap-10">
      <div class="col-span-1">
        <!-- <Loadconfig /> -->
        <el-collapse v-model="activeNames">
          <el-collapse-item title="基础配置" name="basic">
            <Basic v-model="basic" />
          </el-collapse-item>
          <el-collapse-item title="触发器" name="triggers">
            <Trigger ref="triggerRef" v-model="triggers" />
          </el-collapse-item>
          <el-collapse-item title="运行时" name="runtime">
            <Runtime v-model="runtime" :basic="basic" />
          </el-collapse-item>
          <el-collapse-item title="环境变量" name="env">
            <Env v-model="environmentVariables" />
          </el-collapse-item>
          <el-collapse-item title="层" name="layers">
            <Layer v-model="layers" />
          </el-collapse-item>
          <el-collapse-item title="日志" name="log">
            <Log v-model="log" />
          </el-collapse-item>
          <el-collapse-item title="网络" name="network">
            <Network v-model="network" />
          </el-collapse-item>
          <el-collapse-item title="NAS" name="nas">
            <Nas v-model="nas" />
          </el-collapse-item>
          <el-collapse-item title="OSS" name="oss">
            <Oss v-model="oss" />
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
