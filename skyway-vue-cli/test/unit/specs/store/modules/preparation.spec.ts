import preparation from '@js/store/modules/preparation'

describe('getters test', () => {
  test('isPassedAllCheckList', () => {
    const { isPassedAllCheckList } = preparation.getters
    let mockState = {
      checkList: [
        {
          id: 1,
          isPassed: true
        },
        {
          id: 2,
          isPassed: true
        },
        {
          id: 3,
          isPassed: true
        }
      ]
    }
    expect(isPassedAllCheckList(mockState)).toBeTruthy()

    let mockState = {
      checkList: [
        {
          id: 1,
          isPassed: true
        },
        {
          id: 2,
          isPassed: false
        },
        {
          id: 3,
          isPassed: true
        }
      ]
    }
    expect(isPassedAllCheckList(mockState)).toBeFalsy()
  })
})

describe('actions test', () => {
  test('stopCheckLoading', async () => {
    const { stopCheckLoading } = preparation.actions
    const mockCommit = jest.fn(() => {})
    await expect(
      stopCheckLoading({ commit: mockCommit }, 2)
    ).resolves.toBeUndefined()
    expect(mockCommit).toHaveBeenCalled()
  })

  test('checkValidBrowser', async () => {
    const { checkValidBrowser } = preparation.actions
    const mockCommit = () => {
      return
    }
    let mockDispatch = (type, payload) => {
      if (type === 'envCheck/isValidBrowser') {
        return new Promise(resolve => {
          resolve(true)
        })
      } else {
        return new Promise(resolve => {
          resolve()
        })
      }
    }
    await expect(
      checkValidBrowser({ commit: mockCommit, dispatch: mockDispatch }, 1)
    ).resolves.toBeTruthy()

    mockDispatch = (type, payload) => {
      if (type === 'envCheck/isValidBrowser') {
        return new Promise(resolve => {
          resolve(false)
        })
      } else {
        return new Promise(resolve => {
          resolve()
        })
      }
    }
    await expect(
      checkValidBrowser({ commit: mockCommit, dispatch: mockDispatch }, 1)
    ).resolves.toBeFalsy()
  })

  test('checkCanUseWebcam', async () => {
    const { checkCanUseWebcam } = preparation.actions
    const mockCommit = () => {
      return
    }
    let mockDispatch = (type, payload) => {
      if (type === 'envCheck/canUseWebcam') {
        return new Promise(resolve => {
          resolve(true)
        })
      } else {
        return new Promise(resolve => {
          resolve()
        })
      }
    }
    await expect(
      checkCanUseWebcam({ commit: mockCommit, dispatch: mockDispatch }, 1)
    ).resolves.toBeTruthy()

    mockDispatch = (type, payload) => {
      if (type === 'envCheck/isValidBrowser') {
        return new Promise(resolve => {
          resolve(false)
        })
      } else {
        return new Promise(resolve => {
          resolve()
        })
      }
    }
    await expect(
      checkCanUseWebcam({ commit: mockCommit, dispatch: mockDispatch }, 1)
    ).resolves.toBeFalsy()
  })

  test('checkCanUseMic', async () => {
    const { checkCanUseMic } = preparation.actions
    const mockCommit = () => {
      return
    }
    let mockState = { wantToUseWebcam: true }
    let mockDispatch = (type, payload) => {
      if (type === 'envCheck/canUseMic') {
        return new Promise(resolve => {
          resolve(true)
        })
      } else {
        return new Promise(resolve => {
          resolve()
        })
      }
    }
    await expect(
      checkCanUseMic(
        { commit: mockCommit, state: mockState, dispatch: mockDispatch },
        1
      )
    ).resolves.toBeTruthy()

    let mockState = { wantToUseWebcam: false }
    await expect(
      checkCanUseMic(
        { commit: mockCommit, state: mockState, dispatch: mockDispatch },
        1
      )
    ).resolves.toBeTruthy()

    let mockState = { wantToUseWebcam: true }
    const mockDispatch = (type, payload) => {
      if (type === 'envCheck/isValidBrowser') {
        return new Promise(resolve => {
          resolve(false)
        })
      } else {
        return new Promise(resolve => {
          resolve()
        })
      }
    }
    await expect(
      checkCanUseMic({ commit: mockCommit, dispatch: mockDispatch }, 1)
    ).resolves.toBeFalsy()

    let mockState = { wantToUseWebcam: false }
    await expect(
      checkCanUseMic(
        { commit: mockCommit, state: mockState, dispatch: mockDispatch },
        1
      )
    ).resolves.toBeFalsy()
  })
})
