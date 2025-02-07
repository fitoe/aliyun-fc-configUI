<script setup lang='ts'>
import TriggerHttp from '@/components/trigger/http.vue'
import TriggerTimer from '@/components/trigger/timer.vue'
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

function findRuntimePath(targetRuntime: string) {
  for (const level1 of runtimes) {
    for (const level2 of level1.children || []) {
      for (const level3 of level2.children || []) {
        if (level3.value === targetRuntime) {
          return [level1.value, level2.value, level3.value]
        }
      }
    }
  }
  return ['custom', 'container', targetRuntime]
}

function adaptor(data: any) {
  const resourceName = Object.keys(data.resources)[0]
  const props = data.resources[resourceName].props

  return {
    basic: {
      functionName: data.name,
      functionType: props.customRuntimeConfig ? 'web' : 'event',
      description: props.description,
      role: props.role,
      region: props.region,
      memorySize: props.memorySize,
      cpu: props.cpu,
      diskSize: props.diskSize,
    },
    runtime: {
      runtime: findRuntimePath(props.runtime),
      timeout: props?.timeout,
      code: props.code,
      handler: props.handler,
      command: props.customRuntimeConfig?.command?.join(' ') || '',
      port: props.customRuntimeConfig?.port || 9000,
      instanceConcurrency: props.customRuntimeConfig?.instanceConcurrency || 1,
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
      enable: !!props.vpcConfig,
      auto: props.vpcConfig === 'auto',
      ...(typeof props.vpcConfig === 'object'
        ? {
          securityGroupId: props.vpcConfig.securityGroupId,
          vpcId: props.vpcConfig.vpcId,
          vSwitchIds: props.vpcConfig.vSwitchIds || [],
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
      enable: !!props.ossMountConfig,
      mountPoints: props.ossMountConfig?.mountPoints?.map((m: any) => {
        const region = m.endpoint.match(/oss-([\w-]+)-internal/)?.[1] || ''

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
