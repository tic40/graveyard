import * as Constants from '@js/constants/index'
import * as GibsonApi from '@js/api/gibsonApi'
import * as Util from '@js/modules/util'
import * as Moment from 'moment-timezone'
import * as _ from 'lodash'

const state = {
  // chat or memo
  chatBoxTab: 'chat',
  chatInput: '',
  chatMessages: [],
  unreadMessageCount: 0,
  elements: {
    chatScroll: undefined
  },
  buttons: {
    sendChatInput: {
      disabled: false
    }
  },

  alerts: {
    sendChatInput: {
      show: false,
      text: ''
    }
  }
}

const getters = {
  chatBoxTab: state => state.chatBoxTab,
  chatInput: state => state.chatInput,
  chatMessages: state => state.chatMessages,
  canSendChatInput: (state): boolean => {
    return state.chatInput.trim().length > 0
  },
  unreadMessageCount: state => state.unreadMessageCount,
  unreadMessageCountForDisplay: (state): string => {
    return state.unreadMessageCount > 99
      ? '99+'
      : String(state.unreadMessageCount)
  },
  elements: state => state.elements,
  buttons: state => state.buttons,
  alerts: state => state.alerts
}

const actions = {
  updateChatInput ({ commit }, text: string): void {
    commit('setChatInput', { text })
  },
  replaceSentBy ({}, sentBy: number): Promise<string> {
    return new Promise(resolve => {
      let response = undefined
      switch (sentBy) {
      case Constants.CHAT_MESSAGE_SENT_BY.STUDENT:
        response = 'student'
        break
      case Constants.CHAT_MESSAGE_SENT_BY.TUTOR:
        response = 'tutor'
        break
      default:
        break
      }
      resolve(response)
    })
  },
  formatSkyWayChatMessage ({ dispatch }, message): Promise<string> {
    return new Promise(async resolve => {
      let formattedMessage = _.cloneDeep(message)
      formattedMessage.message_text = Util.sanitizeChatMessage(
        formattedMessage.message_text
      )
      formattedMessage.message_text = Util.replaceNewLineToBrTag(
        formattedMessage.message_text
      )
      if (formattedMessage.sent_by === 'tutor') {
        formattedMessage.message_text = await dispatch(
          'replaceLinkInChatMessageForStudent',
          formattedMessage.message_text
        )
      } else {
        formattedMessage.message_text = await dispatch(
          'replaceLinkInChatMessage',
          formattedMessage.message_text
        )
      }
      resolve(formattedMessage)
    })
  },
  async fetchChatMessages (
    { commit, dispatch, rootState },
    registrationId: number
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await GibsonApi.fetchMemberLessonSkywayChat(
          registrationId
        )
        resolve(response)
        if (typeof response.list === 'undefined') {
          resolve()
          return
        }
        for (let message of response.list) {
          message.sent_by = await dispatch(
            'replaceSentBy',
            Number(message.sent_by)
          )
          message.created_at_hhmm = Moment(message.created_at, 'YYYYMMDDHHmmss')
            .add(rootState.global.serverTimeOffset, 'seconds')
            .format('HH:mm')
          const formattedMessage: string = await dispatch(
            'formatSkyWayChatMessage',
            message
          )
          commit('addChatMessage', {
            message: formattedMessage
          })
        }
        resolve()
      } catch (e) {
        reject()
      }
    })
  },
  replaceLinkInChatMessage ({}, message: string): Promise<string> {
    return new Promise(resolve => {
      const urlRegex = new RegExp('(https?://[\x21-\x7e]+)', 'gi')
      resolve(message.replace(urlRegex, '<a href=\'$1\' target=\'_blank\'>$1</a>'))
    })
  },
  replaceLinkInChatMessageForStudent (
    { dispatch },
    message: string
  ): Promise<string> {
    return new Promise(async resolve => {
      const pattern: string =
        Constants.MATERIAL_DOMAIN_LIST.join('/[\x21-\x7e]+|') +
        '/[\x21-\x7e|/]+'
      const materialRegex = new RegExp(`(https?://(${pattern}))`, 'gi')
      const response: string = await dispatch(
        'replaceLinkInChatMessage',
        message.replace(
          materialRegex,
          '<span class=\'message_link_material\'> $1 </span>'
        )
      )

      resolve(response)
    })
  },
  sendChatInput ({ commit, dispatch, state, getters }, event): void {
    if (event) {
      event.preventDefault()
    }
    if (!getters.canSendChatInput) {
      return
    }
    dispatch('updateButtons', { sendChatInput: { disabled: true } })
    dispatch('stream/sendChatInput', state.chatInput, { root: true })
      .then(() => {
        // clear chat input
        dispatch('updateChatInput', '')
        dispatch('afterSnedChatInupt', null)
      })
      .catch(error => {
        dispatch('afterSnedChatInupt', error)
      })
  },
  afterSnedChatInupt ({ commit, dispatch }, error: string): void {
    let timeout: number = 500
    if (error) {
      timeout = 1000
      dispatch('updateAlerts', {
        sendChatInput: { text: error, show: true }
      })
    }
    setTimeout(() => {
      dispatch('updateButtons', {
        sendChatInput: { disabled: false }
      })
      dispatch('updateAlerts', {
        sendChatInput: { text: '', show: false }
      })
    }, timeout)
  },
  async addSkyWayChatMessage (
    { commit, dispatch, state },
    message
  ): Promise<void> {
    const now: Moment.Moment = Moment()
    if (typeof message.created_at === 'undefined') {
      message.created_at = now.format('YYYYMMDDHHmmss')
    }
    message.created_at_hhmm = now.format('HH:mm')
    const formattedMessage: string = await dispatch(
      'formatSkyWayChatMessage',
      message
    )
    commit('addChatMessage', {
      message: formattedMessage
    })
    if (state.chatBoxTab === 'memo') {
      dispatch('updateUnreadMessageCount', state.unreadMessageCount + 1)
    }
  },
  updateChatBoxTab ({ commit, dispatch, state }, tab: string): void {
    if (tab === state.chatBoxTab) {
      return
    }
    // set 0 to unreadMessageCount if tab becomes 'chat'
    if (tab === 'chat') {
      dispatch('updateUnreadMessageCount', 0)
    }
    commit('setChatBoxTab', { tab })
  },
  updateUnreadMessageCount ({ commit, dispatch }, count: number): void {
    dispatch('updatePageTitle', count)
    commit('setUnreadMessageCount', { count })
  },
  updatePageTitle ({ dispatch, rootState }, unreadMessageCount: number): void {
    const title: string =
      unreadMessageCount > 0
        ? '(' + unreadMessageCount + ') ' + rootState.lessonRoom.lessonRoomTitle
        : rootState.lessonRoom.lessonRoomTitle
    dispatch('global/updateTitle', title, { root: true })
  },
  updateElements ({ commit }, elements): void {
    commit('setElements', { elements })
  },
  updateButtons ({ commit }, buttons): void {
    commit('setButtons', { buttons })
  },
  updateAlerts ({ commit }, alerts): void {
    commit('setAlerts', { alerts })
  },
  setEventClickChatBoxMaterialUrl ({ dispatch, state }): void {
    if (!state.elements.chatScroll) {
      return
    }
    // prevent duplication
    state.elements.chatScroll.off('click', '.message_link_material > a')
    state.elements.chatScroll.on(
      'click',
      '.message_link_material > a',
      function (e) {
        e.preventDefault()
        dispatch('lessonRoom/material/materialUrlClick', $(this).attr('href'), {
          root: true
        })
      }
    )
  },
  removeEventClickChatBoxMaterialUrl (): void {
    if (!state.elements.chatScroll) {
      return
    }
    state.elements.chatScroll.off('click', '.message_link_material > a')
  },
  scrollChatBoxToBottom ({ state }): void {
    if (!state.elements.chatScroll) {
      return
    }
    state.elements.chatScroll[0].scrollTop =
      state.elements.chatScroll[0].scrollHeight
  }
}

const mutations = {
  setChatInput (state, payload): void {
    state.chatInput = payload.text
  },
  setChatBoxTab (state, payload): void {
    state.chatBoxTab = payload.tab
  },
  setUnreadMessageCount (state, payload): void {
    state.unreadMessageCount = payload.count
  },
  setElements (state, payload): void {
    state.elements = _.merge(state.elements, payload.elements)
  },
  setButtons (state, payload): void {
    state.buttons = _.merge(state.buttons, payload.buttons)
  },
  setAlerts (state, payload): void {
    state.alerts = _.merge(state.alerts, payload.alerts)
  },
  addChatMessage (state, payload): void {
    state.chatMessages.push(payload.message)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
