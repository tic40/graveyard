import global from '@js/store/modules/global'
Moment.tz.setDefault('Asia/Tokyo')

describe('actions test', () => {
  test('getCurrentTime', () => {
    const { getCurrentTime } = global.actions
    const offset: number = 10

    const state = { serverTimeOffset: offset }
    getCurrentTime({ state }).then(response => {
      expect(response.format('YMMDD')).toBe(
        Moment()
          .add(offset, 'seconds')
          .format('YMMDD')
      )
    })

    const state = { serverTimeOffset: undefined }
    const moment = Moment()
    getCurrentTime({ state }).then(response => {
      expect(response.format('YMMDD')).toBe(Moment().format('YMMDD'))
    })
  })

  test('calcServerTimeOffset', () => {
    const { calcServerTimeOffset } = global.actions
    let serverTimeOffset
    const mockCommit = (state, payload) => {
      serverTimeOffset = payload.serverTimeOffset
    }
    let diff: string = 10
    let serverTime: string = Moment()
      .add(diff, 'seconds')
      .format('X')
    calcServerTimeOffset({ commit: mockCommit }, serverTime)
    expect(serverTimeOffset).toBeGreaterThanOrEqual(diff - 1)

    let diff = -10
    let serverTime = Moment()
      .add(diff, 'seconds')
      .format('X')
    calcServerTimeOffset({ commit: mockCommit }, serverTime)
    expect(serverTimeOffset).toBeLessThanOrEqual(diff + 1)
  })

  test('updateTitle', () => {
    const { updateTitle } = global.actions
    updateTitle({}, 'test title')
    expect(document.title).toBe('test title')
  })

  test('startLoading', () => {
    const { startLoading } = global.actions
    let isLoading
    const mockCommit = (state, payload) => {
      isLoading = payload.isLoading
    }
    startLoading({ commit: mockCommit })
    expect(isLoading).toBeTruthy()
  })

  test('stopLoading', () => {
    const { stopLoading } = global.actions
    let isLoading
    const mockCommit = (state, payload) => {
      isLoading = payload.isLoading
    }
    stopLoading({ commit: mockCommit })
    expect(isLoading).toBeFalsy
  })

  test('sendErrorLog', () => {
    const { sendErrorLog } = global.actions
    const rootState = {
      lesson: {
        lessonInfo: {
          registrationId: 1
        }
      }
    }

    GibsonApi.postLog = jest.fn(() => {
      return new Promise(resolve => {
        resolve()
      })
    })

    const error
    sendErrorLog({ rootState }, error)

    const error = { stack: 'test' }
    sendErrorLog({ rootState }, error)
  })
})

describe('mutations test', () => {
  test('setServerTimeOffset', () => {
    const { setServerTimeOffset } = global.mutations
    const state = { serverTimeOffset: undefined }
    setServerTimeOffset(state, { serverTimeOffset: 10 })
    expect(state.serverTimeOffset).toBe(10)
  })

  test('isLoading', () => {
    const { setIsLoading } = global.mutations
    const state = { isLoading: false }
    setIsLoading(state, { isLoading: true })
    expect(state.isLoading).toBeTruthy()
  })

  test('isOnline', () => {
    const { setIsOnline } = global.mutations
    const state = { isOnline: false }
    setIsOnline(state, { isOnline: true })
    expect(state.isOnline).toBeTruthy()
  })

  test('setErrorCode', () => {
    const { setErrorCode } = global.mutations
    const state = { errorCode: false }
    setErrorCode(state, { errorCode: '001' })
    expect(state.errorCode).toBe('001')
  })
})
