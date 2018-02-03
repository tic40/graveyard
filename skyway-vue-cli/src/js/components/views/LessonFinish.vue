<template>
  <div>
    <LessonRoomModal />
  </div>
</template>

<script lang="ts">
  import ModalMixin from '@js/components/mixins/modal'

  export default {
    mounted () {
      this.showModal('before-leave')
    },
    mixins: [ModalMixin]
  }
</script>
