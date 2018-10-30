
import _ from 'underscore'

const INIT_OPTION = {
  title: {
    text: '',
    x: 'center'

  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: [],
    align: 'right',
    right: 10
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: ['5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点']
  }],
  yAxis: [{
    type: 'value',
    name: '(张)',
    axisLabel: {
      formatter: '{value}'
    }
  }],
  series: []
}

const process = function () {
  let arg = arguments[0]
  let dctSites = arguments[1]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  let currentSite = _.find(dctSites, cur => { return cur['code'] === arg['sites'][0] })
  try {
    // 数据转换，组装echart需要的字段数据
    var legendData = []
    for (let item of arg['data']) {
      let insideSite = _.find(dctSites, cur => { return cur['code'] === item['site'] })
      legendData.push(insideSite['name'])
      var xAxisData = options['xAxis'][0]['data']
      var arr = []
      for (let i = 0; i < xAxisData.length; i++) {
        let str = ''
        str = xAxisData[i].substring(0, xAxisData[i].length - 1)
        arr.push(str)
      }
      let xAxisobj = {}
      var seriesData = []
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < item['data'].length; j++) {
          if (item['data'][j]['period'] == arr[i]) {
            xAxisobj[arr[i]] = item['data'][j]['value']
            break
          } else {
            xAxisobj[arr[i]] = 0
          }
        }
      }
      // series中需要的data
      for (let el in xAxisobj) {
        seriesData.push(xAxisobj[el])
      }
      let tmp = {}
      tmp['name'] = insideSite['name']
      tmp['data'] = seriesData
      tmp['type'] = 'bar'
      options['series'].push(tmp)
    }

    options['legend']['data'] = legendData
    options['title']['text'] = '现场售票时段分析'
    options['title']['subtext'] = currentSite.name + ' ' + arg['stat_date']
    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION}
