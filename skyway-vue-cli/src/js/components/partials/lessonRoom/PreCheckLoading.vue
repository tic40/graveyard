<template>
  <div class="loading_wrapper">
    <div class="loading_content">
      <span class='rotate-loader'></span>
    </div>
    <div class="loading_phrase_wrap">
      <p class="loading_phrase">
        <span class="en" v-text="sentence.en_text"></span>
        <small v-text="sentence.jp_text"></small>
      </p>
      <p v-text="sentence.pronunciation"></p>
      <span class="loading_phrase_headword">Today's Phrase</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    data () {
      return {
        sentence: {
          jp_text: '',
          en_text: '',
          pronunciation: ''
        }
      }
    },
    computed: {
      ...mapGetters('lessonRoom/preCheckSentence', [
        'getSentenceAtRandom'
      ]),
    },
    created () {
      this.sentence = this.getSentenceAtRandom
    },
    mixins: [GlobalMixin]
  }
</script>

<style lang="scss">
  @import '~@sass/loading.scss';
</style>
