<template>
  <div class="progress_wrap">
    <progress
      class="progress"
      :value="elapsedLessonTime"
      :max="lessonInfo.lessonTime">
    </progress>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('lesson', [
        'lessonInfo',
        'elapsedLessonTime'
      ])
    }
  }
</script>
