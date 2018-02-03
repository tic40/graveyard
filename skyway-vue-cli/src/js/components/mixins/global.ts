import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('global', [
      'getCurrentTime',
      'isLoading',
      'isOnline',
      'isDev',
      'constants',
      'errorCode'
    ])
  },
  methods: {
    ...mapActions('global', [
      'calcServerTimeOffset',
      'startLoading',
      'stopLoading',
      'offlineEventListener',
      'onlineEventListener',
      'beforeunloadAlertEventListener',
      'beforeunloadCookieEventListener',
      'windowResizeEventListener',
      'updateTitle',
      'updateErrorCode',
      'openNewTab',
      'moveTo',
      'moveToMypage',
      'reload',
      'closeTab',
      'getCookie',
      'setCookie',
      'removeCookie'
    ])
  }
}
