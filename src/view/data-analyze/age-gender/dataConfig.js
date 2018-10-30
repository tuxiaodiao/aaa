import _ from 'underscore'

// 初始化option
const INIT_OPTION = {
  title: { text: '', subtext: '', x: 'center' },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c}人 ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: []
  },
  toolbox: { feature: { saveAsImage: {} } },
  series: [
    {
      name: '年龄段组成',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '40%'],

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
      name: '性别组成',
      type: 'pie',
      radius: ['50%', '58%'],
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
    // 把全部景区中的data合并
    var merge = []
    arg['data'].forEach(item => {
      item['data'].forEach(element => {
        merge.push(element)
      })
    })
    var result = {}
    for (let i = 0; i < merge.length; i++) {
      // 如果对象存在就累加，否则使用第一个值。
      result[(merge[i].age_period) || '未知'] = !result[merge[i].age_period] ? merge[i].value : result[merge[i].age_period] + merge[i].value
    }
    function setMerge (data, gender) {
      let totle = null
      let text = gender
      data.forEach(item => {
        totle += item['value']
      })
      let outsideTmp = {}
      outsideTmp['name'] = text
      outsideTmp['value'] = totle
      options['series'][1]['data'].push(outsideTmp)
    }

    for (let k in result) {
      let insideTmp = {}
      insideTmp['name'] = k
      insideTmp['value'] = result[k]
      options['series'][0]['data'].push(insideTmp)
      legendData.push(insideTmp['name'])
      // 找出年龄段相同的
      let merge_a = _.filter(merge, cur => { return cur['age_period'] === k })
      // 整合后性别为女的data
      let merge_f = _.filter(merge_a, cur => { return cur['gender'] === 'F' })
      // 整合后性别为男的data
      let merge_m = _.filter(merge_a, cur => { return cur['gender'] === 'M' })
      // 整合后性别为未知的data
      let merge_n = _.filter(merge_a, cur => { return cur['gender'] !== 'F' && cur['gender'] !== 'M' })

      setMerge(merge_f, '女')
      setMerge(merge_m, '男')
      if (merge_n.length > 0) {
        setMerge(merge_n, '未知')
      }
    }
    options['legend']['data'] = legendData
    options['title']['text'] = '游客年龄与性别'
    options['title']['subtext'] = currentSite.name + ' ' + arg['start'] + '至' + arg['end']
    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

const deal = function () {
  let arg = arguments[0]
  // let dctSites = arguments[1];
  // 表头数据
  let configColumns = []
  // 表格data
  let tableData = []
  configColumns = [
    {title: '年龄段', key: 'age'},
    {title: '男', key: 'M'},
    {title: '女', key: 'F'}
  ]

  let ageColList = []
  let ageColDct = {}

  for (let item of arg['data']) {
    if (_.has(ageColDct, item['age_period'])) {
      ageColDct[item['age_period']][item['gender']] = item['value']
    } else {
      ageColDct[item['age_period']] = {}
      ageColDct[item['age_period']][item['gender']] = item['value']
    }
  }

  for (let item in ageColDct) {
    let tmp = {}
    tmp.age = item
    tmp.M = ageColDct[item]['M'] || 0
    tmp.F = ageColDct[item]['F'] || 0
    tableData.push(tmp)
  }
  return { configColumns: configColumns, tableData: tableData }
}
export { process, INIT_OPTION, deal }
