import _ from 'underscore'

// 初始化option
const INIT_OPTION = {
  title: {
    text: '',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/> {b}：{c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: []
  },
  series: [
    {
      name: '客流来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '55%'],
      data: [],
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgb(0, 0, 0, 0.5)'
      }
    }
  ],
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  }
}

const process = function () {
  let arg = arguments[0]
  let dctSites = arguments[1]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  let currentSite = _.find(dctSites, cur => { return cur['code'] === arg['sites'][0] })
  try {
    // 数据转换，组装echart需要的字段数据
    let legendData = []
    if (arg['sites'][0] == '_ALL_') {
      let tableInfo = []
      arg['data'].forEach(item => {
        item['data'].forEach(element => {
          let name = element['sell_channel_name']
          let value = element['value']
          if (name in tableInfo) {
            tableInfo[name] = tableInfo[name] + value
          } else {
            tableInfo[name] = value
          }
          legendData.push(name)
        })
      })
      // 插入图表
      for (let k in tableInfo) {
        let tmp = {}
        tmp['name'] = k
        tmp['value'] = tableInfo[k]
        options['series'][0]['data'].push(tmp)
      }
    } else {
      arg['data'].forEach(item => {
        item['data'].forEach(element => {
          let tmp = {}
          let name = element['sell_channel_name']
          let value = element['value']
          legendData.push(name)
          tmp['name'] = name
          tmp['value'] = value
          options['series'][0]['data'].push(tmp)
        })
      })
    }

    options['title']['text'] = 'OTA客流'
    options['title']['subtext'] = currentSite.name + ' ' + arg['start'] + '至' + arg['end']
    options['legend']['data'] = legendData

    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION }
