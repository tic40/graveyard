import stream from '@js/store/modules/stream'

describe('actions test', () => {
  test('fetchSkyWayApiKey', async () => {
    const { fetchSkyWayApiKey } = stream.actions
    let skyWayApiKey
    const mockCommit = (state, payload) => {
      skyWayApiKey = payload.key
    }
    GibsonApi.fetchSkyWayApiKey = jest.fn(() => {
      return new Promise(resolve =>
        resolve({
          key: 1
        })
      )
    })
    await expect(
      fetchSkyWayApiKey({ commit: mockCommit })
    ).resolves.toBeUndefined()
    expect(skyWayApiKey).toBe(1)

    GibsonApi.fetchSkyWayApiKey = jest.fn(() => {
      return new Promise((resolve, reject) => reject())
    })
    await expect(
      fetchSkyWayApiKey({ commit: mockCommit })
    ).rejects.toBeUndefined()
  })

  test('getUserMedia', async () => {
    const { getUserMedia } = stream.actions
    const mockCommit = () => {
      return
    }

    let constraints = Constants.DEFAULT_GET_USER_MEDIA_CONSTRAINTS
    navigator.mediaDevices = {
      getUserMedia: jest.fn(() => {
        return new Promise(resolve => resolve({}))
      })
    }
    await expect(
      getUserMedia({ commit: mockCommit }, constraints)
    ).resolves.toEqual({})
    await expect(getUserMedia({ commit: mockCommit }, '')).resolves.toEqual({})

    navigator.mediaDevices = {
      getUserMedia: jest.fn(() => {
        return new Promise((resolve, reject) => reject())
      })
    }
    await expect(
      getUserMedia({ commit: mockCommit }, constraints)
    ).rejects.toBeUndefined()
  })

  test('searchPeerIdInPeerList', async () => {
    const { searchPeerIdInPeerList } = stream.actions
    let mockGetListAllPeers = jest.fn(() => {
      return new Promise(resolve => {
        resolve([1, 2, 3])
      })
    })
    const mockDispatch = type => {
      if (type === 'getListAllPeers') {
        return mockGetListAllPeers()
      } else {
        return
      }
    }

    await expect(
      searchPeerIdInPeerList({ dispatch: mockDispatch }, 2)
    ).resolves.toBeUndefined()
    await expect(
      searchPeerIdInPeerList({ dispatch: mockDispatch }, 4)
    ).rejects.toBeUndefined()

    mockGetListAllPeers = jest.fn(() => {
      return new Promise(resolve => {
        resolve([])
      })
    })
    await expect(
      searchPeerIdInPeerList({ dispatch: mockDispatch }, 2)
    ).rejects.toBeUndefined()

    mockGetListAllPeers = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject()
      })
    })
    await expect(
      searchPeerIdInPeerList({ dispatch: mockDispatch }, 2)
    ).rejects.toBeUndefined()

    mockGetListAllPeers = jest.fn(() => {
      return new Promise(resolve => {
        resolve('1')
      })
    })
    await expect(
      searchPeerIdInPeerList({ dispatch: mockDispatch }, 2)
    ).rejects.toBeUndefined()
  })
})
