<template>
  <div id="header">
    <header class="navbar">

      <section class="navbar-section">
        <span class="tutor_name">{{lessonInfo.tutorName}} <small>先生</small></span>
      </section>

      <HeaderLessonTimeCounter />

      <section class="navbar-section">
        <div class="layout_button">
          <button
            class="btn-action layout_himawari"
            :v-ga="$ga.event('member', 'lesson_room', 'layout_material')"
            :class="{ 'is-active': layout == 'himawari' }"
            @click="changeLayout('himawari')">
            <i class="co-layout_himawari"></i>
          </button>

          <button
            class="btn-action layout_banana"
            :v-ga="$ga.event('member', 'lesson_room', 'layout_video')"
            :class="{ 'is-active': layout == 'banana' }"
            @click="changeLayout('banana')">
            <i class="co-layout_banana"></i>
          </button>
          <span class="btn_label">表示切り替え</span>
        </div>

        <div class="action_button" v-click-outside="onClickOutside">
          <PhraseBalloon />
          <HelpBalloon />
          <InquiryBalloon />
        </div>

        <span class="exit_button">
          <button class="btn" @click="showModal('confirm-leave')">
            <i class="material-icons">exit_to_app</i>退室する
          </button>
        </span>
      </section>
    </header>
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'
  import ModalMixin from '@js/components/mixins/modal'

  export default {
    computed: {
      ...mapGetters('lesson', [
        'lessonInfo'
      ]),
      ...mapGetters('lessonRoom', [
        'layout'
      ]),
      ...mapGetters('lessonRoom/headerBalloons', [
        'currentBalloon'
      ])
    },

    methods: {
      ...mapActions('lessonRoom', [
        'changeLayout'
      ]),
      ...mapActions('lessonRoom/headerBalloons', [
        'closeBalloon'
      ]),
      onClickOutside () {
        if (this.currentBalloon) {
          this.closeBalloon()
        }
      }
    },
    mixins: [GlobalMixin, ModalMixin]
  }
</script>
