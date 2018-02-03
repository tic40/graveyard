import * as Constants from '@js/constants/index'
import * as GibsonApi from '@js/api/gibsonApi'
import * as WordpressApi from '@js/api/wordpressApi'
import * as Util from '@js/modules/util'
import * as Moment from 'moment-timezone'
import * as _ from 'lodash'

const materialInit = { url_student: '', url_tutor: '' }
// *cannot get DNA category from common API
const materialCategoryDNA = {
  id: 27,
  jp_name: 'Daily News Article',
  en_name: 'Discussion with Daily News Article',
  material_list: []
}

const state = {
  // display or select
  materialTab: 'select',
  material: materialInit,
  materialInit: materialInit,

  selectedMaterialCategoryIndex: undefined,
  selectedMaterial: materialInit,
  materialList: [],

  selectedCurriculumChapterIndex: 0,
  selectedCurriculumMaterial: materialInit,
  curriculum: undefined,

  isMaterialLoading: false,
  // the message is system message whici is displayed tutor's chatbox
  lastMaterialChangeMessage: '',

  elements: {
    materialObject: undefined
  },

  buttons: {
    reloadMaterial: {
      disabled: false
    },
    openMaterialWindow: {
      disabled: false
    }
  }
}

const getters = {
  materialTab: state => state.materialTab,
  material: state => state.material,
  materialInit: state => state.materialInit,
  materialUrlStudent: state => state.material.url_student,

  selectedMaterialCategoryIndex: state => state.selectedMaterialCategoryIndex,
  materialList: state => state.materialList,

  selectedCurriculumChapterIndex: state => state.selectedCurriculumChapterIndex,
  curriculum: state => state.curriculum,

  isMaterialLoading: state => state.isMaterialLoading,
  isDisabledReloadButton: (state): boolean => {
    return (
      !state.material.url_student ||
      state.materialTab === 'select' ||
      state.buttons.reloadMaterial.disabled
    )
  },
  isDisabledOpenMaterialWindowButton: (state): boolean => {
    return (
      !state.material.url_student ||
      state.materialTab === 'select' ||
      state.buttons.openMaterialWindow.disabled
    )
  },
  elements: state => state.elements,
  buttons: state => state.buttons
}

const actions = {
  searchMaterialByMaterialUrl ({ state }, url: string): Promise<any> {
    return new Promise(resolve => {
      for (let category of state.materialList) {
        for (let material of category.material_list) {
          if (url === material.url_student || url === material.url_tutor) {
            resolve(material)
            return
          }
        }
      }
      resolve(false)
    })
  },
  updateMaterial ({ commit, dispatch, state }, material): void {
    // replace http to https just in case(http url links are still left in database
    const newMaterial = {
      url_student: Util.replaceHttpLinkToHttps(material.url_student),
      url_tutor: Util.replaceHttpLinkToHttps(material.url_tutor)
    }
    if (material.url_student !== state.material.url_student) {
      commit('setIsMaterialLoading', { isMaterialLoading: true })
      commit('setMaterial', { material: newMaterial })
      commit('setButtons', {
        buttons: {
          reloadMaterial: { disabled: true },
          openMaterialWindow: { disabled: true }
        }
      })
      setTimeout(() => {
        commit('setButtons', {
          buttons: {
            reloadMaterial: { disabled: false },
            openMaterialWindow: { disabled: false }
          }
        })
        commit('setIsMaterialLoading', { isMaterialLoading: false })
      }, 2000)
      // send system message
      dispatch('sendMaterialChangeMessage', newMaterial)
    }
    commit('setMaterialTab', { tab: 'display' })
  },
  async sendMaterialChangeMessage (
    { commit, state, dispatch },
    material
  ): Promise<void> {
    try {
      if (!material.url_tutor) {
        return
      }
      const message: string = 'student changed material: ' + material.url_tutor
      if (message !== state.lastMaterialChangeMessage) {
        await dispatch('stream/sendSystemMessage', message, { root: true })
        commit('setLastMaterialChangeMessage', { message })
      }
    } catch (e) {
      return
    }
  },
  changeConnectionStatusEvent (
    { commit, state, dispatch },
    connectionStatus: string
  ): void {
    if (connectionStatus === Constants.CONNECTION_STATUS.CONNECTED) {
      dispatch('sendMaterialChangeMessage', state.material)
    }
  },
  resetSelectedMaterial ({ commit }) {
    commit('setSelectedMaterial', { material: materialInit })
  },
  resetSelectedCurriculumMaterial ({ commit }) {
    commit('setSelectedCurriculumMaterial', { material: materialInit })
  },
  updateIsMaterialLoading ({ commit }, isMaterialLoading: boolean): void {
    commit('setIsMaterialLoading', { isMaterialLoading })
  },
  updateSelectedMaterialCategoryIndex (
    { commit, dispatch },
    index: number
  ): void {
    dispatch('resetSelectedMaterial')
    commit('setSelectedMaterialCategoryIndex', { index })
  },
  updateSelectedCurriculumChapterIndex (
    { commit, dispatch },
    index: number
  ): void {
    dispatch('resetSelectedCurriculumMaterial')
    commit('setSelectedCurriculumChapterIndex', { index })
  },
  updateSelectedMaterialCategoryIndexByMaterialId (
    { commit, state },
    materialId: number
  ): void {
    for (let index in state.materialList) {
      if (Number(state.materialList[index]['id']) === Number(materialId)) {
        commit('setSelectedMaterialCategoryIndex', { index })
        break
      }
    }
  },
  updateSelectedMaterial ({ commit, dispatch }, material): void {
    dispatch('resetSelectedCurriculumMaterial')
    commit('setSelectedMaterial', { material })
  },
  updateSelectedCurriculumMaterial ({ commit, dispatch }, material): void {
    dispatch('resetSelectedMaterial')
    commit('setSelectedCurriculumMaterial', { material })
  },
  fetchDNAMaterial (): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const dnaList = await WordpressApi.fetchDNAList(
          Constants.NUMBER_OF_DNA_MATERIAL,
          1
        )
        let dnaMaterialList: Array<any> = []
        for (let i in dnaList) {
          if (typeof dnaList[i] !== 'undefined') {
            let dna = dnaList[i]
            let date: string = Moment(dnaList[i]['date']).format('YYYY/MM/DD')
            dnaMaterialList.push({
              id: dna['id'],
              number: undefined,
              jp_title: date + ' ' + dna['title']['rendered'],
              en_title: dna['title']['rendered'],
              url_student: 'https://www.tic40.com' + dna['link'],
              // DNA link for tutor
              url_tutor: 'https://www.tic40.com.ph' + dna['link']
            })
          }
        }
        materialCategoryDNA.material_list = dnaMaterialList
        resolve(materialCategoryDNA)
      } catch (e) {
        reject()
      }
    })
  },
  fetchMaterialList ({ commit, dispatch }): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const dnaMaterial = await dispatch('fetchDNAMaterial')
        const memberMaterial = await GibsonApi.fetchMemberMaterial()
        if (typeof memberMaterial.group_list === 'undefined') {
          resolve()
          return
        }
        let materialList = memberMaterial.group_list
        materialList.push(dnaMaterial)
        commit('setMaterialList', { materialList })
        resolve()
      } catch (e) {
        reject()
      }
    })
  },
  fetchCurriculum ({ commit }): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const memberCurriculum = await GibsonApi.fetchMemberCurriculum()
        commit('setCurriculum', { curriculum: memberCurriculum })
        resolve()
      } catch (e) {
        reject()
      }
    })
  },
  updateMaterialTab ({ commit }, tab: string): void {
    commit('setMaterialTab', { tab })
  },
  updateElements ({ commit }, elements): void {
    commit('setElements', { elements })
  },
  updateButtons ({ commit }, buttons): void {
    commit('setButtons', { buttons })
  },
  reloadMaterial ({ state, dispatch, commit }): void {
    const material: string = _.cloneDeep(state.material)
    commit('setMaterial', { material: materialInit })
    setTimeout(() => {
      dispatch('updateMaterial', material)
    }, 100)
  },
  openNewWindowForMaterial ({ getters }): void {
    Util.openNewWindow(
      getters.materialUrlStudent,
      'material',
      700,
      screen.availHeight,
      0,
      screen.availWidth - 700
    )
  },
  async materialUrlClick (
    { commit, state, dispatch, rootState },
    url: string
  ): Promise<void> {
    url = Util.replaceHttpLinkToHttps(url)
    let material = { url_student: url, url_tutor: url }
    const response = await dispatch('searchMaterialByMaterialUrl', url)
    if (response !== false) {
      material = response
    }
    dispatch('updateMaterial', material)
    // open new window if the layout is 'banana'
    if (rootState.lessonRoom.layout === 'banana') {
      dispatch('openNewWindowForMaterial')
    }
  }
}

const mutations = {
  setMaterial (state, payload): void {
    state.material = payload.material
  },
  setSelectedMaterialCategoryIndex (state, payload): void {
    state.selectedMaterialCategoryIndex = payload.index
  },
  setSelectedMaterial (state, payload): void {
    state.selectedMaterial = payload.material
  },
  setSelectedCurriculumChapterIndex (state, payload): void {
    state.selectedCurriculumChapterIndex = payload.index
  },
  setSelectedCurriculumMaterial (state, payload): void {
    state.selectedCurriculumMaterial = payload.material
  },
  setMaterialTab (state, payload): void {
    state.materialTab = payload.tab
  },
  setMaterialList (state, payload): void {
    state.materialList = payload.materialList
  },
  setCurriculum (state, payload): void {
    state.curriculum = payload.curriculum
  },
  setElements (state, payload): void {
    state.elements = _.merge(state.elements, payload.elements)
  },
  setButtons (state, payload): void {
    state.buttons = _.merge(state.buttons, payload.buttons)
  },
  setIsMaterialLoading (state, payload): void {
    state.isMaterialLoading = payload.isMaterialLoading
  },
  setLastMaterialChangeMessage (state, payload): void {
    state.lastMaterialChangeMessage = payload.message
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
