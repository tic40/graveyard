import * as Methods from '@js/api/methods'
import * as Constants from '@js/constants/index'

const gibsonAjaxPath: string = Constants.apiBasePath + 'ajax/'
const gibsonAjaxCosmoPath: string = Constants.apiBasePath + 'ajax/cosmo/'
const apiPath = {
  timestamp: gibsonAjaxCosmoPath + 'timestamp',
  log: gibsonAjaxCosmoPath + 'log',
  memberAuth: gibsonAjaxCosmoPath + 'member/auth',
  skyWayApiKey: gibsonAjaxCosmoPath + 'skyway/key',
  memberMaterial: gibsonAjaxCosmoPath + 'member/material',
  memberCurriculum: gibsonAjaxCosmoPath + 'member/curriculum',
  memberLessonRequest: gibsonAjaxCosmoPath + 'member/lesson/request',
  memberLessonReservation: gibsonAjaxCosmoPath + 'member/lesson/reservation',
  postMemberLessonMemo: gibsonAjaxPath + 'lessonMemo',
  memberLessonMemo: gibsonAjaxPath + 'getLessonMemo',
  memberLessonSkyway: gibsonAjaxCosmoPath + 'member/lesson/skyway',
  memberSkywayCondition: gibsonAjaxCosmoPath + 'member/lesson/skyway/condition',
  memberLessonSkywayChat: gibsonAjaxCosmoPath + 'member/lesson/skyway/chat'
}

export function fetchTimestamp (): Promise<any> {
  return Methods.fetch(apiPath.timestamp)
}
export function fetchMemberAuth (): Promise<any> {
  return Methods.fetch(apiPath.memberAuth)
}
export function fetchSkyWayApiKey (): Promise<any> {
  return Methods.fetch(apiPath.skyWayApiKey)
}
export function fetchMemberMaterial (): Promise<any> {
  return Methods.fetch(apiPath.memberMaterial)
}
export function fetchMemberCurriculum (): Promise<any> {
  return Methods.fetch(apiPath.memberCurriculum)
}
export function fetchMemberLessonRequest (registrationId: number): Promise<any> {
  return Methods.fetch(
    apiPath.memberLessonRequest + '?registrationId=' + registrationId
  )
}
export function fetchMemberLessonReservation (): Promise<any> {
  return Methods.fetch(apiPath.memberLessonReservation)
}
export function postMemberLessonMemo (
  memo: string,
  lessonTimestamp: string
): Promise<any> {
  let params = new URLSearchParams()
  params.append('memo', memo)
  params.append('lessonTime', lessonTimestamp)
  return Methods.post(apiPath.postMemberLessonMemo, params)
}
export function fetchMemberLessonMemo (lessonTimestamp: string): Promise<any> {
  let params = new URLSearchParams()
  params.append('lessonTimestamp', lessonTimestamp)
  return Methods.post(apiPath.memberLessonMemo, params)
}
export function fetchMemberLessonSkyway (registrationId: number): Promise<any> {
  return Methods.fetch(
    apiPath.memberLessonSkyway + '?registrationId=' + registrationId
  )
}
export function postMemberLessonSkywayCondition (
  registrationId: string,
  operation: string,
  detail
): Promise<any> {
  let params = new URLSearchParams()
  params.append('registration_id', registrationId)
  params.append('operation', operation)
  if (typeof detail === 'object') {
    params.append('detail', JSON.stringify(detail))
  } else {
    params.append('detail', detail)
  }
  return Methods.post(apiPath.memberSkywayCondition, params)
}
export function postLog (
  registrationId: string,
  level: string,
  detail: string
): Promise<any> {
  let params = new URLSearchParams()
  params.append('registration_id', registrationId)
  params.append('level', level)
  params.append('detail', detail)
  return Methods.post(apiPath.log, params)
}
export function fetchMemberLessonSkywayChat (
  registrationId: number
): Promise<any> {
  return Methods.fetch(
    apiPath.memberLessonSkywayChat + '?registrationId=' + registrationId
  )
}
