import * as GibsonApi from '@js/api/gibsonApi'

const state = {
  memberId: undefined,
  isLoggedIn: false,
  envCheckList: {
    isValidBrowser: undefined,
    canUseMic: undefined,
    canUseWebcam: undefined
  },
  devicePermissions: {
    webcam: undefined,
    mic: undefined
  },
  wantToUseWebcam: true
}

const getters = {
  memberId: state => state.memberId,
  isLoggedIn: state => state.isLoggedIn,
  envCheckList: state => state.envCheckList,
  devicePermissions: state => state.devicePermissions,
  wantToUseWebcam: state => state.wantToUseWebcam,
  hasRequiredEnvError: (state): boolean => {
    return !state.envCheckList.isValidBrowser || !state.envCheckList.canUseMic
  }
}

const actions = {
  fetchMemberAuth ({ commit }): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await GibsonApi.fetchMemberAuth()
        commit('setIsLoggedIn', { isLoggedIn: response.is_logged_in })
        commit('setMemberId', { memberId: Number(response.member_id) })
        resolve(response.is_logged_in)
      } catch (e) {
        reject()
      }
    })
  },
  checkRequiredEnvForLessonRoom ({ commit, dispatch }): Promise<void> {
    return new Promise(async resolve => {
      const isValidBrowser: boolean = await dispatch(
        'envCheck/isValidBrowser',
        null,
        { root: true }
      )
      const canUseMic: boolean = await dispatch('envCheck/canUseMic', null, {
        root: true
      })
      const canUseWebcam: boolean = await dispatch(
        'envCheck/canUseWebcam',
        null,
        { root: true }
      )
      commit('setIsValidBrowser', { isValidBrowser })
      commit('setCanUseMic', { canUseMic })
      commit('setCanUseWebcam', { canUseWebcam })
      resolve()
    })
  },
  checkDevicePermissions ({ commit, dispatch }): Promise<void> {
    return new Promise(async resolve => {
      const hasWebcamPermissions: boolean = await dispatch(
        'envCheck/hasWebcamPermissions',
        null,
        { root: true }
      )
      const hasMicPermissions: boolean = await dispatch(
        'envCheck/hasMicPermissions',
        null,
        { root: true }
      )
      commit('setDevicePermissions', {
        devicePermissions: {
          webcam: hasWebcamPermissions,
          mic: hasMicPermissions
        }
      })
      resolve()
    })
  }
}

const mutations = {
  setIsLoggedIn (state, payload): void {
    state.isLoggedIn = payload.isLoggedIn
  },
  setMemberId (state, payload): void {
    state.memberId = payload.memberId
  },
  setIsValidBrowser (state, payload): void {
    state.envCheckList.isValidBrowser = payload.isValidBrowser
  },
  setCanUseMic (state, payload): void {
    state.envCheckList.canUseMic = payload.canUseMic
  },
  setCanUseWebcam (state, payload): void {
    state.envCheckList.canUseWebcam = payload.canUseWebcam
  },
  setDevicePermissions (state, payload): void {
    state.devicePermissions.webcam = payload.devicePermissions.webcam
    state.devicePermissions.mic = payload.devicePermissions.mic
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
