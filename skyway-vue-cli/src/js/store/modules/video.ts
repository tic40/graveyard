import * as Constants from '@js/constants/index'
import * as _ from 'lodash'
import * as Cookies from 'js-cookie'

const lastVolume = Cookies.get(Constants.COOKIES.TUTOR_SOUND_VOLUME)
const defaultVolume: number = lastVolume
  ? lastVolume
  : Constants.DEFAULT_TUTOR_MIC_VOLUME

const state = {
  isStudentVideoOn: true,
  isStudentMicOn: true,
  isTutorVideoOn: true,
  isTutorMicOn: true,
  tutorMicVolume: defaultVolume,

  elements: {
    studentVideo: undefined,
    tutorVideo: undefined
  },

  buttons: {
    studentVideo: {
      disabled: false
    },
    studentMic: {
      disabled: false
    }
  }
}

const getters = {
  isStudentVideoOn: state => state.isStudentVideoOn,
  isStudentMicOn: state => state.isStudentMicOn,
  isTutorVideoOn: state => state.isTutorVideoOn,
  isTutorMicOn: state => state.isTutorMicOn,
  tutorMicVolume: state => state.tutorMicVolume,
  elements: state => state.elements,
  buttons: state => state.buttons
}

const actions = {
  updateIsStudentVideoOn ({ commit }, videoOn: boolean): void {
    commit('setIsStudentVideoOn', { videoOn })
  },
  updateIsStudentMicOn ({ commit }, micOn: boolean): void {
    commit('setIsStudentMicOn', { micOn })
  },
  updateIsTutorMicOn ({ commit }, micOn: boolean): void {
    commit('setIsTutorMicOn', { micOn })
  },
  updateTutorMicVolume ({ commit, state }, volume: number): void {
    if (state.elements.tutorVideo) {
      state.elements.tutorVideo.volume = volume
    }
    commit('setTutorMicVolume', { volume })
  },
  updateElements ({ commit }, elements): void {
    commit('setElements', { elements })
  },
  updateButtons ({ commit }, buttons): void {
    commit('setButtons', { buttons })
  },
  studentVideoButton ({ dispatch, state }): void {
    if (state.buttons.studentVideo.disable) {
      return
    }
    dispatch('updateIsStudentVideoOn', !state.isStudentVideoOn)
    dispatch('updateStudentVideoStream')
  },
  studentMicButton ({ dispatch, state }): void {
    if (state.buttons.studentMic.disable) {
      return
    }
    dispatch('updateIsStudentMicOn', !state.isStudentMicOn)
    dispatch('updateStudentVideoStream')
  },
  async updateStudentVideoStream ({ dispatch, state }): Promise<void> {
    dispatch('updateButtons', {
      studentVideo: { disabled: true },
      studentMic: { disabled: true }
    })
    dispatch(
      'stream/updateLocalStreamOption',
      {
        videoEnabled: state.isStudentVideoOn,
        micEnabled: state.isStudentMicOn
      },
      { root: true }
    )
    await dispatch('setStudentVideo', state.localStream)
    setTimeout(() => {
      dispatch('updateButtons', {
        studentVideo: { disabled: false },
        studentMic: { disabled: false }
      })
    }, 500)
  },
  setStudentVideo ({ state }, localStream): Promise<void> {
    return new Promise(resolve => {
      if (
        !localStream ||
        !state.elements.studentVideo ||
        !state.isStudentVideoOn
      ) {
        resolve()
        return
      }
      state.elements.studentVideo.srcObject = localStream
      state.elements.studentVideo.muted = true
      state.elements.studentVideo.volume = 0
      state.elements.studentVideo.onloadedmetadata = () => {
        state.elements.studentVideo.play()
        resolve()
      }
    })
  },
  setTutorVideo ({ commit, dispatch, state }, remoteStream): Promise<void> {
    return new Promise(resolve => {
      if (
        !remoteStream ||
        !state.elements.tutorVideo ||
        !state.isTutorVideoOn
      ) {
        resolve()
        return
      }
      state.elements.tutorVideo.srcObject = remoteStream
      dispatch('updateTutorMicVolume', state.tutorMicVolume)
      state.elements.tutorVideo.onloadedmetadata = () => {
        state.elements.tutorVideo.play()
        resolve()
      }
    })
  },
  changeRemoteStreamEvent ({ dispatch }, stream): void {
    dispatch('setTutorVideo', stream)
  }
}

const mutations = {
  setIsStudentVideoOn (state, payload): void {
    state.isStudentVideoOn = payload.videoOn
  },
  setIsStudentMicOn (state, payload): void {
    state.isStudentMicOn = payload.micOn
  },
  setIsTutorVideoOn (state, payload): void {
    state.isTutorVideoOn = payload.videoOn
  },
  setIsTutorMicOn (state, payload): void {
    state.isTutorMicOn = payload.micOn
  },
  setTutorMicVolume (state, payload): void {
    state.tutorMicVolume = payload.volume
  },
  setElements (state, payload): void {
    state.elements = _.merge(state.elements, payload.elements)
  },
  setButtons (state, payload): void {
    state.buttons = _.merge(state.buttons, payload.buttons)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
