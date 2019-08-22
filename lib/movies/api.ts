import axios from 'axios'

const apiKey = '6ed12e064b90ae1290fa326ce9e790ff'
const isServer = typeof window === 'undefined'

function getLanguage () {
  if (isServer) {
    return null
  }
  const nav: Navigator = window.navigator
  return nav.languages ? nav.languages[0] : nav.language
}

const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
})

// Work around for broken param defaults in axios
// See: https://github.com/axios/axios/issues/2190
client.interceptors.request.use((config) => {
  config.params = {
    api_key: apiKey,
    language: getLanguage(),
    ...config.params
  }
  return config
}, (error) => Promise.reject(error));

export default client
