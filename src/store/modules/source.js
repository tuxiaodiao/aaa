import * as api from '@/api/source'
import * as types from '../mutation-types'
import path from 'path'
import _ from 'underscore'

// initial state
const state = {
  queues: [
    { 'queue': 'sell', 'name': '售票' },
    { 'queue': 'check', 'name': '验票' },
    { 'queue': 'refund', 'name': '退票' }
  ],
  processed: [
    { 'code': '_ALL_', 'name': '全部' },
    { 'code': 0, 'name': '未处理' },
    { 'code': 1, 'name': '已处理' },
    { 'code': 2, 'name': '修改后未处理' }
  ],
  sourceData: {
    rows: [],
    count: 0
  },
  modal1: false,
  currentBody: {}
}

// getters
const getters = {
  queues: state => state.queues,
  processed: state => state.processed,
  sourceData: state => state.sourceData,
  modal1: state => state.modal1,
  currentBody: state => state.currentBody
}

// actions
const actions = {
  getSource ({ commit }, params) {
    let args = {
      queue: params.queue,
      msg_id: params.msg_id,
      processed: params.processed,
      start: params.start,
      end: params.end
    }
    api.getSource(params).then(data => {
      // console.log('api params: ' + JSON.stringif(params));
      commit(types.SOURCE, data)
    })
  }

}

// mutations
const mutations = {
  [types.SOURCE] (state, data) {
    state.sourceData = _.has(data, 'rows') ? data : { rows: [], count: 0 }
  },
  [types.MODAL_BODY_INFO] (state, val) {
    state.modal1 = val
  },
  [types.CURRENT_BODY] (state, data) {
    state.currentBody = data
  },

  // 清除数据
  [types.TRUNCATE_SOURCE_DATA] (state) {
    state.sourceData = {
      rows: [],
      count: 0
    }
  },
  [types.TRUNCATE_BODY_INFO] (state) {
    state.currentBody = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
