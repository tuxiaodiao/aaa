import _ from 'underscore'

// 初始化option
const INIT_OPTION = {
  title: { text: '', subtext: '', x: 'center'},
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: []
  },
  toolbox: { feature: { saveAsImage: {} } },
  series: [
    {
      name: '景区名称',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '30%'],
      label: {
        normal: {
          position: 'inner'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    },
    {
      name: '证件类型',
      type: 'pie',
      radius: ['40%', '55%'],
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
    let legendData = []
    for (let item of arg['data']) {
      let insideSite = _.find(dctSites, cur => { return cur['code'] === item['site'] })
      let insideTmp = {}
      insideTmp['name'] = insideSite.name
      let totle = null
      item['data'].forEach(element => {
        totle += element.value
        let outsideTmp = {}
        outsideTmp['name'] = element['id_type_name']
        outsideTmp['value'] = element['value']
        options['series'][1]['data'].push(outsideTmp)
        legendData.push(outsideTmp['name'])
      })
      insideTmp['value'] = totle
      options['series'][0]['data'].push(insideTmp)
    }

    options['legend']['data'] = legendData
    options['title']['text'] = '销售员销售证件类型'
    options['title']['subtext'] = currentSite.name + ' ' + arg['start'] + '至' + arg['end']
    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION}
