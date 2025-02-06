<script setup lang='ts'>
const router = useRouter()
</script>

<template>
  <div class="cursor-pointer text-center" @click="router.push('/admin')">
    <div class="text-gradient text-4xl font-bold" :class="[{ '!text-2xl': sidebarCollapse }]">{{ logoname }}</div>
    <div v-show="!sidebarCollapse" class="text-blue-300">用户管理系统</div>
  </div>
</template>

<style>
.text-gradient {
  background: linear-gradient(to right bottom, cyan, blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
