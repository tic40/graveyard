import lessonMemo from '@js/store/modules/lessonMemo'

describe('getters test', () => {
  test('getLessonMemoLastUpdatedAt', () => {
    const { getLessonMemoLastUpdatedAt } = lessonMemo.getters

    let state = {
      lessonMemoLastUpdated: {
        memo: undefined,
        updatedAt: Moment('2017-01-01 10:25:00', 'YYYY-MM-DD hh:mm:ss')
      }
    }
    expect(getLessonMemoLastUpdatedAt(state)).toBe('10:25')
  })
})

describe('actions test', () => {
  test('saveLessonMemo', async () => {
    const { saveLessonMemo } = lessonMemo.actions
    let lessonMemoLastUpdated
    let mockState = {
      lessonMemoInput: 'test'
    }
    let mockDispatch = (type, payload) => {
      if (type === 'updateButtons') {
        return
      } else if (type === 'postLessonMemo') {
        return new Promise(resolve => {
          resolve()
        })
      }
    }
    let mockCommit = (state, payload) => {
      lessonMemoLastUpdated = payload.lastUpdated
    }

    await saveLessonMemo(
      { commit: mockCommit, state: mockState, dispatch: mockDispatch },
      undefined
    )
    expect(lessonMemoLastUpdated.memo).toBe('test')
    expect(typeof lessonMemoLastUpdated.updatedAt).toBe('object')

    lessonMemoLastUpdated = undefined
    mockState = {
      lessonMemoInput: 'test'
    }
    mockDispatch = (type, payload) => {
      if (type === 'updateButtons') {
        return
      } else if (type === 'postLessonMemo') {
        return new Promise((resolve, reject) => {
          reject('error')
        })
      }
    }
    await saveLessonMemo(
      { commit: mockCommit, state: mockState, dispatch: mockDispatch },
      undefined
    )
    expect(lessonMemoLastUpdated).toBeUndefined()
  })

  test('postLessonMemo', async () => {
    const { postLessonMemo } = lessonMemo.actions
    const mockRootState = {
      lesson: {
        lessonInfo: {
          lessonStartTime: Moment()
        }
      }
    }
    GibsonApi.postMemberLessonMemo = jest.fn(() => {
      return new Promise(resolve => {
        resolve('SUCCESS')
      })
    })
    await expect(
      postLessonMemo({ rootState: mockRootState }, 'test')
    ).resolves.toBeUndefined()

    GibsonApi.postMemberLessonMemo = jest.fn(() => {
      return new Promise(resolve => {
        resolve('')
      })
    })
    await expect(
      postLessonMemo({ rootState: mockRootState }, 'test')
    ).rejects.toBe('保存に失敗しました')

    GibsonApi.postMemberLessonMemo = jest.fn(() => {
      return new Promise(resolve => {
        resolve('SUCCESS')
      })
    })
    const equalToMaxInputChar: string = 'a'.repeat(
      Constants.MAX_LESSON_MEMO_INPUT_CHAR
    )
    await expect(
      postLessonMemo({ rootState: mockRootState }, equalToMaxInputChar)
    ).resolves.toBeUndefined()
    const overMaxInputChar: string = 'a'.repeat(
      Constants.MAX_LESSON_MEMO_INPUT_CHAR + 1
    )
    await expect(
      postLessonMemo({ rootState: mockRootState }, overMaxInputChar)
    ).rejects.toBe(
      '文字数は' +
        Constants.MAX_LESSON_MEMO_INPUT_CHAR +
        '文字以下にしてください'
    )
  })
})
