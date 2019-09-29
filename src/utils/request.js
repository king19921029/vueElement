import axios from 'axios'
import qs from 'qs';

import domain from './getUrl.js';
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '../store'
import {
  getToken
} from '@/utils/auth'
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  // baseURL: "https://api.lingling365.cn:8443",
  baseURL: domain.url,
  timeout: 15000, // 请求超时时间
  transformRequest: [function(data) {
    data = qs.stringify(data) //序列化参数
    return data
  }]
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['x-authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  if (config.method == "post") {
    config.headers['Content-Type'] = "application/x-www-form-urlencoded";
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })

      // 401:未登录;
      if (res.code === 401 || res.code === 403) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
