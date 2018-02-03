<template>
  <div>

    <!-- unknown error -->
    <modal
      class="confirmation_dialog is-normal"
      name="unknown-error"
      :click-to-close="false"
      :width="400"
      height="auto">
      <i class="material-icons mi-lg">error_outline</i>
      <div class="dialog_content">
        <strong>エラーが発生しました</strong>
      </div>

      <!-- TODO: error message -->
      <div class="error_detail" v-if="errorCode === constants.ERROR_CODE.INVALID_QUERY_PARAM">
        <p>正しいURLが確認できません<br>
        マイページより再度入室してください。</p>
      </div>

      <div class="error_detail" v-else-if="errorCode === constants.ERROR_CODE.API_ERROR">
        <p>接続が確認できません。</p>
      </div>

      <div class="error_detail" v-else-if="errorCode === constants.ERROR_CODE.USER_DEVICE_PERMISSION_DENIED">
        <p>マイクの設定が確認できません。</p>
      </div>

      <div class="error_detail" v-else-if="errorCode === constants.ERROR_CODE.NO_WEBRTC_LESSON_RESERVATION">
        <p>レッスンが予約されていないか、既に終了しています。</p>
      </div>

      <div class="error_detail" v-else-if="errorCode === constants.ERROR_CODE.INVALID_ENTRANCE_TIME">
        <p>レッスンルームの準備がまだできていません。<br>
        開始3分前を過ぎてから再度入室してください。</p>
      </div>

      <div class="error_detail" v-else-if="errorCode === constants.ERROR_CODE.DUPLICATE_PEER_ID">
        <p>レッスンルームが複数タブで開かれています<br>
        一度閉じた上で、再度入室してください
        </p>
      </div>

      <div class="error_detail" v-else>
        <p>不明なエラーが発生しました。</p>
      </div>

      <span class="error_code" v-show="errorCode">（エラーコード：{{errorCode}}）</span>

      <div class="dialog_buttons">
        <button v-show="errorCode === constants.ERROR_CODE.API_ERROR" class="c-hand btn" @click="reload()">もう一度試す</button>
        <button v-show="errorCode === constants.ERROR_CODE.USER_DEVICE_PERMISSION_DENIED" class="btn" @click="openNewTab(constants.FAQ_LIST.device)">解決方法を見る</button>
        <button class="btn" @click="hideModal('unknown-error'); moveToMypage()">マイページを開く</button>
      </div>
    </modal>

    <!-- env-error -->
    <modal
      class="confirmation_dialog is-warning"
      name="preparation-error"
      :click-to-close="false"
      :width="500"
      :height="240">

      <i class="material-icons mi-lg">warning</i>

      <div class="dialog_content">
        <strong>レッスンに必要な環境を確認してください</strong>
        <p v-show="!envCheckList.isValidBrowser">このブラウザは対象ではありません。</p>
        <p v-show="!envCheckList.canUseMic">マイクの設定が確認できません。</p>

        <div class="dialog_buttons">
          <a v-show="!envCheckList.isValidBrowser || !envCheckList.canUseMic" class="c-hand btn" @click="openEnvErrorFAQ()">解決方法を見る</a>
          <a class="c-hand btn" @click="reload()">もう一度試す</a>
        </div>
      </div>
    </modal>

  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'
  import ModalMixin from '@js/components/mixins/modal'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    computed: {
      ...mapGetters('student', [
        'envCheckList'
      ])
    },
    methods: {
      openEnvErrorFAQ (): void {
        const envCheckList = this.envCheckList
        let faqLink: string
        if (!envCheckList.isValidBrowser && !envCheckList.canUseMic) {
          faqLink = this.constants.URL_LESSON_ROOM_FAQ
        } else if (!envCheckList.isValidBrowser) {
          faqLink = this.constants.FAQ_LIST.browser
        } else if (!envCheckList.canUseMic) {
          faqLink = this.constants.FAQ_LIST.deviceConnection
        } else {
          faqLink = 'this.constants.constants.URL_LESSON_ROOM_FAQ'
        }
        this.openNewTab(faqLink)
      }
    },
    mixins: [ModalMixin, GlobalMixin]
  }
</script>
