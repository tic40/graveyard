import headerBalloons from '@js/store/modules/headerBalloons'

describe('actions test', () => {
  test('balloonToggle', () => {
    const { balloonToggle } = headerBalloons.actions
    const { setCurrentBalloon } = headerBalloons.mutations
    let currentBalloon
    let mockState = {
      currentBalloon: ''
    }
    const mockCommit = (state, payload) => {
      currentBalloon = payload.currentBalloon
    }
    balloonToggle({ state: mockState, commit: mockCommit }, 'phrase')
    expect(currentBalloon).toBe('phrase')

    currentBalloon = undefined
    mockState = {
      currentBalloon: 'phrase'
    }
    balloonToggle({ state: mockState, commit: mockCommit }, 'phrase')
    expect(currentBalloon).toBe('')
  })

  test('closeBalloon', () => {
    const { closeBalloon } = headerBalloons.actions
    let currentBalloon = 'phrase'
    const mockCommit = (state, payload) => {
      currentBalloon = payload.currentBalloon
    }
    closeBalloon({ commit: mockCommit })
    expect(currentBalloon).toBe('')
  })
})
