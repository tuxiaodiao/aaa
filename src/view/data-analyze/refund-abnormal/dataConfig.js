
import _ from 'underscore'
var colorData = ['#337d76', '#29ba89', '#cc9933', '#ca3636', '#4282c2', '#c371c3']
var data = []

var create = function (data) {
  var result = []
  for (var i = 0; i < data.length; i++) {
    let length = data.length
    result.push({
      name: '',
      center: [
        (i * 100 / length + 100 / (length * 2) + '%'),
        '45%'
      ],
      radius: [
        '20%',
        '25%'
      ],
      type: 'pie',
      labelLine: {
        normal: {
          show: false
        }
      },
      markPoint: {
        data: [{
          symbol: 'triangle',
          symbolSize: 15,
          symbolRotate: 0,
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          name: '',
          value: data[i].name,
          x: i * 100 / length + 100 / (length * 2) - 1 + '%',
          y: 270,
          label: {
            normal: {
              show: true,
              position: 'center',
              formatter: function (params) {
                return params.value
              },
              textStyle: {
                color: colorData[i]
              }
            }
          }
        }]
      },
      markLine: {
        silent: true,
        symbolSize: 0,
        data: [{
          0: {
            x: i * 100 / length + '%',
            y: '30%',
            lineStyle: {
              normal: {
                color: i ? '#ccc' : 'transparent',
                width: 1,
                type: 'solid'
              }
            }

          },
          1: {
            x: i * 100 / length + '%',
            y: '70%',
            lineStyle: {
              normal: {
                color: i ? '#ccc' : 'transparent',
                width: 1,
                type: 'solid'
              }
            }
          }
        }]
      },
      data: [{
        value: data[i].value,
        name: data[i].name,
        itemStyle: {
          normal: {
            color: colorData[i]
          },
          emphasis: {
            color: colorData[i]
          }
        },
        label: {
          normal: {
            formatter: '{d}%',
            position: 'center',
            show: true,
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold',
              color: colorData[i]
            }
          }
        }
      }, {
        value: (100 - data[i].value),
        name: '',
        tooltip: {
          show: false
        },
        itemStyle: {
          normal: {
            color: '#aaa'
          },
          emphasis: {
            color: '#aaa'
          }
        },
        hoverAnimation: false
      }]
    })
  }
  return result
}

const INIT_OPTION = {
  title: {
    text: '',
    x: 'center',
    subtext: ''
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params, ticket, callback) {
      var res = params.name + ' : ' + params.percent + '%'
      return res
    }
  },
  toolbox: {
    feature: {
      dataView: {
        show: true
      }
    }
  },

  grid: {
    bottom: 100,
    top: 150
  },
  xAxis: [{
    show: false
  }],
  yAxis: [{
    show: false
  }],
  series: []
}

const process = function () {
  let arg = arguments[0]
  let dctSites = arguments[1]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  let currentSite = _.find(dctSites, cur => { return cur['code'] === arg['sites'][0] })
  try {
    data = []
    var merge = []
    arg['data'].forEach(item => {
      item['data'].forEach(element => {
        merge.push(element)
      })
    })
    var result = {}
    for (var i = 0; i < merge.length; i++) {
      // 如果对象存在就累加，否则使用第一个值。
      result[(merge[i].sell_channel_name) || '未知'] = !result[merge[i].sell_channel_name] ? merge[i].value : result[merge[i].sell_channel_name] + merge[i].value
    }
    for (let k in result) {
      let tmp = {}
      tmp['name'] = k
      tmp['value'] = result[k]
      data.push(tmp)
    }
    options['series'] = create(data)
    options['title']['text'] = '退票异常数据分析'
    options['title']['subtext'] = currentSite.name + ' ' + arg['start'] + '至' + arg['end']
    return options
  } catch (e) {
    console.log(e)
    return options
  }
}
export { process, INIT_OPTION}
