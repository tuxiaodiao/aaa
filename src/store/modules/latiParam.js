import * as api from '@/api/common'
import * as types from '../mutation-types'
import path from 'path'
import _ from 'underscore'

const state = {
  rel_type: [
    { 'code': 0, 'name': '公共' },
    { 'code': 1, 'name': '景区' }
  ],
  set_auto: [
    { 'code': 0, 'name': '手动维护' },
    { 'code': 1, 'name': '自动维护' }
  ],
  dctConfig: {
    rows: [],
    count: 0
  },
  modalAddLati: false
}
// getters
const getters = {
  dctConfig: state => state.dctConfig,
  modalAddLati: state => state.modalAddLati
}
// actions
const actions = {
  getDctConfig ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.getDctConfig(params).then(data => {
        commit(types.DCT_CONFIG, data || '')
        resolve(data)
        state.loading = false
      }).catch(err => {
        reject(err)
      })
    })
  },

  addDctConfig ({ commit }, params) {
    let args = {
      name: params.name,
      memo: params.memo,
      rel_type: params.rel_type,
      set_auto: params.set_auto
    }
    api.addDctConfig(args).then(data => {
      commit(types.ADD_DCT_CONFIG, data)
    })
  },

  setDctConfig ({ commit }, params) {
    let args = {
      name: params.name,
      op_type: params.op_type
    }
    api.setDctConfig(args).then(data => {
      commit(types.SET_DCT_CONFIG, data)
    })
  }
}

// mutations
const mutations = {
  [types.DCT_CONFIG] (state, data) {
    state.dctConfig = _.has(data, 'rows') ? data : { rows: [], count: 0 }
  },
  [types.MODAL_ADD_LATI] (state, val) {
    state.modalAddLati = val
  },

  [types.ADD_DCT_CONFIG] (state, val) {

  },
  [types.SET_DCT_CONFIG] (state, val) {

  },

  [types.TRUNCATE_CONFIG_DATA] (state) {
    state.dctConfig = {
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
