import Vue from 'vue'
import Root from '@js/components/Root'
import router from '@js/router/index'
import store from '@js/store/index'
import VueAnalytics from 'vue-analytics'
import * as VueChatScroll from 'vue-chat-scroll'
import * as VClickOutside from 'v-click-outside'
import * as VueOptions from '@js/config/vueOptions'
import * as Constants from '@js/constants/index'

Vue.use(VueAnalytics, {
  id: Constants.GA_TRACKING_ID,
  router
})
Vue.use(VClickOutside)
Vue.use(VueChatScroll)

// import components
import Header from '@js/components/partials/lessonRoom/Header'
import HeaderLessonTimeCounter from '@js/components/partials/lessonRoom/HeaderLessonTimeCounter'
import PhraseBalloon from '@js/components/partials/lessonRoom/headerBalloons/Phrase'
import HelpBalloon from '@js/components/partials/lessonRoom/headerBalloons/Help'
import InquiryBalloon from '@js/components/partials/lessonRoom/headerBalloons/Inquiry'
import ProgressBar from '@js/components/partials/lessonRoom/ProgressBar'
import Video from '@js/components/partials/lessonRoom/Video'
import VideoSystemMessage from '@js/components/partials/lessonRoom/VideoSystemMessage'
import VideoTutorControl from '@js/components/partials/lessonRoom/VideoTutorControl'
import VideoStudentControl from '@js/components/partials/lessonRoom/VideoStudentControl'
import Chatbox from '@js/components/partials/lessonRoom/Chatbox'
import ChatboxChat from '@js/components/partials/lessonRoom/ChatboxChat'
import ChatboxMemo from '@js/components/partials/lessonRoom/ChatboxMemo'
import ReservationDetail from '@js/components/partials/lessonRoom/ReservationDetail'
import Material from '@js/components/partials/lessonRoom/Material'
import MaterialSelect from '@js/components/partials/lessonRoom/MaterialSelect'
import MaterialDisplay from '@js/components/partials/lessonRoom/MaterialDisplay'
import DebugTool from '@js/components/partials/DebugTool'
import Himawari from '@js/components/partials/lessonRoom/Himawari'
import Banana from '@js/components/partials/lessonRoom/Banana'
import PreCheckLoading from '@js/components/partials/lessonRoom/PreCheckLoading'
import LessonRoomModal from '@js/components/partials/modals/LessonRoom'
import ErrorModal from '@js/components/partials/modals/Error'
import DevicePermissionModal from '@js/components/partials/modals/DevicePermission'
import LessonRoomAlert from '@js/components/partials/alerts/LessonRoom'
import PreparationCheckResult from '@js/components/partials/preparation/CheckResult'

// set components as global componnents
Vue.component('Header', Header)
Vue.component('HeaderLessonTimeCounter', HeaderLessonTimeCounter)
Vue.component('PhraseBalloon', PhraseBalloon)
Vue.component('HelpBalloon', HelpBalloon)
Vue.component('InquiryBalloon', InquiryBalloon)
Vue.component('ProgressBar', ProgressBar)
Vue.component('Video', Video)
Vue.component('VideoSystemMessage', VideoSystemMessage)
Vue.component('VideoTutorControl', VideoTutorControl)
Vue.component('VideoStudentControl', VideoStudentControl)
Vue.component('Chatbox', Chatbox)
Vue.component('ChatboxChat', ChatboxChat)
Vue.component('ChatboxMemo', ChatboxMemo)
Vue.component('ReservationDetail', ReservationDetail)
Vue.component('Material', Material)
Vue.component('MaterialSelect', MaterialSelect)
Vue.component('MaterialDisplay', MaterialDisplay)
Vue.component('DebugTool', DebugTool)
Vue.component('Himawari', Himawari)
Vue.component('Banana', Banana)
Vue.component('PreCheckLoading', PreCheckLoading)
Vue.component('LessonRoomModal', LessonRoomModal)
Vue.component('ErrorModal', ErrorModal)
Vue.component('DevicePermissionModal', DevicePermissionModal)
Vue.component('LessonRoomAlert', LessonRoomAlert)
Vue.component('PreparationCheckResult', PreparationCheckResult)

// set Vue global options
Vue.config.silent = VueOptions.silent
Vue.config.optionMergeStrategies = VueOptions.optionMergeStrategies
Vue.config.devtools = VueOptions.devtools
Vue.config.performance = VueOptions.performance
Vue.config.productionTip = VueOptions.productionTip
Vue.config.ignoredElements = VueOptions.ignoredElements
Vue.config.errorHandler = VueOptions.errorHandler
Vue.config.warnHandler = VueOptions.warnHandler
Vue.config.keyCodes = VueOptions.keyCodes

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<Root />',
  components: { Root }
})
