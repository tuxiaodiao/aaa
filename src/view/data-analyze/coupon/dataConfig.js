import _ from 'underscore'

const INIT_OPTION = {
  title: {
    text: '',
    x: 'center'

  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: []
  },
  series: [
    {
      name: '',
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
      name: '',
      type: 'pie',
      radius: ['40%', '55%'],
      label: {
        normal: {
          formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
          backgroundColor: '#eee',
          borderColor: '#aaa',
          borderWidth: 1,
          borderRadius: 4,
          // shadowBlur:3,
          // shadowOffsetX: 2,
          // shadowOffsetY: 2,
          // shadowColor: '#999',
          // padding: [0, 7],
          rich: {
            a: {
              color: '#999',
              lineHeight: 6,
              align: 'center'
            },
            abg: {
              backgroundColor: '#56D0E3',
              width: '100%',
              align: 'right',
              height: 6,
              borderRadius: [4, 4, 0, 0]
            },
            hr: {
              borderColor: '#aaa',
              width: '100%',
              borderWidth: 0.5,
              height: 0
            },
            b: {
              fontSize: 12,
              lineHeight: 20
            },
            per: {
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
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
    let legendData = []
    for (let item of arg['data']) {
      let insideSite = _.find(dctSites, cur => { return cur['code'] === item['site'] })
      let insideTmp = {}
      insideTmp['name'] = insideSite.name
      let totle = null
      item['data'].forEach(element => {
        totle += element.value
        let outsideTmp = {}
        outsideTmp['name'] = element['name']
        outsideTmp['value'] = element['value']
        options['series'][1]['data'].push(outsideTmp)
        legendData.push(outsideTmp['name'])
      })
      console.log(legendData)
      insideTmp['value'] = totle
      options['series'][0]['data'].push(insideTmp)
    }

    options['legend']['data'] = legendData
    options['title']['text'] = '优惠票'
    options['title']['subtext'] = currentSite.name + ' ' + arg['start'] + '至' + arg['end']
    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { INIT_OPTION, process }
