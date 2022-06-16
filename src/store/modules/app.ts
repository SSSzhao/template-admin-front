import { defineStore } from 'pinia'

const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    load: false
  }),
  actions: {
    setLoad(state: boolean) {
      this.load = state
    }
  }
})

export default useAppStore
