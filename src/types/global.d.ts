export {}
declare global {
  /* eslint-disable no-unused-vars */
  interface Window {
    WeixinJSBridge: any
    $message: import('naive-ui').MessageApi
    $dialog: import('naive-ui').DialogApi
    $notification: import('naive-ui').NotificationApi
    $loadingBar: import('naive-ui').LoadingBarApi
  }
}
