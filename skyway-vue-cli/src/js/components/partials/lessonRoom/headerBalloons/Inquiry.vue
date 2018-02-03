<template>
  <span class="btn_mail">
    <button
      class="btn btn-action circle"
      :class="{ 'active': currentBalloon === 'inquiry' }"
      @click="balloonToggle('inquiry')">
      <i class="material-icons">mail</i>
    </button>

    <div v-show="currentBalloon === 'inquiry'" class="toast toast_layout layout_inquiry">
      <button
        class="btn btn-clear float-right"
        @click="closeBalloon()">
      </button>

      <button
        class="btn btn_inquiry_content"
        type="button"
        @click="openNewTab(constants.URL_RJ_INQUIRY); closeBalloon()">
        メールする
      </button>
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
      ])
    },

    methods: {
      ...mapActions('lessonRoom/headerBalloons', [
        'balloonToggle',
        'closeBalloon'
      ])
    },

    mixins: [GlobalMixin]
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/balloons.scss';
</style>
