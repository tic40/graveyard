<template>
  <div>

    <!-- tutorial -->
    <modal
      class="confirmation_dialog is-normal tutorial_dialog"
      name="tutorial"
      :click-to-close="false"
      :width="630"
      :height="540">
      <img :src="constants.URL_RJ_AWS + '/cosmo/image/image_tutorial.png'" alt="レッスンルームの使い方">
      <button class="btn btn_close" @click="finishTutorial()">
        <i class="material-icons">close</i>閉じる
      </button>
    </modal>

    <!-- confirm-webcam -->
    <modal
      class="confirmation_dialog confirm_webcam is-warning"
      name="confirm-webcam"
      :click-to-close="false"
      :width="450"
      :height="280">
      <div class="dialog_content">
        <strong>カメラを認識できませんでした</strong>

        <div class="dialog_buttons">
            <a class="c-hand btn btn-primary" @click="hideModal('confirm-webcam')">
              <i class="material-icons">videocam_off</i>カメラを使わずにレッスンする
            </a>
        </div>
        <p class="notes"><small>設定を変更する場合は、退室した上で再入室をお願いいたします</small></p>
      </div>
      <div class="divider"></div>
      <div class="sub_content">
        <p><strong>カメラを使いたい場合</strong></p>
        <div class="dialog_buttons">
          <a class="c-hand btn" @click="openNewTab(constants.FAQ_LIST.deviceConnection)">解決方法を見る</a>
          <a class="c-hand btn" @click="reload()">もう一度試す</a>
        </div>
      </div>
    </modal>

    <!-- room-deleted -->
    <modal
      class="confirmation_dialog is-error"
      name="room-deleted"
      :click-to-close="false"
      :width="500"
      :height="250">
      <i class="material-icons mi-lg">error_outline</i>
      <div class="dialog_content">
        <strong>このレッスンは終了しました</strong>
        <p>このレッスンルームはご利用いただけません</p>
        <p>レッスンメモはマイページやレッスン履歴より確認をお願いいたします</p>
        <div class="dialog_buttons">
          <button class="btn" @click="moveToMypage()">マイページを開く</button>
        </div>
      </div>
    </modal>

    <!-- confirm-leave -->
    <modal
      class="confirmation_dialog lesson_dialog"
      name="confirm-leave"
      :click-to-close="false"
      :width="400"
      :height="130">
      <div class="dialog_content">
        <strong>退室しますか？</strong>
        <div class="dialog_buttons">
          <button
            @click="leaveLessonRoom()"
            class="btn btn-primary">退室する
          </button>
          <button @click="hideModal('confirm-leave')" class="btn">退室しない</button>
        </div>
      </div>
    </modal>

    <!-- before-leave -->
    <modal
      class="confirmation_dialog lesson_dialog"
      name="before-leave"
      :click-to-close="false"
      :width="450"
      height="auto">

      <!-- if before finish lesson -->
      <div v-if="remainingLessonTime > 0" class="dialog_content">
        <strong>退室しました</strong>
        <div class="dialog_buttons">
          <button class="btn" @click="moveToMypage()">マイページを開く</button>
        </div>
      </div>

      <!-- if after finish lesson -->
      <div v-else>
        <div class="dialog_content">
          <strong>退室しました</strong>
          <p>アンケートに基づいて品質を改善しています。<br>
          些細なことでも結構ですので、ご意見やご感想をお寄せください。</p>
          <img :src="constants.URL_RJ_AWS + '/cosmo/image/image_survey.png'" alt="レッスン満足度アンケート">
        </div>
        <div class="dialog_buttons">
          <button class="btn" @click="moveTo(constants.URL_RJ_LESSON_HISTORY)">アンケートに答える</button>
        </div>
      </div>
    </modal>

    <!-- end-lesson -->
    <modal
      class="confirmation_dialog lesson_dialog"
      name="end-lesson"
      :click-to-close="false"
      :width="450"
      height="auto">
      <div class="dialog_content">
        <strong>このレッスンは終了しました</strong>
        <p>レッスンルーム右上のボタンより退室をお願いいたします。</p>
        <p>なお、退室後は、チャット内容を確認することができません。<br>
          退室前に、レッスンメモへの保存をおすすめいたします。</p>
      </div>
      <div class="dialog_buttons">
        <button class="btn" @click="hideModal('end-lesson')">閉じる</button>
      </div>
    </modal>

    <!-- maintenance -->
    <modal
      class="confirmation_dialog is-normal"
      name="maintenance"
      :click-to-close="false"
      :width="500"
      :height="240">
      <i class="material-icons mi-lg">info_outline</i>
      <div class="dialog_content">
        <strong>ただいまシステムメンテナンスを行っています</strong>
        <p>ご迷惑をおかけして申し訳ございませんが、今しばらくお待ちください。</p>
        <p>ご不明な点はカスタマーサポートまでご連絡をお願いいたします。</p>
        <div class="dialog_buttons">
          <button class="btn" @click="moveToMypage()">マイページを開く</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'
  import ModalMixin from '@js/components/mixins/modal'
  import GlobalMixin from '@js/components/mixins/global'
  import * as GibsonApi from '@js/api/gibsonApi'

  export default {
    computed: {
      ...mapGetters('lesson', [
        'remainingLessonTime',
        'lessonInfo'
      ]),
    },
    methods: {
      finishTutorial (): void {
        this.setCookie({
          name: this.constants.COOKIES.FINISH_TUTORIAL,
          value: 1
        })
        this.hideModal('tutorial')
      },
      leaveLessonRoom (): void {
        GibsonApi.postMemberLessonSkywayCondition(
          this.lessonInfo.registrationId,
          this.constants.SKYWAY_OP_CODE.EXIT_LESSON_ROOM,
          { 'from': 'exit button' }
        )
        this.hideModal('confirm-leave')
        this.$router.push({ name: 'lessonFinish' })
      }
    },

    mixins: [GlobalMixin, ModalMixin]
  }
</script>
