<template>
  <div class="controls tutor_controls">
    <div class="control connect_switch">
      <button
      class="btn btn-action circle reconnect"
      @click="reconnect()"
      :disabled="connectionStatus === constants.CONNECTION_STATUS.CONNECTING || roomStatus === constants.ROOM_STATUS.LESSON_ENDED">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="control volume_switch">
      <button
      class="btn btn-action btn-primary circle"
      @click="updateIsTutorMicOn(!isTutorMicOn)">
        <i v-show="isTutorMicOn" class="material-icons">
          <span v-show="tutorMicVolume < 0.1">volume_mute</span>
          <span v-show="tutorMicVolume >= 0.1 && tutorMicVolume < 0.5">volume_down</span>
          <span v-show="tutorMicVolume >= 0.5">volume_up</span>
        </i>
        <i v-show="!isTutorMicOn" class="material-icons">volume_off</i>
      </button>
      <span class="control volume_control">
        <input
          class="volume_range"
          type="range"
          min="0.0"
          max="1.0"
          step="0.01"
          v-model="tutorMicVolume">
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    computed: {
      ...mapGetters('lessonRoom', [
        'roomStatus'
      ]),
      ...mapGetters('lessonRoom/video', [
        'isTutorVideoOn',
        'isTutorMicOn',
        'buttons'
      ]),
      ...mapGetters('stream', [
        'connectionStatus'
      ]),
      tutorMicVolume: {
        get (): number {
          return this.$store.state.lessonRoom.video.tutorMicVolume
        },
        set (value: number): void {
          this.$store.dispatch('lessonRoom/video/updateTutorMicVolume', value)
        }
      }
    },

    methods: {
      ...mapActions('lessonRoom/video', [
        'updateIsTutorMicOn'
      ]),
      ...mapActions('stream', [
        'reconnect'
      ])
    },

    mixins: [GlobalMixin]
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/video.scss'
</style>
