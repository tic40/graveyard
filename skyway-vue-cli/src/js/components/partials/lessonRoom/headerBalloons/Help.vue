<template>
  <span class="btn_help">
    <button
      class="btn btn-action circle"
      :class="{ 'active': currentBalloon === 'help' }"
      @click="balloonToggle('help')">
      <i class="material-icons">help_outline</i>
    </button>

    <div v-show="currentBalloon === 'help'" class="toast toast_layout layout_help">
      <button
        class="btn btn-clear float-right"
        @click="closeBalloon()">
      </button>

      <button
        class="btn btn_help_content"
        :v-ga="$ga.event('member', 'lesson_room', 'help_tutorial')"
        @click="showModal('tutorial'); closeBalloon()"
        type="button">
        レッスンルームの使い方
      </button>

      <button
        class="btn btn_help_content"
        type="button"
        :v-ga="$ga.event('member', 'lesson_room', 'help_preparation')"
        @click="openNewWindowForPreparation(); closeBalloon()">
        レッスンルーム環境チェック
      </button>

      <div class="divider"></div>

      <button
        class="btn btn_help_content"
        type="button"
        :v-ga="$ga.event('member', 'lesson_room', 'help_howto')"
        @click="openNewTab(constants.URL_LESSON_ROOM_FAQ); closeBalloon()">
        トラブル解決方法
      </button>
    </div>
  </span>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import ModalMixin from '@js/components/mixins/modal'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    computed: {
      ...mapGetters('lessonRoom/headerBalloons', [
        'currentBalloon'
      ])
    },

    methods: {
      ...mapActions('lessonRoom/headerBalloons', [
        'balloonToggle',
        'closeBalloon'
      ])
    },

    mixins: [ModalMixin, GlobalMixin]
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/balloons.scss';
</style>
