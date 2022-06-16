import { useStorage } from '@vueuse/core'
export const TOKEN_NAME = 'AuthorizationToken'
export const token = useStorage(`${TOKEN_NAME}`, '')
