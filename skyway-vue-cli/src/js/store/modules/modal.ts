const state = {}
const getters = {}
const actions = {
  showModal ({}, name: string): void {
    this._vm.$modal.show(name)
  },
  hideModal ({}, name: string): void {
    this._vm.$modal.hide(name)
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
