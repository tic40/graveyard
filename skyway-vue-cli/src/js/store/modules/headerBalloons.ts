const state = {
  // phrase/help/inquiry
  currentBalloon: ''
}

const getters = {
  currentBalloon: state => state.currentBalloon
}

const actions = {
  balloonToggle ({ state, commit }, balloon: string): void {
    if (state.currentBalloon === balloon) {
      commit('setCurrentBalloon', { currentBalloon: '' })
    } else {
      commit('setCurrentBalloon', { currentBalloon: balloon })
    }
  },
  closeBalloon ({ commit }): void {
    commit('setCurrentBalloon', { currentBalloon: '' })
  }
}

const mutations = {
  setCurrentBalloon (state, payload): void {
    state.currentBalloon = payload.currentBalloon
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
