import * as util from '@js/modules/util'

describe('util test', () => {
  test('sanitizeChatMessage', () => {
    const sanitizeChatMessage = util.sanitizeChatMessage

    const case1: string = 'test'
    expect(sanitizeChatMessage(case1)).toBe(case1)

    const case2: string = '<test>'
    expect(sanitizeChatMessage(case2)).toBe('&lt;test&gt;')

    const case3: string = '><test >'
    expect(sanitizeChatMessage(case3)).toBe('&gt;&lt;test &gt;')
  })

  test('replaceNewLineToBrTag', () => {
    const replaceNewLineToBrTag = util.replaceNewLineToBrTag

    const case1: string = 'test'
    expect(replaceNewLineToBrTag(case1)).toBe(case1)

    const case2: string = '\ntest\n\n'
    expect(replaceNewLineToBrTag(case2)).toBe(' <br>test <br> <br>')
  })

  test('replaceBrTagToNewLine', () => {
    const replaceBrTagToNewLine = util.replaceBrTagToNewLine

    const case1: string = 'test<br>test'
    expect(replaceBrTagToNewLine(case1)).toBe('test\ntest')

    const case2: string = 'test<br />test'
    expect(replaceBrTagToNewLine(case2)).toBe('test\ntest')

    const case3: string = 'testtest'
    expect(replaceBrTagToNewLine(case3)).toBe('testtest')
  })

  test('replaceHttpLinkToHttps', () => {
    const replaceHttpLinkToHttps = util.replaceHttpLinkToHttps

    const case1: string = 'http://example.com'
    expect(replaceHttpLinkToHttps(case1)).toBe('https://example.com')

    const case2: string = 'https://example.com'
    expect(replaceHttpLinkToHttps(case2)).toBe(case2)

    const case3: string = 'example.com'
    expect(replaceHttpLinkToHttps(case3)).toBe(case3)
  })

  test('hasEmoji', () => {
    const hasEmoji = util.hasEmoji

    const case1: string = '😴'
    expect(hasEmoji(case1)).toBeTruthy()

    const case2: string = 'test 😴'
    expect(hasEmoji(case2)).toBeTruthy()

    const case3: string = 'test'
    expect(hasEmoji(case3)).toBeFalsy()

    const case4: string = '✋'
    expect(hasEmoji(case4)).toBeTruthy()
  })

  test('openNewWindow', () => {
    const openNewWindow = util.openNewWindow
    global.open = jest.fn()
    openNewWindow('http://example.com', '', 100, 100, 0, 0)
  })
})
