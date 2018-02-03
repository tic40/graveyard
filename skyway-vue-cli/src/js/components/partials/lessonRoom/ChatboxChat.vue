<template>
  <div
    id="panel_chat"
    class="tab_panels active"
    :style="{ height: getTabPanelChatHeight + 'px' }">
    <div class="column_chat column_scroll" id="chat-scroll" v-chat-scroll>

      <div class="logo"><img :src="constants.URL_RJ_AWS + '/images/common/logo_rj.png'" alt=""></div>

      <div v-for="(item, index) in chatMessages">
        <!-- tutor -->
        <div v-if="item.sent_by == 'tutor'" class="tile tutor_message">
          <div class="tile-icon">
            <figure class="avatar avatar_tutor">
              <img :src="getProfilePicUrl" alt="">
            </figure>
          </div>
          <div class="tile-content">
            <span
              class="message_time"
              v-show="showMessageCreatedAt(chatMessages[index - 1], item, index)"
              v-text="item.created_at_hhmm">
            </span>
            <div class="message-body">
              <p v-html="item.message_text"></p>
            </div>
          </div>
        </div>
        <!-- /tutor -->

        <!-- student -->
        <div v-else-if="item.sent_by == 'student'" class="tile student_message">
          <div class="tile-content">

            <span
              class="message_time"
              v-show="showMessageCreatedAt(chatMessages[index - 1], item, index)"
              v-text="item.created_at_hhmm">
            </span>
            <div class="message-body">
              <p v-html="item.message_text"></p>
            </div>
          </div>
        </div>
        <!-- /student -->

        <!-- system -->
        <div v-else-if="item.sent_by == 'system'" class="tile system_message">
          <div class="tile-content">
            <div class="message-body">
              <p v-html="item.message_text"></p>
            </div>
          </div>
        </div>
        <!-- /sysytem -->

      </div>
    </div>

    <div class="tile">
      <div class="input-group chat_input">

        <div v-show="alerts.sendChatInput.show" class="tab_content_alert chatbox_alert">
          {{alerts.sendChatInput.text}}
        </div>

        <textarea
          class="form-input form_message"
          :placeholder="'最大' + constants.MAX_CHAT_INPUT_CHAR + '文字まで入力できます'"
          rows="3"
          v-model="chatInput"
          @keydown.meta.enter="sendChatInput($event)"
          @keydown.shift.enter="sendChatInput($event)"
          @keydown.ctrl.enter="sendChatInput($event)">
        </textarea>
        <button
          class="btn btn-primary input-group-btn btn_tab_forms"
          @click="sendChatInput($event)"
          :disabled="
            buttons.sendChatInput.disabled
            || !canSendChatInput
          ">
            <div v-show="buttons.sendChatInput.disabled" class="loading"></div>
            <span v-show="!buttons.sendChatInput.disabled">送信</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    computed: {
      ...mapGetters('lessonRoom', [
        'getTabPanelChatHeight'
      ]),
      ...mapGetters('lesson', [
        'getProfilePicUrl'
      ]),
      ...mapGetters('lessonRoom/chatbox', [
        'chatInput',
        'chatMessages',
        'canSendChatInput',
        'buttons',
        'alerts'
      ]),
      ...mapGetters('stream', [
        'connectionStatus'
      ]),
      chatInput: {
        get (): string {
          return this.$store.state.lessonRoom.chatbox.chatInput
        },
        set (value): void {
          this.$store.dispatch('lessonRoom/chatbox/updateChatInput', value)
        }
      }
    },

    methods: {
      ...mapActions('lessonRoom/chatbox', [
        'updateElements',
        'setEventClickChatBoxMaterialUrl',
        'removeEventClickChatBoxMaterialUrl',
        'scrollChatBoxToBottom',
        'sendChatInput'
      ]),
      showMessageCreatedAt (prevMsg, curMsg, index: number): boolean {
        return (index === 0 ||
          prevMsg.sent_by !== curMsg.sent_by ||
          prevMsg.created_at_hhmm !== curMsg.created_at_hhmm)
      }
    },

    mounted () {
      this.updateElements({
        chatScroll: $('#chat-scroll')
      })
      this.setEventClickChatBoxMaterialUrl()
      this.$nextTick(() => {
        setTimeout(() => {
          this.scrollChatBoxToBottom()
        }, 500)
      })
    },

    beforeDestroy () {
      this.removeEventClickChatBoxMaterialUrl()
    },
    mixins: [GlobalMixin]
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/chatbox.scss';
</style>
