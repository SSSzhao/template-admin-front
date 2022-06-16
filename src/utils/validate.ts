// 常用校验
import type { FormItemRule } from 'naive-ui'

export type ValidateRules<T = any> = Record<keyof T, FormItemRule>

export const patterns = {
  external: /^(https?:|mailto:|tel:)/,
  url: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,
  lowerCase: /^[a-z]+$/,
  upperCase: /^[A-Z]+$/,
  alphabets: /^[A-Za-z]+$/,
  chineseName: /[\u4e00-\u9fa5]{2,15}/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  idNumber:
    /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|12]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|12]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
  // 使用这个网站的正则表达式 https://blog.csdn.net/to_study/article/details/106832942
  telephone:
    /^1(3([0-35-9]\d|4[1-8])|4[14-9]\d|5([0-35689]\d|7[1-79])|66\d|7[2-35-8]\d|8\d{2}|9[13589]\d)\d{7}$/,
  // 脱敏信息的正则表达式
  secret: /\*\*\*\*\*/,
  excel: /\.(xls|xlsx|csv)/,
  number: /^[+-]?\d+(\.\d+)?$/,
  fax: /^(\d{3,4}-)?\d{7,8}$/,
  zipCode: /^[1-9]\d{5}$/,
  userName: /^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/,
  userAccount: /^[a-zA-Z0-9_-]+$/,
  password: /^[\w!@#$%^&*().\\/]+$/
}

export const userAccountRule = (text = '') =>
  [
    { required: true, trigger: 'blur', message: text + '必填' },
    { trigger: 'blur', min: 1, max: 50, message: text + '长度1到15位' },
    {
      trigger: 'blur',
      pattern: patterns.userAccount,
      message: text + '只能包含字母，数字，下划线，减号'
    }
  ] as FormItemRule[]

export const userNameRule = (text = '') =>
  [
    { required: true, trigger: 'blur', message: text + '必填' },
    { trigger: 'blur', min: 1, max: 15, message: text + '长度1到15位' },
    {
      trigger: 'blur',
      pattern: patterns.userName,
      message: text + '只能包含中文，字母，数字，下划线，减号'
    }
  ] as FormItemRule[]

// 编码类校验规则
export const codeRule = (text = '') =>
  [
    { required: true, trigger: 'blur', message: text + '必填' },
    { trigger: 'blur', min: 3, max: 50, message: text + '长度3到50位' },
    { trigger: 'blur', pattern: patterns.password, message: text + '只能包含字母，数字，英文符号' }
  ] as FormItemRule[]

// 表单校验规则，用户密码规则
export const passwordRule = (text = '') =>
  [
    { required: true, trigger: 'blur', message: text + '密码必填' },
    { trigger: 'blur', min: 6, max: 15, message: text + '密码长度6到15位' },
    {
      trigger: 'blur',
      pattern: patterns.password,
      message: text + '密码只能包含字母、数字、英文符号'
    }
  ] as FormItemRule[]

export const telephoneRule = (required = true, msg = '手机号'): FormItemRule => ({
  required,
  trigger: 'blur',
  validator(rule: FormItemRule, value: string) {
    if (!value) {
      return new Error(msg + '必填')
    } else if (!patterns.telephone.test(value)) {
      return new Error(msg + '格式错误')
    }
    return true
  }
})

// 必填rule
export const requiredRule = (msg: string, type: FormItemRule['type'] = 'string'): FormItemRule => ({
  type,
  required: true,
  trigger: ['blur', 'input'],
  message: msg + '必填'
})

// 不能输入空白字符（包括空格回车）rule
export const noBlankRule = (msg: string) =>
  [{ trigger: 'change', pattern: /^\S+$/, message: msg + '不能包含空白字符' }] as FormItemRule[]

// json rule
export const jsonRule = (required = true, msg: string) =>
  [
    {
      trigger: 'blur',
      validator(_rule, value: string, cb) {
        if (!required && !value) return cb(undefined)
        else {
          try {
            JSON.parse(value)
            cb(undefined)
          } catch (e: any) {
            cb(new Error(msg + '格式错误' + e.message))
          }
        }
      }
    }
  ] as FormItemRule[]

// 数字校验规则，数字最大8位数字
export const numberRule = (required = true, msg: string, isInt = true, min = 1, max = 1e8) =>
  [
    { required, trigger: 'blur', message: msg + '必填' },
    { trigger: 'blur', pattern: patterns.number, message: msg + '只能输入数字' },
    {
      trigger: 'blur',
      validator(rule, value: string, cb) {
        if (!required && (value === '' || value === undefined)) return cb(undefined)

        const numVal = +value
        if (isInt && !Number.isInteger(numVal)) {
          cb(new Error(msg + '只能输入整数'))
        } else if (numVal < 0 && min > 0 && isInt) cb(new Error(msg + '只能输入正整数'))
        else if (numVal < min) cb(new Error(msg + `不能小于${min}`))
        else if (numVal > max) cb(new Error(msg + '超过范围'))
        else cb(undefined)
      }
    }
  ] as FormItemRule[]

// 输入中文
export const chineseNameRule = (required = true, msg: string) =>
  [
    { required, trigger: 'blur', message: msg + '必填' },
    { trigger: 'blur', pattern: patterns.chineseName, message: msg + '无效' }
  ] as FormItemRule[]
