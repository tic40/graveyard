<template>
  <div>
      <div v-if="!isOnline" class="offline_alert">
        <div class="alert alert-error">
          インターネットに接続されていません。ネットワークの設定を確認してください。
        </div>
      </div>

      <div v-else-if="!isPeerOpen && remainingLessonTime > 0" class="offline_alert">
        <div class="alert alert-error">
          通話接続に失敗もしくは通話接続が途切れました。ページを更新してください。 <button class="btn" @click="reload()">更新する</button>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    computed: {
      ...mapGetters('lesson', [
        'remainingLessonTime'
      ]),
      ...mapGetters('stream', [
        'isPeerOpen'
      ]),
    },
    mixins: [GlobalMixin]
  }
</script>
