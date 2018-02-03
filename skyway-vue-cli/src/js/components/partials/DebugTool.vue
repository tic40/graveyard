<!-- this template is for debug -->
<template>
  <div class="debug-tool" v-show="isOpenDebug">
    <h1>DEBUG</h1>

    <div class="btn-group btn-group-block">
      <button :class="{ 'active': current === 'skywayConnection' }" @click="updateCurrent('skywayConnection')" class="btn">SkyWay Connection</button>
      <button :class="{ 'active': current === 'lessonTime' }" @click="updateCurrent('lessonTime')" class="btn">Lesson Time</button>
      <button :class="{ 'active': current === 'roomTime' }" @click="updateCurrent('roomTime')" class="btn">Room Time</button>
      <button :class="{ 'active': current === 'modals' }" @click="updateCurrent('modals')" class="btn">Modals</button>
    </div>


    <div v-show="current === 'skywayConnection'">
      <h4>SkyWay Connection</h4>
      <section>
        current peerID: <input type="text" v-model="peerId" placeholder="" disabled>
      </section>

      <section>
        current calleePeerID: <input type="text" v-model="calleePeerId" placeholder="" disabled>
      </section>

      <section>
        your peer ID: <input type="text" v-model="inputPeerId" placeholder="your peer ID">
        <button @click="createPeer(inputPeerId)" class="btn btn-primary">upadte</button>
      </section>

      <section>
        callee peer ID: <input type="text" v-model="inputCalleePeerId" placeholder="callee peer ID">
        <button @click="updateCalleePeerId(inputCalleePeerId)" class="btn btn-primary">upadte</button>
      </section>

      <section>
        <button @click="closeConnection()" class="btn btn-primary">close connection</button>
        <button @click="destroyConnection()" class="btn btn-primary">destroy call</button>
      </section>
    </div>


    <div v-show="current === 'lessonTime'">
      <h4>Lesson Time</h4>

      <section>
        <button @click="debugLessonStartTime(10)" class="btn btn-primary">>>10 sec</button>
        <button @click="debugLessonStartTime(60)" class="btn btn-primary">>>1 min</button>
        <button @click="debugLessonStartTime(300)" class="btn btn-primary">>>5 min</button>
        <button @click="debugLessonStartTime(600)" class="btn btn-primary">>>10 min</button>
      </section>

      <section>
        <button @click="debugLessonStartTime(-10)" class="btn btn-primary"><<10 sec</button>
        <button @click="debugLessonStartTime(-60)" class="btn btn-primary"><<1 min</button>
        <button @click="debugLessonStartTime(-300)" class="btn btn-primary"><<5 min</button>
        <button @click="debugLessonStartTime(-600)" class="btn btn-primary"><<10 min</button>
      </section>
    </div>


    <div v-show="current === 'roomTime'">
      <h4>Room Time</h4>
      <p>remaning time: {{remainingRoomTime}} seconds</p>

      <section>
        <button @click="debugEndRoomTime(60 * 10)" class="btn btn-primary">>>10 minutes</button>
        <button @click="debugEndRoomTime(60 * 30)" class="btn btn-primary">>>30 minutes</button>
        <button @click="debugEndRoomTime(60 * 60)" class="btn btn-primary">>>60 minutes</button>
      </section>

      <section>
        <button @click="debugEndRoomTime(-60 * 10)" class="btn btn-primary">>>-10 minutes</button>
        <button @click="debugEndRoomTime(-60 * 30)" class="btn btn-primary">>>-30 minutes</button>
        <button @click="debugEndRoomTime(-60 * 60)" class="btn btn-primary">>>-60 minutes</button>
      </section>
    </div>


    <div v-show="current === 'modals'">
      <h4>modals</h4>
      <button class="btn btn-primary" @click="closeAllModal()">close modals</button>
      <h5>error</h5>
      <section>
        <button class="btn btn-primary" @click="showModal('preparation-error')">preparation-error</button>
        <button class="btn btn-primary" @click="showModal('unknown-error')">unknown-error</button>
      </section>

      <h5>lesson room</h5>
      <section>
        <button class="btn btn-primary" @click="showModal('room-deleted')">room-deleted</button>
        <button class="btn btn-primary" @click="showModal('confirm-leave')">confirm-leave</button>
        <button class="btn btn-primary" @click="showModal('before-leave')">before-leave</button>
        <button class="btn btn-primary" @click="showModal('maintenance')">maintenance</button>
        <button class="btn btn-primary" @click="showModal('confirm-webcam')">confirm-webcam</button>
        <button class="btn btn-primary" @click="showModal('end-lesson')">end-lesson</button>
      </section>

      <h5>device permission</h5>
      <section>
        <button class="btn btn-primary" @click="showModal('device-permission')">device-permission</button>
      </section>

      <h5>tutorial</h5>
      <section>
        <button class="btn btn-primary" @click="showModal('tutorial')">tutorial</button>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  import * as Constants from '@js/constants/index'

  export default {
    data () {
      return {
        current: 'skywayConnection',
        isOpenDebug: false,
        inputPeerId: undefined,
        inputCalleePeerId: undefined,
        envBrowser: '1',
        envCamera: '1',
        envMic: '1'
      }
    },
    computed: {
      ...mapGetters('preparation', [
        'checkList'
      ]),
      ...mapGetters('stream', [
        'localStream',
        'remoteStream',
        'peerId',
        'calleePeerId'
      ]),
      ...mapGetters('lessonRoom', [
        'remainingRoomTime'
      ])
    },

    methods: {
      ...mapActions('preparation', [
        'updateCheckList'
      ]),
      ...mapActions('lesson', [
        'debugLessonStartTime'
      ]),
      ...mapActions('modal', [
        'showModal',
        'hideModal'
      ]),
      ...mapActions('stream', [
        'createPeer',
        'call',
        'closeConnection',
        'destroyConnection',
        'updateCalleePeerId'
      ]),
      ...mapActions('lessonRoom', [
        'debugEndRoomTime'
      ]),
      updateCurrent (page: string): void {
        this.current = page
      },
      closeAllModal (): void {
        const modals = [
          'preparation-error',
          'unknown-error',
          'room-deleted',
          'confirm-leave',
          'before-leave',
          'before-leave-in-lesson-time',
          'maintenance',
          'confirm-webcam',
          'device-permission',
          'tutorial'
        ]
        for (let v of modals) {
          this.hideModal(v)
        }
      },
      updateEnv (): void {
        this.updateCheckList({
          checkList: [
            {
              id: Constants.ENV_CHECK_LIST_ID.IS_VALID_BROWSER,
              isPassed: this.envBrowser == 1
            },
            {
              id: Constants.ENV_CHECK_LIST_ID.CAN_USE_WEBCAM,
              isPassed: this.envCamera == 1
            },
            {
              id: Constants.ENV_CHECK_LIST_ID.CAN_USE_MIC,
              isPassed: this.envMic == 1
            },
            {
              id: Constants.ENV_CHECK_LIST_ID.CAN_SEE_VIDEO,
              isPassed: undefined,
            },
            {
              id: Constants.ENV_CHECK_LIST_ID.CAN_WORK_SOUND_METER,
              isPassed: undefined,
            },
            {
              id: Constants.ENV_CHECK_LIST_ID.CAN_HEAR_VIDEO_SOUND,
              isPassed: undefined,
            }
          ]
        })
      }
    },

    mounted () {
      document.addEventListener('keydown', e => {
        if (e.keyCode === 27) {
          this.isOpenDebug = !this.isOpenDebug
        }
      }, false)
    }
  }
</script>

<style lang="scss" scoped>
  .debug-tool {
    background: #000;
    padding: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 50%;
    height: 600px;
    margin: auto;
    z-index: 10000;
  }
  h1,h2,h3,h4,h5 {
    color: red;
  }
  h4 {
    margin-top: 0.5rem;
  }
  p {
    margin: 0;
  }
  section {
    margin-top: 0.5rem;
  }
  p, label, section, div {
    color: white;
  }
</style>
