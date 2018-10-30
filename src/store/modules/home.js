import * as api from '@/api/home'
import * as types from '../mutation-types'
import * as utils from './utils'

const state = {
  // 售票/验票总数
  siteStatTotal: {},
  siteStat: [],
  // 售票渠道
  homePayOption: {},
  homePay: [],
  // 票种分析
  ticketKindOption: {},
  ticketKind: [],
  // 游客构成
  visitorOption: {},
  visitor: [],
  // 当天、提前
  aheadOption: {},
  ahead: {},
  // 二次入园
  secondIncomeOption: {},
  secondIncome: {},
  // 客源地理分布
  mainCustomersNum: null,
  mainCustomersNumData: {},
  // 各时段入区人数
  timezoneOption: null,
  timezone: {},
  // 景点热力
  thermaOption: {},
  // 北坡
  northOption: {},
  // 西坡
  westOption: {},
  // 南坡
  southOption: {},
  // 近七天入园人数
  inSevenDaysOption: {},
  inSevenDays: {}
}

const getters = {
  siteStatTotal: state => state.siteStatTotal,
  siteStat: state => state.siteStat,

  homePayOption: state => state.homePayOption,
  homePay: state => state.homePay,

  ticketKindOption: state => state.ticketKindOption,
  ticketKind: state => state.ticketKind,

  visitorOption: state => state.visitorOption,
  visitor: state => state.visitor,

  aheadOption: state => state.aheadOption,
  ahead: state => state.ahead,

  secondIncomeOption: state => state.secondIncomeOption,
  secondIncome: state => state.secondIncome,

  mainCustomersNum: state => state.mainCustomersNum,
  mainCustomersNumData: state => state.mainCustomersNumData,

  timezoneOption: state => state.timezoneOption,
  timezone: state => state.timezone,

  thermaOption: state => state.thermaOption,
  northOption: state => state.northOption,
  westOption: state => state.westOption,
  southOption: state => state.southOption,

  inSevenDaysOption: state => state.inSevenDaysOption,
  inSevenDays: state => state.inSevenDays
}

const actions = {
  // 维度数据
  dimensionality ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.dimensionality(params).then(data => {
        commit(types.DIMENSIONALITY, {data})
        resolve()
      })
    })
  },

  saleUsePeriod ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.saleUsePeriod(params).then(data => {
        commit(types.AHEAD, { data })
        resolve()
      })
    })
  },

  // 二次入园
  repeat ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.repeat(params).then(data => {
        commit(types.SECOND_INCOME, {data})
        resolve()
      })
    })
  },
  // 各时段入区人数
  hourPeriod ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.hourPeriod(params).then(data => {
        commit(types.TIMEZONE, {data})
        resolve()
      })
    })
  },
  // 近七天入园数据
  dayPeriod ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.dayPeriod(params).then(data => {
        commit(types.IN_SEVEN_DAYS, {data})
        resolve()
      })
    })
  },
  // 客源地
  HomeAttrPlace ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.attrPlace(params).then(data => {
        commit(types.MAIN_CUSTOMERS_NUM_DATA, {data})
        resolve()
      })
    })
  }
}

const mutations = {
  // 维度数据
  [types.DIMENSIONALITY] (state, {data}) {
    state.siteStatTotal = data['site_stat']['total']
    state.siteStat = data['site_stat']['sites']
    state.homePay = data['sell_channel']
    state.ticketKind = data['ticket_kind']
    state.visitor = data['id_type']
  },
  // 售票渠道
  [types.HOME_PAY_OPTION] (state, data) {
    state.homePayOption = data
  },
  // 票种分析
  [types.TICKET_KIND_OPTION] (state, data) {
    state.ticketKindOption = data
  },
  // 游客构成
  [types.VISITOR_OPTION] (state, data) {
    state.visitorOption = data
  },
  // 当天、提前
  [types.AHEAD_OPTION] (state, data) {
    state.aheadOption = data
  },
  [types.AHEAD] (state, {data}) {
    state.ahead = data
  },

  // 二次入园
  [types.SECOND_INCOME_OPTION] (state, data) {
    state.secondIncomeOption = data
  },
  [types.SECOND_INCOME] (state, {data}) {
    state.secondIncome = data
  },
  // 客源地理分布
  [types.MAIN_CUSTOMERS_NUM] (state, data) {
    state.mainCustomersNum = data
  },
  [types.MAIN_CUSTOMERS_NUM_DATA] (state, {data}) {
    state.mainCustomersNumData = data
  },

  // 各时段入区人数
  [types.TIMEZONE_OPTION] (state, data) {
    state.timezoneOption = data
  },
  [types.TIMEZONE] (state, {data}) {
    state.timezone = data
  },
  // 景点热力
  [types.THERMA_OPTION] (state, data) {
    state.thermaOption = data
  },
  // 北坡
  [types.NORTH_OPTION] (state, data) {
    state.northOption = data
  },
  // 西坡
  [types.WEST_OPTION] (state, data) {
    state.westOption = data
  },
  // 南坡
  [types.SOUTH_OPTION] (state, data) {
    state.southOption = data
  },
  // 近七天入园人数
  [types.IN_SEVEN_DAYS_OPTION] (state, data) {
    state.inSevenDaysOption = data
  },
  [types.IN_SEVEN_DAYS] (state, {data}) {
    state.inSevenDays = data
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
