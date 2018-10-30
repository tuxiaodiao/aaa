import axios from '@/libs/api.request'

// 维度数据
export const dimensionality = (parmas) => {
  return axios.request({
    url: '/admin/mainStat/dimensionality',
    params: parmas,
    method: 'get'
  })
}

// 当天、提前
export const saleUsePeriod = (parmas) => {
  return axios.request({
    url: '/admin/mainStat/saleUsePeriod',
    params: parmas,
    method: 'get'
  })
}

// 二次入园
export const repeat = (parmas) => {
  return axios.request({
    url: '/admin/mainStat/repeat',
    params: parmas,
    method: 'get'
  })
}
// 小时段
export const hourPeriod = (parmas) => {
  return axios.request({
    url: '/admin/mainStat/hourPeriod',
    params: parmas,
    method: 'get'
  })
}

// 近七天入园数据
export const dayPeriod = (parmas) => {
  return axios.request({
    url: '/admin/mainStat/dayPeriod',
    params: parmas,
    method: 'get'
  })
}

// 客源地
export const attrPlace = (parmas) => {
  return axios.request({
    url: '/admin/mainStat/attrPlace',
    params: parmas,
    method: 'get'
  })
}
