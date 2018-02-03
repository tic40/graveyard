import * as Constants from '@js/constants/index'
import * as Cookies from 'js-cookie'
import * as GibsonApi from '@js/api/gibsonApi'
import * as Moment from 'moment-timezone'
// set timezone globally
Moment.tz.setDefault('Asia/Tokyo')

// functions for eventlistener
let eventOffline
let eventOnline
let eventBeforeunloadAlert
let eventBeforeunloadCookie

const state = {
  serverTimeOffset: undefined,
  isLoading: false,
  isOnline: true,
  isDev: Constants.isDev,
  errorCode: undefined,
  constants: Constants
}

const getters = {
  isLoading: state => state.isLoading,
  isOnline: state => state.isOnline,
  isDev: state => state.isDev,
  errorCode: state => state.errorCode,
  constants: state => state.constants
}

const actions = {
  // serverTime: timestamp
  getCurrentTime ({ state }): Promise<Moment.Moment> {
    return new Promise(resolve => {
      let current: Moment.Moment = Moment()
      if (state.serverTimeOffset) {
        current.add(state.serverTimeOffset, 'seconds')
      }
      resolve(current)
    })
  },
  calcServerTimeOffset ({ commit }, serverTime: string): void {
    const serverTimeOffset: number = Moment(serverTime, 'X').diff(
      Moment(),
      'seconds'
    )
    commit('setServerTimeOffset', { serverTimeOffset })
  },
  updateTitle ({}, title: string): void {
    document.title = title
  },
  startLoading ({ commit }): void {
    commit('setIsLoading', { isLoading: true })
  },
  stopLoading ({ commit }): void {
    commit('setIsLoading', { isLoading: false })
  },
  offlineEventListener ({ commit }, method: string): void {
    if (!eventOffline) {
      eventOffline = (): void => {
        commit('setIsOnline', { isOnline: false })
      }
    }
    if (method === 'add') {
      window.addEventListener('offline', eventOffline)
    } else if (method === 'remove') {
      window.removeEventListener('offline', eventOffline)
    }
  },
  onlineEventListener ({ commit }, method: string): void {
    if (!eventOnline) {
      eventOnline = (): void => {
        commit('setIsOnline', { isOnline: true })
      }
    }
    if (method === 'add') {
      window.addEventListener('online', eventOnline)
    } else if (method === 'remove') {
      window.removeEventListener('online', eventOnline)
    }
  },
  beforeunloadAlertEventListener ({}, method: string): void {
    if (!eventBeforeunloadAlert) {
      eventBeforeunloadAlert = (e): string => {
        const confirmationMessage: string = 'このページから移動しますか？'
        // Gecko and Trident
        e.returnValue = confirmationMessage
        // Gecko and WebKit
        return confirmationMessage
      }
    }
    if (method === 'add') {
      window.addEventListener('beforeunload', eventBeforeunloadAlert)
    } else if (method === 'remove') {
      window.removeEventListener('beforeunload', eventBeforeunloadAlert)
    }
  },
  beforeunloadCookieEventListener (
    { dispatch, rootState },
    method: string
  ): void {
    if (!eventBeforeunloadCookie) {
      eventBeforeunloadCookie = (): void => {
        // save user setting as cookies
        dispatch('setCookie', {
          name: Constants.COOKIES.LAYOUT,
          value: rootState.lessonRoom.layout
        })
        dispatch('setCookie', {
          name: Constants.COOKIES.TUTOR_SOUND_VOLUME,
          value: rootState.lessonRoom.video.tutorMicVolume
        })
      }
    }
    if (method === 'add') {
      window.addEventListener('beforeunload', eventBeforeunloadCookie)
    } else if (method === 'remove') {
      window.removeEventListener('beforeunload', eventBeforeunloadCookie)
    }
  },
  windowResizeEventListener ({ commit, dispatch }, method: string): void {
    let running: boolean = false
    // for performance. run the function one per 100 msec
    const event = (): void => {
      if (!running) {
        running = true
        setTimeout(() => {
          running = false
          // pass the height to lessonRoom module
          dispatch('lessonRoom/updateWindowHeight', $(window).height(), {
            root: true
          })
        }, 100)
      }
    }
    if (method === 'add') {
      window.addEventListener('resize', event)
    } else if (method === 'remove') {
      window.removeEventListener('resize', event)
    }
  },
  updateErrorCode ({ commit }, errorCode: string): void {
    commit('setErrorCode', { errorCode })
  },
  openNewTab ({}, url: string): void {
    window.open(url, '_blank')
  },
  moveTo ({ dispatch }, url: string): void {
    window.location.href = url
    dispatch('startLoading')
    dispatch('beforeunloadAlertEventListener', 'remove')
  },
  moveToMypage ({ dispatch }): void {
    dispatch('moveTo', Constants.URL_RJ_MYPAGE)
  },
  reload ({ dispatch }): void {
    dispatch('beforeunloadAlertEventListener', 'remove')
    window.location.reload()
  },
  closeTab ({ dispatch }): void {
    dispatch('beforeunloadAlertEventListener', 'remove')
    window.close()
  },
  getCookie ({ state }, name: string) {
    return Cookies.get(name)
  },
  setCookie ({ state }, params): void {
    Cookies.set(params.name, params.value)
  },
  removeCookie ({ state }, name: string): void {
    Cookies.remove(name)
  },
  sendErrorLog ({ rootState }, error): void {
    const detail =
      typeof error === 'object' && error.stack !== 'undefined'
        ? error.stack
        : error
    GibsonApi.postLog(
      rootState.lesson.lessonInfo.registrationId,
      'error',
      detail
    )
  }
}

const mutations = {
  setServerTimeOffset (state, payload): void {
    state.serverTimeOffset = payload.serverTimeOffset
  },
  setIsLoading (state, payload): void {
    state.isLoading = payload.isLoading
  },
  setIsOnline (state, payload): void {
    state.isOnline = payload.isOnline
  },
  setErrorCode (state, payload): void {
    state.errorCode = payload.errorCode
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
