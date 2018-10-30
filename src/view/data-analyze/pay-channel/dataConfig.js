
import _ from 'underscore'
const insideColor = ['#915872', '#3077b7', '#9a8169', '#3f8797', '#5b8144', '#307889', '#9c6a79']
const outsideColor = ['#d74e67', '#0092ff', '#eba954', '#21b6b9', '#60a900', '#01949b', ' #f17677']

const INIT_OPTION = {
  backgroundColor: '#fff',
  title: {
    text: '',
    x: 'center',
    subtext: ''
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  toolbox: {
    feature: {
      dataView: {
        show: true
      }
    }
  },
  legend: {

    orient: 'vertical',
    x: 'left',
    itemWidth: 14,
    itemHeight: 14,
    align: 'left',
    data: [],
    textStyle: {
      color: '#333'
    }
  },
  series: [
    {
      name: '支付方式',
      type: 'pie',
      hoverAnimation: false,
      legendHoverLink: false,
      radius: ['36%', '38%'],
      // color: function(){

      //     return insideColor[i];
      // },
      // color: ['#915872', '#3077b7', '#9a8169', '#3f8797','#5b8144','#307889','#9c6a79'],
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
      tooltip: {
        show: false
      },

      data: []
    },
    {
      name: '支付方式',
      type: 'pie',
      radius: ['38%', '51%'],
      // color: function(){
      //     return outsideColor[i++];
      // },
      // color: ['#d74e67', '#0092ff', '#eba954', '#21b6b9','#60a900','#01949b',' #f17677'],
      label: {
        normal: {
          formatter: '{b}\n{d}%'
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
    // 数据转换，组装echart需要的字段数据
    let legendData = []

    var merge = []
    arg['data'].forEach(item => {
      item['data'].forEach(element => {
        merge.push(element)
      })
    })

    var result = {}
    for (var i = 0; i < merge.length; i++) {
      // 如果对象存在就累加，否则使用第一个值。
      result[(merge[i].pay_channel_name) || '未知'] = !result[merge[i].pay_channel_name] ? merge[i].value : result[merge[i].pay_channel_name] + merge[i].value
    }
    for (let k in result) {
      let insideTmp = {}
      insideTmp['name'] = ''
      insideTmp['value'] = result[k]
      let tmp = {}
      tmp['name'] = k
      tmp['value'] = result[k]
      options['series'][0]['data'].push(insideTmp)
      options['series'][1]['data'].push(tmp)
      legendData.push(tmp['name'])
    }

    options['legend']['data'] = legendData
    options['title']['text'] = '支付方式'
    options['title']['subtext'] = currentSite.name + ' ' + arg['start'] + '至' + arg['end']
    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION}
