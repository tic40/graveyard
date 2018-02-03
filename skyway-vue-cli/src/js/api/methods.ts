import Axios from 'axios'

const options = { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
export function fetch (url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    Axios.get(url, options)
      .then(response => {
        resolve(response.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function fetchWithoutOptions (url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    Axios.get(url)
      .then(response => {
        resolve(response.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function post (url: string, request): Promise<any> {
  return new Promise((resolve, reject) => {
    Axios.post(url, request, options)
      .then(response => {
        resolve(response.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function put (url: string, request): Promise<any> {
  return new Promise((resolve, reject) => {
    Axios.put(url, request, options)
      .then(response => {
        resolve(response.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function destroy (url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    Axios.delete(url, options)
      .then(response => {
        resolve(response.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}
