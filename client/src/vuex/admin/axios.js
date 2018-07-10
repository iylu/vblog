import axios from 'axios'
import appConfig from '@/config'

// Global axios defaults
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.default.timeout = 5000

const instanceAdmin = axios.create({
  baseURL: appConfig.axios.baseURL,
  timeout: 3000
})

instanceAdmin.defaults.headers.post['Content-Type'] = 'application/json'

//token 处理
instanceAdmin.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `token ${localStorage.getItem(
        'token'
      )}`.replace(/(^\")|(\"$)/g, '')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

instanceAdmin.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    return Promise.reject(err)
  }
)

export default instanceAdmin
