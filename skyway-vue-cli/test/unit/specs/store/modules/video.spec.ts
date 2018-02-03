import video from '@js/store/modules/video'

describe('actions test', () => {
  test('updateTutorMicVolume', () => {
    const { updateTutorMicVolume } = video.actions
    let volume
    let mockState = {
      elements: {
        tutorVideo: undefined
      }
    }
    const mockCommit = (state, payload) => {
      volume = payload.volume
    }

    updateTutorMicVolume({ commit: mockCommit, state: mockState }, 1)
    expect(mockState.elements.tutorVideo).toBeUndefined()
    expect(volume).toBe(1)

    volume = undefined
    mockState = {
      elements: {
        tutorVideo: {
          volume: undefined
        }
      }
    }
    updateTutorMicVolume({ commit: mockCommit, state: mockState }, 2)
    expect(mockState.elements.tutorVideo.volume).toBe(2)
    expect(volume).toBe(2)
  })

  test('studentVideoButton', () => {
    const { studentVideoButton } = video.actions
    let mockState = {
      buttons: { studentVideo: { disable: true } },
      isStudentVideoOn: true
    }
    const mockupdateIsStudentVideoOn = jest.fn(() => {
      return
    })
    const mockUpdateStudentVideoStream = jest.fn(() => {
      return
    })
    const mockDispatch = type => {
      if (type === 'updateIsStudentVideoOn') {
        mockupdateIsStudentVideoOn()
      } else if (type === 'updateStudentVideoStream') {
        mockUpdateStudentVideoStream()
      }
    }

    studentVideoButton({ dispatch: mockDispatch, state: mockState })
    expect(mockupdateIsStudentVideoOn).toHaveBeenCalledTimes(0)
    expect(mockUpdateStudentVideoStream).toHaveBeenCalledTimes(0)

    mockState = {
      buttons: { studentVideo: { disable: false } },
      isStudentVideoOn: true
    }
    studentVideoButton({ dispatch: mockDispatch, state: mockState })
    expect(mockupdateIsStudentVideoOn).toHaveBeenCalledTimes(1)
    expect(mockUpdateStudentVideoStream).toHaveBeenCalledTimes(1)
  })

  test('studentMicButton', () => {
    const { studentMicButton } = video.actions
    let mockState = {
      buttons: { studentMic: { disable: true } },
      isStudentMicOn: true
    }
    const mockupdateIsStudentMicOn = jest.fn(() => {
      return
    })
    const mockUpdateStudentVideoStream = jest.fn(() => {
      return
    })
    const mockDispatch = type => {
      if (type === 'updateIsStudentMicOn') {
        mockupdateIsStudentMicOn()
      } else if (type === 'updateStudentVideoStream') {
        mockUpdateStudentVideoStream()
      }
    }

    studentMicButton({ dispatch: mockDispatch, state: mockState })
    expect(mockupdateIsStudentMicOn).toHaveBeenCalledTimes(0)
    expect(mockUpdateStudentVideoStream).toHaveBeenCalledTimes(0)

    mockState = {
      buttons: { studentMic: { disable: false } },
      isStudentMicOn: true
    }
    studentMicButton({ dispatch: mockDispatch, state: mockState })
    expect(mockupdateIsStudentMicOn).toHaveBeenCalledTimes(1)
    expect(mockUpdateStudentVideoStream).toHaveBeenCalledTimes(1)
  })
})
