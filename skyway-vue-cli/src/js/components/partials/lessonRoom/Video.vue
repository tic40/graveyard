<template>
  <div
    class="video_contents"
    :class="[
      { 'himawari-video': layout === 'himawari' },
      { 'banana-video': layout === 'banana' }
    ]"
    :style="{ height: getVideoContentsHeight + 'px' }">

    <div class="tutor_wrap">
      <video
        id="tutor-video"
        class="media_tutor"
        v-show="this.connectionStatus === this.constants.CONNECTION_STATUS.CONNECTED"
        :muted="!isTutorMicOn">
      </video>

      <VideoSystemMessage v-show="this.connectionStatus !== this.constants.CONNECTION_STATUS.CONNECTED" />
    </div>

    <VideoTutorControl />

    <div class="student_wrap">
      <div class="media_student">
        <div class="student-video-wrap">
          <video
            id="student-video"
            v-show="isStudentVideoOn"
            muted>
          </video>
          <img v-show="!isStudentVideoOn" :src="constants.URL_RJ_AWS + '/cosmo/image/avatar_student.png'" alt="Avatar">
        </div>
      </div>

      <VideoStudentControl />
    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    computed: {
      ...mapGetters('lessonRoom', [
        'layout',
        'roomStatus',
        'getVideoContentsHeight'
      ]),
      ...mapGetters('lessonRoom/video', [
        'isStudentVideoOn',
        'isTutorMicOn',
        'elements'
      ]),
      ...mapGetters('stream', [
        'localStream',
        'remoteStream',
        'connectionStatus'
      ])
    },

    methods: {
      ...mapActions('lessonRoom/video', [
        'updateElements',
        'setStudentVideo',
        'setTutorVideo'
      ])
    },

    mounted () {
      this.updateElements({
        studentVideo: document.getElementById('student-video') as HTMLVideoElement,
        tutorVideo: document.getElementById('tutor-video') as HTMLVideoElement
      })

      this.setStudentVideo(this.localStream)
      this.setTutorVideo(this.remoteStream)
    },
    mixins: [GlobalMixin]
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/video.scss'
</style>
