<template>
  <div class="video_area_message">
    <div class="system_message before_start" v-show="roomStatus === constants.ROOM_STATUS.BEFORE_START">
      <dl>
        <dt>レッスン開始までお待ちください</dt>
        <dd>レッスン時間になっても講師が入室しない場合は、開始1分以降に不具合連絡をお願いします。</dd>
      </dl>
    </div>

    <!-- 一旦コメントアウト.必要がなければdeleteする
    <div class="system_message before_start_connected" v-show="roomStatus === constants.ROOM_STATUS.BEFORE_START_CONNECTED">
      <dl>
        <dt>レッスン開始までお待ちください</dt>
      </dl>
    </div>
    -->

    <div class="system_message" v-show="roomStatus === constants.ROOM_STATUS.STARTED">
      <dl><!-- no message --></dl>
    </div>

    <div class="system_message started_within" v-show="roomStatus === constants.ROOM_STATUS.STARTED_WITHIN_1MINUTE_NO_CONNECTION">
      <dl>
        <dt>レッスン開始までお待ちください</dt>
        <dd>レッスン時間になっても講師が入室しない場合は、開始1分以降に不具合連絡をお願いします。</dd>
      </dl>
    </div>

    <div class="system_message started_after" v-show="roomStatus === constants.ROOM_STATUS.STARTED_AFTER_1MINUTE_NO_CONNECTION">
      <dl>
        <dt>ご迷惑をおかけしております</dt>
        <dd>レッスン時間になっても講師が入室しない場合は、不具合連絡をお願いします。</dd>
        <button type="button" class="btn" @click="openNewTab(constants.URL_RJ_FAILURE_REPORT)">不具合連絡する</button>
      </dl>
    </div>

    <div class="system_message lesson_ended" v-show="roomStatus === constants.ROOM_STATUS.LESSON_ENDED">
      <dl>
        <dt>レッスン時間は終了しました</dt>
        <dd>
          このレッスンルームは <span v-show="getFormattedEndRoomTime"><strong>{{getFormattedEndRoomTime}}</strong> に</span>削除されます。画面右上の「退室する」ボタンから退室をお願いします。</dd>
      </dl>
    </div>

    <div class="system_message tutor_camera_off" v-show="roomStatus === constants.ROOM_STATUS.TUTOR_CAMERA_OFF">
      <dl>
        <dt>講師のカメラがOFFになっています</dt>
      </dl>
    </div>

    <div class="system_message tutor_disconnected" v-show="roomStatus === constants.ROOM_STATUS.TUTOR_DISCONNECTED">
      <dl>
        <dt>講師の接続が切れました</dt>
        <dd>そのままお待ちください。<br>
        しばらくたっても講師が入室しない場合は、不具合連絡をお願いします。</dd>
        <button type="button" class="btn" @click="openNewTab(constants.URL_RJ_FAILURE_REPORT)">不具合連絡する</button>
      </dl>
    </div>

    <div v-show="connectionStatus === constants.CONNECTION_STATUS.CONNECTING" class="spinner"></div>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    computed: {
      ...mapGetters('lessonRoom', [
        'roomStatus',
        'getFormattedEndRoomTime',
      ]),
      ...mapGetters('stream', [
        'connectionStatus'
      ])
    },

    mixins: [GlobalMixin]
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/video.scss'
</style>
