import envCheck from '@js/store/modules/envCheck'
import * as DetectRTC from 'detectrtc'

describe('actions test', () => {
  test('isValidBrowser', async () => {
    const { isValidBrowser } = envCheck.actions
    const mockDispatch = () => {
      return new Promise(resolve => {
        resolve({
          isWebRTCSupported: true,
          browser: { isChrome: true, isFirefox: false }
        })
      })
    }
    await expect(
      isValidBrowser({ dispatch: mockDispatch })
    ).resolves.toBeTruthy()

    const mockDispatch = () => {
      return new Promise(resolve => {
        resolve({
          isWebRTCSupported: true,
          browser: { isChrome: false, isFirefox: true }
        })
      })
    }
    await expect(
      isValidBrowser({ dispatch: mockDispatch })
    ).resolves.toBeTruthy()

    const mockDispatch = () => {
      return new Promise(resolve => {
        resolve({
          isWebRTCSupported: true,
          browser: { isChrome: false, isFirefox: false }
        })
      })
    }
    await expect(
      isValidBrowser({ dispatch: mockDispatch })
    ).resolves.toBeFalsy()
  })
})
