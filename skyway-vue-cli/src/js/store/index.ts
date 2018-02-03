import Vue from 'vue'
import Vuex from 'vuex'
import VueJsModal from 'vue-js-modal'
import global from '@js/store/modules/global'
import envCheck from '@js/store/modules/envCheck'
import student from '@js/store/modules/student'
import preparation from '@js/store/modules/preparation'
import lesson from '@js/store/modules/lesson'
import lessonRoom from '@js/store/modules/lessonRoom'
import stream from '@js/store/modules/stream'
import modal from '@js/store/modules/modal'
import * as Constants from '@js/constants/index'

Vue.use(Vuex)
Vue.use(VueJsModal)

export default new Vuex.Store({
  strict: Constants.isDev,
  modules: {
    global,
    envCheck,
    student,
    preparation,
    lesson,
    lessonRoom,
    stream,
    modal
  }
})
