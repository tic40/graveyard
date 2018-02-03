import * as Constants from '@js/constants/index'
import * as GibsonApi from '@js/api/gibsonApi'
import * as Moment from 'moment-timezone'
import * as Util from '@js/modules/util'
import * as Peer from 'skyway-js'

let peerInstance
let existingDataConnection
let existingCall

const state = {
  skyWayApiKey: undefined,
  localStream: undefined,
  remoteStream: undefined,
  peerId: undefined,
  calleePeerId: undefined,
  chatMessages: [],
  endlessCallInterval: undefined,
  connectionStatus: Constants.CONNECTION_STATUS.DISCONNECTED,
  isPeerOpen: false
}

const getters = {
  localStream: state => state.localStream,
  remoteStream: state => state.remoteStream,
  peerId: state => state.peerId,
  chatMessages: state => state.chatMessages,
  calleePeerId: state => state.calleePeerId,
  connectionStatus: state => state.connectionStatus,
  isPeerOpen: state => state.isPeerOpen
}

const actions = {
  fetchSkyWayApiKey ({ commit }): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await GibsonApi.fetchSkyWayApiKey()
        commit('setSkyWayApiKey', { key: response.key })
        resolve()
      } catch (e) {
        reject()
      }
    })
  },
  getUserMedia ({ commit }, constraints): Promise<any> {
    if (!constraints) {
      constraints = Constants.DEFAULT_GET_USER_MEDIA_CONSTRAINTS
    }
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          commit('setLocalStream', { stream })
          resolve(stream)
        })
        .catch(error => {
          console.error(error)
          reject()
        })
    })
  },
  createPeer ({ commit, state, dispatch }, peerId: string): void {
    peerInstance = new Peer(peerId, {
      key: state.skyWayApiKey,
      debug: Constants.SKYWAY_DEBUG_OPTION
    })
    dispatch('peerEventListeners')
  },
  getListAllPeers (): Promise<any> {
    return new Promise(resolve => {
      peerInstance.listAllPeers(list => {
        resolve(list)
      })
    })
  },
  searchPeerIdInPeerList ({ dispatch }, peerId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const list = await dispatch('getListAllPeers')
        if (typeof list !== 'object') {
          throw ''
        }
        for (let v of list) {
          // if found the calleePeerId in the list
          if (v === peerId) {
            resolve()
          }
        }
        reject()
      } catch (e) {
        reject()
      }
    })
  },
  checkBeforeCall ({ state }): Promise<boolean> {
    return new Promise(resolve => {
      if (!peerInstance || !state.isPeerOpen) {
        console.warn('peer is not opened')
        resolve(false)
        return
      }
      if (!state.peerId) {
        console.warn('no peerId')
        resolve(false)
        return
      }
      if (!state.localStream) {
        console.warn('no localStream')
        resolve(false)
        return
      }
      if (!state.calleePeerId) {
        console.warn('no callee peerId')
        resolve(false)
        return
      }
      resolve(true)
    })
  },
  async call ({ state, dispatch }): Promise<void> {
    if (state.connectionStatus === Constants.CONNECTION_STATUS.CONNECTED) {
      return
    }
    dispatch('updateConnectionStatus', Constants.CONNECTION_STATUS.CONNECTING)
    const checkBeforeCall: boolean = await dispatch('checkBeforeCall')
    if (!checkBeforeCall) {
      dispatch('closeConnection')
      return
    }

    try {
      await dispatch('searchPeerIdInPeerList', state.calleePeerId)
      // create data channel
      const dataConnection = peerInstance.connect(state.calleePeerId)
      dispatch('setupDataConnectionEventListeners', dataConnection)

      // create media channel
      const call = peerInstance.call(
        state.calleePeerId,
        state.localStream,
        Constants.DEFAULT_SKYWAY_CALL_OPTION
      )
      dispatch('setupCallEventListeners', call)
    } catch (e) {
      console.warn('calleePeerId is not found in peer list')
    }
  },
  destroyConnection ({ dispatch }): void {
    if (!peerInstance || !state.isPeerOpen) {
      return
    }
    dispatch('closeConnection')
    peerInstance.disconnect()
    peerInstance.destroy()
    dispatch('updateConnectionStatus', Constants.CONNECTION_STATUS.DISCONNECTED)
  },
  sendSystemMessage ({ commit }, message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!existingDataConnection || !existingDataConnection.open) {
        reject()
        return
      }

      const formattedMessage = {
        sent_by: 'system',
        //action: '',
        message_text: Util.sanitizeChatMessage(message)
      }
      existingDataConnection.send(JSON.stringify(formattedMessage))
      commit('addSkyWayChatMessage', { message: formattedMessage })
      resolve()
    })
  },
  sendChatInputValidation ({}, message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!existingDataConnection || !existingDataConnection.open) {
        reject('チャットが接続されていません')
        return
      } else if (message.length <= 0) {
        reject('文字が入力されていません')
        return
      } else if (message.length > Constants.MAX_CHAT_INPUT_CHAR) {
        reject(
          '文字数は' + Constants.MAX_CHAT_INPUT_CHAR + '文字以下にしてください'
        )
        return
      } else if (Util.hasEmoji(message)) {
        reject('絵文字は使用できません')
        return
      } else {
        resolve()
      }
    })
  },
  sendChatInput ({ commit, dispatch, state }, message: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        message = message.trim()
        await dispatch('sendChatInputValidation', message)
        let formattedMessage = {
          sent_by: 'student',
          //action: '',
          message_text: Util.sanitizeChatMessage(message)
        }
        existingDataConnection.send(JSON.stringify(formattedMessage))
        commit('addSkyWayChatMessage', { message: formattedMessage })
        dispatch('notifyChatMessageUpdate', formattedMessage)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },
  updateCalleePeerId ({ commit }, calleePeerId: string): void {
    commit('setCalleePeerId', { peerId: calleePeerId })
  },
  notifyChatMessageUpdate ({ dispatch }, message): void {
    dispatch('lessonRoom/chatbox/addSkyWayChatMessage', message, {
      root: true
    })
  },
  reconnect ({ state, dispatch }): void {
    dispatch('closeConnection', Constants.CONNECTION_STATUS.CONNECTING)
    setTimeout(() => {
      dispatch('call', state.calleePeerId)
    }, 1000)
  },
  peerEventListeners ({ commit, dispatch }): void {
    peerInstance.on('open', () => {
      console.info('peer on')
      commit('setPeerId', { peerId: peerInstance.id })
      commit('setIsPeerOpen', { isPeerOpen: true })
      dispatch('setEndlessCallEvent')
    })
    peerInstance.on('error', err => {
      console.error('peer error: ' + err.message)
      dispatch('disconnectPeer')

      // if duplicate error occurs
      if (err.message.indexOf('Choose a different peerId and try again')) {
        dispatch(
          'global/updateErrorCode',
          Constants.ERROR_CODE.DUPLICATE_PEER_ID,
          { root: true }
        )
        dispatch('modal/showModal', 'unknown-error', { root: true })
      } else {
        dispatch('global/sendErrorLog', err, { root: true })
      }
    })
    peerInstance.on('close', () => {
      console.info('peer close')
      dispatch('disconnectPeer')
    })
    peerInstance.on('disconnected', () => {
      console.info('peer disconnected')
      dispatch('disconnectPeer')
    })
    peerInstance.on('call', call => {
      call.answer(state.localStream, Constants.DEFAULT_SKYWAY_CALL_OPTION)
      // dispatch('removeEndlessCallEvent')
      commit('setCalleePeerId', { peerId: call.remoteId })
      dispatch('setupCallEventListeners', call)
    })
    peerInstance.on('connection', dataConnection => {
      dispatch('setupDataConnectionEventListeners', dataConnection)
    })
  },
  setEndlessCallEvent ({ commit, dispatch }): void {
    const interval = setInterval(() => {
      dispatch('call')
    }, Constants.CALL_INTERVAL)
    commit('setEndlessCallInterval', { interval })
  },
  removeEndlessCallEvent ({ commit, state, dispatch }): void {
    commit('clearEndlessCallInterval')
    if (state.connectionStatus === Constants.CONNECTION_STATUS.CONNECTING) {
      dispatch(
        'updateConnectionStatus',
        Constants.CONNECTION_STATUS.DISCONNECTED
      )
    }
  },
  updateLocalStreamOption ({ commit, state, dispatch }, options): void {
    if (state.localStream) {
      if (state.localStream.getVideoTracks().length !== 0) {
        state.localStream.getVideoTracks()[0].enabled = options.videoEnabled
      }
      if (state.localStream.getAudioTracks().length !== 0) {
        state.localStream.getAudioTracks()[0].enabled = options.micEnabled
      }
    }
  },
  setupCallEventListeners ({ commit, dispatch, state }, call): void {
    if (existingCall) {
      dispatch('closeConnection', Constants.CONNECTION_STATUS.CONNECTING)
    }
    commit('setExistingCall', { call })

    existingCall.on('stream', stream => {
      // dispatch('removeEndlessCallEvent')
      dispatch('updateConnectionStatus', Constants.CONNECTION_STATUS.CONNECTED)
      dispatch('updateRemoteStream', stream)
    })
    existingCall.on('close', () => {
      dispatch('closeConnection', Constants.CONNECTION_STATUS.DISCONNECTED)
      console.info('call closed')
    })
  },
  setupDataConnectionEventListeners (
    { commit, dispatch, state },
    dataConnection
  ): void {
    commit('setExistingDataConnection', { dataConnection })

    // receive data
    existingDataConnection.on('data', data => {
      console.info(data)
      data = JSON.parse(data)
      console.info(data)
      if (typeof data.message_text !== 'undefined') {
        commit('addSkyWayChatMessage', { message: data })
        dispatch('notifyChatMessageUpdate', data)
        return
      }

      if (typeof data.action !== 'undefined') {
        switch (data.action) {
        case Constants.MESSAGE_ACTIONS.END_LESSON:
          dispatch('closeConnection')
          dispatch('modal/showModal', 'end-lesson', { root: true })
          break
        default:
          commit('addSkyWayChatMessage', { message: data })
          dispatch('notifyChatMessageUpdate', data)
          break
        }
        return
      }
    })
    existingDataConnection.on('close', () => {
      console.info('data connetion closed')
      dispatch('closeConnection')
    })
  },
  updateRemoteStream ({ commit, dispatch }, stream): void {
    commit('setRemoteStream', { stream })
    dispatch('lessonRoom/video/changeRemoteStreamEvent', stream, {
      root: true
    })
  },
  updateConnectionStatus (
    { commit, dispatch, state, rootState },
    connectionStatus: string
  ): void {
    const oldStatus: string = state.connectionStatus
    const newStatus: string = connectionStatus
    if (newStatus === oldStatus) {
      return
    }
    if (newStatus === Constants.CONNECTION_STATUS.CONNECTED) {
      GibsonApi.postMemberLessonSkywayCondition(
        rootState.lesson.lessonInfo.registrationId,
        Constants.SKYWAY_OP_CODE.CONNECTED,
        ''
      )
    } else if (
      newStatus === Constants.CONNECTION_STATUS.DISCONNECTED &&
      oldStatus === Constants.CONNECTION_STATUS.CONNECTED
    ) {
      GibsonApi.postMemberLessonSkywayCondition(
        rootState.lesson.lessonInfo.registrationId,
        Constants.SKYWAY_OP_CODE.DISCONNECTED,
        ''
      )
    }
    commit('setConnectionStatus', { connectionStatus })
    dispatch('lessonRoom/changeConnectionStatusEvent', connectionStatus, {
      root: state
    })
    dispatch(
      'lessonRoom/material/changeConnectionStatusEvent',
      connectionStatus,
      { root: true }
    )
  },
  closeConnection ({ commit, dispatch }, connectionStatus: string): void {
    if (!connectionStatus) {
      connectionStatus = Constants.CONNECTION_STATUS.DISCONNECTED
    }
    if (existingDataConnection) {
      existingDataConnection.close()
    }
    if (existingCall) {
      existingCall.close()
    }
    dispatch('updateRemoteStream', null)
    dispatch('updateConnectionStatus', connectionStatus)
  },
  disconnectPeer ({ commit }): void {
    if (peerInstance) {
      peerInstance.disconnect()
    }
    commit('setIsPeerOpen', { isPeerOpen: false })
  }
}

const mutations = {
  setSkyWayApiKey (state, payload): void {
    state.skyWayApiKey = payload.key
  },
  setLocalStream (state, payload): void {
    state.localStream = payload.stream
  },
  setRemoteStream (state, payload): void {
    state.remoteStream = payload.stream
  },
  addSkyWayChatMessage (state, payload): void {
    let message = {
      sent_by: payload.message.sent_by,
      message_text: payload.message.message_text,
      created_at: Moment()
    }
    state.chatMessages.push(message)
  },
  setPeerId (state, payload): void {
    state.peerId = payload.peerId
  },
  setCalleePeerId (state, payload): void {
    state.calleePeerId = payload.peerId
  },
  setExistingCall (state, payload): void {
    existingCall = payload.call
  },
  setExistingDataConnection (state, payload): void {
    existingDataConnection = payload.dataConnection
  },
  setConnectionStatus (state, payload): void {
    state.connectionStatus = payload.connectionStatus
  },
  setEndlessCallInterval (state, payload): void {
    state.endlessCallInterval = payload.interval
  },
  clearEndlessCallInterval (state): void {
    if (state.endlessCallInterval) {
      clearInterval(state.endlessCallInterval)
    }
  },
  setIsPeerOpen (state, payload): void {
    state.isPeerOpen = payload.isPeerOpen
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
