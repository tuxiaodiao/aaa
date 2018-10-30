import _ from 'underscore'

const INIT_OPTION = {
  title: {text: '预约入园与实际入园', x: 'left'},
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['利润', '支出', '收入']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value'
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: {show: false},
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  ],
  series: [
    {
      name: '利润',
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'inside'
        }
      },
      data: [200, 170, 240, 244, 200, 220, 210]
    },
    {
      name: '收入',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true
        }
      },
      data: [320, 302, 341, 374, 390, 450, 420]
    },
    {
      name: '支出',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'left'
        }
      },
      data: [-120, -132, -101, -134, -190, -230, -210]
    }
  ]
}

const process = function () {
  let arg = arguments[0]
  let dctSites = arguments[1]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  let currentSite = _.find(dctSites, cur => { return cur['code'] === arg['sites'][0] })

  try {
    // 数据转换，组装echart需要的字段数据
    var merge = []
    var echartData = []
    arg['data'].forEach(item => {
      item['data'].forEach(element => {
        merge.push(element)
      })
    })
    var result = {}
    for (let i = 0; i < merge.length; i++) {
      // 如果对象存在就累加，否则使用第一个值。
      result[(merge[i].age_period) || '未知'] = !result[merge[i].age_period] ? merge[i].value : result[merge[i].age_period] + merge[i].value
    }
    for (let k in result) {
      let tmp = {}
      tmp['name'] = k
      tmp['value'] = result[k]
      echartData.push(tmp)
    }
    function legendFormatter (name) {
      let total = 0
      let averagePercent
      echartData.forEach(function (value, index, array) {
        total += value.value
      })
      return '{total|' + total + '}'
    }

    function seriesFormatter (params, ticket, callback) {
      let total = 0
      let percent = 0
      echartData.forEach(function (value, index, array) {
        total += value.value
      })
      percent = ((params.value / total) * 100).toFixed(1)
      return '{black|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}'
    }

    options['legend']['formatter'] = legendFormatter
    options['legend']['data'] = [echartData[0].name]
    options['series'][0]['data'] = echartData
    options['series'][0]['label']['normal']['formatter'] = seriesFormatter
    options['title']['text'] = '游客人数'
    options['title']['subtext'] = currentSite.name + ' ' + arg['start'] + '至' + arg['end']
    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION}
