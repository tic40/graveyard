<template>
  <div class="material_wrap">
    <div class="card">
      <div class="card-header">
        <div class="form-group">
          <div class="btn-group">
            <button
              id="tab_select"
              class="btn input-group-btn"
              :class="[{ 'active': materialTab === 'select' }]"
              @click="updateMaterialTab('select')">
              <i class="material-icons">format_list_bulleted</i>教材選択
            </button>

            <button
              id="tab_material"
              class="btn input-group-btn"
              :class="[{ 'active': materialTab === 'display' }]"
              @click="updateMaterialTab('display')"
              :disabled="!materialUrlStudent">
              <i class="material-icons">library_books</i>教材表示
            </button>
          </div>

          <button
            class="btn input-group-btn"
            :class="[{ 'tooltip tooltip-top': !isDisabledReloadButton }]"
            data-tooltip="教材を更新"
            @click="reloadMaterial()"
            :disabled="isDisabledReloadButton">
            <i class="material-icons">refresh</i>
          </button>

          <button
            class="btn input-group-btn open_new_win"
            :class="[{ 'tooltip tooltip-top': !isDisabledReloadButton }]"
            data-tooltip="別ウィンドウ表示"
            @click="openNewWindowForMaterial()"
            :disabled="isDisabledOpenMaterialWindowButton">
            <i class="material-icons">open_in_new</i>
          </button>
          <p class="note">選択した教材情報は講師に送信されます。</p>
        </div>
      </div>

      <div class="card-image" :style="{ height: getCardImageHeight + 'px' }">
        <MaterialDisplay v-if="materialTab === 'display'" />
        <MaterialSelect v-show="materialTab === 'select'" />
      </div>

    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters('lessonRoom', [
        'getCardImageHeight'
      ]),
      ...mapGetters('lessonRoom/material', [
        'material',
        'materialUrlStudent',
        'materialTab',
        'isDisabledReloadButton',
        'isDisabledOpenMaterialWindowButton'
      ])
    },

    methods: {
      ...mapActions('lessonRoom/material', [
        'updateElements',
        'updateMaterialTab',
        'updateMaterial',
        'reloadMaterial',
        'openNewWindowForMaterial'
      ])
    },

    mounted () {
      this.updateElements({
        materialObject: document.getElementById('material-object')
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/material.scss';
</style>
