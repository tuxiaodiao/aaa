
import _ from 'underscore'

const INIT_OPTION = {
  backgroundColor: '#18202d',
  title: {
    text: '景点实时数据',
    textStyle: {
      fontSize: '14',
      color: '#fff'
    }
  },
  angleAxis: {
    interval: 1,
    type: 'category',
    data: ['北坡主峰',
      '地下森林',
      '瀑布',
      '小天池',
      '绿渊潭',
      '西坡主峰',
      '锦江峡谷',
      '松桦恋',
      '王池',
      '岳桦双瀑'
    ],
    z: 10,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#00c7ff',
        width: 1,
        type: 'solid'
      }
    },
    axisLabel: {
      interval: 0,
      show: true,
      color: '#00c7ff',
      margin: 8,
      fontSize: 12
    }
  },
  radiusAxis: {
    min: 0,
    max: 100,
    interval: 20,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#00c7ff',
        width: 1,
        type: 'solid'
      }
    },
    axisLabel: {
      formatter: '{value} %',
      show: true,
      padding: [0, 0, 3, 0],
      color: '#00c7ff',
      fontSize: 12
    },
    splitLine: {
      lineStyle: {
        color: '#00c7ff',
        width: 1,
        type: 'solid'
      }
    }
  },
  polar: {},
  series: [{
    type: 'bar',
    data: [{
      value: 87,
      itemStyle: {
        normal: {
          color: '#f54d4d'
        }
      }
    },
    {
      value: 80,
      itemStyle: {
        normal: {
          color: '#f87544'
        }
      }
    },
    {
      value: 75,
      itemStyle: {
        normal: {
          color: '#ffae00'
        }
      }
    },
    {
      value: 69,
      itemStyle: {
        normal: {
          color: '#dcff00'
        }
      }
    },
    {
      value: 63,
      itemStyle: {
        normal: {
          color: '#25d053'
        }
      }
    },
    {
      value: 54,
      itemStyle: {
        normal: {
          color: '#01fff5'
        }
      }
    },
    {
      value: 47,
      itemStyle: {
        normal: {
          color: '#007cff'
        }
      }
    },
    {
      value: 40,
      itemStyle: {
        normal: {
          color: '#4245ff'
        }
      }
    },
    {
      value: 35,
      itemStyle: {
        normal: {
          color: '#c32eff'
        }
      }
    },
    {
      value: 33,
      itemStyle: {
        normal: {
          color: '#ff62e8'
        }
      }
    }
    ],
    coordinateSystem: 'polar'
  }]
}

const process = function () {}

export { process, INIT_OPTION}
