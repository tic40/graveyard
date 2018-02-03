<template>
  <div>

    <PreCheckLoading v-if="isPreChecking && !errorCode" />
    <div class="lessonroom_wrap" v-else-if="!errorCode">
      <LessonRoomModal />
      <LessonRoomAlert />
      <Header />
      <ProgressBar />
      <div id="contents" class="container" v-if="!isPreChecking">
        <Himawari v-if="layout === 'himawari'" />
        <Banana v-if="layout === 'banana'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'
  import ModalMixin from '@js/components/mixins/modal'
  import * as GibsonApi from '@js/api/gibsonApi'
  import * as Moment from 'moment-timezone'

  export default {
    computed: {
      ...mapGetters('preparation', [
        'checkList'
      ]),
      ...mapGetters('lesson', [
        'lessonInfo',
        'lessonRequest',
        'studentPeerId',
        'tutorPeerId'
      ]),
      ...mapGetters('lessonRoom', [
        'isFinishedTutorial',
        'mountedTime',
        'isPreChecking',
        'layout'
      ]),
      ...mapGetters('student', [
        'envCheckList',
        'hasRequiredEnvError',
        'devicePermissions'
      ])
    },

    methods: {
      ...mapActions('lesson', [
        'removeEventLessonTimeCountDown',
        'removeEventRemainingStartTimeCountDown',
        'fetchLessonRequest',
        'fetchLessonSkyway',
        'setEventRemainingStartTimeCountDown',
        'fetchLessonReservation'
      ]),
      ...mapActions('lessonRoom', [
        'updateMountedTime',
        'updateLessonRoomTitle',
        'updateIsPreChecking',
        'isValidEntranceTime'
      ]),
      ...mapActions('lessonRoom/chatbox', [
        'fetchChatMessages'
      ]),
      ...mapActions('lessonRoom/lessonMemo', [
        'fetchLessonMemo'
      ]),
      ...mapActions('lessonRoom/material', [
        'fetchMaterialList',
        'fetchCurriculum',
        'updateSelectedMaterialCategoryIndex',
        'updateSelectedMaterialCategoryIndexByMaterialId'
      ]),
      ...mapActions('stream', [
        'getUserMedia',
        'updateCalleePeerId',
        'fetchSkyWayApiKey',
        'createPeer',
        'removeEndlessCallEvent',
        'destroyConnection'
      ]),
      ...mapActions('student', [
        'fetchMemberAuth',
        'checkRequiredEnvForLessonRoom',
        'checkDevicePermissions'
      ]),
      addEventListeners (): void {
        this.offlineEventListener('add')
        this.onlineEventListener('add')
        this.beforeunloadAlertEventListener('add')
        this.beforeunloadCookieEventListener('add')
        this.windowResizeEventListener('add')
      },
      removeEventListeners (): void {
        this.offlineEventListener('remove')
        this.onlineEventListener('remove')
        this.beforeunloadAlertEventListener('remove')
        this.windowResizeEventListener('remove')
        this.removeEventLessonTimeCountDown()
        this.removeEndlessCallEvent()
        this.removeEventRemainingStartTimeCountDown()
      },
      finishPreCheck (result: boolean, errorModal: string, errorCode: string): void {
        setTimeout(() => {
          this.updateIsPreChecking(!result)
          if (!result) {
            this.showModal(errorModal)
            this.updateErrorCode(errorCode)
          } else {
            this.preCheckSuccess()
          }
        }, this.calcPreCheckTimeout())
      },
      calcPreCheckTimeout (): number {
        const diff: number = Moment().diff(this.mountedTime)
        return (this.constants.MIN_PRECHECK_TIMEOUT - diff) > 0 ?
          this.constants.MIN_PRECHECK_TIMEOUT - diff
          : 0
      },
      preCheckSuccess (): void {
        // send SkyWay condition log
        const micStatus: string = (this.envCheckList.canUseMic && this.devicePermissions.mic) ? '1' : '0'
        const cameraStatus: string = (this.envCheckList.canUseWebcam && this.devicePermissions.webcam) ? '1' : '0'
        GibsonApi.postMemberLessonSkywayCondition(
          this.lessonInfo.registrationId,
          this.constants.SKYWAY_OP_CODE.ACCESS_LESSON_ROOM,
          {
            'mic_status': micStatus,
            'camera_status': cameraStatus,
            'user-agent': navigator.userAgent
          }
        )
        this.beforeEnterLessonRoom()
      },
      beforeEnterLessonRoom () {
        const title: string = this.lessonInfo.tutorName + '先生とレッスン中！'
        this.updateLessonRoomTitle(title)
        this.updateTitle(title)

        this.addEventListeners()
        this.setEventRemainingStartTimeCountDown()
        setTimeout(() => {
          if (!this.envCheckList.canUseWebcam || !this.devicePermissions.webcam) {
            this.showModal('confirm-webcam')
          }
          if (!this.isFinishedTutorial) {
            this.showModal('tutorial')
          }
        }, 500)
      },
      preCheck (): void {
        (async () => {
          // check query
          const q = this.$route.query
          if (!q.hasOwnProperty('reservationId')) {
            throw ({ errorModal: 'unknown-error', errorCode: this.constants.ERROR_CODE.INVALID_QUERY_PARAM })
          }
          const registrationId: number = Number(q.reservationId)

          // check member auth
          const memberAuth: boolean = await this.fetchMemberAuth().catch(() => {
            throw ({ errorModal: 'unknown-error', errorCode: this.constants.ERROR_CODE.API_ERROR })
          })
          if (!memberAuth) {
            // redirect to login page
            this.moveTo(this.constants.URL_RJ_LOGIN)
          }

          // get current timestmap
          const fetchTimestamp = await GibsonApi.fetchTimestamp()
          if (typeof fetchTimestamp.timestamp !== 'undefined') {
            this.calcServerTimeOffset(fetchTimestamp.timestamp)
          }

          // check reservation info
          const lessonReservation = await this.fetchLessonReservation(registrationId).catch(() => {
            throw ({ errorModal: 'unknown-error', errorCode: this.constants.ERROR_CODE.API_ERROR })
          })
          if (!lessonReservation) {
            throw ({ errorModal: 'unknown-error', errorCode: this.constants.ERROR_CODE.NO_WEBRTC_LESSON_RESERVATION })
          }
          const isValidEntranceTime = await this.isValidEntranceTime(this.lessonInfo.lessonStartTime)
          if (!isValidEntranceTime) {
            throw ({ errorModal: 'unknown-error', errorCode: this.constants.ERROR_CODE.INVALID_ENTRANCE_TIME })
          }

          // check required env
          await this.checkRequiredEnvForLessonRoom()
          if (this.hasRequiredEnvError) {
            throw ({ errorModal: 'preparation-error', errorCode: this.constants.ERROR_CODE.USER_ENV_ERROR })
          }

          // check device permissions and show up browser permission diealog here
          await this.checkDevicePermissions()
          if (!this.devicePermissions.mic ||
            (!this.devicePermissions.webcam && this.envCheckList.canUseWebcam)) {
            this.showModal('device-permission')
          }

          let constraints = this.constants.DEFAULT_GET_USER_MEDIA_CONSTRAINTS
          if (!this.envCheckList.canUseWebcam) {
            constraints = this.constants.GET_USER_MEDIA_CONSTRAINTS_ONLY_MIC
          }

          await this.getUserMedia(constraints).catch(() => {
            throw ({ errorModal: 'unknown-error', errorCode: this.constants.ERROR_CODE.USER_DEVICE_PERMISSION_DENIED })
          })
          this.hideModal('device-permission')
          // check and update device permissions after getusermedia
          await this.checkDevicePermissions()
          if (!this.devicePermissions.mic) {
            throw ({ errorModal: 'unknown-error', errorCode: this.constants.ERROR_CODE.USER_DEVICE_PERMISSION_DENIED })
          }

          // get peer id which is related to the lesson
          const lessonSkyway: boolean = await this.fetchLessonSkyway(registrationId).catch(() => {
            throw ({ errorModal: 'unknown-error', errorCode: this.constants.ERROR_CODE.API_ERROR })
          })
          if (!lessonSkyway) {
            throw ({ errorModal: 'unknown-error', errorCode: this.constants.ERROR_CODE.API_ERROR })
          }

          await this.fetchSkyWayApiKey().catch(() => {
            throw ({ errorModal: 'unknown-error', errorCode: this.constants.ERROR_CODE.API_ERROR })
          })
          this.updateCalleePeerId(this.tutorPeerId)
          this.createPeer(this.studentPeerId)

          await this.fetchMaterialList()
          await this.fetchLessonRequest(registrationId)
          this.updateSelectedMaterialCategoryIndexByMaterialId(this.lessonRequest.materialId)
          if (this.lessonRequest.useCurriculum === 1) {
            this.fetchCurriculum()
          }
          this.fetchChatMessages(registrationId)
          this.fetchLessonMemo()

          this.finishPreCheck(true)
        })().catch (e => {
          this.hideModal('device-permission')
          this.finishPreCheck(false, e.errorModal, e.errorCode)
        })
      }
    },

    created () {
      this.updateIsPreChecking(true)
      this.stopLoading()
      this.updateTitle(this.constants.DEFAULT_TITLE)
    },

    mounted () {
      this.updateMountedTime(Moment())
      this.preCheck()
    },

    beforeDestroy () {
      this.removeEventListeners()
      this.destroyConnection()
    },
    mixins: [GlobalMixin, ModalMixin]
  }
</script>
