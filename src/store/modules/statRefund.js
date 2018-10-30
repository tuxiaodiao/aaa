import * as api from '@/api/stat'
import * as types from '../mutation-types'
import path from 'path'
import _ from 'underscore'

// initial state
const state = {
  // 当前景点
  refund_currentSite: '',
  refundDayData: {
    rows: [],
    count: 0
  },
  // 表头字段固定前部分
  refundHeaderHead: [{ title: '日期', key: 'stat_date', width: 100 }, { title: '景区', key: 'site', width: 120 }, { title: '组合票', key: 'is_virtual', width: 80 }],
  // 表头字典动态生成部分
  refundHeaderDynamic: [],
  // 表头字段尾部部分
  refundHeaderFoot: [{ title: '数量', key: 'total' }, { title: '实收金额(元)', key: 'amount' }, { title: '优惠金额(元)', key: 'free_amount' }]
}

// getters
const getters = {
  refund_currentSite: state => state.refund_currentSite,
  refundDayData: state => state.refundDayData,
  refundHeaderHead: state => state.refundHeaderHead,
  refundHeaderDynamic: state => state.refundHeaderDynamic,
  refundHeaderFoot: state => state.refundHeaderFoot
}

// actions
const actions = {
  getRefundDay ({ commit }, params) {
    let searchItem = params['searchItem'] || []
    console.log(searchItem)
    console.log('typeof searchItem: ' + typeof searchItem)
    let args = {
      site: params.site,
      isVirtual: params.isVirtual || 0,
      start: params.start,
      end: params.end,
      searchItem: []
    }
    api.getRefundDay(params).then(data => {
      console.log('api params: ' + JSON.stringify(params))
      commit(types.GET_CURRENT_SITE, params.site)
      commit(types.REFUND_DAY, data)
    })
  }
}

// mutations
const mutations = {
  [types.GET_CURRENT_SITE] (state, data) {
    state.refund_currentSite = data
  },
  [types.REFUND_DAY] (state, data) {
    state.refundDayData = _.has(data, 'rows') ? data : {rows: [], count: 0}
  },
  // 表头字段操作
  [types.SET_REFUND_HEADER_DYNAMIC] (state, data) {
    state.refundHeaderDynamic = data
  },
  // 清除数据
  [types.TRUNCATE_REFUND_DAY_DATA] (state) {
    state.refundDayData = {
      rows: [],
      count: 0
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
