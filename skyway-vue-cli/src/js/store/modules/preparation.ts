import * as _ from 'lodash'
import * as Constants from '@js/constants/index'
import SoundMeter from '@js/modules/soundMeter'

let soundMeter
const defaultCheckList = [
  {
    id: Constants.ENV_CHECK_LIST_ID.IS_VALID_BROWSER,
    title: '推奨ブラウザを使っている',
    isLoading: false,
    isPassed: undefined
  },
  {
    id: Constants.ENV_CHECK_LIST_ID.CAN_USE_WEBCAM,
    title: 'カメラが接続されている',
    isLoading: false,
    isPassed: undefined
  },
  {
    id: Constants.ENV_CHECK_LIST_ID.CAN_USE_MIC,
    title: 'マイクが接続されている',
    isLoading: false,
    isPassed: undefined
  },
  {
    id: Constants.ENV_CHECK_LIST_ID.CAN_SEE_VIDEO,
    title: 'カメラが正常に動作する',
    isPassed: undefined,
    isLoading: false,
    isChecking: false
  },
  {
    id: Constants.ENV_CHECK_LIST_ID.CAN_WORK_SOUND_METER,
    title: 'マイクが正常に動作する',
    isPassed: undefined,
    isLoading: false,
    isChecking: false
  },
  {
    id: Constants.ENV_CHECK_LIST_ID.CAN_HEAR_VIDEO_SOUND,
    title: 'スピーカーが正常に動作する',
    isPassed: undefined,
    isLoading: false,
    isChecking: false
  }
]

const state = {
  detectRTC: undefined,
  currentCheckId: 1,
  checkList: _.cloneDeep(defaultCheckList),
  wantToUseWebcam: true,
  devicePermissions: {
    webcam: undefined,
    mic: undefined
  },
  micInputVolume: 0.0,

  elements: {
    myVideo: undefined,
    soundCheckVideo: undefined
  },
  micInputVolumeInterval: undefined
}

const getters = {
  detectRTC: state => state.detectRTC,
  currentCheckId: state => state.currentCheckId,
  checkList: state => state.checkList,
  wantToUseWebcam: state => state.wantToUseWebcam,
  devicePermissions: state => state.devicePermissions,
  micInputVolume: state => state.micInputVolume,
  getLastCheckId: (state): string =>
    state.checkList[state.checkList.length - 1].id,
  isPassedAllCheckList: (state): boolean => {
    for (let v of state.checkList) {
      if (!v.isPassed) {
        return false
      }
    }
    return true
  },
  elements: state => state.elements
}

const actions = {
  restartChecking ({ commit, dispatch }): void {
    dispatch('endCheckCanSeeMyVideo')
    dispatch('removeEventMicInputVolume')
    dispatch('endCheckCanHearVideoSound')
    commit('initializeCheckList')
  },
  incrementCurrentCheckId ({ commit }, id: number): void {
    commit('setCurrentCheckId', { currentCheckId: id + 1 })
  },
  startCheckLoading ({ commit }, checkId: number): void {
    commit('setIsLoading', { index: checkId - 1, isLoading: true })
  },
  stopCheckLoading ({ commit }, checkId: number): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        commit('setIsLoading', { index: checkId - 1, isLoading: false })
        resolve()
      }, 500)
    })
  },
  checkValidBrowser ({ commit, dispatch }, checkId: number): Promise<boolean> {
    return new Promise<boolean>(async resolve => {
      dispatch('startCheckLoading', checkId)
      const result: boolean = await dispatch('envCheck/isValidBrowser', null, {
        root: true
      })
      await dispatch('stopCheckLoading', checkId)
      commit('setIsValidBrowser', { isValidBrowser: result })
      if (result) {
        dispatch(
          'incrementCurrentCheckId',
          Constants.ENV_CHECK_LIST_ID.IS_VALID_BROWSER
        )
      }
      resolve(result)
    })
  },
  checkCanUseWebcam ({ commit, dispatch }, checkId: number): Promise<boolean> {
    return new Promise<boolean>(async resolve => {
      dispatch('startCheckLoading', checkId)
      const result: boolean = await dispatch('envCheck/canUseWebcam', null, {
        root: true
      })
      await dispatch('stopCheckLoading', checkId)
      commit('setCanUseWebcam', { canUseWebcam: result })
      if (result) {
        dispatch(
          'incrementCurrentCheckId',
          Constants.ENV_CHECK_LIST_ID.CAN_USE_WEBCAM
        )
      }
      resolve(result)
    })
  },
  checkCanUseMic (
    { commit, state, dispatch },
    checkId: number
  ): Promise<boolean> {
    return new Promise<boolean>(async resolve => {
      dispatch('startCheckLoading', checkId)
      const result: boolean = await dispatch('envCheck/canUseMic', null, {
        root: true
      })
      await dispatch('stopCheckLoading', checkId)
      commit('setCanUseMic', { canUseMic: result })
      if (result) {
        dispatch(
          'incrementCurrentCheckId',
          Constants.ENV_CHECK_LIST_ID.CAN_USE_MIC
        )
        if (!state.wantToUseWebcam) {
          dispatch('envCheckHandler', {
            id: Constants.ENV_CHECK_LIST_ID.CAN_SEE_VIDEO,
            result: true
          })
        }
      }
      resolve(result)
    })
  },
  envCheckHandler ({ commit, state, dispatch }, params): void {
    const checkId: number = params.id
    const isSkip: boolean = params.isSkip
    const result: boolean = params.result
    switch (checkId) {
    case Constants.ENV_CHECK_LIST_ID.IS_VALID_BROWSER:
      dispatch('checkValidBrowser', checkId)
      break

    case Constants.ENV_CHECK_LIST_ID.CAN_USE_WEBCAM:
      if (isSkip) {
        commit('setWantToUseWebcam', { wantToUseWebcam: false })
        commit('setCanUseWebcam', { canUseWebcam: true })
        dispatch(
            'incrementCurrentCheckId',
            Constants.ENV_CHECK_LIST_ID.CAN_USE_WEBCAM
          )
      } else {
        dispatch('checkCanUseWebcam', checkId)
      }
      break

    case Constants.ENV_CHECK_LIST_ID.CAN_USE_MIC:
      dispatch('checkCanUseMic', checkId)
      break

    case Constants.ENV_CHECK_LIST_ID.CAN_SEE_VIDEO:
      commit('setCanSeeMyVideo', { canSeeMyVideo: result })
      if (result) {
        dispatch('updateIsChecking', { id: checkId, isChecking: false })
        dispatch('endCheckCanSeeMyVideo')
        dispatch(
            'incrementCurrentCheckId',
            Constants.ENV_CHECK_LIST_ID.CAN_SEE_VIDEO
          )
      }
      break

    case Constants.ENV_CHECK_LIST_ID.CAN_WORK_SOUND_METER:
      commit('setCanWorkSoundMeter', { canWorkSoundMeter: result })
      if (result) {
        dispatch('updateIsChecking', { id: checkId, isChecking: false })
        dispatch('removeEventMicInputVolume')
        dispatch(
            'incrementCurrentCheckId',
            Constants.ENV_CHECK_LIST_ID.CAN_WORK_SOUND_METER
          )
      }
      break

    case Constants.ENV_CHECK_LIST_ID.CAN_HEAR_VIDEO_SOUND:
      commit('setCanHearVideoSound', { canHearVideoSound: result })
      if (result) {
        dispatch('updateIsChecking', { id: checkId, isChecking: false })
        dispatch('endCheckCanHearVideoSound')
        dispatch(
            'incrementCurrentCheckId',
            Constants.ENV_CHECK_LIST_ID.CAN_HEAR_VIDEO_SOUND
          )
      }
      break

    default:
        // do nothing
      break
    }
  },
  updateCanWorkSoundMeter ({ commit }, canWorkSoundMeter: boolean): void {
    commit('setCanWorkSoundMeter', { canWorkSoundMeter })
  },
  updateCanHearVideoSound ({ commit }, canHearVideoSound: boolean): void {
    commit('setCanHearVideoSound', { canHearVideoSound })
  },
  updateMicInputVolume ({ commit }, volume: number): void {
    commit('setMicInputVolume', { volume })
  },
  updateIsChecking ({ state, commit }, params): void {
    commit('setIsChecking', {
      index: params.id - 1,
      isChecking: params.isChecking
    })
  },
  async startCheckingCanSeeMyVideo ({ state, dispatch }): Promise<void> {
    try {
      dispatch('updateIsChecking', {
        id: Constants.ENV_CHECK_LIST_ID.CAN_SEE_VIDEO,
        isChecking: true
      })
      await dispatch('checkDevicePermissions')
      if (!state.devicePermissions.webcam) {
        dispatch('modal/showModal', 'device-permission', { root: true })
      }
      const stream = await dispatch(
        'stream/getUserMedia',
        Constants.GET_USER_MEDIA_CONSTRAINTS_ONLY_VIDEO,
        { root: true }
      )
      dispatch('modal/hideModal', 'device-permission', { root: true })
      state.elements.myVideo.srcObject = stream
      state.elements.myVideo.muted = true
      state.elements.myVideo.volume = 0
      state.elements.myVideo.onloadedmetadata = () => {
        state.elements.myVideo.play()
      }
    } catch (e) {
      dispatch('modal/hideModal', 'device-permission', { root: true })
      dispatch('envCheckHandler', {
        id: Constants.ENV_CHECK_LIST_ID.CAN_SEE_VIDEO,
        result: false
      })
    }
  },
  endCheckCanSeeMyVideo ({ state }): void {
    state.elements.myVideo.srcObject = null
  },
  endCheckCanHearVideoSound ({ state }): void {
    state.elements.soundCheckVideo.pause()
    state.elements.soundCheckVideo.currentTime = 0
  },
  async startCheckingCanWorkSoundMeter ({ state, dispatch }): Promise<void> {
    try {
      dispatch('updateIsChecking', {
        id: Constants.ENV_CHECK_LIST_ID.CAN_WORK_SOUND_METER,
        isChecking: true
      })
      await dispatch('checkDevicePermissions')
      if (!state.devicePermissions.mic) {
        dispatch('modal/showModal', 'device-permission', { root: true })
      }
      const stream = await dispatch(
        'stream/getUserMedia',
        Constants.GET_USER_MEDIA_CONSTRAINTS_ONLY_MIC,
        { root: true }
      )
      dispatch('modal/hideModal', 'device-permission', { root: true })
      dispatch('createSoundMeter')
      dispatch('soundMeterConnectToSource', stream)
    } catch (e) {
      dispatch('modal/hideModal', 'device-permission', { root: true })
      dispatch('envCheckHandler', {
        id: Constants.ENV_CHECK_LIST_ID.CAN_WORK_SOUND_METER,
        result: false
      })
    }
  },
  startCheckingCanHearVideoSound ({ state, dispatch }): void {
    dispatch('updateIsChecking', {
      id: Constants.ENV_CHECK_LIST_ID.CAN_HEAR_VIDEO_SOUND,
      isChecking: true
    })
    state.elements.soundCheckVideo.play()
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
  },
  createSoundMeter (): void {
    soundMeter = new SoundMeter(new AudioContext())
  },
  soundMeterConnectToSource ({ commit, state, dispatch }, stream): void {
    if (!soundMeter) {
      return
    }
    soundMeter.connectToSource(stream, e => {
      if (e) {
        return
      }
      dispatch('setEventMicInputVolumeInterval')
    })
  },
  setEventMicInputVolumeInterval ({ commit, dispatch }): void {
    const micInputVolumeInterval = setInterval(() => {
      dispatch('updateMicInputVolume', soundMeter.instant.toFixed(2))
    }, 200)
    commit('setMicInputVolumeInterval', { micInputVolumeInterval })
  },
  removeEventMicInputVolume ({ commit }): void {
    commit('clearMicInputVolumeInterval')
  },
  updateElements ({ commit }, elements): void {
    commit('setElements', { elements })
  },
  // for debug
  updateCheckList ({ commit }, checkList): void {
    commit('setCheckList', checkList)
  }
}

const mutations = {
  initializeCheckList (state): void {
    state.currentCheckId = 1
    state.checkList = _.cloneDeep(defaultCheckList)
    state.wantToUseWebcam = true
  },
  setMicInputVolume (state, payload): void {
    state.micInputVolume = payload.volume
  },
  setIsValidBrowser (state, payload): void {
    const index: number = Constants.ENV_CHECK_LIST_ID.IS_VALID_BROWSER - 1
    state.checkList[index].isPassed = payload.isValidBrowser
  },
  setCanUseWebcam (state, payload): void {
    const index: number = Constants.ENV_CHECK_LIST_ID.CAN_USE_WEBCAM - 1
    state.checkList[index].isPassed = payload.canUseWebcam
  },
  setCanUseMic (state, payload): void {
    const index: number = Constants.ENV_CHECK_LIST_ID.CAN_USE_MIC - 1
    state.checkList[index].isPassed = payload.canUseMic
  },
  setCanSeeMyVideo (state, payload): void {
    const index: number = Constants.ENV_CHECK_LIST_ID.CAN_SEE_VIDEO - 1
    state.checkList[index].isPassed = payload.canSeeMyVideo
  },
  setCanWorkSoundMeter (state, payload): void {
    const index: number = Constants.ENV_CHECK_LIST_ID.CAN_WORK_SOUND_METER - 1
    state.checkList[index].isPassed = payload.canWorkSoundMeter
  },
  setCanHearVideoSound (state, payload): void {
    state.checkList[
      Constants.ENV_CHECK_LIST_ID.CAN_HEAR_VIDEO_SOUND - 1
    ].isPassed =
      payload.canHearVideoSound
  },
  setIsChecking (state, payload): void {
    state.checkList[payload.index].isChecking = payload.isChecking
  },
  setIsLoading (state, payload): void {
    state.checkList[payload.index].isLoading = payload.isLoading
  },
  setElements (state, payload): void {
    state.elements = _.merge(state.elements, payload.elements)
  },
  setMicInputVolumeInterval (state, payload): void {
    state.micInputVolumeInterval = payload.micInputVolumeInterval
  },
  clearMicInputVolumeInterval (state): void {
    if (state.micInputVolumeInterval) {
      clearInterval(state.micInputVolumeInterval)
    }
  },
  setCurrentCheckId (state, payload): void {
    state.currentCheckId = payload.currentCheckId
  },
  setDevicePermissions (state, payload): void {
    state.devicePermissions.webcam = payload.devicePermissions.webcam
    state.devicePermissions.mic = payload.devicePermissions.mic
  },
  setWantToUseWebcam (state, payload): void {
    state.wantToUseWebcam = payload.wantToUseWebcam
  },
  // for debug
  setCheckList (state, payload): void {
    state.checkList = payload.checkList
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
