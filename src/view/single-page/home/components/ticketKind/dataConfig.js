
var scale = 1
var rich = {
  yellow: {
    color: '#ffc72b',
    fontSize: 10 * scale,
    padding: [1, 4],
    align: 'center'
  },
  total: {
    color: '#ffc72b',
    fontSize: 14 * scale,
    align: 'center'
  },
  white: {
    color: '#fff',
    align: 'center',
    fontSize: 10 * scale,
    padding: 0
  },
  blue: {
    color: '#49dff0',
    fontSize: 10 * scale,
    align: 'center'
  }
}
const INIT_OPTION = {
  backgroundColor: '#18202d',
  title: {
    text: '票种分析',
    left: 'left',
    padding: [4, 0],
    textStyle: {
      color: '#fff',
      fontSize: 14

    }
  },
  legend: {
    selectedMode: false,
    data: [],
    // itemGap: 50,
    left: 'center',
    top: 'center',
    icon: 'none',
    align: 'center',
    textStyle: {
      color: '#333',
      fontSize: 18 * scale,
      rich: rich
    }
  },
  tooltip: {
    show: true,
    formatter: '{b} <br/> {c} ({d}%)'
  },
  series: [{
    name: '票种分析',
    type: 'pie',
    radius: ['28%', '88%'],
    hoverAnimation: false,
    color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4', '#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'],
    label: {
      normal: {
        position: 'inner',
        rich: rich
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    },
    data: []
  }]

}

const process = function () {
  let arg = arguments[0]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  try {
    var echartData = arg
    for (let i = 0; i < arg.length; i++) {

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
      var total = 0 // 考生总数量
      var percent = 0 // 考生占比
      echartData.forEach(function (value, index, array) {
        total += value.value
      })
      percent = ((params.value / total) * 100).toFixed(1)
      return '{white|' + params.value + '}\n{white|' + percent + '%}'
    }

    options['legend']['formatter'] = legendFormatter
    options['legend']['data'] = [echartData[0].name]
    options['series'][0]['data'] = echartData
    options['series'][0]['label']['normal']['formatter'] = seriesFormatter

    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION}
