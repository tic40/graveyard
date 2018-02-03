//import { mapGetters, mapActions } from 'vuex'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('lessonRoom', ['openNewWindowForPreparation']),
    ...mapActions('modal', ['showModal', 'hideModal'])
  }
}
