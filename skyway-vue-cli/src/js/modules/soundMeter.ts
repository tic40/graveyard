export default class SoundMeter {
  /* eslint-disable no-undef */
  context
  instant: number = 0.0
  script
  that
  mic

  constructor (context) {
    this.context = context
    this.script = context.createScriptProcessor(2048, 1, 1)
    let that = this
    this.script.onaudioprocess = event => {
      let input = event.inputBuffer.getChannelData(0)
      let sum: number = 0.0
      for (let i: number = 0; i < input.length; ++i) {
        sum += input[i] * input[i]
      }
      that.instant = Math.sqrt(sum / input.length)
    }
  }

  connectToSource (stream, callback): void {
    try {
      this.mic = this.context.createMediaStreamSource(stream)
      this.mic.connect(this.script)
      // necessary to make sample run, but should not be.
      this.script.connect(this.context.destination)
      if (typeof callback !== 'undefined') {
        callback(null)
      }
    } catch (e) {
      if (typeof callback !== 'undefined') {
        callback(e)
      }
    }
  }

  stop (): void {
    this.mic.disconnect()
    this.script.disconnect()
  }
}
