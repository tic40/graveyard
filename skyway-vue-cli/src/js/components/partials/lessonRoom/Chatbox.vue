<template>
  <div
    class="tab_contents"
    :class="[
      { 'himawari-chatbox': layout === 'himawari' },
      { 'banana-chatbox': layout === 'banana' }
    ]"
    :style="{ height: getTabContentsHeight + 'px' }">

    <ul class="tab tab-block">
      <li
        class="tab-item"
        :class="[{ 'active': chatBoxTab === 'chat' }]"
        @click="updateChatBoxTab('chat')">
        <a
          class="c-hand"
          :class="[{ 'badge': unreadMessageCount > 0 }]"
          :data-badge="unreadMessageCountForDisplay">チャットボックス
        </a>
      </li>
      <li
        class="tab-item"
        :class="[{ 'active': chatBoxTab === 'memo' }]"
        @click="updateChatBoxTab('memo')">
        <a class="c-hand">レッスンメモ</a>
      </li>
    </ul>

    <ChatboxChat v-show="chatBoxTab === 'chat'" />
    <ChatboxMemo v-show="chatBoxTab === 'memo'" />

  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    computed: {
      ...mapGetters('lessonRoom', [
        'layout',
        'getTabContentsHeight'
      ]),
      ...mapGetters('lessonRoom/chatbox', [
        'chatBoxTab',
        'unreadMessageCount',
        'unreadMessageCountForDisplay'
      ])
    },

    methods: {
      ...mapActions('lessonRoom/chatbox', [
        'updateChatBoxTab'
      ])
    },

    mixins: [GlobalMixin]
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/chatbox.scss';
</style>
