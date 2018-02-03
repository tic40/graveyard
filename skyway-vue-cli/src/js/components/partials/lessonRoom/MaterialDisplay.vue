<template>
  <div id="panel_material" class="material_panels material_box">
    <object id="material-object" :data="materialUrlStudent"></object>
    <!-- loading -->
    <span v-show="isMaterialLoading" class="loading loading-lg"></span>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('lessonRoom/material', [
        'materialUrlStudent',
        'isMaterialLoading'
      ]),
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@sass/material.scss';
</style>
