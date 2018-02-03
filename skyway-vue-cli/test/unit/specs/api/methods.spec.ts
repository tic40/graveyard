import * as methods from '@js/api/methods'
import Axios from 'axios'

describe('methods test', () => {
  test('fetch', async () => {
    Axios.get = jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          data: 'mock response'
        })
      })
    })
    await expect(methods.fetch('https://example.com')).resolves.toBe(
      'mock response'
    )

    Axios.get = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject('error response')
      })
    })
    await expect(methods.fetch('https://example.com')).rejects.toBe(
      'error response'
    )
  })

  test('fetchWithoutOptions', async () => {
    Axios.get = jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          data: 'mock response'
        })
      })
    })
    await expect(
      methods.fetchWithoutOptions('https://example.com')
    ).resolves.toBe('mock response')

    Axios.get = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject('error response')
      })
    })
    await expect(
      methods.fetchWithoutOptions('https://example.com')
    ).rejects.toBe('error response')
  })

  test('post', async () => {
    Axios.post = jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          data: 'mock response'
        })
      })
    })
    await expect(methods.post('https://example.com')).resolves.toBe(
      'mock response'
    )

    Axios.post = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject('error response')
      })
    })
    await expect(methods.post('https://example.com')).rejects.toBe(
      'error response'
    )
  })

  test('put', async () => {
    Axios.put = jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          data: 'mock response'
        })
      })
    })
    await expect(methods.put('https://example.com')).resolves.toBe(
      'mock response'
    )

    Axios.put = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject('error response')
      })
    })
    await expect(methods.put('https://example.com')).rejects.toBe(
      'error response'
    )
  })

  test('delete', async () => {
    Axios.delete = jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          data: 'mock response'
        })
      })
    })
    await expect(methods.destroy('https://example.com')).resolves.toBe(
      'mock response'
    )

    Axios.delete = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject('error response')
      })
    })
    await expect(methods.destroy('https://example.com')).rejects.toBe(
      'error response'
    )
  })
})
