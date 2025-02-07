<script setup lang='ts'>
// const router = useRouter()
</script>

<template>
  <div class="b-b py-2">
    <div class="container flex-between">
      <h1 class="">
        <LayoutLogo />
        <small class="text-gray">阿里云函数计算s.yaml配置</small>
      </h1>
      <div class="flex-center gap-x-3 divide-x">
        <ul class="flex gap-x-5">
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/about">关于</router-link>
          </li>
        </ul>
        <a class="block pl-3" href="https://github.com/fitoe/aliyun-fc-configUI" target="_blank">
          <div class="i-mdi-github text-2xl" />
        </a>
      </div>
    </div>
  </div>
</template>
