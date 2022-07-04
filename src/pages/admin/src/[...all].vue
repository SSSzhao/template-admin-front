<template>
  <div class="pt-20vh">
    <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <n-button @click="$router.replace('/')">返回首页</n-button>
      </template>
    </n-result>
  </div>
</template>
<script lang="ts">
export default {
  name: '404Page'
}
</script>
<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: none
  name: '404'
</route>
