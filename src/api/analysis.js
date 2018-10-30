import axios from '@/libs/api.request'

// 时间段人流
export const customerFlow = (parmas) => {
  return axios.request({
    url: '/admin/analysis/userFlow',
    params: parmas,
    method: 'get'
  })
}

// 年龄段与性别
export const ageAndGender = (parmas) => {
  return axios.request({
    url: '/admin/analysis/ageAndGender',
    params: parmas,
    method: 'get'
  })
}

// 年龄
export const age = (parmas) => {
  return axios.request({
    url: '/admin/analysis/age',
    params: parmas,
    method: 'get'
  })
}

// 性别
export const gender = (parmas) => {
  return axios.request({
    url: '/admin/analysis/gender',
    params: parmas,
    method: 'get'
  })
}

// 直销与OTA客流
export const directOta = (parmas) => {
  return axios.request({
    url: '/admin/analysis/directAndOTA',
    params: parmas,
    method: 'get'
  })
}

// 直销客流
export const direct = (parmas) => {
  return axios.request({
    url: '/admin/analysis/direct',
    params: parmas,
    method: 'get'
  })
}

// OTA客流
export const ota = (parmas) => {
  return axios.request({
    url: '/admin/analysis/OTA',
    params: parmas,
    method: 'get'
  })
}

// 个人与团队
export const agencyAndPerson = (parmas) => {
  return axios.request({
    url: '/admin/analysis/agencyAndPerson',
    params: parmas,
    method: 'get'
  })
}

// 团队
export const agency = (parmas) => {
  return axios.request({
    url: '/admin/analysis/agency',
    params: parmas,
    method: 'get'
  })
}

// 销售员
export const sellerIdType = (parmas) => {
  return axios.request({
    url: '/admin/analysis/sellerIdType',
    params: parmas,
    method: 'get'
  })
}

// 支付渠道
export const payChannel = (parmas) => {
  return axios.request({
    url: '/admin/analysis/payChannel',
    params: parmas,
    method: 'get'
  })
}

// 现场票时间段
export const localePeriod = (parmas) => {
  return axios.request({
    url: '/admin/analysis/localePeriod',
    params: parmas,
    method: 'get'
  })
}

// 验票介质数据统计查询
export const checkMedium = (parmas) => {
  return axios.request({
    url: '/admin/analysis/checkMedium',
    params: parmas,
    method: 'get'
  })
}

// 退票异常
export const refundException = (parmas) => {
  return axios.request({
    url: '/admin/analysis/refundException',
    params: parmas,
    method: 'get'
  })
}

// 历史时间段客流量
export const userFlowHistory = (parmas) => {
  return axios.request({
    url: '/admin/analysis/userFlowHistory',
    params: parmas,
    method: 'get'
  })
}
// 客源地
export const attrPlace = (parmas) => {
  return axios.request({
    url: '/admin/analysis/attrPlace',
    params: parmas,
    method: 'get'
  })
}
// 优惠票
export const coupon = (parmas) => {
  return axios.request({
    url: '/admin/analysis/coupon',
    params: parmas,
    method: 'get'
  })
}
