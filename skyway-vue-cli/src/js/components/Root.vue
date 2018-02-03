<template>
  <div>
    <ErrorModal />
    <DevicePermissionModal />

    <div v-show="isLoading" class="loading loading-lg"></div>
    <router-view v-show="!isLoading" />

    <div v-if="isDev">
      <DebugTool />
    </div>

  </div>
</template>

<script lang="ts">
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    created () {
      this.startLoading()
      this.updateTitle(this.constants.DEFAULT_TITLE)
    },

    beforeMount () {
      const q = this.$route.query
      if (q.hasOwnProperty('page') && q.page === 'preparation') {
        this.$router.push({ name: 'preparation' })
      }
    },
    mixins: [GlobalMixin]
  }
</script>

<style lang="scss">
  @import '~@sass/spectre/spectre.scss';
  @import '~@sass/app.scss';
</style>
