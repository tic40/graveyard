import lesson from '@js/store/modules/lesson'

describe('getters test', () => {
  test('getProfilePicUrl', () => {
    const { getProfilePicUrl } = lesson.getters
    const mockState = {
      lessonInfo: {
        tutorId: 10
      }
    }
    expect(getProfilePicUrl(mockState)).toBe(
      Constants.URL_RJ_AWS + '/images/jpg/tutor/t10.jpg'
    )
  })

  test('getFormattedRemainingLessonTime', () => {
    const { getFormattedRemainingLessonTime } = lesson.getters
  })

  test('getFormattedRemainingTime', () => {
    const { getFormattedRemainingTime } = lesson.getters
  })

  test('getFormattedLessonStartTime', () => {
    const { getFormattedLessonStartTime } = lesson.getters
    let mockState = {
      lessonInfo: {
        lessonStartTime: Moment('2018-01-01 10:00:01')
      }
    }
    expect(getFormattedLessonStartTime(mockState)).toBe('2018/01/01 10:00')
    let mockState = {
      lessonInfo: {
        lessonStartTime: ''
      }
    }
    expect(getFormattedLessonStartTime(mockState)).toBe('')
  })
})

describe('actions test', () => {
  test('fetchLessonReservation', async () => {
    const { fetchLessonReservation } = lesson.actions
    let lessonInfo
    const mockDispatch = () => {
      return
    }
    const mockCommit = (state, payload) => {
      lessonInfo = payload.lessonInfo
    }
    let mockApiResponse = {
      list: [
        {
          registration_id: '1',
          tutor_id: '5',
          profile_key: '5',
          tutor_name: 'tutor name',
          lesson_start_time: '201612151430',
          video_chat_platform_id: String(
            Constants.VIDEO_CHAT_PLATFORM_ID.SKYWAY
          ),
          tutor_skype_name: 'tutor skype name',
          is_substitute_lesson: '0',
          is_changed_lesson: '0',
          is_cancelable_lesson: '0',
          is_trouble_report: '0',
          has_lesson_request: '1',
          use_curriculum: '0'
        }
      ]
    }

    GibsonApi.fetchMemberLessonReservation = jest.fn(() => {
      return new Promise(resolve => resolve(mockApiResponse))
    })
    await expect(
      fetchLessonReservation({ commit: mockCommit, dispatch: mockDispatch }, 1)
    ).resolves.toBeTruthy()
    expect(lessonInfo.registrationId).toBe(
      Number(mockApiResponse.list[0].registration_id)
    )
    expect(lessonInfo.tutorId).toBe(Number(mockApiResponse.list[0].tutor_id))
    expect(lessonInfo.profileKey).toBe(
      Number(mockApiResponse.list[0].profile_key)
    )
    expect(lessonInfo.tutorName).toBe(mockApiResponse.list[0].tutor_name)
    expect(lessonInfo.lessonStartTime).toEqual(
      Moment(mockApiResponse.list[0].lesson_start_time, 'YYYYMMDDHHmm')
    )
    expect(lessonInfo.lessonEndTime).toEqual(
      Moment(mockApiResponse.list[0].lesson_start_time, 'YYYYMMDDHHmm')
        .clone()
        .add(Constants.LESSON_TIME, 'seconds')
    )

    let mockApiResponse = {
      list: [
        {
          registration_id: '2',
          tutor_id: '2',
          profile_key: '2',
          tutor_name: 'tutor name2',
          lesson_start_time: '201612151430',
          video_chat_platform_id: String(
            Constants.VIDEO_CHAT_PLATFORM_ID.SKYWAY
          ),
          tutor_skype_name: 'tutor skype name2',
          is_substitute_lesson: '0',
          is_changed_lesson: '0',
          is_cancelable_lesson: '0',
          is_trouble_report: '0',
          has_lesson_request: '1',
          use_curriculum: '0'
        },
        {
          registration_id: '3',
          tutor_id: '3',
          profile_key: '3',
          tutor_name: 'tutor name3',
          lesson_start_time: '201612151430',
          video_chat_platform_id: String(
            Constants.VIDEO_CHAT_PLATFORM_ID.SKYWAY
          ),
          tutor_skype_name: 'tutor skype name3',
          is_substitute_lesson: '0',
          is_changed_lesson: '0',
          is_cancelable_lesson: '0',
          is_trouble_report: '0',
          has_lesson_request: '1',
          use_curriculum: '0'
        }
      ]
    }
    GibsonApi.fetchMemberLessonReservation = jest.fn(() => {
      return new Promise(resolve => resolve(mockApiResponse))
    })
    await expect(
      fetchLessonReservation({ commit: mockCommit, dispatch: mockDispatch }, 3)
    ).resolves.toBeTruthy()
    expect(lessonInfo.registrationId).toBe(
      Number(mockApiResponse.list[1].registration_id)
    )
    expect(lessonInfo.tutorId).toBe(Number(mockApiResponse.list[1].tutor_id))
    expect(lessonInfo.profileKey).toBe(
      Number(mockApiResponse.list[1].profile_key)
    )
    expect(lessonInfo.tutorName).toBe(mockApiResponse.list[1].tutor_name)
    expect(lessonInfo.lessonStartTime).toEqual(
      Moment(mockApiResponse.list[1].lesson_start_time, 'YYYYMMDDHHmm')
    )
    expect(lessonInfo.lessonEndTime).toEqual(
      Moment(mockApiResponse.list[1].lesson_start_time, 'YYYYMMDDHHmm')
        .clone()
        .add(Constants.LESSON_TIME, 'seconds')
    )

    await expect(
      fetchLessonReservation({ commit: mockCommit, dispatch: mockDispatch }, 10)
    ).resolves.toBeFalsy()

    GibsonApi.fetchMemberLessonReservation = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject()
      })
    })

    await expect(
      fetchLessonReservation({ commit: mockCommit, dispatch: mockDispatch }, 1)
    ).rejects.toBeUndefined()
  })

  test('fetchLessonSkyway', async () => {
    const { fetchLessonSkyway } = lesson.actions
    let studentPeerId: string
    let tutorPeerId: string
    const mockCommit = (type, payload) => {
      switch (type) {
      case 'setStudentPeerId':
        studentPeerId = payload.peerId
      case 'setTutorPeerId':
        tutorPeerId = payload.peerId
      }
      return
    }
    GibsonApi.fetchMemberLessonSkyway = jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          member_peer_id: 1,
          tutor_peer_id: 2
        })
      })
    })

    await expect(
      fetchLessonSkyway({ commit: mockCommit }, 1)
    ).resolves.toBeTruthy()
    expect(studentPeerId).toBe(1)
    expect(tutorPeerId).toBe(2)

    GibsonApi.fetchMemberLessonSkyway = jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          error_code: '001'
        })
      })
    })
    await expect(
      fetchLessonSkyway({ commit: mockCommit }, 1)
    ).rejects.toBeUndefined()

    GibsonApi.fetchMemberLessonSkyway = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject()
      })
    })
    await expect(
      fetchLessonSkyway({ commit: mockCommit }, 1)
    ).rejects.toBeUndefined()
  })
})
