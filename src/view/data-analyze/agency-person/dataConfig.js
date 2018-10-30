import _ from 'underscore'

var dataStyle = {
  normal: {
    label: {show: false},
    labelLine: {show: false}
  }
}
var placeHolderStyle = {
  normal: {
    color: 'rgba(0,0,0,0)',
    label: {show: false},
    labelLine: {show: false}
  },
  emphasis: {
    color: 'rgba(0,0,0,0)'
  }
}
const INIT_OPTION = {
  title: {
    text: '',
    x: 'center',
    y: 'center',
    itemGap: 20,
    textStyle: {
      color: 'rgba(30,144,255,0.8)',
      fontFamily: '微软雅黑',
      fontSize: 26,
      fontWeight: 'bolder'
    }
  },
  tooltip: {
    show: true,
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: '50%',
    y: '45',
    itemGap: 12,
    data: []

  },
  toolbox: {
    show: true,
    feature: {
      mark: {show: true},
      dataView: {show: true, readOnly: false},
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  series: [
    {
      name: '',
      type: 'pie',
      clockWise: false,
      radius: [125, 150],
      itemStyle: dataStyle,
      // data:[
      //     {
      //         value:68,
      //         name:'68%的人表示过的不错'
      //     },
      //     {
      //         value:32,
      //         name:'invisible',
      //         itemStyle : placeHolderStyle
      //     }
      // ]
      data: []
    },
    {
      name: '',
      type: 'pie',
      clockWise: false,
      radius: [100, 125],
      itemStyle: dataStyle,
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
    var merge = []
    var sum = null
    arg['data'].forEach(item => {
      item['data'].forEach(element => {
        merge.push(element)
        sum += element['value']
      })
    })
    // 整合后为个人的data
    let merge_p = _.filter(merge, cur => { return cur['form_type'] == '11' })
    // 整合后为团体的data
    let merge_a = _.filter(merge, cur => { return cur['form_type'] == '12' })
    // 整合后为未知的data
    let merge_n = _.filter(merge, cur => { return cur['form_type'] !== '11' && cur['form_type'] !== '12' })

    function setMerge (data, index) {
      let totle = null
      data.forEach(item => {
        totle += item['value']
      })
      let tmp = {}
      tmp['name'] = data[0]['form_type_name'] || '未知'
      tmp['value'] = totle
      options['series'][index]['data'].push(tmp)
      options['series'][index]['data'].push({
        value: sum - totle,
        name: 'invisible',
        itemStyle: placeHolderStyle
      })
      options['series'][index]['name'] = data[0]['form_type_name'] || '未知'
      options['legend']['data'].push(tmp.name)
      return tmp
    }
    setMerge(merge_p, 0)
    setMerge(merge_a, 1)
    if (merge_n.length > 0) {
      setMerge(merge_n, 3)
    }
    options['title']['text'] = '团队游客与散客对比'
    options['title']['subtext'] = currentSite.name + ' ' + arg['start'] + '至' + arg['end']
    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION}
