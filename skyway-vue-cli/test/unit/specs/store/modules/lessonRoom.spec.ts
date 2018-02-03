import lessonRoom from '@js/store/modules/lessonRoom'
jest.useFakeTimers()

describe('getters test', () => {
  test('getFormattedEndRoomTime', () => {
    const { getFormattedEndRoomTime } = lessonRoom.getters

    let state = { endRoomTime: '' }
    expect(getFormattedEndRoomTime(state)).toBe('')

    let state = { endRoomTime: Moment('2000-01-01 10:30:05') }
    expect(getFormattedEndRoomTime(state)).toBe('10:30')
  })

  test('getCardImageHeight', () => {
    const { getCardImageHeight } = lessonRoom.getters

    let state = { windowHeight: 100 }
    expect(getCardImageHeight(state)).toBe(477)
    let state = { windowHeight: 650 }
    expect(getCardImageHeight(state)).toBe(477)
    let state = { windowHeight: 651 }
    expect(getCardImageHeight(state)).toBe(478)
  })

  test('getVideoContentsHeight', () => {
    const { getVideoContentsHeight } = lessonRoom.getters

    let state = { windowHeight: 100, layout: 'himawari' }
    expect(getVideoContentsHeight(state)).toBe(300)
    let state = { windowHeight: 100, layout: 'banana' }
    expect(getVideoContentsHeight(state)).toBe(550)
    let state = { windowHeight: 650, layout: 'banana' }
    expect(getVideoContentsHeight(state)).toBe(550)
    let state = { windowHeight: 651, layout: 'banana' }
    expect(getVideoContentsHeight(state)).toBe(528)
  })

  test('getTabPanelChatHeight', () => {
    const { getTabPanelChatHeight } = lessonRoom.getters

    let state = { windowHeight: 100, layout: 'himawari' }
    expect(getTabPanelChatHeight(state)).toBe(167)
    let state = { windowHeight: 650, layout: 'himawari' }
    expect(getTabPanelChatHeight(state)).toBe(167)
    let state = { windowHeight: 651, layout: 'himawari' }
    expect(getTabPanelChatHeight(state)).toBe(167)

    let state = { windowHeight: 100, layout: 'banana' }
    expect(getTabPanelChatHeight(state)).toBe(496)
    let state = { windowHeight: 650, layout: 'banana' }
    expect(getTabPanelChatHeight(state)).toBe(496)
    let state = { windowHeight: 651, layout: 'banana' }
    expect(getTabPanelChatHeight(state)).toBe(473)
  })

  test('getTabPanelMemoHeight', () => {
    const { getTabPanelMemoHeight } = lessonRoom.getters

    let state = { windowHeight: 100, layout: 'himawari' }
    expect(getTabPanelMemoHeight(state)).toBe(187)
    let state = { windowHeight: 650, layout: 'himawari' }
    expect(getTabPanelMemoHeight(state)).toBe(187)
    let state = { windowHeight: 651, layout: 'himawari' }
    expect(getTabPanelMemoHeight(state)).toBe(186)

    let state = { windowHeight: 100, layout: 'banana' }
    expect(getTabPanelMemoHeight(state)).toBe(512)
    let state = { windowHeight: 650, layout: 'banana' }
    expect(getTabPanelMemoHeight(state)).toBe(512)
    let state = { windowHeight: 651, layout: 'banana' }
    expect(getTabPanelMemoHeight(state)).toBe(492)
  })

  test('getTabContentsHeight', () => {
    const { getTabContentsHeight } = lessonRoom.getters

    let state = { windowHeight: 100, layout: 'himawari' }
    expect(getTabContentsHeight(state)).toBe(267)
    let state = { windowHeight: 650, layout: 'himawari' }
    expect(getTabContentsHeight(state)).toBe(267)
    let state = { windowHeight: 651, layout: 'himawari' }
    expect(getTabContentsHeight(state)).toBe(267)

    let state = { windowHeight: 100, layout: 'banana' }
    expect(getTabContentsHeight(state)).toBe(596)
    let state = { windowHeight: 650, layout: 'banana' }
    expect(getTabContentsHeight(state)).toBe(596)
    let state = { windowHeight: 651, layout: 'banana' }
    expect(getTabContentsHeight(state)).toBe(512)
  })
})

describe('actions test', () => {
  test('changeLayout', () => {
    const { changeLayout } = lessonRoom.actions
    let layout: string = ''
    const mockCommit = (state, payload) => {
      layout = payload.layout
    }
    const mockState = { layout }
    const mockDispatch = payload => {
      return
    }

    changeLayout(
      { commit: mockCommit, state: mockState, dispatch: mockDispatch },
      'banana'
    )
    expect(layout).toBe('banana')

    // test: change same layout
    changeLayout(
      { commit: mockCommit, state: mockState, dispatch: mockDispatch },
      'banana'
    )
    expect(layout).toBe('banana')
  })

  test('openNewWindowForPreparation', () => {
    const { openNewWindowForPreparation } = lessonRoom.actions
    global.open = jest.fn()
    openNewWindowForPreparation()
  })

  test('endLessonTimeEvent', async () => {
    const { endLessonTimeEvent } = lessonRoom.actions
    let endRoomTime: Moment.Moment
    let remainingRoomTime: number
    const mockDispatch = payload => {
      return new Promise(resolve => {
        resolve()
      })
    }
    const mockCommit = (type, payload) => {
      if (type === 'setEndRoomTime') {
        endRoomTime = payload.endRoomTime
      } else if (type === 'setRemainingRoomTime') {
        remainingRoomTime = payload.remainingRoomTime
      }
    }
    const mockRootState = {
      lesson: {
        lessonInfo: {
          lessonStartTime: Moment()
        }
      }
    }
    await endLessonTimeEvent({
      commit: mockCommit,
      dispatch: mockDispatch,
      rootState: mockRootState
    })
    expect(typeof endRoomTime).toBe('object')
    expect(remainingRoomTime).toBeLessThanOrEqual(Constants.LESSON_ROOM_TIME)

    const mockRootState = {
      lesson: {
        lessonInfo: {
          lessonStartTime: Moment().subtract(
            Constants.LESSON_ROOM_TIME + 1,
            'seconds'
          )
        }
      }
    }
    await endLessonTimeEvent({
      commit: mockCommit,
      dispatch: mockDispatch,
      rootState: mockRootState
    })
    expect(typeof endRoomTime).toBe('object')
    expect(remainingRoomTime).toBe(0)
  })

  test('setEventRemainingRoomTimeCountDown', () => {
    const { setEventRemainingRoomTimeCountDown } = lessonRoom.actions
    const mockCalcRemainingRoomTime = jest.fn()
    let mockState = { remainingRoomTime: 10 }
    const mockCommit = (state, payload) => {
      return
    }
    const mockDispatch = (type, payload) => {
      if (type === 'calcRemainingRoomTime') {
        mockCalcRemainingRoomTime()
        mockState.remainingRoomTime -= 1
      }
    }

    setEventRemainingRoomTimeCountDown({
      commit: mockCommit,
      state: mockState,
      dispatch: mockDispatch
    })
    expect(mockCalcRemainingRoomTime.mock.calls.length).toBe(0)
    jest.advanceTimersByTime(1000)
    expect(mockCalcRemainingRoomTime.mock.calls.length).toBe(1)
    jest.advanceTimersByTime(20000)
    expect(mockCalcRemainingRoomTime.mock.calls.length).toBe(10)
  })

  test('calcRemainingRoomTime', async () => {
    const { calcRemainingRoomTime } = lessonRoom.actions
    let remainingRoomTime: string
    const mockCommit = (state, payload) => {
      remainingRoomTime = payload.remainingRoomTime
    }
    let mockState = {
      endRoomTime: Moment().add(1000, 'seconds')
    }
    const mockDispatch = (type, payload) => {
      if (type === 'global/getCurrentTime') {
        return new Promise(resolve => {
          resolve(Moment())
        })
      } else {
        return
      }
    }
    await calcRemainingRoomTime({
      commit: mockCommit,
      state: mockState,
      dispatch: mockDispatch
    })
    expect(remainingRoomTime).toBeGreaterThanOrEqual(999)

    remainingRoomTime = undefined
    mockState = {
      endRoomTime: Moment().subtract(1, 'seconds')
    }
    await calcRemainingRoomTime({
      commit: mockCommit,
      state: mockState,
      dispatch: mockDispatch
    })
    expect(remainingRoomTime).toBe(0)
  })

  test('isValidEntranceTime', async () => {
    const { isValidEntranceTime } = lessonRoom.actions
    const mockDispatch = payload => {
      return new Promise(resolve => {
        resolve(Moment())
      })
    }

    const lessonStartTime1: Moment.Moment = Moment()
    await expect(
      isValidEntranceTime({ dispatch: mockDispatch }, lessonStartTime1)
    ).resolves.toBeTruthy()
  })
})
