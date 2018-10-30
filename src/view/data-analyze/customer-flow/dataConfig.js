import _ from 'underscore'

// 初始化option
const INIT_OPTION = {
  title: { text: '', subtext: '' },
  legend: { data: [] },
  tooltip: { trigger: 'axis' },
  toolbox: { feature: { saveAsImage: {} } },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: { type: 'category', boundaryGap: false, data: [] },
  yAxis: { type: 'value' },
  series: []
}

const process = function () {
  let arg = arguments[0]
  let dctSites = arguments[1]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  options.xAxis.data = arg['days'] || []
  try {
    // 数据转换，组装echart需要的字段数据
    for (let item of arg['data']) {
      let tmp = {}
      let currentSite = _.find(dctSites, cur => { return cur['code'] === item['site'] })
      options['legend']['data'].push(currentSite['name'])

      tmp['name'] = currentSite['name']
      tmp['type'] = 'line'
      // 是否在图表上显示数值
      tmp['label'] = { normal: { show: true } }
      tmp['data'] = item['data']
      options['series'].push(tmp)
    }
    options['title']['text'] = '时间段客流'
    options['title']['subtext'] = arg['days'][0] + '至' + arg['days'][arg['days'].length - 1]
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
  let configColumns = [{title: '日期/景区', key: 'date'}]
  // 表格data
  let tableData = []

  for (let i = 0; i < arg['days'].length; i++) {
    let item = {}
    item.date = arg['days'][i]
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

export { process, INIT_OPTION, deal }
