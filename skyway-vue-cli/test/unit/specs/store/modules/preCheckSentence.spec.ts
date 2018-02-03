import preCheckSentence from '@js/store/modules/preCheckSentence'

describe('getters test', () => {
  test('updateCurrentTab', () => {
    const { getSentenceAtRandom } = preCheckSentence.getters
    const state = preCheckSentence.state
    const result1 = getSentenceAtRandom(state)
    expect(result1).toHaveProperty('jp_text')
    expect(result1).toHaveProperty('en_text')
    expect(result1).toHaveProperty('pronunciation')
    expect(typeof result1.jp_text).toBe('string')
    expect(typeof result1.en_text).toBe('string')
    expect(typeof result1.pronunciation).toBe('string')
  })
})
