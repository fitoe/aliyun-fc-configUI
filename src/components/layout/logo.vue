<script setup lang='ts'>
const router = useRouter()
</script>

<template>
  <div class="cursor-pointer text-center" @click="router.push('/')">
    <div class="text-gradient text-3xl font-bold">FC-config</div>
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
