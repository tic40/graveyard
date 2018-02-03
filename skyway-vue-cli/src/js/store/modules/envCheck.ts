import * as DetectRTC from 'detectrtc'
import * as _ from 'lodash'

const state = {}
const getters = {}
const actions = {
  loadDetectRTC (): Promise<any> {
    return new Promise(resolve => {
      DetectRTC.load(() => {
        resolve(_.cloneDeep(DetectRTC))
      })
    })
  },
  isValidBrowser ({ dispatch }): Promise<boolean> {
    return new Promise(resolve => {
      dispatch('loadDetectRTC').then(detectRTC => {
        // *accept only Chrome or Firefox as valid browser
        const supported: boolean =
          detectRTC.isWebRTCSupported &&
          (detectRTC.browser.isChrome || detectRTC.browser.isFirefox)
            ? true
            : false
        resolve(supported)
      })
    })
  },
  canUseWebcam ({ dispatch }): Promise<boolean> {
    return new Promise(resolve => {
      dispatch('loadDetectRTC').then(detectRTC => {
        resolve(detectRTC.hasWebcam === true)
      })
    })
  },
  canUseMic ({ dispatch }): Promise<boolean> {
    return new Promise(resolve => {
      dispatch('loadDetectRTC').then(detectRTC => {
        resolve(detectRTC.hasMicrophone === true)
      })
    })
  },
  hasWebcamPermissions ({ dispatch }): Promise<boolean> {
    return new Promise(resolve => {
      dispatch('loadDetectRTC').then(detectRTC => {
        resolve(detectRTC.isWebsiteHasWebcamPermissions)
      })
    })
  },
  hasMicPermissions ({ dispatch }): Promise<boolean> {
    return new Promise(resolve => {
      dispatch('loadDetectRTC').then(detectRTC => {
        resolve(detectRTC.isWebsiteHasMicrophonePermissions)
      })
    })
  }
}
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
