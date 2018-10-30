import * as api from '@/api/common'
import * as types from '../mutation-types'
import * as utils from './utils'

// initial state
const state = {
  dctSites: [], // 当前用户具备某些景区的权限
  dctTabData: {}, // 原始字典数据：{"province": ["code": "11", "name": "北京市"]}
  dctTabDctDct: {}, // 数据字典的字典：{"pay_channel": {"name": "支付渠道", rel_type: 1}, "province": {"name": 省份", "rel_type: 0}}
  dctTabDctDctList: [], // 数据字典的字典列表：[{name: "pay_channel", memo: "支付渠道", rel_type: 1}]
  dctTabDctList: [], // 字典列表，根据此列表去循环获取响应的字典信息: ["PAY_CHANNEL", "PROVINCE"]
  dctTabDctCommon: {}, // dctTabDctDct中rel_type=0获取， 原始数据通用部分数据转换成字典数据: {"province": {"11": "北京市"}}
  dctTabDctSpec: {}, // dctTabDctDct中rel_type=1获取， 原始数据景点特殊转换成字典数据: {"101": {"pay_channel": {"11": "微信支付"}}}
  loading: false
}

// getters
const getters = {
  dctSites: state => state.dctSites,
  dctTabData: state => state.dctTabData,
  dctTabDctDct: state => state.dctTabDctDct,
  dctTabDctDctList: state => state.dctTabDctDctList,
  dctTabDctList: state => state.dctTabDctList,
  dctTabDctCommon: state => state.dctTabDctCommon,
  dctTabDctSpec: state => state.dctTabDctSpec,
  loading: state => state.loading
}

// actions
const actions = {
  getDct ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.getDct(params).then(data => {
        commit(types.DCT, { data })
        resolve()
        state.loading = false
      }).catch(err => {
        state.loading = false
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  [types.DCT] (state, { data }) {
    // state.dctSites = data['dctSites'];
    state.dctSites = [...[{code: '_ALL_', name: '全部景区'}], ...(data['dctSites'] || [])]
    state.dctTabData = {
      dctTabDataCommon: data['dctTabDataCommon'],
      dctTabDataSpec: data['dctTabDataSpec']
    }
    state.dctTabDctDct = utils.dctTabDctListSetDct(data['dctTab'])
    state.dctTabDctDctList = data['dctTab']
    state.dctTabDctList = data['dctTabList']
    state.dctTabDctCommon = utils.dctDataListCommonSetDct(data['dctTabDataCommon'])
    state.dctTabDctSpec = utils.dctDataListSpecSetDct(data['dctTabDataSpec'])
  },

  [types.TRUNCATE_DCT_COMMON_INFO] (state) {
    state.dctTabData = {}
  },

  loading (state, val) {
    state.loading = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
