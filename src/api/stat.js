import axios from '@/libs/api.request'

export const getSynDay = (parmas) => {
  return axios.request({
    url: '/admin/stat/synDay',
    params: parmas,
    method: 'get'
  })
}

export const getSaleDay = (parmas) => {
  return axios.request({
    url: '/admin/stat/saleDay',
    params: parmas,
    method: 'get'
  })
}

export const getInfo = (parmas) => {
  return axios.request({
    url: '/admin/detail/info',
    params: parmas,
    method: 'get'
  })
}

// 日统计验票按日
export const getCheckDay = (parmas) => {
  return axios.request({
    url: '/admin/stat/checkDay',
    params: parmas,
    method: 'get'
  })
}

// 日统计退票按日
export const getRefundDay = (parmas) => {
  return axios.request({
    url: '/admin/stat/refundDay',
    params: parmas,
    method: 'get'
  })
}
