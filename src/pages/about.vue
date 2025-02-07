<script setup lang='ts'>

</script>

<template>
  <div class="grid grid-cols-12 w-full gap-4">
    <div class="col-span-8">
      <AboutAbout />
    </div>
    <div class="col-span-4">
      <div class="sticky top-0">
        <AboutTodo />
        <AboutChangelog />
      </div>
    </div>
  </div>
</template>

<route lang='yaml'>
meta:
  title: '关于'
</route>
