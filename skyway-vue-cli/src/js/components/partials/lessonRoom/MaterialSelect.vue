<template>
  <div id="panel_select" class="material_panels material_box material_select">
    <div class="form-horizontal">

      <!-- select from material lsit -->
      <div class="material_type">
        <dl class="type_content">
          <dt class="type_title">教材から選ぶ</dt>
          <dd class="form-group">
            <div class="col-3"><label class="form-label label-lg form_title">教材</label></div>
            <div class="col-9 cosmo_select">
              <select v-model="selectedMaterialCategoryIndex" class="form-select select-lg">
                <option v-for="(category, index) in materialList" :value="index">
                  {{category.jp_name}}
                </option>
              </select>
            </div>
          </dd>
          <dd class="form-group">
            <div class="col-3"><label class="form-label label-lg form_title">タイトル</label></div>
            <div class="col-9 cosmo_select">
              <select
                class="form-select select-lg"
                v-if="materialList[selectedMaterialCategoryIndex]"
                v-model="selectedMaterial"
                @change="updateMaterial(selectedMaterial)">

                <option
                  :value="materialInit"
                  disabled>
                  レッスンで使いたい教材を選択してください
                </option>

                <option
                  v-for="(item, index) in materialList[selectedMaterialCategoryIndex]['material_list']"
                  :value="item">
                  {{item.number}} {{item.jp_title}}
                </option>
              </select>
            </div>
          </dd>
        </dl>
      </div>

      <div class="divider"></div>

      <!-- select from curriculum -->
      <div v-if="curriculum" class="material_type">
        <dl class="type_content">
          <dt class="type_title">カリキュラムから選ぶ</dt>
          <dd class="form-group">
            <div class="col-3"><label class="form-label label-lg form_title">カリキュラム</label></div>
            <span class="curriculum_name">{{curriculum.jp_name}}</span>
          </dd>
          <dd class="form-group">
            <div class="col-3"><label class="form-label label-lg form_title">チャプター</label></div>
            <div class="col-9 cosmo_select">
              <select
                v-model="selectedCurriculumChapterIndex"
                v-if="curriculum['chapter']"
                class="form-select select-lg">

                <option v-for="(chapter, index) in curriculum.chapter" :value="index">
                  {{chapter.chapter_number}} {{chapter.jp_name}}
                </option>
              </select>
            </div>
          </dd>
          <dd class="form-group">
            <div class="col-3"><label class="form-label label-lg form_title">タイトル</label></div>
            <div class="col-9 cosmo_select">
              <select
                class="form-select select-lg"
                v-if="curriculum['chapter'][selectedCurriculumChapterIndex]['unit_list']"
                v-model="selectedCurriculumMaterial"
                @change="updateMaterial(selectedCurriculumMaterial)">

                <option
                  :value="materialInit"
                  disabled>
                  レッスンで使いたい教材を選択してください
                </option>

                <option
                  v-for="(item, index) in curriculum['chapter'][selectedCurriculumChapterIndex]['unit_list']"
                  :value="{ url_student: item.member_material_url, url_tutor: item.tutor_material_url }">
                  {{item.unit_number}} {{item.title_jp}}
                  <span v-if="typeof item.is_completed == 0"> [進行中]</span>
                  <span v-else-if="item.is_completed == 1"> [完了]</span>
                </option>
              </select>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters('lessonRoom/material', [
        'material',
        'materialInit',
        'materialList',
        'curriculum'
      ]),
      selectedMaterial: {
        get (): string {
          return this.$store.state.lessonRoom.material.selectedMaterial
        },
        set (value): void {
          this.$store.dispatch('lessonRoom/material/updateSelectedMaterial', value)
        }
      },
      selectedMaterialCategoryIndex: {
        get (): string {
          return this.$store.state.lessonRoom.material.selectedMaterialCategoryIndex
        },
        set (value): void {
          this.$store.dispatch(
            'lessonRoom/material/updateSelectedMaterialCategoryIndex',
            value
          )
        }
      },
      selectedCurriculumMaterial: {
        get (): string {
          return this.$store.state.lessonRoom.material.selectedCurriculumMaterial
        },
        set (value): void {
          this.$store.dispatch('lessonRoom/material/updateSelectedCurriculumMaterial', value)
        }
      },
      selectedCurriculumChapterIndex: {
        get (): string {
          return this.$store.state.lessonRoom.material.selectedCurriculumChapterIndex
        },
        set (value): void {
          this.$store.dispatch(
            'lessonRoom/material/updateSelectedCurriculumChapterIndex',
            value
          )
        }
      }
    },

    methods: {
      ...mapActions('lessonRoom/material', [
        'updateMaterial'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/material.scss';
</style>
