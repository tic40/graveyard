import * as GibsonApi from '@js/api/gibsonApi'
import * as Constants from '@js/constants/index'

export const silent: boolean = false
export const optionMergeStrategies: object = {}
export const devtools: boolean = Constants.isDev
export const performance: boolean = Constants.isDev
export const productionTip: boolean = false
export const ignoredElements: Array<any> = []
export const errorHandler = (err, vm, info): void => {
  let registrationId: string
  try {
    registrationId = vm.$store.getters['lesson/lessonInfo'].registrationId
  } catch (e) {}
  let message: string = 'error: ' + err + ' info: ' + info
  if (typeof err.stack !== 'undefined') {
    message = message + ' stack: ' + err.stack
  }
  // send error log to server
  GibsonApi.postLog(registrationId, 'error', message)

  console.error('err: ' + err)
  console.error('err info: ' + info)
  console.error('err message: ' + message)
}
export const warnHandler = (msg, vm, trace): void => {
  console.warn('warn: ' + msg)
  console.warn('warn trace: ' + trace)
}
export const keyCodes = {}
