<template>
  <section class="navbar-center">
    <span class="time_left">

      <transition name="lesson-time-slide" mode="out-in">
        <div class="time_left_count" v-if="remainingLessonStartTime > 0" key="before-lesson">
          <small>レッスン開始まで</small>
          <span :class="[{ 'is-up': remainingLessonStartTime < 30 }]" >{{getFormattedRemainingLessonTime}}</span>
        </div>

        <div class="time_left_count" v-else key="lesson-started">
          <small>レッスン残り時間</small>
          <span :class="[{ 'is-up': remainingLessonTime < 300 }]" >{{getFormattedRemainingTime}}</span>
        </div>
      </transition>
    </span>
  </section>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('lesson', [
        'remainingLessonStartTime',
        'remainingLessonTime',
        'getFormattedRemainingLessonTime',
        'getFormattedRemainingTime'
      ]),
    }
  }
</script>
