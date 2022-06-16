import type { IRequestResult, IRequestPageResult } from '@/api/types'
import axios from 'axios'
// import router from '@/router'
// import { loginUrl } from '@/router/instance'
// import useUserStore from '@/store/modules/user'
import { TOKEN_NAME, token } from '@/utils/storage'
import type { MessageReactive } from 'naive-ui'

const request = axios.create({
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  baseURL: import.meta.env.VITE_BASE_URL
})

let loading: MessageReactive | null = null

export function requestLoading() {
  return window.$message.loading('加载中...', {
    duration: 0
  })
}

request.interceptors.request.use(config => {
  if (config.headers) {
    config.headers[TOKEN_NAME] = token.value
    if (config.loading && !loading) {
      loading = requestLoading()
    }
  }
  return config
})

request.interceptors.response.use(
  async response => {
    const config = response.config
    if (loading) {
      loading.destroy()
      loading = null
    }
    const res = response.data as IRequestResult
    if (res.status === 200) {
      if (!config.hideMsg && res.msg) {
        window.$message.success(config.msgText || res.msg)
      }
      return res
    } else {
      if (res.status === 401) {
        window.$message.error(res.msg || '登录已过期')
        // const userStore = useUserStore()
        // userStore.logout()
        // router.replace(loginUrl)
        // return Promise.reject(res.msg)
      }
      // 失败

      if (!config.hideLogicalMsg && res.msg) {
        window.$message.error(res.msg)
      }
      return Promise.reject(res.msg)
    }
  },
  (err: any) => {
    if (loading) {
      loading.destroy()
      loading = null
    }
    return Promise.reject(err)
  }
)

export default request

export function baseQueryByPage<S = Record<string, any>, T = any, R = IRequestPageResult<T>>(
  url: string
) {
  return function (searchObj = {} as S, current = 1, size = 10): Promise<R> {
    return request.post(
      url,
      {
        ...searchObj,
        current,
        size
      },
      { hideMsg: true }
    )
  }
}

// 导出基本分页查询函数的类型
export type typeQueryByPageFn = (
  searchObj: Record<string, any>,
  current: number,
  size: number
) => Promise<IRequestPageResult<any>>
