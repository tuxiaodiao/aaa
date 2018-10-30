
import _ from 'underscore'
const INIT_OPTION = {
  backgroundColor: '#18202d',
  title: {
    text: '北坡',
    x: 'left',
    textStyle: {
      color: '#fff',
      fontSize: 14
    }
  },
  tooltip: {
    formatter: '{a} <br/>{c} {b}'
  },
  series: [
    {
      name: '验票',
      type: 'gauge',
      min: 0,
      max: 250,
      splitNumber: 10,
      radius: '55%',
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          color: [[0.20, 'lime'], [0.80, '#1e90ff'], [1, '#ff4500']],
          width: 2,
          shadowColor: '#fff', // 默认透明
          shadowBlur: 0
        }
      },
      axisLabel: { // 坐标轴小标记
        textStyle: { // 属性lineStyle控制线条样式
          fontWeight: 'bolder',
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 0
        }
      },
      axisTick: { // 坐标轴小标记
        length: 15, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          color: 'auto',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 0
        }
      },
      splitLine: { // 分隔线
        length: 25, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          width: 2,
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 0
        }
      },
      pointer: { // 分隔线
        shadowColor: '#fff', // 默认透明
        shadowBlur: 5
      },
      title: {
        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          fontSize: 20,
          fontStyle: 'italic',
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 0
        }
      },
      detail: {
        backgroundColor: 'rgba(155,144,255,1)',
        borderWidth: 1,
        borderColor: '#fff',
        shadowColor: '#fff', // 默认透明
        shadowBlur: 0,
        offsetCenter: [0, '70%'], // x, y，单位px
        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bold',
          fontSize: '20',
          color: '#f00'
        }
      },
      itemStyle: {
        normal: {
          color: '#ff0'
        }
      },
      data: []
    },
    {
      name: '售票',
      type: 'gauge',
      min: 0,
      max: 250,
      splitNumber: 10,
      radius: '95%',
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
          width: 3,
          shadowColor: '#fff', // 默认透明
          shadowBlur: 0
        }
      },
      axisLabel: { // 坐标轴小标记
        textStyle: { // 属性lineStyle控制线条样式
          fontWeight: 'bolder',
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 0
        }
      },
      axisTick: { // 坐标轴小标记
        length: 15, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          color: 'auto',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 0
        }
      },
      splitLine: { // 分隔线
        length: 25, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          width: 3,
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 0
        }
      },
      pointer: { // 分隔线
        shadowColor: '#fff', // 默认透明
        shadowBlur: 5
      },
      title: {
        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          fontSize: 20,
          fontStyle: 'italic',
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 0
        }
      },
      detail: {
        backgroundColor: 'rgba(30,144,255,1)',
        borderWidth: 1,
        borderColor: '#fff',
        shadowColor: '#000', // 默认透明
        shadowBlur: 2,
        offsetCenter: [0, '70%'], // x, y，单位px
        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bold',
          fontSize: '20',
          color: '#ff0'
        }
      },
      itemStyle: {
        normal: {
          color: '#f00'
        }
      },
      data: []
    }

  ]
}

const process = function () {
  let arg = arguments[0]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  try {
    let n_data = _.filter(arg, cur => { return cur['name'] === 'N001' })
    let check = 0
    let sell = 0
    if (!_.isEmpty(n_data)) {
      check = n_data[0]['check']
      sell = n_data[0]['sell']
    }
    function c_detailFormatter (value) {
      // return value.toFixed(0);
      return check
    }
    function s_detailFormatter (value) {
      return sell
    }

    options['series'][0]['data'][0] = check / 100
    options['series'][1]['data'][0] = sell / 100
    options['series'][0]['detail']['formatter'] = c_detailFormatter
    options['series'][1]['detail']['formatter'] = s_detailFormatter
    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION}
