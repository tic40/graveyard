import * as Constants from '@js/constants/index'
import * as GibsonApi from '@js/api/gibsonApi'
import * as Util from '@js/modules/util'
import * as Moment from 'moment-timezone'
import * as _ from 'lodash'

const state = {
  lessonMemoInput: '',
  lessonMemoLastUpdated: {
    memo: undefined,
    updatedAt: undefined
  },
  autoSaveInterval: undefined,
  buttons: {
    saveLessonMemo: {
      disabled: false
    }
  },
  alerts: {
    saveLessonMemo: {
      show: false,
      text: ''
    }
  }
}

const getters = {
  lessonMemoInput: state => state.lessonMemoInput,
  getLessonMemoLastUpdatedAt: (state): string => {
    return Moment(state.lessonMemoLastUpdated.updatedAt).format('HH:mm')
  },
  buttons: state => state.buttons,
  alerts: state => state.alerts
}

const actions = {
  fetchLessonMemo ({ commit, rootState }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const lessonTimestamp: string = rootState.lesson.lessonInfo.lessonStartTime.format(
          'X'
        )
        const response = await GibsonApi.fetchMemberLessonMemo(lessonTimestamp)
        if (typeof response.memo !== 'undefined') {
          // need to replaceBrTag because this memo returns from API is precessed by nl2br
          const memo: string = Util.replaceBrTagToNewLine(response.memo)
          commit('setLessonMemoInput', { memo })
        }
        resolve()
      } catch (e) {
        reject()
      }
    })
  },
  updateLessonMemoInput ({ commit }, memo: string): void {
    commit('setLessonMemoInput', { memo })
  },
  updateButtons ({ commit }, buttons): void {
    commit('setButtons', { buttons })
  },
  updateAlerts ({ commit }, alerts): void {
    commit('setAlerts', { alerts })
  },
  setEventAutoSaveLessonMemo ({ commit, dispatch }): void {
    let autoSaveInterval = setInterval(() => {
      dispatch('saveLessonMemo', null)
    }, Constants.AUTO_SAVE_LESSON_MEMO_INTERVAL)
    commit('setAutoSaveInterval', { autoSaveInterval })
  },
  removeEventAutoSaveLessonMemo ({ commit }): void {
    commit('clearAutoSaveInterval')
  },
  async saveLessonMemo ({ commit, state, dispatch }, event): Promise<void> {
    try {
      dispatch('updateButtons', { saveLessonMemo: { disabled: true } })
      if (event) {
        event.preventDefault()
      }
      const memo: string = state.lessonMemoInput
      await dispatch('postLessonMemo', memo)
      commit('setLessonMemoLastUpdated', {
        lastUpdated: {
          memo: memo,
          updatedAt: Moment()
        }
      })
      dispatch('afterSendLessonMemo', null)
    } catch (e) {
      dispatch('afterSendLessonMemo', e)
    }
  },
  afterSendLessonMemo ({ commit }, error: string) {
    let timeout: number = 500
    if (error) {
      timeout = 1000
      commit('setAlerts', {
        alerts: { saveLessonMemo: { text: error, show: true } }
      })
    }
    setTimeout(() => {
      commit('setButtons', {
        buttons: { saveLessonMemo: { disabled: false } }
      })
      commit('setAlerts', {
        alerts: { saveLessonMemo: { text: '', show: false } }
      })
    }, timeout)
  },
  postLessonMemo ({ rootState }, memo: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (memo.length > Constants.MAX_LESSON_MEMO_INPUT_CHAR) {
          throw '文字数は' +
            Constants.MAX_LESSON_MEMO_INPUT_CHAR +
            '文字以下にしてください'
        }
        const lessonTimestamp: string = rootState.lesson.lessonInfo.lessonStartTime.format(
          'X'
        )
        const response = await GibsonApi.postMemberLessonMemo(
          memo,
          lessonTimestamp
        ).catch(() => {
          throw '保存に失敗しました'
        })
        if (typeof response === 'undefined' || response !== 'SUCCESS') {
          throw '保存に失敗しました'
        }
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }
}

const mutations = {
  setLessonMemoInput (state, payload): void {
    state.lessonMemoInput = payload.memo
  },
  setLessonMemoLastUpdated (state, payload): void {
    state.lessonMemoLastUpdated = payload.lastUpdated
  },
  setButtons (state, payload): void {
    state.buttons = _.merge(state.buttons, payload.buttons)
  },
  setAlerts (state, payload): void {
    state.alerts = _.merge(state.alerts, payload.alerts)
  },
  setAutoSaveInterval (state, payload): void {
    state.autoSaveInterval = payload.autoSaveInterval
  },
  clearAutoSaveInterval (state): void {
    if (state.autoSaveInterval) {
      clearInterval(state.autoSaveInterval)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
