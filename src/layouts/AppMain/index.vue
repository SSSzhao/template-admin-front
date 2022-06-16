<template>
  <n-scrollbar class="main p-5">
    <router-view v-if="!load" v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </n-scrollbar>
</template>
<script setup lang="ts">
import useAppStore from '@/store/modules/app'

const useApp = useAppStore()
const load = computed(() => {
  return useApp.load
})
</script>
<script lang="ts">
export default {
  name: 'AppMain'
}
</script>
<style lang="scss" scoped>
.v-enter-active {
  transition: all 0.5s ease;
  opacity: 1;
}
.v-leave-active {
  transition: none;
}
.v-enter-from,
.v-leave-to {
  transform: translate3d(20px, 0, 0);
  opacity: 0;
}
</style>
