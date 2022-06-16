<template>
  <div class="header px-5 flex items-center justify-between relative z-10">
    <div class="flex items-center">
      <n-icon class="mr-5" size="24" @click="reLoad">
        <i-ci-refresh-02 />
      </n-icon>
      <Breadcrumb />
    </div>
    <n-dropdown trigger="click" :options="options" @select="onSelect">
      <n-button text>
        <span>admin</span>
        <n-icon size="20" class="ml-1">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z"
              fill="currentColor"
            ></path>
          </svg>
        </n-icon>
      </n-button>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import { loginUrl } from '@/router/instance'
import useAppStore from '@/store/modules/app'
import Breadcrumb from './breadcrumb.vue'

const useApp = useAppStore()
const reLoad = async () => {
  useApp.setLoad(!useApp.load)
  await nextTick()
  useApp.setLoad(!useApp.load)
}
const options = [
  {
    label: '注销',
    key: 'logout'
  }
]

const router = useRouter()
const operate = {
  logout() {
    router.replace(loginUrl)
  }
}

const onSelect = (key: keyof typeof operate) => {
  operate[key]()
}
</script>
<script lang="ts">
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped></style>
