import * as api from '@/api/analysis'
import * as types from '../mutation-types'
import * as utils from './utils'

// initial state
const state = {
  // 时间段人流
  customerFlow: {}, // 接口获取的原始数据
  customerFlowOption: {}, // echart option部分
  // 年龄段与性别
  ageGenderOption: {},
  ageGender: {},
  // 年龄
  ageOption: {},
  age: {},
  // 性别
  genderOption: {},
  gender: {},
  // 直销与OTA客流
  directOta: {},
  directOtaOption: {},
  // 直销客流
  direct: {},
  directOption: {},
  // OTA客流
  ota: {},
  otaOption: {},
  // 团队与散客
  agencyPersonOption: {},
  agencyPerson: {},
  // 支付渠道
  payChannelOption: {},
  payChannel: {},
  // 团体
  agencyOption: {},
  agency: {},
  // 销售员
  sellerOption: {},
  seller: {},
  // 优惠票
  couponOption: {},
  coupon: {},
  // 客流历史对比
  userFlowHistoryOption: {},
  userFlowHistory: {},
  // 过闸介质
  LockMediumOption: {},
  LockMedium: {},
  // 退票异常
  refundAbnormal: {},
  refundAbnormalOption: {},
  // 旅行社

  // 现场售票时段
  ticketTimeOption: {},
  ticketTime: {},
  // 客源地
  attrPlaceOption: [],
  attrPlace: {},
  // 票种分析
  ticketsKindOption: {},
  ticketsKind: {},
  // 购票入区时间
  saleUsePeriodOption: {},
  saleUsePeriod: {},
  // 二次入区
  repeatOption: {},
  repeat: {},
  // 预约与实际入园人数对比
  appointmentOption: {},
  appointment: {}

}

// getters
const getters = {
  customerFlow: state => state.customerFlow,
  customerFlowOption: state => state.customerFlowOption,

  ageGenderOption: state => state.ageGenderOption,
  ageGender: state => state.ageGender,

  ageOption: state => state.ageOption,
  age: state => state.age,

  genderOption: state => state.genderOption,
  gender: state => state.gender,

  directOta: state => state.directOta,
  directOtaOption: state => state.directOtaOption,

  direct: state => state.direct,
  directOption: state => state.directOption,

  ota: state => state.ota,
  otaOption: state => state.otaOption,

  agencyPersonOption: state => state.agencyPersonOption,
  agencyPerson: state => state.agencyPerson,

  payChannelOption: state => state.payChannelOption,
  payChannel: state => state.payChannel,

  sellerOption: state => state.sellerOption,
  seller: state => state.seller,

  agencyOption: state => state.agencyOption,
  agency: state => state.agency,

  couponOption: state => state.couponOption,
  coupon: state => state.coupon,

  LockMediumOption: state => state.LockMediumOption,
  LockMedium: state => state.LockMedium,

  ticketTimeOption: state => state.ticketTimeOption,
  ticketTime: state => state.ticketTime,

  userFlowHistoryOption: state => state.userFlowHistoryOption,
  userFlowHistory: state => state.userFlowHistory,

  refundAbnormalOption: state => state.refundAbnormalOption,
  refundAbnormal: state => state.refundAbnormal,

  attrPlaceOption: state => state.attrPlaceOption,
  attrPlace: state => state.attrPlace,

  ticketsKindOption: state => state.ticketsKindOption,
  ticketsKind: state => state.ticketsKind,

  saleUsePeriodOption: state => state.saleUsePeriodOption,
  saleUsePeriod: state => state.saleUsePeriod,

  repeatOption: state => state.repeatOption,
  repeat: state => state.repeat,

  appointmentOption: state => state.appointmentOption,
  appointment: state => state.appointment
}

// actions
const actions = {
  // 时间段人流
  customerFlow ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.customerFlow(params).then(data => {
        commit(types.CUSTOMER_FLOW, { data })
        resolve()
      })
    })
  },

  // 年龄段与性别
  ageGender ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.ageAndGender(params).then(data => {
        commit(types.AGE_GENDER, { data })
        resolve()
      })
    })
  },

  // 年龄段
  age ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.age(params).then(data => {
        commit(types.AGE, { data })
        resolve()
      })
    })
  },

  // 性别
  gender ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.gender(params).then(data => {
        commit(types.GENDER, { data })
        resolve()
      })
    })
  },

  // 直销与OTA客流
  directOta ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.directOta(params).then(data => {
        commit(types.DIRECT_OTA, { data })
        resolve()
      })
    })
  },

  // 直销客流
  direct ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.direct(params).then(data => {
        commit(types.DIRECT, { data })
        resolve()
      })
    })
  },

  // OTA客流
  ota ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.ota(params).then(data => {
        commit(types.OTA, { data })
        resolve()
      })
    })
  },

  // 个人与团队
  agencyPerson ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.agencyAndPerson(params).then(data => {
        commit(types.AGENCY_PERSON, { data })
        resolve()
      })
    })
  },

  // 团队
  agency ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.agency(params).then(data => {
        commit(types.AGENCY, { data })
        resolve()
      })
    })
  },

  // 销售员
  seller ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.sellerIdType(params).then(data => {
        commit(types.SELLER, { data })
        resolve()
      })
    })
  },

  // 支付渠道
  payChannel ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.payChannel(params).then(data => {
        commit(types.PAY_CHANNEL, { data })
        resolve()
      })
    })
  },

  // 现场票时间段
  ticketTime ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.localePeriod(params).then(data => {
        commit(types.TICKET_TIME, { data })
        resolve()
      })
    })
  },
  // 过闸介质
  LockMedium ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.checkMedium(params).then(data => {
        commit(types.LOCK_MEDIUM, { data })
        resolve()
      })
    })
  },
  // 退票异常
  refundAbnormal ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.refundException(params).then(data => {
        commit(types.REFUND_ABNORMAL, { data })
        resolve()
      })
    })
  },
  // 历史时间段客流量
  userFlowHistory ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.userFlowHistory(params).then(data => {
        commit(types.USER_FLOW_HISTORY, { data })
        resolve()
      })
    })
  },
  // 客源地
  attrPlace ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.attrPlace(params).then(data => {
        commit(types.ATTR_PLACE, { data })
        resolve()
      })
    })
  },

  coupon ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.coupon(params).then(data => {
        commit(types.COUPON, { data })
        resolve()
      })
    })
  }

}

// mutations
const mutations = {
  // 给某个字段赋值用户初始化数据
  [types.INIT_ANALYSIS_PROPERTY] (state, item) {
    state[item['key']] = item.data
  },
  // 原始数据
  [types.CUSTOMER_FLOW] (state, { data }) {
  	state.customerFlow = data
  },
  // 时间段人流OPTION数据
  [types.CUSTOMER_FLOW_OPTION] (state, data) {
    state.customerFlowOption = data
  },

  // 年龄段与性别OPTION数据
  [types.AGE_GENDER_OPTION] (state, data) {
    state.ageGenderOption = data
  },
  [types.AGE_GENDER] (state, {data}) {
    state.ageGender = data
  },

  // 年龄
  [types.AGE_OPTION] (state, data) {
    state.ageOption = data
  },
  [types.AGE] (state, {data}) {
    state.age = data
  },

  // 性别
  [types.GENDER_OPTION] (state, data) {
    state.genderOption = data
  },
  [types.GENDER] (state, {data}) {
    state.gender = data
  },

  // 直销与OTA客流 原始数据
  [types.DIRECT_OTA] (state, { data }) {
    state.directOta = data
  },
  // 直销与OTA客流 OPTION数据
  [types.DIRECT_OTA_OPTION] (state, data) {
    state.directOtaOption = data
  },

  // 直销客流 原始数据
  [types.DIRECT] (state, { data }) {
    state.direct = data
  },
  // 直销客流 OPTION数据
  [types.DIRECT_OPTION] (state, data) {
    state.directOption = data
  },

  // OTA客流 原始数据
  [types.OTA] (state, { data }) {
    state.ota = data
  },
  // OTA客流 OPTION数据
  [types.OTA_OPTION] (state, data) {
    state.otaOption = data
  },

  // 团队与散客OPTION数据
  [types.AGENCY_PERSON_OPTION] (state, data) {
  	state.agencyPersonOption = data
  },
  [types.AGENCY_PERSON] (state, {data}) {
  	state.agencyPerson = data
  },

  // 团队
  [types.AGENCY_OPTION] (state, data) {
  	state.agencyOption = data
  },
  [types.AGENCY] (state, {data}) {
  	state.agency = data
  },

  // 支付渠道
  [types.PAY_CHANNEL_OPTION] (state, data) {
  	state.payChannelOption = data
  },
  [types.PAY_CHANNEL] (state, {data}) {
  	state.payChannel = data
  },

  // 销售员
  [types.SELLER_OPTION] (state, data) {
  	state.sellerOption = data
  },
  [types.SELLER] (state, {data}) {
  	state.seller = data
  },

  // 优惠券
  [types.COUPON_OPTION] (state, data) {
  	state.couponOption = data
  },
  [types.COUPON] (state, {data}) {
  	state.coupon = data
  },

  // 过闸介质
  [types.LOCK_MEDIUM_OPTION] (state, data) {
  	state.LockMediumOption = data
  },
  [types.LOCK_MEDIUM] (state, {data}) {
  	state.LockMedium = data
  },

  // 现场售票时段
  [types.TICKET_TIME_OPTION] (state, data) {
  	state.ticketTimeOption = data
  },
  [types.TICKET_TIME] (state, {data}) {
  	state.ticketTime = data
  },
  // 客流历史对比
  [types.USER_FLOW_HISTORY_OPTION] (state, data) {
  	state.userFlowHistoryOption = data
  },
  [types.USER_FLOW_HISTORY] (state, {data}) {
  	state.userFlowHistory = data
  },
  // 退票异常
  [types.REFUND_ABNORMAL_OPTION] (state, data) {
  	state.refundAbnormalOption = data
  },
  [types.REFUND_ABNORMAL] (state, {data}) {
  	state.refundAbnormal = data
  },
  // 客源地
  [types.ATTR_PLACE_OPTION] (state, data) {
  	state.attrPlaceOption = data
  },
  [types.ATTR_PLACE] (state, {data}) {
  	state.attrPlace = data
  },
  // 票种
  [types.TICKETS_KIND_OPTION] (state, data) {
  	state.ticketsKindOption = data
  },
  [types.TICKETS_KIND] (state, {data}) {
  	state.ticketsKind = data
  },
  // 购票入区时间
  [types.SALE_USE_PERIOD_OPTION] (state, data) {
  	state.saleUsePeriodOption = data
  },
  [types.SALE_USE_PERIOD] (state, {data}) {
  	state.saleUsePeriod = data
  },
  // 二次入区
  [types.REPEAT_OPTION] (state, data) {
  	state.repeatOption = data
  },
  [types.REPEAT] (state, {data}) {
  	state.repeat = data
  },
  // 预约与实际入园
  [types.APPOINTMENT_OPTION] (state, data) {
  	state.appointmentOption = data
  },
  [types.APPOINTMENT] (state, {data}) {
  	state.appointment = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
