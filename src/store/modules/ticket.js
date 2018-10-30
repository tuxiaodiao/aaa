import * as api from '@/api/ticket'
import * as types from '../mutation-types'
import path from 'path'
import _ from 'underscore'

// initial state
const state = {
  // 当前搜索的site
  searchSite: '',
  // 当前搜索的type
  searchType: '',
  search: '',
  // 主页面显示使用
  listByOrder: [{ order: {}, tickets: [] }],
  // 订单数量
  orderCount: 0,
  // 备用
  orderList: [],
  // 备用
  ticketList: [],
  // 显示订单信息
  showOrderInfo: { order: {}, open: false },
  showTicketInfo: { ticket: {}, open: false }
  // loading: false

}

// getters
const getters = {
  searchSite: state => state.searchSite,
  searchType: state => state.searchType,
  search: state => state.search,
  listByOrder: state => state.listByOrder,
  orderList: state => state.orderList,
  ticketList: state => state.ticketList,
  showOrderInfo: state => state.showOrderInfo,
  showTicketInfo: state => state.showTicketInfo
  // loading: state => state.loading
}

// actions
const actions = {
  getTicketInfo ({ commit }, params) {
    api.getInfo(params).then(data => {
      if (!_.isEmpty(data)) {
        state.searchSite = params.site
        state.searchType = params.search_type
        state.search = params.search
      }
      commit(types.TICKET_INFO, { data })
    }, error => {
      console.log(error)
    })
  }
}

// mutations
const mutations = {
  [types.TICKET_INFO] (state, { data }) {
    // console.log("data: " + JSON.stringify(data));
    processRes(data)
    state.loading = false
  },
  [types.SHOW_ORDER_INFO] (state, val) {
    if (val.hasOwnProperty('order') && val['order'].hasOwnProperty('order_code')) {
      state.showOrderInfo.order = val.order
      state.showOrderInfo.open = val.open
    } else {
      state.showOrderInfo.open = val.open
    }
  },
  [types.SHOW_TICKET_INFO] (state, val) {
    if (val.hasOwnProperty('ticket') && val['ticket'].hasOwnProperty('ticket_code')) {
      state.showTicketInfo.ticket = val.ticket
      state.showTicketInfo.open = val.open
    } else {
      state.showTicketInfo
        .open = val.open
    }
  },
  [types.TRUNCATE_TICKET_INFO] (state) {
    state.searchSite = ''
    state.searchType = ''
    state.search = ''
    state.listByOrder = [{ order: {}, tickets: [] }]
    state.orderList = []
    state.ticketList = []
    state.showOrderInfo = { order: {}, open: false }
    state.showTicketInfo = { ticket: {}, open: false }
  },
  // 根据key设置值
  [types.TICKET_SET_PROPERTY_BY_KEY] (state, req) {
    if (state.hasOwnProperty(req['key'])) {
      state[req['key']] = req['value']
    }
  }
}

// 处理结构数据
function processRes () {
  let sourceData = arguments[0]
  state.orderList = sourceData['order']
  state.orderCount = sourceData['orderCount'] || sourceData['order'].length
  let pTicket = sourceData['pTicket']
  let cTicket = sourceData['cTicket']
  let listByOrder = []
  // console.log(state.orderList)
  for (let order of state.orderList) {
    // 记录所有的订单
    let tickets = []
    let orderDct = {
      site: order['site'],
      usercode: order['usercode'],
      origin_ip: order['origin_ip'],
      order_code: order['order_code'],
      order_code_ext: order['order_code_ext'],
      trace_sn: order['trace_sn'],
      amount: order['amount'],
      free_amount: order['free_amount'],
      form_type: order['form_type'],
      organization: order['organization'],
      sell_channel: order['sell_channel'],
      seller: order['seller'],
      pay_channel: order['pay_channel'],
      order_time: order['order_time']
    }
    // 获取当前订单的所有组合票
    let orderPTickets = _.filter(pTicket, item => {
      return order['order_code'] === item['order_code']
    })
    // 获取当前订单的所有子票
    let orderCTicket = _.filter(cTicket, item => {
      return order['order_code'] === item['order_code']
    })

    for (let ticket of orderPTickets) {
      // 对票排序：每个虚拟票后面带子票
      tickets.push(ticket)
      let cTicketList = _.filter(cTicket, item => {
        return ticket['site'] === item['site'] && item['order_code'] === order['order_code'] && ticket['ticket_code'] === item['parent_ticket_code']
      })
      // tickets += cTicketList;
      // tickets = _.union(tickets, cTicketList);
      tickets = tickets.concat(cTicketList)
    }
    for (let ticket of orderCTicket) {
      // 单独购买的票放在最后
      let existsTicket = _.find(tickets, item => {
        return ticket['ticket_code'] === item['ticket_code']
      })
      // tickets += leftTicketList;
      if (!existsTicket) {
        tickets = tickets.concat(ticket)
      }
    }
    // 订单列表
    listByOrder.push({ order: orderDct, tickets: tickets })
    // 记录所有的票
    state.ticketList = state.ticketList.concat(tickets)
  }
  state.listByOrder = listByOrder.length > 0 ? listByOrder : [{ order: {}, tickets: [] }]
}

export default {
  state,
  getters,
  actions,
  mutations
}
