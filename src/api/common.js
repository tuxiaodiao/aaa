import axios from '@/libs/api.request'

export const getDct = (parmas) => {
  return axios.request({
    url: '/admin/dct',
    params: parmas,
    method: 'get'
  })
}

// 获取字典参数列表
export const getDctConfig = (params) => {
  return axios.request({
    url: '/admin/dct/config',
    params: params,
    method: 'get'
  })
}

// 添加字典参数
export const addDctConfig = (params) => {
  return axios.request({
    url: '/admin/dct/config',
    data: params,
    method: 'post'
  })
}

// 设置字典参数
export const setDctConfig = (params) => {
  return axios.request({
    url: '/admin/dct/config',
    data: params,
    method: 'put'
  })
}
