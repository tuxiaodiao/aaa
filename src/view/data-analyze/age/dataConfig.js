import _ from 'underscore'

var scale = 1
var rich = {
  //   red: {
  //       color: "#93334e",
  //       fontSize: 22 * scale,
  //       padding: [5, 0],
  //       align: 'center',
  //       lineHeight:24
  //   },
  yellow: {
    color: '#ffc72b',
    fontSize: 18 * scale,
    padding: [5, 4],
    align: 'center',
    lineHeight: 22
  },

  total: {
    color: '#ffc72b',
    fontSize: 32 * scale,
    align: 'center'
  },
  black: {
    color: '#031f2d',
    align: 'center',
    fontSize: 12 * scale,
    padding: [3, 0, 10, 0],
    lineHeight: 20
  },
  blue: {
    color: '#2d7cce',
    fontSize: 14 * scale,
    align: 'center'
  },
  hr: {
    borderColor: '#0b5263',
    width: '100%',
    borderWidth: 1,
    height: 0
  }
}

const INIT_OPTION = {
  // backgroundColor: '#031f2d',
  title: {
    text: '',
    subtext: '',
    left: 'center',
    top: '50%',
    padding: [24, 0],
    textStyle: {
      color: '#333',
      fontSize: 18 * scale,
      align: 'center',
      fontWeight: 'bolder'
    },
    subtextStyle: {
      color: '#333'
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
  series: [{
    // name: '游客人数',
    type: 'pie',
    radius: ['42%', '52%'],
    hoverAnimation: false,
    color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
    label: {
      normal: {
        rich: rich
      }
    },
    labelLine: {
      normal: {
        length: 32 * scale,
        length2: 0,
        lineStyle: {
          color: '#0b5263'
        }
      }
    },
    data: []
  }]
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

const deal = function () {
  let arg = arguments[0]
  let dctSites = arguments[1]
  // 表头数据
  let configColumns = []
  // 表格data
  let tableData = []

  return {configColumns: configColumns, tableData: tableData}
}

export { process, INIT_OPTION, deal }
