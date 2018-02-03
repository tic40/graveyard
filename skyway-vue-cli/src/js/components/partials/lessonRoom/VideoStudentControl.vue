<template>
  <div class="controls">
    <span class="control videocam_switch">
      <button
        class="btn btn-action circle"
        @click="studentVideoButton()"
        :class="[{ 'btn-primary': isStudentVideoOn }]"
        :disabled="buttons.studentVideo.disabled">
        <span v-show="isStudentVideoOn"><i class="material-icons">videocam</i></span>
        <span v-show="!isStudentVideoOn"><i class="material-icons">videocam_off</i></span>
      </button>
    </span>
    <span class="control mic_switch">
      <button
        class="btn btn-action circle"
        @click="studentMicButton()"
        :class="[{ 'btn-primary': isStudentMicOn }]"
        :disabled="buttons.studentMic.disabled">
        <span v-show="isStudentMicOn"><i class="material-icons">mic</i></span>
        <span v-show="!isStudentMicOn"><i class="material-icons">mic_off</i></span>
      </button>
    </span>
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    computed: {
      ...mapGetters('lessonRoom/video', [
        'isStudentVideoOn',
        'isStudentMicOn',
        'buttons'
      ])
    },

    methods: {
      ...mapActions('lessonRoom/video', [
        'studentVideoButton',
        'studentMicButton'
      ])
    },

    mixins: [GlobalMixin]
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/video.scss'
</style>
