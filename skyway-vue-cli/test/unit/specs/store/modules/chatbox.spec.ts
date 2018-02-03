import chatbox from '@js/store/modules/chatbox'

describe('getters test', () => {
  test('canSendChatInput', () => {
    const { canSendChatInput } = chatbox.getters

    let state = { chatInput: 'test input' }
    expect(canSendChatInput(state)).toBeTruthy()

    let state = { chatInput: '' }
    expect(canSendChatInput(state)).toBeFalsy()
  })

  test('unreadMessageCountForDisplay', () => {
    const { unreadMessageCountForDisplay } = chatbox.getters

    let state = { unreadMessageCount: 0 }
    expect(unreadMessageCountForDisplay(state)).toBe('0')

    let state = { unreadMessageCount: 1 }
    expect(unreadMessageCountForDisplay(state)).toBe('1')

    let state = { unreadMessageCount: 99 }
    expect(unreadMessageCountForDisplay(state)).toBe('99')

    let state = { unreadMessageCount: 100 }
    expect(unreadMessageCountForDisplay(state)).toBe('99+')
  })
})

describe('actions test', () => {
  test('replaceSentBy', async () => {
    const { replaceSentBy } = chatbox.actions
    await expect(
      replaceSentBy({}, Constants.CHAT_MESSAGE_SENT_BY.STUDENT)
    ).resolves.toBe('student')
    await expect(
      replaceSentBy({}, Constants.CHAT_MESSAGE_SENT_BY.TUTOR)
    ).resolves.toBe('tutor')
    await expect(replaceSentBy({}, 3)).resolves.toBe(undefined)
  })

  test('replaceLinkInChatMessage', async () => {
    const { replaceLinkInChatMessage } = chatbox.actions
    const messageCase1: string =
      'http://d1atgierv9op2.cloudfront.net/material/beginner/mat-gra-beg-001.pdf'
    await expect(replaceLinkInChatMessage({}, messageCase1)).resolves.toBe(
      `<a href='${messageCase1}' target='_blank'>${messageCase1}</a>`
    )

    const messageCase2: string =
      'https://d1atgierv9op2.cloudfront.net/material/beginner/mat-gra-beg-001.pdf'
    await expect(replaceLinkInChatMessage({}, messageCase2)).resolves.toBe(
      `<a href='${messageCase2}' target='_blank'>${messageCase2}</a>`
    )

    const messageCase3: string = 'example.com'
    await expect(replaceLinkInChatMessage({}, messageCase3)).resolves.toBe(
      `${messageCase3}`
    )
  })

  test('replaceLinkInChatMessageForStudent', async () => {
    const {
      replaceLinkInChatMessageForStudent,
      replaceLinkInChatMessage
    } = chatbox.actions
    const mockDispatch = replaceLinkInChatMessage

    const messageCase1: string = 'https://www.rarejob.com'
    await expect(
      replaceLinkInChatMessageForStudent(
        { dispatch: mockDispatch },
        messageCase1
      )
    ).resolves.toBe(
      `<a href='${messageCase1}' target='_blank'>${messageCase1}</a>`
    )

    const messageCase2: string = 'https://www.rarejob.com/dna'
    await expect(
      replaceLinkInChatMessageForStudent(
        { dispatch: mockDispatch },
        messageCase2
      )
    ).resolves.toBe(
      `<span class='message_link_material'> <a href='${messageCase2}' target='_blank'>${messageCase2}</a> </span>`
    )

    const messageCase3: string =
      'https://d1atgierv9op2.cloudfront.net/material/beginner/mat-gra-beg-001.pdf'
    await expect(
      replaceLinkInChatMessageForStudent(
        { dispatch: mockDispatch },
        messageCase3
      )
    ).resolves.toBe(
      `<span class='message_link_material'> <a href='${messageCase3}' target='_blank'>${messageCase3}</a> </span>`
    )

    const messageCase4: string =
      'http://d1atgierv9op2.cloudfront.net/material/beginner/mat-gra-beg-001.pdf'
    await expect(
      replaceLinkInChatMessageForStudent(
        { dispatch: mockDispatch },
        messageCase4
      )
    ).resolves.toBe(
      `<span class='message_link_material'> <a href='${messageCase4}' target='_blank'>${messageCase4}</a> </span>`
    )

    const messageCase5: string = `test${messageCase3} test`
    await expect(
      replaceLinkInChatMessageForStudent(
        { dispatch: mockDispatch },
        messageCase5
      )
    ).resolves.toBe(
      `test<span class='message_link_material'> <a href='${messageCase3}' target='_blank'>${messageCase3}</a> </span> test`
    )

    const messageCase6: string = ''
    await expect(
      replaceLinkInChatMessageForStudent(
        { dispatch: mockDispatch },
        messageCase6
      )
    ).resolves.toBe('')
  })

  test('formatSkyWayChatMessage', async () => {
    const { formatSkyWayChatMessage } = chatbox.actions
    const mockReplaceLinkInChatMessageForStudent = jest.fn(payload => {
      return new Promise(resolve => {
        resolve(payload)
      })
    })
    const mockReplaceLinkInChatMessage = jest.fn(payload => {
      return new Promise(resolve => {
        resolve(payload)
      })
    })

    const mockDispatch = (type, payload) => {
      if (type === 'replaceLinkInChatMessageForStudent') {
        mockReplaceLinkInChatMessageForStudent()
      } else if (type === 'replaceLinkInChatMessage') {
        mockReplaceLinkInChatMessage()
      }
    }

    const messageCase1 = {
      message_text: 'test',
      sent_by: 'tutor'
    }
    await formatSkyWayChatMessage({ dispatch: mockDispatch }, messageCase1)
    expect(mockReplaceLinkInChatMessageForStudent.mock.calls.length).toBe(1)
    expect(mockReplaceLinkInChatMessage.mock.calls.length).toBe(0)

    const messageCase1 = {
      message_text: 'test',
      sent_by: 'student'
    }
    await formatSkyWayChatMessage({ dispatch: mockDispatch }, messageCase1)
    expect(mockReplaceLinkInChatMessageForStudent.mock.calls.length).toBe(1)
    expect(mockReplaceLinkInChatMessage.mock.calls.length).toBe(1)
  })

  test('updateUnreadMessageCount', () => {
    const { updateUnreadMessageCount } = chatbox.actions
    let unreadMessageCount: number
    const mockCommit = (state, payload) => {
      unreadMessageCount = payload.count
    }
    const mockDispatch = payload => {
      return
    }

    updateUnreadMessageCount({ commit: mockCommit, dispatch: mockDispatch }, 10)
    expect(unreadMessageCount).toBe(10)

    updateUnreadMessageCount({ commit: mockCommit, dispatch: mockDispatch }, 0)
    expect(unreadMessageCount).toBe(0)
  })

  test('updatePageTitle', () => {
    const { updatePageTitle } = chatbox.actions
    let title: string
    const mockDispatch = (type, payload, option) => {
      title = payload
    }
    const mockRootState = {
      lessonRoom: {
        lessonRoomTitle: 'base title'
      }
    }

    updatePageTitle({ dispatch: mockDispatch, rootState: mockRootState }, 0)
    expect(title).toBe(mockRootState.lessonRoom.lessonRoomTitle)

    updatePageTitle({ dispatch: mockDispatch, rootState: mockRootState }, 1)
    expect(title).toBe(`(1) ${mockRootState.lessonRoom.lessonRoomTitle}`)

    updatePageTitle({ dispatch: mockDispatch, rootState: mockRootState }, 10)
    expect(title).toBe(`(10) ${mockRootState.lessonRoom.lessonRoomTitle}`)
  })
})
