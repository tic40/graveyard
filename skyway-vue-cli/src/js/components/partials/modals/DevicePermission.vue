<template>
  <div>
    <!-- device-permission -->
    <modal
      class="confirmation_dialog is-normal device_permission"
      name="device-permission"
      :click-to-close="false"
      :width="500"
      :height="350">
      <strong>カメラやマイクを許可してください</strong>
      <img :src="constants.URL_RJ_AWS + '/cosmo/image/image_allow_dialog.png'" alt="カメラやマイクを許可してください">
      <p class="note">許可しないとレッスンは実施できません。<br>ただし、カメラのON/OFFについては入室後にいつでも変更できます。</p>
    </modal>
  </div>
</template>

<script lang="ts">
  import GlobalMixin from '@js/components/mixins/global'

  export default {
    mixins: [GlobalMixin]
  }
</script>
