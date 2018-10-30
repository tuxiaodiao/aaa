import _ from 'underscore'

// 初始化option

const INIT_OPTION = {
  title: {
    text: '',
    x: 'center',
    subtext: ''
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: []
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      // data:[
      //     {value:335, name:'女'},
      // ],
      data: [],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
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
    if (arg['sites'][0] == '_ALL_') {
      var merge = []
      arg['data'].forEach(item => {
        item['data'].forEach(element => {
          merge.push(element)
        })
      })
      // 整合后性别为女的data
      let merge_f = _.filter(merge, cur => { return cur['gender'] === 'F' })
      // 整合后性别为男的data
      let merge_m = _.filter(merge, cur => { return cur['gender'] === 'M' })
      // 整合后性别为未知的data
      let merge_n = _.filter(merge, cur => { return cur['gender'] !== 'F' && cur['gender'] !== 'M' })

      function setMerge (data, gender) {
        let totle = null
        let text = gender
        data.forEach(item => {
          totle += item['value']
        })
        let tmp = {}
        tmp['name'] = text
        tmp['value'] = totle
        options['series'][0]['data'].push(tmp)
        legendData.push(text)
      }

      setMerge(merge_f, '女')
      setMerge(merge_m, '男')
      if (merge_n.length > 0) {
        setMerge(merge_n, '未知')
      }
    } else {
      arg['data'].forEach(item => {
        item['data'].forEach(element => {
          let tmp = {}
          let gender = ''
          if (element['gender'] === 'F') {
            gender = '女'
          } else if (element['gender'] === 'M') {
            gender = '男'
          } else {
            gender = '未知'
          }
          legendData.push(gender)
          tmp['name'] = gender
          tmp['value'] = element['value']
          options['series'][0]['data'].push(tmp)
        })
      })
    }
    options['legend']['data'] = legendData
    options['title']['text'] = '游客性别组成'
    options['title']['subtext'] = currentSite.name + ' ' + arg['start'] + '至' + arg['end']

    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION}
