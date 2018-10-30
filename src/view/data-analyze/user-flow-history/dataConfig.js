
import _ from 'underscore'

const INIT_OPTION = {
  title: {
    text: '',
    subtext: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: []
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: []
}

const process = function () {
  let arg = arguments[0]
  let dctSites = arguments[1]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  try {
    for (let item of arg['data']) {
      let currentSite = _.find(dctSites, cur => { return cur['code'] === item['site'] })
      let tmp = {}
      tmp['name'] = currentSite['name']
      tmp['type'] = 'line'
      tmp['stack'] = '总量'
      tmp['data'] = item['data']
      options['legend']['data'].push(currentSite['name'])
      options['series'].push(tmp)
    }
    options['xAxis']['data'] = arg['months']
    options['title']['text'] = '客流历史对比'
    options['title']['subtext'] = arg['months'][0] + '月至' + arg['months'][arg['months'].length - 1] + '月'
    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

const deal = function () {
  let arg = arguments[0]
  let dctSites = arguments[1]
  // 表头数据
  let configColumns = [{title: '日期/景区', key: 'months'}]
  // 表格data
  let tableData = []

  for (let i = 0; i < arg['months'].length; i++) {
    let item = {}
    item.months = arg['months'][i]
    for (let j = 0; j < arg['data'].length; j++) {
      let key = arg['data'][j].site
      item[key] = arg['data'][j].data[i]
    }
    tableData.push(item)
  }
  for (let i = 0; i < arg['data'].length; i++) {
    let tmp = {}
    tmp.title = arg['data'][i]['site']
    tmp.key = arg['data'][i]['site']
    configColumns.push(tmp)
  }

  return {configColumns: configColumns, tableData: tableData}
}

export { process, INIT_OPTION, deal}
