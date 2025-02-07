<script setup lang='ts'>
import TriggerHttp from '@/components/trigger/http.vue'
import TriggerTimer from '@/components/trigger/timer.vue'
import { markRaw } from 'vue'
import { parse } from 'yaml'

const emit = defineEmits(['loaded'])

async function loadfile() {
  try {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.yaml,.yml'

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file)
        return
      const text = await file.text()
      const data = parse(text)
      const adaptedData = adaptor(data)
      emit('loaded', adaptedData)
    }
    input.click()
  }
  catch (error: any) {
    ElMessage.error(`加载文件失败: ${error.message}`)
  }
}

function adaptor(data: any) {
  const props = data.resources.fcDemo.props
  return {
    basic: {
      functionName: data.name,
      functionType: props.handler ? 'event' : 'web',
      description: props.description,
      role: props.role,
      region: props.region,
      memorySize: props.memorySize,
      cpu: props.cpu,
      diskSize: props.diskSize,
    },
    runtime: {
      runtime: ['custom', 'container', props.runtime],
      timeout: props.timeout,
      code: props.code,
      handler: props.handler,
      command: props.command?.join(' ') || '',
      port: props.port || 9000,
      instanceConcurrency: props.instanceConcurrency || 1,
    },
    triggers: props.triggers?.map((t: any) => {
      const config = {
        triggerName: t.triggerName,
        triggerType: t.triggerType,
        qualifier: t.qualifier || 'LATEST',
        description: t.description || '',
        triggerConfig: t.triggerConfig,
      }

      let type
      let title
      if (t.triggerType === 'http') {
        type = markRaw(TriggerHttp)
        title = 'HTTP触发器'
      }
      else if (t.triggerType === 'timer') {
        type = markRaw(TriggerTimer)
        title = '定时触发器'
      }

      return {
        type,
        title,
        config,
      }
    }) || [],
    environmentVariables: Object.entries(props.environmentVariables || {}).map(([key, value]) => ({
      key,
      value: value as string,
    })),
    layers: props.layers || [],
    log: {
      enable: !!props.logConfig,
      auto: props.logConfig === 'auto',
      ...(typeof props.logConfig === 'object'
        ? {
          project: props.logConfig.project,
          logstore: props.logConfig.logstore,
          logBeginRule: props.logConfig.logBeginRule === 'DefaultRegex',
          enableRequestMetrics: props.logConfig.enableRequestMetrics,
          enableInstanceMetrics: props.logConfig.enableInstanceMetrics,
        }
        : {}),
    },
    network: {
      enable: !!props.networkConfig,
      auto: props.networkConfig === 'auto',
      ...(typeof props.networkConfig === 'object'
        ? {
          securityGroupId: props.networkConfig.securityGroupId,
          vpcId: props.networkConfig.vpcId,
          vSwitchIds: props.networkConfig.vSwitchIds || [],
        }
        : {}),
      internetAccess: props.internetAccess,
    },
    nas: {
      enable: !!props.nasConfig,
      auto: props.nasConfig === 'auto',
      ...(typeof props.nasConfig === 'object'
        ? {
          groupId: props.nasConfig.groupId,
          userId: props.nasConfig.userId,
          mountPoints: props.nasConfig.mountPoints?.map((m: any) => {
            const [serverAddr, localDir] = (m.serverAddr || '').split(':')
            return {
              serverAddr,
              mountDir: m.mountDir,
              localDir: localDir || '',
              enableTLS: m.enableTLS,
            }
          }) || [],
        }
        : {}),
    },
    oss: {
      enable: !!props.ossConfig,
      mountPoints: props.ossConfig?.mountPoints?.map((m: any) => {
        const region = m.endpoint.match(/oss-([^-]+)-internal/)?.[1] || ''
        return {
          region,
          bucketName: m.bucketName,
          bucketPath: m.bucketPath,
          mountDir: m.mountDir,
          readOnly: m.readOnly,
        }
      }) || [],
    },
  }
}
</script>

<template>
  <div class="pb-3">
    <el-button type="default" icon="i-ep-upload" @click="loadfile">导入 s.yaml</el-button>
  </div>
</template>
