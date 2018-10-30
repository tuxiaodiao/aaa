
import _ from 'underscore'

var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']

const INIT_OPTION = {
  title: {
    text: '当天、提前1,2,3,4天',
    x: 'left'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true

  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff',
        fontSize: '12'
      }
    }
  },
  yAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff',
        fontSize: '12'
      }
    }
  },
  series: [
    {
      name: '2011年',
      type: 'bar',
      data: [2, 8, 32, 12],
      itemStyle: {
        normal: {
          // color: function(params) {
          //     var num = myColor.length;
          //     return myColor[params.dataIndex % num]
          // },
        }
      }
    }
  ]
}

const process = function () {
  let arg = arguments[0]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  try {
    let yAxisData = []
    let seriesData = []
    for (let i = 0; i < arg['data'].length; i++) {
      let name = ''
      switch (arg['data'][i]['name']) {
        case 'current':
          name = '当天'
          break
        case 'one':
          name = '提前一天'
          break
        case 'two':
          name = '提前两天'
          break
        case 'three':
          name = '提前三天'
          break
        case 'four':
          name = '提前四天'
          break
      }
      yAxisData.push(name)
      seriesData.push(arg['data'][i]['value'])
    }

    function seriesColor (params) {
      var num = myColor.length
      return myColor[params.dataIndex % num]
    }
    options['yAxis']['data'] = yAxisData
    options['series'][0]['data'] = seriesData
    options['series'][0]['itemStyle']['normal']['color'] = seriesColor
    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION}
