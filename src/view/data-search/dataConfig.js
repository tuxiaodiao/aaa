/**
 * 此文件用户配置常量，数据配置的部分都写在此文件中
 */

// 票基本信息显示列
const ticketInfoBaseColumns = [
  { key: 'ticket_code', title: '票号', width: 290 },
  { key: 'site', title: '景区', width: 110 },
  { key: 'ticket_kind_name', title: '票种', width: 200 },
  // { key: 'ticket_type_name', title: '票类型', width: 100 },
  { key: 'status', title: '状态', width: 100 },
  { key: 'sell_price', title: '售价（元）', width: 130},
  { key: 'start_time', title: '入园时间', width: 150 },
  { key: 'customer_name', title: '客户', width: 160 },
  { key: 'handle', title: '操作', handle: ['detail'], width: 100, className: 'table-info-column-handle' }

]

// 票详情信息显示列
const ticketInfoDetailColumns = [
  { key: 'ticket_code', title: '票号', width: 120 },
  { key: 'ticket_kind_name', title: '票种', width: 100 },
  { key: 'ticket_type_name', title: '票类型', width: 100 },
  { key: 'sell_price', title: '售价（元）', width: 100},
  { key: 'status_desc', title: '状态', width: 100 },
  { key: 'expired_time', title: '失效时间', width: 100 },
  { key: 'customer_name', title: '客户', width: 100 }
]

// 订单信息
const orderInfoColumns = [
  { key: 'usercode', title: '数字账号', align: 'center', width: 120},
  { key: 'origin_ip', title: '来源IP', align: 'center', width: 120},
  { key: 'amount', title: '总金额', align: 'center', width: 120},
  { key: 'free_amount', title: '优惠金额', align: 'center', width: 120},
  { key: 'order_time', title: '订单时间', align: 'center', width: 220},
  { key: 'form_type', title: '用户类型', align: 'center', width: 120},
  { key: 'organization', title: '组织', align: 'center', width: 120},
  { key: 'seller', title: '销售员', align: 'center', width: 120},
  { key: 'sell_channel', title: '销售渠道', align: 'center', width: 120},
  { key: 'pay_channel', title: '支付渠道', align: 'center', width: 120},
  { key: 'trace_sn', title: '交易追踪号', align: 'center', width: 220}
]

export { ticketInfoBaseColumns, ticketInfoDetailColumns, orderInfoColumns }
