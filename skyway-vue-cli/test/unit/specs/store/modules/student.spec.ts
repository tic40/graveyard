import student from '@js/store/modules/student'

describe('getters test', () => {
  test('hasRequiredEnvError', () => {
    const { hasRequiredEnvError } = student.getters

    let mockState = {
      envCheckList: {
        isValidBrowser: undefined,
        canUseMic: undefined,
        canUseWebcam: undefined
      }
    }
    expect(hasRequiredEnvError(mockState)).toBeTruthy()

    let mockState = {
      envCheckList: {
        isValidBrowser: false,
        canUseMic: false,
        canUseWebcam: false
      }
    }
    expect(hasRequiredEnvError(mockState)).toBeTruthy()

    mockState = {
      envCheckList: {
        isValidBrowser: true,
        canUseMic: false,
        canUseWebcam: false
      }
    }
    expect(hasRequiredEnvError(mockState)).toBeTruthy()

    mockState = {
      envCheckList: {
        isValidBrowser: true,
        canUseMic: true,
        canUseWebcam: false
      }
    }
    expect(hasRequiredEnvError(mockState)).toBeFalsy()
  })
})

describe('actions test', () => {
  test('fetchMemberAuth', async () => {
    const { fetchMemberAuth } = student.actions
    const mockCommit = () => {
      return
    }
    GibsonApi.fetchMemberAuth = jest.fn(() => {
      return new Promise(resolve => {
        resolve()
      })
    })
    await expect(fetchMemberAuth({ commit: mockCommit })).resolves.toBeUndefined

    GibsonApi.fetchMemberAuth = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject()
      })
    })
    await expect(fetchMemberAuth({ commit: mockCommit })).rejects.toBeUndefined
  })

  test('checkRequiredEnvForLessonRoom', async () => {
    const { checkRequiredEnvForLessonRoom } = student.actions
    const mockCommit = () => {
      return
    }
    const mockDispatch = (type, payload) => {
      return new Promise(resolve => {
        resolve(true)
      })
    }

    await expect(
      checkRequiredEnvForLessonRoom({
        commit: mockCommit,
        dispatch: mockDispatch
      })
    ).resolves.toBeUndefined()
  })

  test('checkDevicePermissions', async () => {
    const { checkDevicePermissions } = student.actions
    const mockCommit = () => {
      return
    }
    const mockDispatch = (type, payload) => {
      return new Promise(resolve => {
        resolve(true)
      })
    }

    await expect(
      checkDevicePermissions({ commit: mockCommit, dispatch: mockDispatch })
    ).resolves.toBeUndefined()
  })
})
