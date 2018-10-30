import axios from 'axios'
import store from '@/store'
import { Message } from 'iview'
import * as util from './util'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  console.log('axios...')
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      config.headers['x-access-token'] = util.getToken()
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      const is = this.destroy(url)
      const { data } = res
      if (!is) {
        setTimeout(() => {
          // Spin.hide()
        }, 500)
      }
      return data
    }, (error) => {
      // console.log(JSON.stringify(error));
      if (error['code'] === 'ECONNABORTED' || !error.hasOwnProperty('response')) {
        Message.error('服务器连接错误，请检查网络是否可用')
      } else {
        let res = error['response']
        if (res && res.hasOwnProperty('status') && res.status === 401) {
          Cookies.remove(TOKEN_KEY)
          if (res.data.msg) {
            Message.error(res.data.msg)
          } else {
            window.location.href = '/dc/login'
            Message.error('未登录，或登录失效，请登录')
          }
        } else {
          Message.error(res && res.hasOwnProperty('data') && res.data['msg'] ? res.data['msg'] : '服务内部错误')
        }
        // 对响应错误做点什么
        return Promise.reject(error)
      }
    })
    // 响应拦截
    // instance.interceptors.response.use(res => {
    //   this.destroy(url)
    //   const { data, status } = res
    //   return { data, status }
    // }, error => {
    //   this.destroy(url)
    //   console.log('resInterceptors....')
    //   addErrorLog(error.response)
    //   return Promise.reject(error)
    // })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
