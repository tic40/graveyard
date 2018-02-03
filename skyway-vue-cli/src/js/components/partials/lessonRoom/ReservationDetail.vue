<template>
  <div class="reservation_detail_wrap">
    <div class="reservation_detail">
      <span class="reservation_title">予約内容</span>
      <span class="lesson_schedule ">
        <i class="material-icons">alarm_on</i>{{getFormattedLessonStartTime}}
      </span>

      <div class="lesson_request popover popover-bottom">
        <a class="btn btn-primary">
          <span>レッスンリクエスト詳細</span>
        </a>

        <div class="popover-container">
          <div class="card">
            <div class="card-body">
              <dl>

                <dt>レッスンリクエスト</dt>
                <dd v-text="lessonRequest.materialName"></dd>

                <dt>レッスンの進め方（複数選択可）</dt>
                <dd v-for="v in lessonRequest.lessonProcedure" v-text="v"></dd>

                <dt>文法や発音を間違えたときの指摘</dt>
                <dd v-text="lessonRequest.errorCorrection"></dd>

                <dt>自由記入欄</dt>
                <dd v-text="lessonRequest.otherRequest"></dd>

              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('lesson', [
        'lessonRequest',
        'getFormattedLessonStartTime'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/reservation.scss'
</style>
