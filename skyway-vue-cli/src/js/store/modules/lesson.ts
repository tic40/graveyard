import * as Constants from '@js/constants/index'
import * as GibsonApi from '@js/api/gibsonApi'
import * as Moment from 'moment-timezone'
import * as _ from 'lodash'

const lessonProcedures = {
  1: '自己紹介の時間を短くしてほしい',
  2: '初心者なのでゆっくり話してほしい',
  3: '生徒が話す時間を多くとってほしい'
}

const errorCorrections = {
  1: '講師に任せる',
  2: '積極的に間違いを指摘してほしい',
  3: '会話を楽しみたいので、あまり指摘はしなくてよい'
}

const state = {
  lessonTimeStatus: Constants.LESSON_TIME_STATUS.BEFORE_START,
  remainingLessonStartTime: Constants.MAX_PREPARATION_TIME_BEFORE_LESSON,
  elapsedLessonTime: 0,
  remainingLessonTime: Constants.LESSON_TIME,

  studentPeerId: undefined,
  tutorPeerId: undefined,

  lessonInfo: {
    registrationId: undefined,
    tutorId: undefined,
    profileKey: undefined,
    tutorName: undefined,
    lessonStartTime: undefined,
    videoChatPlatformId: undefined,
    isSubstituteLesson: undefined,
    isChangedLesson: undefined,
    isCancelableLesson: undefined,
    isTroubleReport: undefined,
    hasLessonRequest: undefined,
    useCarriculum: undefined,
    lessonTime: Constants.LESSON_TIME
  },

  lessonRequest: {
    useCurriculum: undefined,
    curriculum: {
      id: undefined,
      name_jp: undefined,
      can_use: undefined
    },
    materialId: undefined,
    materialName: undefined,
    lessonProcedure: undefined,
    errorCorrection: undefined,
    otherRequest: undefined
  },

  lessonTimeCountDownInterval: undefined,
  remainingLessonStartTimeCountDownInterval: undefined
}

const getters = {
  lessonTimeStatus: state => state.lessonTimeStatus,
  lessonInfo: state => state.lessonInfo,
  getProfilePicUrl: (state): string => {
    return state.lessonInfo.tutorId
      ? Constants.URL_RJ_AWS +
          '/images/jpg/tutor/t' +
          state.lessonInfo.tutorId +
          '.jpg'
      : ''
  },
  elapsedLessonTime: state => state.elapsedLessonTime,
  remainingLessonStartTime: state => state.remainingLessonStartTime,
  remainingLessonTime: state => state.remainingLessonTime,
  lessonRequest: state => state.lessonRequest,

  studentPeerId: state => state.studentPeerId,
  tutorPeerId: state => state.tutorPeerId,

  getFormattedRemainingLessonTime: (state): string => {
    let duration: Moment.Duration = Moment.duration(
      state.remainingLessonStartTime,
      'seconds'
    )
    let seconds: string | number = duration.seconds()
    let minutes: string | number = duration.minutes()
    if (seconds < 10) seconds = '0' + seconds
    if (minutes < 10) minutes = '0' + minutes
    return minutes + ':' + seconds
  },
  getFormattedRemainingTime: (state): string => {
    let duration: Moment.Duration = Moment.duration(
      state.remainingLessonTime,
      'seconds'
    )
    let seconds: string | number = duration.seconds()
    let minutes: string | number = duration.minutes()
    if (seconds < 10) seconds = '0' + seconds
    if (minutes < 10) minutes = '0' + minutes
    return minutes + ':' + seconds
  },
  getFormattedLessonStartTime (state): string {
    if (!state.lessonInfo.lessonStartTime) {
      return ''
    }
    return Moment(state.lessonInfo.lessonStartTime).format('YYYY/MM/DD HH:mm')
  }
}

const actions = {
  // TODO: for debug
  debugLessonStartTime ({ commit }, seconds: number): void {
    commit('forwardLessonStartTime', { seconds })
  },
  fetchLessonReservation (
    { commit, dispatch },
    registrationId: number
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await GibsonApi.fetchMemberLessonReservation()
        if (typeof response.list === 'undefined') {
          reject()
          return
        }
        for (let v of response.list) {
          if (
            Number(v.registration_id) === registrationId &&
            Number(v.video_chat_platform_id) ===
              Constants.VIDEO_CHAT_PLATFORM_ID.SKYWAY
          ) {
            const lessonStartTime: Moment.Moment = Moment(
              v.lesson_start_time,
              'YYYYMMDDHHmm'
            )
            const lessonEndTime: Moment.Moment = lessonStartTime
              .clone()
              .add(Constants.LESSON_TIME, 'seconds')
            commit('setLessonInfo', {
              lessonInfo: {
                registrationId: Number(v.registration_id),
                tutorId: Number(v.tutor_id),
                profileKey: Number(v.profile_key),
                tutorName: v.tutor_name,
                lessonStartTime: lessonStartTime,
                lessonEndTime: lessonEndTime,
                videoChatPlatformId: Number(v.video_chat_platform_id),
                tutorSkypeName: v.tutor_skype_name,
                isSubstituteLesson: Number(v.is_substitute_lesson),
                isChangedLesson: Number(v.is_changed_lesson),
                isCancelableLesson: Number(v.is_cancelable_lesson),
                isTroubleReport: Number(v.is_trouble_report),
                hasLessonRequest: Number(v.has_lesson_request),
                useCarriculum: Number(v.use_curriculum)
              }
            })
            dispatch('calcRemainingLessonStartTime')
            dispatch('calcElapsedLessonTime')
            resolve(true)
            return
          }
        }
        resolve(false)
      } catch (e) {
        reject()
      }
    })
  },
  fetchLessonSkyway ({ commit }, registrationId: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await GibsonApi.fetchMemberLessonSkyway(registrationId)
        if (
          typeof response === 'undefined' ||
          response.hasOwnProperty('error_code')
        ) {
          reject()
          return
        }
        commit('setStudentPeerId', { peerId: response.member_peer_id })
        commit('setTutorPeerId', { peerId: response.tutor_peer_id })
        resolve(true)
      } catch (e) {
        reject()
      }
    })
  },
  fetchLessonRequest ({ commit }, registrationId: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await GibsonApi.fetchMemberLessonRequest(
          registrationId
        )
        if (
          typeof response === 'undefined' ||
          response.hasOwnProperty('error_code')
        ) {
          resolve()
          return
        }
        if (typeof response.is_setting !== 'undefined') {
          const setting = response.is_setting
          let lessonProcedure: Array<any> = []
          for (let v of setting.lesson_procedure.split(',')) {
            lessonProcedure.push(lessonProcedures[v])
          }

          let lessonRequest = {
            useCurriculum: Number(setting.use_curriculum),
            materialId: Number(setting.material_id),
            materialName: setting.material_name,
            lessonProcedure: lessonProcedure,
            errorCorrection: errorCorrections[setting.error_correction],
            otherRequest: setting.other_request,
            curriculum: response.curriculum
          }
          commit('setLessonRequest', { lessonRequest })
        }
        resolve()
      } catch (e) {
        reject()
      }
    })
  },
  setEventRemainingStartTimeCountDown ({ commit, state, dispatch }): void {
    let interval = setInterval(() => {
      if (state.remainingLessonStartTime <= 0) {
        commit('clearRemainingStartTimeCountDownInterval')
        dispatch('setEventLessonTimeCountDown')
      } else {
        dispatch('calcRemainingLessonStartTime')
      }
    }, 1000)
    commit('setRemainingLessonStartTimeCountDown', { interval })
  },
  setEventLessonTimeCountDown ({ commit, state, dispatch }): void {
    dispatch('updateLessonTimeStatus')
    let interval = setInterval(() => {
      if (state.remainingLessonTime <= 0) {
        dispatch('lessonRoom/endLessonTimeEvent', null, { root: true })
        dispatch('updateLessonTimeStatus')
        commit('clearLessonTimeCountDownInterval')
      } else {
        dispatch('calcElapsedLessonTime')
        dispatch('updateLessonTimeStatus')
      }
    }, 1000)
    commit('setLessonTimeCountDownInterval', { interval })
  },
  removeEventLessonTimeCountDown ({ commit }): void {
    commit('clearLessonTimeCountDownInterval')
  },
  removeEventRemainingStartTimeCountDown ({ commit }): void {
    commit('clearRemainingStartTimeCountDownInterval')
  },
  async calcRemainingLessonStartTime ({
    commit,
    state,
    dispatch
  }): Promise<void> {
    const currentTime: Moment.Moment = await dispatch(
      'global/getCurrentTime',
      null,
      { root: true }
    )
    let remainingLessonStartTime: number = state.lessonInfo.lessonStartTime.diff(
      currentTime,
      'seconds'
    )
    if (remainingLessonStartTime < 0) {
      remainingLessonStartTime = 0
    }
    commit('setRemainingLessonStartTime', { remainingLessonStartTime })
  },
  async calcElapsedLessonTime ({ commit, state, dispatch }): Promise<void> {
    const currentTime: Moment.Moment = await dispatch(
      'global/getCurrentTime',
      null,
      { root: true }
    )
    let elapsedLessonTime: number = currentTime.diff(
      state.lessonInfo.lessonStartTime,
      'seconds'
    )
    if (elapsedLessonTime < 0) {
      elapsedLessonTime = 0
    }

    let remainingLessonTime: number =
      state.lessonInfo.lessonTime - elapsedLessonTime
    if (remainingLessonTime < 0) {
      remainingLessonTime = 0
    }
    commit('setElapsedLessonTime', { elapsedLessonTime })
    commit('setRemainingLessonTime', { remainingLessonTime })
  },
  updateLessonTimeStatus ({ commit, dispatch, state }): void {
    let lessonTimeStatus: string = Constants.LESSON_TIME_STATUS.BEFORE_START

    if (state.elapsedLessonTime > 0 && state.elapsedLessonTime < 60) {
      lessonTimeStatus = Constants.LESSON_TIME_STATUS.STARTED_WITHIN_1MINUTE
    } else if (
      state.elapsedLessonTime >= 60 &&
      state.elapsedLessonTime < 60 * 25
    ) {
      lessonTimeStatus = Constants.LESSON_TIME_STATUS.STARTED_AFTER_1MINUTE
    } else if (state.elapsedLessonTime >= 60 * 25) {
      lessonTimeStatus = Constants.LESSON_TIME_STATUS.ENDED
    }

    if (lessonTimeStatus !== state.lessonTimeStatus) {
      commit('setLessonTimeStatus', { lessonTimeStatus })
      dispatch('lessonRoom/changeLessonTimeStatusEvent', lessonTimeStatus, {
        root: true
      })
    }
  }
}

const mutations = {
  setRemainingLessonStartTime (state, payload): void {
    state.remainingLessonStartTime = payload.remainingLessonStartTime
  },
  setElapsedLessonTime (state, payload): void {
    state.elapsedLessonTime = payload.elapsedLessonTime
  },
  setRemainingLessonTime (state, payload): void {
    state.remainingLessonTime = payload.remainingLessonTime
  },
  setLessonTimeStatus (state, payload): void {
    state.lessonTimeStatus = payload.lessonTimeStatus
  },
  setRemainingLessonStartTimeCountDown (state, payload): void {
    state.remainingLessonStartTimeCountDownInterval = payload.interval
  },
  setLessonTimeCountDownInterval (state, payload): void {
    state.lessonTimeCountDownInterval = payload.interval
  },
  setLessonRequest (state, payload): void {
    state.lessonRequest = payload.lessonRequest
  },
  clearLessonTimeCountDownInterval (state): void {
    if (state.lessonTimeCountDownInterval) {
      clearInterval(state.lessonTimeCountDownInterval)
    }
  },
  clearRemainingStartTimeCountDownInterval (state): void {
    if (state.remainingLessonStartTimeCountDownInterval) {
      clearInterval(state.remainingLessonStartTimeCountDownInterval)
    }
  },
  setStudentPeerId (state, payload): void {
    state.studentPeerId = payload.peerId
  },
  setTutorPeerId (state, payload): void {
    state.tutorPeerId = payload.peerId
  },
  setLessonInfo (state, payload): void {
    state.lessonInfo = _.merge(state.lessonInfo, payload.lessonInfo)
  },
  // TODO: for debug
  forwardLessonStartTime (state, payload): void {
    state.lessonInfo.lessonStartTime = state.lessonInfo.lessonStartTime.subtract(
      payload.seconds,
      'second'
    )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
