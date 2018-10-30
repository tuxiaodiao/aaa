/**
 * 此文件用户配置常量，数据配置的部分都写在此文件中
 */
import _ from 'underscore'

// 分时统计类型
const synStatType = [
  { code: 'SELL', name: '销售' },
  { code: 'CHECK', name: '验票' }
]
// 分时统计类型
const statType = [
  { code: 'SELL', name: '销售' },
  { code: 'CHECK', name: '验票' },
  { code: 'REFUND', name: '退票' }
]

// 动态字典表单下拉框样式
const selectFormStyleDct = {
  SELL_CHANNEL: 'select-sell-channel-style',
  PAY_CHANNEL: 'select-pay-channel-style',
  FORM_TYPE: 'select-form-type-style',
  TICKET_KIND: 'select-ticket-kind-style',
  TICKET_TYPE: 'select-ticket-type-style',
  SELLER: 'select-seller-style',
  ORGANIZATION: 'select-organization-style',
  ID_TYPE: 'select-id-type-style',
  GENDER: 'select-gender-style',
  CUSTOMER_TYPE: 'select-customer-type-style',
  CHECK_TYPE: 'select-check-type-style',
  CHECK_MEDIUM: 'select-check-medium-style',
  DEVICE: 'select-check-device-style'
}

// 设置销售动态字段 key里面值需要大写
const saleDctTabDynomic = [
  { key: 'SELL_CHANNEL', align: 'left', width: 120, className: selectFormStyleDct['SELL_CHANNEL'] },
  { key: 'PAY_CHANNEL', align: 'left', width: 100, className: selectFormStyleDct['PAY_CHANNEL'] },
  { key: 'FORM_TYPE', align: 'left', width: 100, className: selectFormStyleDct['FORM_TYPE'] },
  { key: 'TICKET_KIND', align: 'left', width: 100, className: selectFormStyleDct['TICKET_KIND'] },
  { key: 'TICKET_TYPE', align: 'left', width: 100, className: selectFormStyleDct['TICKET_TYPE'] },
  { key: 'SELLER', align: 'left', width: 100, className: selectFormStyleDct['SELLER'] },
  { key: 'ORGANIZATION', align: 'left', width: 160, className: selectFormStyleDct['ORGANIZATION'] },
  { key: 'ID_TYPE', align: 'left', width: 80, className: selectFormStyleDct['ID_TYPE'] },
  { key: 'GENDER', align: 'left', width: 60, className: selectFormStyleDct['GENDER'] },
  { key: 'CUSTOMER_TYPE', align: 'left', width: 100, className: selectFormStyleDct['CUSTOMER_TYPE'] }
]

// 设置验票动态字段 key里面值需要大写
const checkDctTabDynomic = [
  { key: 'TICKET_TYPE', align: 'left', width: 100, className: selectFormStyleDct['TICKET_TYPE'] },
  { key: 'TICKET_KIND', align: 'left', width: 100, className: selectFormStyleDct['TICKET_KIND'] },
  { key: 'CHECK_TYPE', align: 'left', width: 100, className: selectFormStyleDct['CHECK_TYPE'] },
  { key: 'DEVICE_TYPE', align: 'left', width: 100, className: selectFormStyleDct['DEVICE_TYPE'] },
  { key: 'CHECK_MEDIUM', align: 'left', width: 120, className: selectFormStyleDct['CHECK_MEDIUM'] },
  { key: 'DEVICE', align: 'left', width: 180, className: selectFormStyleDct['DEVICE'] }
]

// 设置退票动态字段 key里面值需要大写
const refundDctTabDynomic = [
  { key: 'TICKET_TYPE', align: 'left', width: 100, className: selectFormStyleDct['TICKET_TYPE'] },
  { key: 'TICKET_KIND', align: 'left', width: 100, className: selectFormStyleDct['TICKET_KIND'] }
]

// 设置分时统计验票动态字段 key里面值需要大写
const syncStatSaleDctTabDynomic = [
  { key: 'SELL_CHANNEL', align: 'left', width: 120, className: selectFormStyleDct['SELL_CHANNEL'] },
  { key: 'PAY_CHANNEL', align: 'left', width: 120, className: selectFormStyleDct['PAY_CHANNEL'] },
  { key: 'TICKET_TYPE', align: 'left', width: 100, className: selectFormStyleDct['TICKET_TYPE'] },
  { key: 'TICKET_KIND', align: 'left', width: 160, className: selectFormStyleDct['TICKET_KIND'] }
]
// 设置分时统计销售动态字段 key里面值需要大写
const syncStatCheckDctTabDynomic = [
  { key: 'DEVICE', align: 'left', width: 180, className: selectFormStyleDct['DEVICE'] },
  { key: 'DEVICE_TYPE', align: 'left', width: 100, className: selectFormStyleDct['DEVICE_TYPE'] },
  { key: 'TICKET_TYPE', align: 'left', width: 100, className: selectFormStyleDct['TICKET_TYPE'] },
  { key: 'TICKET_KIND', align: 'left', width: 160, className: selectFormStyleDct['TICKET_KIND'] }
]

// 时段设置
const periodSet = [
  { key: 'HALF', value: 0.5, label: '半小时' },
  { key: 'ONE', value: 1, label: '一小时' },
  { key: 'TWO', value: 2, label: '两小时' }
]

// 获取时间段
const getPeriod = function () {
  let periodIns = arguments[0]
  let periodStep = arguments[1]
  let start = parseInt(periodIns[0].replace(':', '.'))
  let end = Math.ceil(periodIns[1].replace(':', '.'))
  let step = _.find(periodSet, item => { return item.key === periodStep })['value']
  let len = (end - start) / step
  let retPeriod = []
  for (let i = 0; i < len; i++) {
    let itemTmp = start + (i * step)
    let item = itemTmp.toFixed(2).split('.')
    let hour = ('00' + Math.floor(parseInt(item[0]))).slice(-2)
    let mimute = item[1] !== '00' ? '30' : '00'
    retPeriod.push(hour + ':' + mimute)
  }
  return retPeriod
}

// 时段列表字段
const periodColumn = function () {
  let periodIns = arguments[0] && arguments[0].length > 0 ? arguments[0] : ['04:00', '17:00']
  let periodStep = arguments[1] || 'ONE'
  let periodList = getPeriod(periodIns, periodStep)
  let res = []
  for (let key of periodList) {
    let dct = {
      key: '_' + key,
      title: key,
      align: 'center',
      width: '80px'
    }
    res.push(dct)
  }
  return res
}

export { saleDctTabDynomic, checkDctTabDynomic, refundDctTabDynomic, synStatType, statType, syncStatSaleDctTabDynomic, syncStatCheckDctTabDynomic, periodSet, periodColumn }
