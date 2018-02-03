import phrase from '@js/store/modules/phrase'

describe('actions test', () => {
  test('updateCurrentTab', () => {
    const { updateCurrentTab } = phrase.actions
    let currentTab
    const mockCommit = (state, payload) => {
      currentTab = payload.tab
    }
    updateCurrentTab({ commit: mockCommit }, 'trouble')
    expect(currentTab).toBe('trouble')

    updateCurrentTab({ commit: mockCommit }, '')
    expect(currentTab).toBe('')
  })
})

describe('mutations test', () => {
  test('setCurrentTab', () => {
    const { setCurrentTab } = phrase.mutations
    let mockState = {
      currentTab: ''
    }
    setCurrentTab(mockState, { tab: 'lesson' })
    expect(mockState.currentTab).toBe('lesson')
  })
})
