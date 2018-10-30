
import _ from 'underscore'
var placeHolderStyle = {
  normal: {
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    color: 'rgba(0,0,0,0)',
    borderWidth: 0
  },
  emphasis: {
    color: 'rgba(0,0,0,0)',
    borderWidth: 0
  }
}

var dataStyle = {
  normal: {
    formatter: '{c}',
    position: 'center',
    show: true,
    textStyle: {
      fontSize: '20',
      fontWeight: 'normal',
      color: '#fff'
    }
  }
}
const INIT_OPTION = {
  backgroundColor: '#18202d',
  title: [
    {
      text: '南坡',
      x: 'left',
      textStyle: {
        color: '#fff',
        fontSize: 14
      }
    }, {
      text: '售票数量',
      left: '27%',
      top: '60%',
      textAlign: 'center',
      textStyle: {
        fontWeight: 'normal',
        fontSize: '12',
        color: '#fff',
        textAlign: 'center'
      }
    }, {
      text: '验票数量',
      left: '75%',
      top: '60%',
      textAlign: 'center',
      textStyle: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: '12',
        textAlign: 'center'
      }
    }],
  series: [{
    type: 'pie',
    hoverAnimation: false, // 鼠标经过的特效
    radius: ['40%', '50%'],
    center: ['27%', '50%'],
    startAngle: 225,
    labelLine: {
      normal: {
        show: false
      }
    },
    label: {
      normal: {
        position: 'center'
      }
    },
    data: [{
      value: 0,
      itemStyle: {
        normal: {
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //     offset: 0,
          //     color: '#99da69'
          // }, {
          //     offset: 1,
          //     color: '#01babc'
          // }]),
          color: '#99da69'
        }
      },
      label: dataStyle
    }, {
      value: 100,
      itemStyle: placeHolderStyle
    }

    ]
  },
  {
    type: 'pie',
    hoverAnimation: false,
    radius: ['40%', '50%'],
    center: ['75%', '50%'],
    startAngle: 225,
    labelLine: {
      normal: {
        show: false
      }
    },
    label: {
      normal: {
        position: 'center'
      }
    },
    data: [{
      value: 0,
      itemStyle: {
        normal: {
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //     offset: 0,
          //     color: '#9f3edd'
          // }, {
          //     offset: 1,
          //     color: '#4897f6'
          // }]),
          color: '#9f3edd'
        }
      },
      label: dataStyle
    }, {
      value: 100,
      itemStyle: placeHolderStyle
    }

    ]
  },

    // 外圈的边框
  {
    // name: '总人数',
    type: 'pie',
    hoverAnimation: false, // 鼠标经过的特效
    radius: ['50%', '52%'],
    center: ['27%', '50%'],
    startAngle: 225,
    labelLine: {
      normal: {
        show: false
      }
    },
    label: {
      normal: {
        position: 'center'
      }
    },
    data: [{
      value: 75,
      itemStyle: {
        normal: {

          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //     offset: 0,
          //     color: '#01babc'
          // }, {
          //     offset: 1,
          //     color: '#99da69'
          // }]),
          color: '#01babc'
        }
      }
    }, {
      value: 25,
      itemStyle: placeHolderStyle
    }

    ]
  },
  {
    type: 'pie',
    hoverAnimation: false,
    radius: ['50%', '52%'],
    center: ['75%', '50%'],
    startAngle: 225,
    labelLine: {
      normal: {
        show: false
      }
    },
    label: {
      normal: {
        position: 'center'
      }
    },
    data: [{
      value: 75,
      itemStyle: {
        normal: {
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //     offset: 0,
          //     color: '#4897f6'
          // }, {
          //     offset: 1,
          //     color: '#9f3edd'
          // }]),
          color: '#4897f6'
        }
      }
    }, {
      value: 25,
      itemStyle: placeHolderStyle
    }

    ]
  }
  ]
}

const process = function () {
  let arg = arguments[0]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  try {
    let s_data = _.filter(arg, cur => { return cur['name'] === 'S001' })
    let sell = 0
    let check = 0
    if (!_.isEmpty(s_data)) {
      sell = s_data[0]['sell']
      check = s_data[0]['check']
    }
    options['series'][0]['data'][0]['value'] = sell
    options['series'][0]['data'][1]['value'] = 100 - sell

    options['series'][1]['data'][0]['value'] = check
    options['series'][1]['data'][1]['value'] = 100 - check

    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION}
