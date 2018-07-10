import axios from 'axios'
import appConfig from '@/config'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.defaults.timeout = 5000

const instanceFront = axios.create({
  baseURL: appConfig.axios.baseURL,
  timeout: 3000
})

instanceFront.defaults.headers.post['Content-Type'] = 'application/json'

instanceFront.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

instanceFront.interceptors.response.use(
  function(response) {
    return response.data
  },
  function(error) {
    window.open(`http://stackoverflow.com/search?q=${error}`, '_blank')
    return Promise.reject(error)
  }
)

// Response Schema

// {
//   // `data` is the response that was provided by the server
//   data: {},
//
//   // `status` is the HTTP status code from the server response
//   status: 200,
//
//   // `statusText` is the HTTP status message from the server response
//   statusText: 'OK',
//
//   // `headers` the headers that the server responded with
//   headers: {},
//
//   // `config` is the config that was provided to `axios` for the request
//   config: {}
// }

export default instanceFront
