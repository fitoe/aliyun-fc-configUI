<script setup lang='ts'>
const model = defineModel<Basic>({
  default: defaultBasic,
})
const rules = {
  functionType: [{ required: true, message: '请选择函数类型', trigger: 'blur' }],
  functionName: [{ required: true, message: '请输入函数名称', trigger: 'blur' }],
  region: [{ required: true, message: '请选择区域', trigger: 'blur' }],
  cpu: [{ required: true, message: '请选择CPU', trigger: 'blur' }],
  memory: [{ required: true, message: '请选择内存', trigger: 'blur' }],
  disk: [{ required: true, message: '请选择临时硬盘', trigger: 'blur' }],
  role: [{ required: true, message: '请填写角色', trigger: 'blur' }],
}
</script>

<template>
  <div>
    <el-form :model="model" label-width="auto" :rule="rules">
      <el-form-item label="函数类型" prop="functionType">
        <el-select v-model="model.functionType" placeholder="请选择">
          <el-option v-for="item in fctypes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="函数名称" prop="functionName">
        <el-input v-model="model.functionName" placeholder="请输入函数名称" />
      </el-form-item>
      <el-form-item label="权限" prop="role">
        <el-input v-model="model.role" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="所在区域" prop="region">
        <el-select v-model="model.region" placeholder="请选择">
          <el-option-group v-for="item in regions" :key="item.label" :label="item.label">
            <el-option v-for="child in item.children" :key="child.value" :label="child.label" :value="child.value" />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="CPU">
        <el-select v-model="model.cpu" placeholder="请选择">
          <el-option v-for="item in cpus" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="内存">
        <el-select v-model="model.memory" placeholder="请选择">
          <el-option v-for="item in memories" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="临时硬盘">
        <el-select v-model="model.disk" placeholder="请选择">
          <el-option v-for="item in disks" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="model.description" type="textarea" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
  </div>
</template>
