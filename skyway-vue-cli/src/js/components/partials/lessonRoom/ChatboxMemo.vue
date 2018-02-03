<template>
  <div
    id="panel_memo"
    class="tab_panels"
    :style="{ height: getTabPanelMemoHeight + 'px' }">
    <div class="column_memo">

      <textarea
        class="form-input form_memo"
        :placeholder="'レッスン後にマイページやレッスン履歴から確認することができます。学んだ単語やフレーズを記録しておきましょう。（最大' + constants.MAX_LESSON_MEMO_INPUT_CHAR + '文字）'"
        @focus="setEventAutoSaveLessonMemo()"
        @blur="
          removeEventAutoSaveLessonMemo()
          saveLessonMemo($event)
        "
        rows="8"
        v-model="lessonMemoInput">
      </textarea>

      <div v-show="alerts.saveLessonMemo.show" class="tab_content_alert memo_alert">
        {{alerts.saveLessonMemo.text}}
      </div>

      <span v-show="getLessonMemoLastUpdatedAt" class="msg_autosave">
        {{getLessonMemoLastUpdatedAt}}に保存済み
      </span>

      <button
        class="btn btn-primary btn-block btn_save btn_tab_forms"
        @click="saveLessonMemo($event)"
        :disabled="buttons.saveLessonMemo.disabled">
        <div v-show="buttons.saveLessonMemo.disabled" class="loading"></div>
        <span v-show="!buttons.saveLessonMemo.disabled">保存</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    computed: {
      ...mapGetters('lessonRoom', [
        'getTabPanelMemoHeight'
      ]),
      ...mapGetters('lessonRoom/lessonMemo', [
        'getLessonMemoLastUpdatedAt',
        'buttons',
        'alerts'
      ]),
      lessonMemoInput: {
        get (): string {
          return this.$store.state.lessonRoom.lessonMemo.lessonMemoInput
        },
        set (value): void {
          this.$store.dispatch('lessonRoom/lessonMemo/updateLessonMemoInput', value)
        }
      }
    },

    methods: {
      ...mapActions('lessonRoom/lessonMemo', [
        'saveLessonMemo',
        'setEventAutoSaveLessonMemo',
        'removeEventAutoSaveLessonMemo'
      ]),
    },

    beforeDestroy () {
      this.removeEventAutoSaveLessonMemo()
    },

    mixins: [GlobalMixin]
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/chatbox.scss';
</style>
