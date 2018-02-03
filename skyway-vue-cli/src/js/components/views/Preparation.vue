<template>
  <div>
    <DevicePermissionModal />

    <div class="preparation_wrap">
      <form class="preparation_contents">
        <header class="navbar">
          <section class="navbar-section">
            <h1 class="navbar-brand">レッスンルーム環境チェック</h1>
          </section>
          <section class="navbar-section">
            <button type="reset" @click="restart()" class="btn btn-primary input-group-btn">やり直す</button>
          </section>
        </header>
        <p class="preparation_note">レッスン開始前に必ず、ご利用環境の確認をお願いいたします。<br>全ての項目に「&#9711;」がつかないと、レッスンが実施できない場合がございます。</p>

        <div class="timeline">
          <div v-for="item in checkList" :class="getTimelineClass(item)">

            <div class="timeline-content" v-if="item.id === constants.ENV_CHECK_LIST_ID.IS_VALID_BROWSER">
              <div class="tile">
                <div class="tile-content">
                  <h2 class="tile-subtitle" v-text="item.title"></h2>
                  <div class="preparation_btn tile-action" v-show="typeof item.isPassed === 'undefined'">

                    <button
                      class="btn"
                      type="button"
                      @click="envCheckHandler({ id: item.id })"
                      :disabled="item.isLoading">
                      チェック
                    </button>

                  </div>

                  <div class="preparation-error" v-show="item.isPassed === false">
                    <div class="alert alert-error">
                      <strong>このブラウザは対応していません。</strong>
                      <p>最新版の Firefox もしくは Google Chrome をご利用ください。<br>ご不明な場合は<a class="c-hand" @click="openNewTab(constants.FAQ_LIST.browser)">こちら</a>よりご確認をお願いいたします。</p>
                    </div>
                  </div>
                </div>

                <PreparationCheckResult icon="airplay" :item=item />
              </div>
            </div>

            <div class="timeline-content" v-if="item.id === constants.ENV_CHECK_LIST_ID.CAN_USE_WEBCAM">
              <div class="tile">
                <div class="tile-content">
                  <h2 class="tile-subtitle" v-text="item.title"></h2>
                  <div class="preparation_btn tile-action" v-show="typeof item.isPassed === 'undefined'">

                    <button
                      class="btn"
                      type="button"
                      @click="envCheckHandler({ id: item.id })"
                      :disabled="currentCheckId !== item.id || item.isLoading">
                      チェック
                    </button>

                    <button
                      class="btn"
                      type="button"
                      @click="envCheckHandler({ id: item.id, isSkip: true })"
                      :disabled="currentCheckId !== item.id || item.isLoading">
                      カメラは使用しない
                    </button>
                  </div>
                  <div class="preparation-error" v-show="item.isPassed === false">
                    <div class="alert alert-error">
                      <strong>カメラの接続が確認できません。</strong>
                      <p>解決方法はこちらよりご確認をお願いいたします。<br>ご不明な場合は<a class="c-hand" @click="openNewTab(constants.FAQ_LIST.deviceConnection)">こちら</a>よりご確認をお願いいたします。</p>
                    </div>
                  </div>
                </div>

                <PreparationCheckResult icon="videocam" :item=item />
              </div>
            </div>

            <div class="timeline-content" v-if="item.id === constants.ENV_CHECK_LIST_ID.CAN_USE_MIC">
              <div class="tile">
                <div class="tile-content">
                  <h2 class="tile-subtitle" v-text="item.title"></h2>
                  <div class="preparation_btn tile-action" v-show="typeof item.isPassed === 'undefined'">

                    <button
                      class="btn"
                      type="button"
                      @click="envCheckHandler({ id: item.id })"
                      :disabled="currentCheckId !== item.id || item.isLoading">
                      チェック
                    </button>

                  </div>

                  <div class="preparation-error" v-show="item.isPassed === false">
                    <div class="alert alert-error">
                      <strong>マイクの接続が確認できません。</strong>
                      <p>解決方法はこちらよりご確認をお願いいたします。<br>ご不明な場合は<a class="c-hand" @click="openNewTab(constants.FAQ_LIST.deviceConnection)">こちら</a>よりご確認をお願いいたします。</p>
                    </div>
                  </div>
                </div>

                <PreparationCheckResult icon="mic" :item=item />
              </div>
            </div>

            <div class="timeline-content" v-if="item.id === constants.ENV_CHECK_LIST_ID.CAN_SEE_VIDEO">
              <div class="tile">
                <div class="tile-content">
                  <h2 class="tile-subtitle" v-text="item.title"></h2>
                  <div class="preparation_btn tile-action" v-show="typeof item.isPassed === 'undefined'">
                    <button
                      class="btn"
                      type="button"
                      @click="startCheckingCanSeeMyVideo()"
                      :disabled="currentCheckId !== item.id || item.isChecking">
                      チェック
                    </button>

                    <button
                      class="btn"
                      type="button"
                      @click="envCheckHandler({ id: item.id, result: true })"
                      :disabled="currentCheckId !== item.id || item.isChecking">
                      カメラは使用しない
                    </button>
                  </div>

                  <div v-show="item.isChecking" class="tile_content_detail">
                    <p>自分の映像が正常に表示されている</p>
                    <div class="form-group" v-show="item.isPassed !== false">
                      <label class="form-radio">
                        <input
                          type="radio"
                          name="test"
                          @click="envCheckHandler({ id: item.id, result: true })">
                          <i class="form-icon"></i> はい
                      </label>

                      <label class="form-radio">
                        <input
                          type="radio"
                          name="test"
                          @click="envCheckHandler({ id: item.id, result: false })">
                          <i class="form-icon"></i> いいえ
                      </label>

                      <div class="video_check my_video">
                        <video id="my-video" muted autoplay></video>
                      </div>
                    </div>
                  </div>

                  <div class="preparation-error" v-show="item.isPassed === false">
                    <div class="alert alert-error">
                      <strong>カメラの正常な動作が確認できません。</strong>
                      <p>解決方法はこちらよりご確認をお願いいたします。<br>ご不明な場合は<a class="c-hand" @click="openNewTab(constants.FAQ_LIST.device)">こちら</a>よりご確認をお願いいたします。</p>
                    </div>
                  </div>
                </div>

                <PreparationCheckResult icon="recent_actors" :item=item />
              </div>
            </div>

            <div class="timeline-content" v-if="item.id === constants.ENV_CHECK_LIST_ID.CAN_WORK_SOUND_METER">
              <div class="tile">
                <div class="tile-content">
                  <h2 class="tile-subtitle" v-text="item.title"></h2>
                  <div class="preparation_btn tile-action" v-show="typeof item.isPassed === 'undefined'">
                    <button
                      class="btn"
                      type="button"
                      @click="startCheckingCanWorkSoundMeter()"
                      :disabled="currentCheckId !== item.id || item.isChecking">
                      チェック
                    </button>
                  </div>
                  <div
                    class="tile_content_detail"
                    v-show="item.isChecking">

                    <div class="form-group" v-show="item.isPassed !== false">
                      <label class="form-radio">
                        <input
                          type="radio"
                          name="test"
                          @click="envCheckHandler({ id: item.id, result: true })">
                          <i class="form-icon"></i> はい
                        </label>

                      <label class="form-radio">
                        <input
                          type="radio"
                          name="test"
                          @click="envCheckHandler({ id: item.id, result: false })">
                        <i class="form-icon"></i> いいえ
                      </label>
                    </div>

                    <ul class="volume_meter">
                      <li
                        v-for="value in 10"
                        :class="getVolumeMeterClass(11 - value)"
                        :data-value="11 - value">
                      </li>
                    </ul>
                  </div>

                  <div class="preparation-error" v-show="item.isPassed === false">
                    <div class="alert alert-error">
                      <strong>マイクの正常な動作が確認できません。</strong>
                      <p>解決方法はこちらよりご確認をお願いいたします。<br>ご不明な場合は<a class="c-hand" @click="openNewTab(constants.FAQ_LIST.device)">こちら</a>よりご確認をお願いいたします。</p>
                    </div>
                  </div>
                </div>

                <PreparationCheckResult icon="chat" :item=item />
              </div>
            </div>

            <div class="timeline-content" v-if="item.id === constants.ENV_CHECK_LIST_ID.CAN_HEAR_VIDEO_SOUND">
              <div class="tile">
                <div class="tile-content">
                  <h2 class="tile-subtitle" v-text="item.title"></h2>
                  <div class="preparation_btn tile-action" v-show="typeof item.isPassed === 'undefined'">
                    <button
                      class="btn"
                      type="button"
                      @click="startCheckingCanHearVideoSound()"
                      :disabled="currentCheckId !== item.id || item.isChecking">
                      チェック
                    </button>
                  </div>

                  <div v-show="item.isChecking" class="tile_content_detail">
                    <label class="form-radio">
                      <input
                        type="radio"
                        name="canHearVideoSound"
                        @click="envCheckHandler({ id: item.id, result: true })">
                      <i class="form-icon"></i> はい
                    </label>
                    <label class="form-radio">
                      <input
                        type="radio"
                        name="canHearVideoSound"
                        @click="envCheckHandler({ id: item.id, result: false })">
                        <i class="form-icon"></i> いいえ
                    </label>
                    <div class="video_check">
                      <video
                        id="sound-check-video"
                        :src="constants.URL_RJ_AWS + '/cosmo/movie/forSoundTest.mp4'"
                        width="400"
                        controls>
                      </video>
                    </div>
                  </div>

                  <div class="preparation-error" v-show="item.isPassed === false">
                    <div class="alert alert-error">
                      <strong>スピーカーの正常な動作が確認できません。</strong>
                      <p>解決方法はこちらよりご確認をお願いいたします。<br>ご不明な場合は<a class="c-hand" @click="openNewTab(constants.FAQ_LIST.speaker)">こちら</a>よりご確認をお願いいたします。</p>
                    </div>
                  </div>
                </div>
                <PreparationCheckResult icon="volume_up" :item=item />
              </div>
            </div>
          </div>
          <div class="check_complete" v-show="isPassedAllCheckList">
            <p>レッスンの準備はこれで完了です。<br>レッスン時間になったらブラウザからレッスンを受けてください。</p></div>
        </div>
      </form>

      <div class="close_area">
        <button @click="closeTab()" class="btn btn-primary" type="button">閉じる</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    computed: {
      ...mapGetters('preparation', [
        'checkList',
        'currentCheckId',
        'getLastCheckId',
        'micInputVolume',
        'isPassedAllCheckList',
        'elements',
        'devicePermissions'
      ])
    },

    methods: {
      ...mapActions('preparation', [
        'restartChecking',
        'envCheckHandler',
        'removeEventMicInputVolume',
        'updateElements',
        'startCheckingCanSeeMyVideo',
        'startCheckingCanWorkSoundMeter',
        'startCheckingCanHearVideoSound'
      ]),
      restart (): void {
        this.startLoading()
        this.restartChecking()
        setTimeout(() => {
          this.stopLoading()
        }, 500)
      },
      getTimelineClass (item): string {
        let classes: Array<string> = ['timeline-item']
        if (item.id === this.getLastCheckId) {
          classes.push('is-last')
        }

        if (item.id === this.currentCheckId) {
          classes.push('is-current')
        } else if (item.isPassed && item.id !== this.currentCheckId) {
          classes.push('is-checked')
        }
        return classes.join(' ')
      },
      getVolumeMeterClass (value: number): string {
        return ((value / 2) <= (this.micInputVolume * 100)) ? 'active' : ''
      }
    },

    created () {
      this.startLoading()
      this.updateTitle(this.constants.TITLE_PREPARATION)
    },

    mounted () {
      this.updateElements({
        myVideo: document.getElementById('my-video') as HTMLVideoElement,
        soundCheckVideo: document.getElementById('sound-check-video') as HTMLVideoElement
      })
      setTimeout(() => {
        this.stopLoading()
      }, 500)
    },

    beforeDestroy () {
      this.removeEventMicInputVolume()
    },
    mixins: [GlobalMixin]
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/preparation.scss'
</style>
