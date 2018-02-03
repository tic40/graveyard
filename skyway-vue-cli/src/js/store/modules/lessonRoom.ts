import * as Constants from '@js/constants/index'
import headerBalloons from '@js/store/modules/headerBalloons'
import phrase from '@js/store/modules/phrase'
import material from '@js/store/modules/material'
import chatbox from '@js/store/modules/chatbox'
import lessonMemo from '@js/store/modules/lessonMemo'
import preCheckSentence from '@js/store/modules/preCheckSentence'
import video from '@js/store/modules/video'
import * as Util from '@js/modules/util'
/* eslint-disable no-unused-vars */
import * as Moment from 'moment-timezone'
import * as Cookies from 'js-cookie'

const lastLayout = Cookies.get(Constants.COOKIES.LAYOUT)
const isFinishedTutorial = Cookies.get(Constants.COOKIES.FINISH_TUTORIAL)
const defaultLayout: string = lastLayout ? lastLayout : Constants.DEFAULT_LAYOUT

const state = {
  // is first time to enter lesson room : if there's a lastLayout, it means not first time

  isFinishedTutorial: isFinishedTutorial ? true : false,
  mountedTime: undefined,
  lessonRoomTitle: Constants.DEFAULT_TITLE,
  isPreChecking: false,
  layout: defaultLayout,
  isConnectedOnce: false,
  roomStatus: Constants.ROOM_STATUS.BEFORE_START,
  remainingRoomTime: undefined,
  endRoomTime: undefined,
  windowHeight: $(window).height(),
  remainingRoomTimeCountDownInterval: undefined
}

const getters = {
  isFinishedTutorial: state => state.isFinishedTutorial,
  mountedTime: state => state.mountedTime,
  lessonRoomTitle: state => state.lessonRoomTitle,
  isPreChecking: state => state.isPreChecking,
  layout: state => state.layout,
  roomStatus: state => state.roomStatus,
  remainingRoomTime: state => state.remainingRoomTime,
  endRoomTime: state => state.endRoomTime,
  getFormattedEndRoomTime: (state): string => {
    if (!state.endRoomTime) {
      return ''
    }
    return state.endRoomTime.format('HH:mm')
  },

  getCardImageHeight: (state): number => {
    return state.windowHeight > 650 ? state.windowHeight - 173 : 477
  },

  getVideoContentsHeight: (state): number => {
    if (state.layout === 'himawari') {
      return 300
    } else if (state.layout === 'banana') {
      return state.windowHeight > 650 ? state.windowHeight - 123 : 550
    }
  },

  getTabPanelChatHeight: (state): number => {
    if (state.layout === 'himawari') {
      return state.windowHeight > 650 ? state.windowHeight - 484 : 167
    } else if (state.layout === 'banana') {
      return state.windowHeight > 650 ? state.windowHeight - 178 : 496
    }
  },

  getTabPanelMemoHeight: (state): number => {
    if (state.layout === 'himawari') {
      return state.windowHeight > 650 ? state.windowHeight - 465 : 187
    } else if (state.layout === 'banana') {
      return state.windowHeight > 650 ? state.windowHeight - 159 : 512
    }
  },

  getTabContentsHeight: (state): number => {
    if (state.layout === 'himawari') {
      return state.windowHeight > 650 ? state.windowHeight - 384 : 267
    } else if (state.layout === 'banana') {
      return state.windowHeight > 650 ? state.windowHeight - 139 : 596
    }
  }
}

const actions = {
  // TODO: for debug
  debugEndRoomTime ({ commit }, seconds: number): void {
    commit('forwardEndRoomTime', { seconds })
  },
  updateMountedTime ({ commit }, mountedTime): void {
    commit('setMountedTime', { mountedTime })
  },
  updateIsPreChecking ({ commit }, isPreChecking: boolean): void {
    commit('setIsPreChecking', { isPreChecking })
  },
  updateLessonRoomTitle ({ commit }, title: string): void {
    commit('setLessonRoomTitle', { title })
  },
  changeLayout ({ commit, state, dispatch }, layout: string): void {
    if (state.layout !== layout) {
      dispatch('global/startLoading', null, { root: true })
      commit('setLayout', { layout })
      setTimeout(() => {
        dispatch('global/stopLoading', null, { root: true })
      }, Constants.CHANGE_LAYOUT_TIMEOUT)
    }
  },
  updateRemainingRoomTime ({ commit }, remainingRoomTime: Moment.Moment): void {
    commit('setRemainingRoomTime', { remainingRoomTime })
  },
  changeConnectionStatusEvent (
    { dispatch, rootState },
    connectionStatus: string
  ): void {
    dispatch('updateLessonRoomStatus', {
      lessonTimeStatus: rootState.lesson.lessonTimeStatus,
      connectionStatus: connectionStatus
    })
  },
  changeLessonTimeStatusEvent (
    { dispatch, rootState },
    lessonTimeStatus: string
  ): void {
    dispatch('updateLessonRoomStatus', {
      lessonTimeStatus: lessonTimeStatus,
      connectionStatus: rootState.stream.connectionStatus
    })
  },
  updateLessonRoomStatus ({ commit, state, dispatch }, params): void {
    let lessonTimeStatus: string = params.lessonTimeStatus
    let connectionStatus: string = params.connectionStatus
    let roomStatus: string = state.roomStatus

    // connected
    if (connectionStatus === Constants.CONNECTION_STATUS.CONNECTED) {
      // once connected
      commit('setIsOnceConnected', { isOnceConnected: true })

      if (lessonTimeStatus === Constants.LESSON_TIME_STATUS.BEFORE_START) {
        roomStatus = Constants.ROOM_STATUS.BEFORE_START_CONNECTED
      } else if (
        lessonTimeStatus === Constants.LESSON_TIME_STATUS.STARTED_WITHIN_1MINUTE
      ) {
        roomStatus = Constants.ROOM_STATUS.STARTED
      } else if (
        lessonTimeStatus === Constants.LESSON_TIME_STATUS.STARTED_AFTER_1MINUTE
      ) {
        roomStatus = Constants.ROOM_STATUS.STARTED
      } else if (lessonTimeStatus === Constants.LESSON_TIME_STATUS.ENDED) {
        roomStatus = Constants.ROOM_STATUS.LESSON_ENDED
      } else {
        // do nothing
      }

      // disconnected || connecting
    } else if (
      connectionStatus === Constants.CONNECTION_STATUS.DISCONNECTED ||
      connectionStatus === Constants.CONNECTION_STATUS.CONNECTING
    ) {
      if (lessonTimeStatus === Constants.LESSON_TIME_STATUS.BEFORE_START) {
        roomStatus = Constants.ROOM_STATUS.BEFORE_START
      } else if (
        lessonTimeStatus === Constants.LESSON_TIME_STATUS.STARTED_WITHIN_1MINUTE
      ) {
        roomStatus = state.isOnceConnected
          ? Constants.ROOM_STATUS.TUTOR_DISCONNECTED
          : Constants.ROOM_STATUS.STARTED_WITHIN_1MINUTE_NO_CONNECTION
      } else if (
        lessonTimeStatus === Constants.LESSON_TIME_STATUS.STARTED_AFTER_1MINUTE
      ) {
        roomStatus = state.isOnceConnected
          ? Constants.ROOM_STATUS.TUTOR_DISCONNECTED
          : Constants.ROOM_STATUS.STARTED_AFTER_1MINUTE_NO_CONNECTION
      } else if (lessonTimeStatus === Constants.LESSON_TIME_STATUS.ENDED) {
        roomStatus = Constants.ROOM_STATUS.LESSON_ENDED
      } else {
        // do nothing
      }
    }

    // when lesson time ended
    if (lessonTimeStatus === Constants.LESSON_TIME_STATUS.ENDED) {
      dispatch('stream/removeEndlessCallEvent', null, { root: true })
    }

    commit('setRoomStatus', { roomStatus })
  },
  updateAlerts ({ commit }, alerts): void {
    commit('setAlerts', { alerts })
  },
  updateWindowHeight ({ commit }, height: number): void {
    commit('setWindowHeight', { height })
  },
  openNewWindowForPreparation (): void {
    Util.openNewWindow(
      '?page=preparation',
      'preparation',
      700,
      screen.availHeight,
      0,
      screen.availWidth - 700
    )
  },
  async endLessonTimeEvent ({ commit, dispatch, rootState }): Promise<void> {
    // remove call event in stream module
    dispatch('stream/removeEndlessCallEvent', null, { root: true })
    // set room end time
    const currentTime = await dispatch('global/getCurrentTime', null, {
      root: true
    })
    const endRoomTime = rootState.lesson.lessonInfo.lessonStartTime
      .clone()
      .add(Constants.LESSON_ROOM_TIME, 'seconds')

    let remainingRoomTime: number = endRoomTime.diff(currentTime, 'seconds')
    if (remainingRoomTime < 0) {
      remainingRoomTime = 0
    }

    commit('setEndRoomTime', { endRoomTime })
    commit('setRemainingRoomTime', { remainingRoomTime })
    dispatch('setEventRemainingRoomTimeCountDown')
  },
  setEventRemainingRoomTimeCountDown ({ commit, state, dispatch }): void {
    const interval = setInterval(() => {
      if (state.remainingRoomTime <= 0) {
        commit('clearRemainingStartTimeCountDownInterval')
        dispatch('endRoomEvent')
      } else {
        dispatch('calcRemainingRoomTime')
      }
    }, 1000)
    commit('setRemainingRoomTimeCountDown', { interval })
  },
  async calcRemainingRoomTime ({ commit, state, dispatch }): Promise<void> {
    const currentTime: Moment.Moment = await dispatch(
      'global/getCurrentTime',
      null,
      { root: true }
    )
    let remainingRoomTime: number = state.endRoomTime.diff(
      currentTime,
      'seconds'
    )
    if (remainingRoomTime < 0) {
      remainingRoomTime = 0
      dispatch('endRoomEvent')
    }
    commit('setRemainingRoomTime', { remainingRoomTime })
  },
  endRoomEvent ({ dispatch }): void {
    dispatch('modal/showModal', 'room-deleted', { root: true })
    dispatch('stream/disconnectPeer', null, { root: true })
  },
  isValidEntranceTime (
    { dispatch },
    lessonStartTime: Moment.Moment
  ): Promise<any> {
    return new Promise(async resolve => {
      const currentTime: Moment.Moment = await dispatch(
        'global/getCurrentTime',
        null,
        { root: true }
      )
      const diff: number = lessonStartTime.diff(currentTime, 'seconds')
      diff <= Constants.MAX_PREPARATION_TIME_BEFORE_LESSON
        ? resolve(true)
        : resolve(false)
    })
  }
}

const mutations = {
  setMountedTime (state, payload): void {
    state.mountedTime = payload.mountedTime
  },
  setLessonRoomTitle (state, payload): void {
    state.lessonRoomTitle = payload.title
  },
  setLayout (state, payload): void {
    state.layout = payload.layout
  },
  setIsPreChecking (state, payload): void {
    state.isPreChecking = payload.isPreChecking
  },
  setWindowHeight (state, payload): void {
    state.windowHeight = payload.height
  },
  setIsOnceConnected (state, payload): void {
    state.isOnceConnected = payload.isOnceConnected
  },
  setRoomStatus (state, payload): void {
    state.roomStatus = payload.roomStatus
  },
  setRemainingRoomTime (state, payload): void {
    state.remainingRoomTime = payload.remainingRoomTime
  },
  setEndRoomTime (state, payload): void {
    state.endRoomTime = payload.endRoomTime
  },
  setRemainingRoomTimeCountDown (state, payload): void {
    state.remainingRoomTimeCountDownInterval = payload.interval
  },
  clearRemainingStartTimeCountDownInterval (state): void {
    clearInterval(state.remainingRoomTimeCountDownInterval)
  },
  // TODO: for debug
  forwardEndRoomTime (state, payload): void {
    state.endRoomTime = state.endRoomTime.subtract(payload.seconds, 'second')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    headerBalloons,
    phrase,
    material,
    chatbox,
    lessonMemo,
    video,
    preCheckSentence
  }
}
