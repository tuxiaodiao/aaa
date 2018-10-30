import * as api from '@/api/stat'
import * as types from '../mutation-types'
import path from 'path'
import _ from 'underscore'

// 表头字段固定前部分
const head = [{ title: '日期', key: 'stat_date', width: 100 }, { title: '景区', key: 'site', width: 120 }, { title: '类别', key: 'stat_type', width: 100 }, { title: '组合票', key: 'is_virtual', width: 80 }]
// 表头字段尾部部分
const foot = [{ title: '数量', key: 'total' }]
// initial state
const state = {
  // 当前景点
  presentSite: '',
  statDayData: {
    rows: [],
    count: 0
  },
  statHeaderHead: [],
  // 表头字典动态生成部分
  statHeaderDynamic: [],
  statHeaderFoot: [],
  // loading: false,
  exportLoading: false
}

// getters
const getters = {
  presentSite: state => state.presentSite,
  statDayData: state => state.statDayData,
  statHeaderHead: state => state.statHeaderHead,
  statHeaderDynamic: state => state.statHeaderDynamic,
  statHeaderFoot: state => state.statHeaderFoot
}

// actions
const actions = {
  getSaleDay ({ commit }, params) {
    // console.log(params);
    api.getSaleDay(params).then(data => {
      commit(types.GET_CURRENT_SITE, params.site)
      commit(types.STAT_DAY, data)
    }, error => {
      console.log(error)
    })
  },
  getCheckDay ({ commit }, params) {
    // console.log(params);
    api.getCheckDay(params).then(data => {
      commit(types.GET_CURRENT_SITE, params.site)
      commit(types.STAT_DAY, data)
    }, error => {
      console.log(error)
    })
  },
  getRefundDay ({ commit }, params) {
    // console.log(params);
    api.getRefundDay(params).then(data => {
      commit(types.GET_CURRENT_SITE, params.site)
      commit(types.STAT_DAY, data)
    }, error => {
      console.log(error)
    })
  }
}

// mutations
const mutations = {
  [types.GET_CURRENT_SITE] (state, data) {
    state.presentSite = data
  },
  [types.STAT_DAY] (state, data) {
    // console.log(data);
    state.statDayData = _.has(data, 'rows') ? data : {rows: [], count: 0}
    // console.log(state.statDayData);
  },

  [types.INIT_STAT_HEADER_COLUMN] (state, data) {
    state.statHeaderHead = data.hasOwnProperty('statHeaderHead') ? head.concat(data['statHeaderHead']) : head
    state.statHeaderFoot = data.hasOwnProperty('statHeaderFoot') ? foot.concat(data['statHeaderFoot']) : foot
  },
  // 表头字段操作
  [types.SET_STAT_HEADER_DYNAMIC] (state, data) {
    state.statHeaderDynamic = data
  },
  // 清除数据
  [types.TRUNCATE_STAT_DAY_DATA] (state) {
    state.statDayData.rows = []
    state.statDayData.count = 0
  },
  // 根据key设置值
  [types.STAT_DAY_SET_PROPERTY_BY_KEY] (state, req) {
    if (state.hasOwnProperty(req['key'])) {
      state[req['key']] = req['value']
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
