<template>
  <div>
    <div class="timeline-flow">
      <span class="timeline-icon icon-lg "><i class="material-icons">{{icon}}</i></span>
    </div>

    <div class="preparation_result">
      <span v-show="item.isLoading" class="result_item loading"></span>

      <div v-show="!item.isLoading">
        <span
          v-show="typeof item.isPassed === 'undefined'"
          class="result_item is-default">
          <i class="result_icon"></i>
        </span>
        <span
          v-show="item.isPassed"
          class="result_item is-ok">
          <i class="result_icon"></i>
        </span>
        <span
          v-show="item.isPassed === false"
          class="result_item is-error">
          <i class="result_icon"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    props: {
      icon: {
        type: String,
        required: true
      },
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/preparation.scss'
</style>
