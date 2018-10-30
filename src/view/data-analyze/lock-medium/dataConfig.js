
import _ from 'underscore'
// var myData = [];

const INIT_OPTION = {

  backgroundColor: '#fff',
  title: {
    text: '',
    subtext: ''
  },
  legend: {
    data: ['身份证', '手机二维码'],
    top: 4,
    right: '20%'
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: '{b}<br/>{a}: {c}人',
    axisPointer: {
      type: 'shadow'
    }
  },

  toolbox: {
    right: 20,
    feature: {
      saveAsImage: {},
      dataView: {}
    }
  },

  grid: [{
    show: false,
    left: '4%',
    top: 60,
    bottom: 60,
    containLabel: true,
    width: '40%'
  }, {
    show: false,
    left: '50.5%',
    top: 80,
    bottom: 60,
    width: '0%'
  }, {
    show: false,
    right: '4%',
    top: 60,
    bottom: 60,
    containLabel: true,
    width: '40%'
  }],

  xAxis: [
    {
      type: 'value',
      inverse: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      position: 'top',
      axisLabel: {
        show: true,
        textStyle: {
          color: '#333',
          fontSize: 12
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ddd',
          width: 1,
          type: 'solid'
        }
      }
    }, {
      gridIndex: 1,
      show: false
    }, {
      gridIndex: 2,
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      position: 'top',
      axisLabel: {
        show: true,
        textStyle: {
          color: '#333',
          fontSize: 12
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ddd',
          width: 1,
          type: 'solid'
        }
      }
    }],
  yAxis: [{
    type: 'category',
    inverse: true,
    position: 'right',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false,
      margin: 8,
      textStyle: {
        color: '#9D9EA0',
        fontSize: 12
      }

    },
    data: []
  }, {
    gridIndex: 1,
    type: 'category',
    inverse: true,
    position: 'left',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#333',
        fontSize: 12,
        align: 'center'
      }

    },
    data: {}
  }, {
    gridIndex: 2,
    type: 'category',
    inverse: true,
    position: 'left',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false,
      textStyle: {
        color: '#9D9EA0',
        fontSize: 12
      }

    },
    data: []
  }],
  series: [
    {
      name: '身份证',
      type: 'bar',
      barGap: 20,
      barWidth: 20,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true,
          position: 'left',
          offset: [0, 0],
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        }
      },
      itemStyle: {
        normal: {
          color: '#659F83'
        },
        emphasis: {
          color: '#08C7AE'
        }
      },
      data: []
    },
    {
      name: '手机二维码',
      type: 'bar',
      barGap: 20,
      barWidth: 20,
      xAxisIndex: 2,
      yAxisIndex: 2,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true,
          position: 'right',
          offset: [0, 0],
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        }
      },
      itemStyle: {
        normal: {
          color: '#F68989'
        },
        emphasis: {
          color: '#F94646'
        }
      },
      data: []
    }

  ]
}

const process = function () {
  let arg = arguments[0]
  let dctSites = arguments[1]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  let currentSite = _.find(dctSites, cur => { return cur['code'] === arg['sites'][0] })

  try {
    myData = []
    // 全部景区时的data
    var merge = []
    arg['data'].forEach(item => {
      item['data'].forEach(element => {
        merge.push(element)
      })
    })

    // 全部景区时相同的device_name的value相加
    var result_card = {}
    var result_code = {}
    var result_all = []
    for (var i = 0; i < merge.length; i++) {
      if (merge[i].check_medium == 12) {
        result_card[(merge[i].device_name) || '未知'] = !result_card[merge[i].device_name] ? merge[i].value : result_card[merge[i].device_name] + merge[i].value
      } else if (merge[i].check_medium == 13) {
        result_code[(merge[i].device_name) || '未知'] = !result_code[merge[i].device_name] ? merge[i].value : result_code[merge[i].device_name] + merge[i].value
      }
      result_all[(merge[i].device_name) || '未知'] = !result_all[merge[i].device_name] ? merge[i].value : result_all[merge[i].device_name] + merge[i].value
    }
    var datacard = []
    var datacode = []
    let num = 0
    var myData = []
    for (let s in result_all) {
      myData.push(s)
      for (let m in result_card) {
        if (m == s) {
          datacard[num] = result_card[m]
          break
        } else {
          datacard[num] = 0
        }
      }
      for (let n in result_code) {
        if (n == s) {
          datacode[num] = result_code[n]
          break
        } else {
          datacode[num] = 0
        }
      }
      num++
    }

    options['series'][0]['data'] = datacard
    options['series'][1]['data'] = datacode
    options['yAxis'][0]['data'] = myData
    options['yAxis'][1]['data'] = myData
    options['yAxis'][2]['data'] = myData
    options['title']['text'] = '验票介质数据统计'
    options['title']['subtext'] = currentSite.name + ' ' + arg['start'] + '至' + arg['end']
    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION }
