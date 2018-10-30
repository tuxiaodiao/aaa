import * as api from '@/api/stat'
import * as types from '../mutation-types'
import path from 'path'
import _ from 'underscore'

// initial state
const state = {
  // 当前景点
  currentSite: '',
  synDayData: {
    rows: [],
    count: 0
  },
  periodOpen: false,
  periodColumnsList: [],
  periodTableData: [],
  // 表头字段固定前部分
  synHeaderHead: [{ title: '日期', key: 'stat_date', width: 120 }, { title: '景区', key: 'site', width: 200 }, { title: '类别', key: 'stat_type', width: 100 }, { title: '组合票', key: 'is_virtual', width: 80 }],
  // 表头字典动态生成部分
  synHeaderDynamic: [],
  // 表头字段尾部部分
  synHeaderFoot: [{ title: '数量', key: 'total', sortable: true, sortType: 'desc', width: 140 }, { title: '实收金额(元)', key: 'amount', width: 140 }, { title: '优惠金额(元)', key: 'free_amount', width: 140 }, { title: '查看', key: 'handle', handle: ['detail'], width: 180 }]
}

// getters
const getters = {
  currentSite: state => state.currentSite,
  synDayData: state => state.synDayData,
  periodOpen: state => state.periodOpen,
  periodColumnsList: state => state.periodColumnsList,
  periodTableData: state => state.periodTableData,
  synHeaderHead: state => state.synHeaderHead,
  synHeaderDynamic: state => state.synHeaderDynamic,
  synHeaderFoot: state => state.synHeaderFoot
}

// actions
const actions = {
  getSynDay ({ commit }, params) {
    let searchItem = params['searchItem'] || []
    let args = {
      site: params.site,
      statDate: params.statDate,
      statType: params.statType,
      searchItem: []
    }
    api.getSynDay(params).then(data => {
      commit(types.GET_CURRENT_SITE, params.site)
      commit(types.SYN_DAY, data)
    })
  }
}

// mutations
const mutations = {
  [types.GET_CURRENT_SITE] (state, data) {
    state.currentSite = data
  },
  [types.SYN_DAY] (state, data) {
    state.synDayData = _.has(data, 'rows') ? data : { rows: [], count: 0 }
  },
  // 表头字段操作
  [types.SET_SYN_HEADER_DYNAMIC] (state, data) {
    state.synHeaderDynamic = data
  },
  // 清除数据
  [types.TRUNCATE_SYN_DAY_DATA] (state) {
    state.synDayData = {
      rows: [],
      count: 0
    }
  },
  [types.SYN_OPEN_PERIOD] (state, val) {
    state.periodOpen = val
  },
  [types.SET_PERIOD_COLUMNS_LIST] (state, val) {
    state.periodColumnsList = val
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
