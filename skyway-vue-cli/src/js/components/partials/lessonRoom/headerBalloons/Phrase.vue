<template>
  <span class="btn_phrase">
    <button
      class="btn btn-action circle"
      :class="{ 'active': currentBalloon === 'phrase' }"
      @click="balloonToggle('phrase')">
      <i class="material-icons">insert_comment</i>
    </button>

    <div v-show="currentBalloon === 'phrase'" class="toast toast_layout layout_phrase">
      <button
        class="btn btn-clear float-right"
        @click="closeBalloon()">
      </button>

      <h2>チャットで使えるフレーズ</h2>

      <!-- tabs -->
      <ul id="tab" class="tab tab-block phrase_tab">
          <li class="tab-item c-hand" v-for="(tab, key) in tabs" :class="{ 'active': currentTab === key }">
            <a
              @click="updateCurrentTab(key)"
              v-text="tab.name">
            </a>
          </li>
      </ul>

      <!-- phrases in tab -->
      <ul
        class="phrase_details"
        v-for="(tab, key) in tabs"
        v-show="currentTab == key">
        <li v-for="phrase in tab.phrases">

          <div class="phrase_item">
            {{phrase.jp_text}}
            <span>
              {{phrase.en_text}}<small>{{phrase.jp_pronunciation}}</small>
            </span>
          </div>
          <div class="phrase_button">
            <button @click="updateChatInput(phrase.en_text)" class="btn">引用</button>
          </div>
        </li>
      </ul>
    </div>
  </span>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    computed: {
      ...mapGetters('lessonRoom/headerBalloons', [
        'currentBalloon'
      ]),
      ...mapGetters('lessonRoom/phrase', [
        'currentTab',
        'tabs'
      ])
    },

    methods: {
      ...mapActions('lessonRoom/headerBalloons', [
        'balloonToggle',
        'closeBalloon'
      ]),
      ...mapActions('lessonRoom/chatbox', [
        'updateChatInput'
      ]),
      ...mapActions('lessonRoom/phrase', [
        'updateCurrentTab'
      ])
    },
    mixins: [GlobalMixin]
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/balloons.scss';
</style>
