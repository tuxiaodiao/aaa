import echarts from 'echarts'
import * as dataConfig from './dataConfig'
import _ from 'underscore'
const echartsMap = echarts
echartsMap.extendsMap = function (id, opt) {
  let data = []
  for (let item of opt.data) {
    data.push({
      name: item.code,
      value: item.value
    })
  }
  // 实例
  var chart = this.init(document.getElementById(id))
  // var data = [{
  //     name: "北京",
  //     value: 1000
  // }, {
  //     name: "天津",
  //     value: 0
  // }, {
  //     name: "河北",
  //     value: 0
  // }, {
  //     name: "山西",
  //     value: 81
  // }, {
  //     name: "内蒙古",
  //     value: 47
  // }, {
  //     name: "辽宁",
  //     value: 67
  // }, {
  //     name: "吉林",
  //     value: 82
  // }, {
  //     name: "黑龙江",
  //     value: 66
  // }, {
  //     name: "上海",
  //     value: 24
  // }, {
  //     name: "江苏",
  //     value: 92
  // }, {
  //     name: "浙江",
  //     value: 114
  // }, {
  //     name: "安徽",
  //     value: 109
  // }, {
  //     name: "福建",
  //     value: 116
  // }, {
  //     name: "江西",
  //     value: 91
  // }, {
  //     name: "山东",
  //     value: 119
  // }, {
  //     name: "河南",
  //     value: 137
  // }, {
  //     name: "湖北",
  //     value: 116
  // }, {
  //     name: "湖南",
  //     value: 114
  // }, {
  //     name: "重庆",
  //     value: 91
  // }, {
  //     name: "四川",
  //     value: 125
  // }, {
  //     name: "贵州",
  //     value: 62
  // }, {
  //     name: "云南",
  //     value: 83
  // }, {
  //     name: "西藏",
  //     value: 9
  // }, {
  //     name: "陕西",
  //     value: 80
  // }, {
  //     name: "甘肃",
  //     value: 56
  // }, {
  //     name: "青海",
  //     value: 10
  // }, {
  //     name: "宁夏",
  //     value: 18
  // }, {
  //     name: "新疆",
  //     value: 67
  // }, {
  //     name: "广东",
  //     value: 123
  // }, {
  //     name: "广西",
  //     value: 59
  // }, {
  //     name: "海南",
  //     value: 14
  // }, ];
  /* 获取地图数据 */
  var geoCoordMap = {}
  var mapFeatures = dataConfig['cityMap']['中国']['features']
  mapFeatures.forEach(function (v) {
    // 地区名称
    var name = v.properties.name
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp
  })
  var max = 480,
    min = 9 // todo
  var maxSize4Pin = 100,
    minSize4Pin = 20
  var convertData = function (data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].code]
      if (geoCoord) {
        res.push({
          name: data[i].code,
          value: geoCoord.concat(data[i].value)
        })
      }
    }
    return res
  }
  var option = {
    backgroundColor: opt.bgColor,
    title: {
      text: '',
      subtext: '',
      x: 'center',
      textStyle: {
        color: 'rgb(55, 75, 113)',
        fontFamily: '等线',
        fontSize: 18
      },
      subtextStyle: {
        fontSize: 15,
        fontFamily: '等线'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        if (typeof (params.value)[2] === 'undefined') {
          var toolTiphtml = ''
          for (var i = 0; i < opt.data.length; i++) {
            if (params.name == opt.data[i].code) {
              toolTiphtml += opt.data[i].code + ':<br>'
              for (var j = 0; j < opt.data[i].cityers.length; j++) {
                toolTiphtml += opt.data[i].cityers[j].name + ':' + opt.data[i].cityers[j].value + '<br>'
              }
            }
          }
          return toolTiphtml
        } else {
          var toolTiphtml = ''
          for (var i = 0; i < opt.data.length; i++) {
            if (params.name == opt.data[i].code) {
              toolTiphtml += opt.data[i].code + ':<br>'
              for (var j = 0; j < opt.data[i].cityers.length; j++) {
                toolTiphtml += opt.data[i].cityers[j].name + ':' + opt.data[i].cityers[j].value + '<br>'
              }
            }
          }
          return toolTiphtml
        }
      }
    },
    visualMap: {
      show: true,
      min: 0,
      max: 10000,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true,
      seriesIndex: [1],
      inRange: {
        // color: ['#3B5077', '#031525'] // 蓝黑
        // color: ['#ffc0cb', '#800080'] // 红紫
        // color: ['#3C3B3F', '#605C3C'] // 黑绿
        // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
        // color: ['#23074d', '#cc5333'] // 紫红
        // color: ['#1488CC', '#2B32B2'] // 浅蓝
        color: ['#00467F', '#A5CC82'] // 蓝绿
      }
    },
    geo: {
      show: true,
      map: '中国',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#031525',
          borderColor: '#3B5077'
        },
        emphasis: {
          areaColor: '#2B91B7'
        }
      }
    },
    series: [{
      name: '散点',
      type: 'scatter',
      coordinateSystem: 'geo',
      data: convertData(opt.data),
      symbolSize: function (val) {
        return 10
      },
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#05C3F9'
        }
      }
    }, {
      type: 'map',
      map: '中国',
      geoIndex: 0,
      aspectScale: 0.75, // 长宽比
      showLegendSymbol: false, // 存在legend时显示
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: false,
          textStyle: {
            color: '#fff'
          }
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#031525',
          borderColor: '#3B5077'
        },
        emphasis: {
          areaColor: '#2B91B7'
        }
      },
      animation: false,
      data: data
    }, {
      name: '点',
      type: 'scatter',
      coordinateSystem: 'geo',
      symbol: 'pin', // 气泡
      symbolSize: function (val) {
        var a = (maxSize4Pin - minSize4Pin) / (max - min)
        var b = minSize4Pin - a * min
        b = maxSize4Pin - a * max
        return (a + b) * 2
      },
      label: {
        normal: {
          formatter: function (obj) {
            return obj.data.value[2]
          },
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        }
      },
      itemStyle: {
        normal: {
          color: '#F62157' // 标志颜色
        }
      },
      zlevel: 6,
      data: convertData(opt.data)
    }, {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: convertData(opt.data.sort(function (a, b) {
        return b.value - a.value
      }).slice(0, opt.topNum)),
      symbolSize: function (val) {
        return 10
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: 'yellow',
          shadowBlur: 10,
          shadowColor: 'yellow'
        }
      },
      zlevel: 1
    } ]
  }
  chart.setOption(option)
}
export {echartsMap}
