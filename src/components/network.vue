<script setup lang='ts'>
const model = defineModel<Network>({
  default: defaultNetwork,
})
const rules = {
  enable: [{ required: true, message: '请选择启用', trigger: 'blur' }],
  securityGroupId: [{ required: true, message: '请输入安全组ID', trigger: 'blur' }],
  vpcId: [{ required: true, message: '请输入VPC ID', trigger: 'blur' }],
  vSwitchIds: [{ required: true, message: '请输入VSwitch ID', trigger: 'blur' }],
}
function addVSwitch() {
  model.value.vSwitchIds.push('')
}
function deleteVSwitch(index: number) {
  model.value.vSwitchIds.splice(index, 1)
}
</script>

<template>
  <div>
    <el-form :model="model" label-width="auto" :rule="rules">
      <el-form-item label="允许访问VPC">
        <el-switch v-model="model.enable" />
      </el-form-item>
      <el-form-item v-if="model.enable" label="自动配置">
        <el-switch v-model="model.auto" />
      </el-form-item>
      <template v-if="!model.auto && model.enable">
        <el-form-item label="专有网络" prop="vpcId">
          <el-input v-model="model.vpcId" placeholder="" />
        </el-form-item>
        <el-form-item label="安全组" prop="securityGroupId">
          <el-input v-model="model.securityGroupId" placeholder="" />
        </el-form-item>
        <el-form-item label="交换机" prop="vSwitchIds">
          <div class="block w-full space-y-3">
            <el-button type="primary" size="small" icon="i-ep-plus" @click="addVSwitch"> 添加 </el-button>
            <div v-for="(_, index) in model.vSwitchIds" :key="index" class="flex items-center gap-x-2">
              <el-input v-model="model.vSwitchIds[index]" placeholder="" />
              <el-link type="danger" icon="i-ep-delete" @click="deleteVSwitch(index)" />
            </div>
          </div>
        </el-form-item>
      </template>
      <el-form-item label="允许访问公网">
        <el-switch v-model="model.internetAccess" />
      </el-form-item>
    </el-form>
  </div>
</template>
