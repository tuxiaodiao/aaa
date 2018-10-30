import echarts from 'echarts'
import * as dataConfig from './dataConfig'
import _ from 'underscore'

const echartsMap = echarts
echartsMap.extendsMap = function (id, opt) {
  // 实例
  var chart = this.init(document.getElementById(id))
  var curGeoJson = {}
  var provinceName = ''
  var topData = []

  var max = 150,
    min = 20 // todo
  var maxSize4Pin = 100,
    minSize4Pin = 20

  var convertData = function (data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name]
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        })
      }
    }
    return res
  }
  // top 10显示
  var top10 = function (data) {
    let res = []
    if (data && data.length > 0) {
      let tData = _.sortBy(data, item => { return -item.value }).slice(0, 10)
      // console.log("tData: " + JSON.stringify(tData))
      for (let prov of tData) {
        res.push(prov.code + ' - ' + prov.value)
      }
    }
    return res
  }

  function geoCoordMap (pn, cn) {
    // console.log("pn: " + pn);
    // console.log("cn: " + cn);
    if (!provinceName || provinceName === '中国') {

    } else {
      let features = dataConfig['cityMap'][provinceName]['features']
      // console.log(cn);

      // console.log(cn.indexOf('盟'));

      if (!(cn.indexOf('市') > 0 || cn.indexOf('自治州') > 0 || cn.indexOf('自治县') > 0 || cn.indexOf('地区') > 0 || cn.indexOf('盟') > 0)) {
        cn = cn + '市'
      }
      // console.log("cn: " + cn)
      let cityName = null
      let terCpData = _.find(features, item => {
        if (item['properties']['name'] === cn) {
          cityName = item
        };
      })
      return cityName['properties']['cp']
    }
  }

  function provinceMap (pn) {
    let chinaFeatures = dataConfig['cityMap']['中国']['features']
    let provinceName = null
    let terCpDataPro = _.find(chinaFeatures, item => {
      if (item['properties']['name'] === pn) {
        provinceName = item
      };
    })
    return _.has(provinceName, 'properties') ? provinceName['properties']['cp'] : []
  }

  var levelColorMap = {
    '1': 'rgba(241, 109, 115, .8)',
    '2': 'rgba(255, 235, 59, .7)',
    '3': 'rgba(147, 235, 248, 1)'
  }

  var defaultOpt = {
    mapName: 'china', // 地图展示
    goDown: false, // 是否下钻
    bgColor: '#404a59', // 画布背景色
    activeArea: [], // 区域高亮,同echarts配置项
    data: [],
    // 下钻回调(点击的地图名、实例对象option、实例对象)
    callback: function (name, option, instance) {}
  }
  if (opt) {
    opt = this.util.extend(defaultOpt, opt)
  }

  // 层级索引
  var name = [opt.mapName]
  var idx = 0
  var pos = {
    leftPlus: 115,
    leftCur: 150,
    left: 198,
    top: 50
  }

  var line = [
    [0, 0],
    [8, 11],
    [0, 22]
  ]
  // style
  var style = {
    font: '18px "Microsoft YaHei", sans-serif',
    textColor: '#eee',
    lineColor: 'rgba(147, 235, 248, .8)'
  }

  var handleEvents = {
    /**
     * i 实例对象
     * o option
     * n 地图名
     **/
    resetOption: function (i, o, n) {
      provinceName = n == '中国' ? '' : n
      var breadcrumb = this.createBreadcrumb(n)
      var j = name.indexOf(n)
      var l = o.graphic.length
      if (j < 0) {
        o.graphic.push(breadcrumb)
        o.graphic[0].children[0].shape.x2 = 145
        o.graphic[0].children[1].shape.x2 = 145
        if (o.graphic.length > 2) {
          var cityData = {}
          var cityJson
          for (let cityItem of opt.data) {
            if (n === cityItem.code) {
              cityData.code = cityItem.code
              cityData.value = cityItem.value
              cityData.citys = []
              for (let item of cityItem.citys) {
                cityData.citys.push({
                  city: item.city,
                  value: item.value
                })
              }
            }
          }
          if (cityData != null) {
            o.series[0].data = handleEvents.initSeriesDataClick(cityData)
          } else {
            o.series[0].data = []
          }
        }
        name.push(n)
        idx++
      } else {
        o.graphic.splice(j + 2, l)
        if (o.graphic.length <= 2) {
          o.graphic[0].children[0].shape.x2 = 60
          o.graphic[0].children[1].shape.x2 = 60
          o.series[0].data = handleEvents.initSeriesData(opt.data)
        };
        name.splice(j + 1, l)
        idx = j
        pos.leftCur -= pos.leftPlus * (l - j - 1)
      };

      o.geo.map = n
      o.geo.zoom = 0.4
      i.clear()
      i.setOption(o)
      // console.log(JSON.stringify(o));
      this.zoomAnimation()
      opt.callback(n, o, i)
    },

    /**
     * name 地图名
     **/
    createBreadcrumb: function (name) {
      var breadcrumb = {
        type: 'group',
        id: name,
        left: pos.leftCur + pos.leftPlus,
        top: pos.top + 3,
        children: [{
          type: 'polyline',
          left: -90,
          top: -5,
          shape: {
            points: line
          },
          style: {
            stroke: '#fff',
            key: name
            // lineWidth: 2,
          },
          onclick: function () {
            var name = this.style.key
            handleEvents.resetOption(chart, option, name)
          }
        }, {
          type: 'text',
          left: -68,
          top: 'middle',
          style: {
            text: name,
            textAlign: 'center',
            fill: style.textColor,
            font: style.font
          },
          onclick: function () {
            var name = this.style.text
            handleEvents.resetOption(chart, option, name)
          }
        }, {
          type: 'text',
          left: -68,
          top: 10,
          style: {

            name: name,
            text: dataConfig.cityToPinyin[name] ? dataConfig.cityToPinyin[name].toUpperCase() : '',
            textAlign: 'center',
            fill: style.textColor,
            font: '12px "Microsoft YaHei", sans-serif'
          },
          onclick: function () {
            // console.log(this.style);
            var name = this.style.name
            handleEvents.resetOption(chart, option, name)
          }
        }]
      }

      pos.leftCur += pos.leftPlus

      return breadcrumb
    },

    // 设置effectscatter
    initSeriesData: function (data) {
      let temp = []
      for (var i = 0; i < data.length; i++) {
        let proCoord = provinceMap(data[i].code)
        temp.push({
          name: data[i].code,
          value: proCoord.concat(data[i].value)
        })
      };
      return temp
    },
    initSeriesDataClick: function (data) {
      let temp = []
      if (!data.citys.length) return
      console.log(data)
      for (var s = 0; s < data.citys.length; s++) {
        console.log(data.citys[s])
        let geoCoord = geoCoordMap(data.code, data.citys[s].city)
        if (geoCoord) {
          let value = data.citys[s].value
          let item = {
            name: data.citys[s].name,
            value: geoCoord.concat(value)
          }
          temp.push(item)
        }
      }
      return temp
    },
    zoomAnimation: function () {
      var count = null
      var zoom = function (per) {
        if (!count) count = per
        count = count + per
        // console.log(per,count);
        chart.setOption({
          geo: {
            zoom: count
          }
        })
        if (count < 1) {
          window.requestAnimationFrame(function () {
            zoom(0.2)
          })
        }
      }
      window.requestAnimationFrame(function () {
        zoom(0.2)
      })
    }
  }

  var option = {
    backgroundColor: opt.bgColor,
    tooltip: {
      show: false,
      trigger: 'item',
      alwaysShowContent: false,
      backgroundColor: 'rgba(50,50,50,0.7)',
      hideDelay: 100,
      triggerOn: 'mousemove',
      enterable: true
      // position: ['60%', '70%'],
      // formatter: function(params, ticket, callback) {
      //   return '城市：' + params.data.name + '<br/>' + '人数：' + params.data.value[params.data.value.length - 1]
      // }
    },
    xAxis: {
      type: 'value',
      scale: true,
      name: '',
      position: 'top',
      splitNumber: 1,
      boundaryGap: false,
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 2,
        textStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'category',
      name: 'TOP 10',
      nameGap: 10,
      nameLocation: 'start',
      splitNumber: 10,
      inverse: false,
      max: 30,
      min: 0,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#ddd'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#ddd'
        }
      },
      containLabel: true,
      axisLabel: {
        interval: 0,
        margin: -25,
        textStyle: {
          color: '#999',
          fontWeight: 'bolder',
          // fontFamily: 'Microsoft YaHei',
          font: '14px "Microsoft YaHei", sans-serif',
          textColor: '#eee',
          lineColor: 'rgba(147, 235, 248, .8)'

        }
      },
      // data: ['北京', '天津', '北京', '天津', '北京', '天津', '北京', '天津', '北京', '天津']
      data: top10(opt.data)
    },

    graphic: [{
      type: 'group',
      left: pos.left,
      top: pos.top - 4,
      children: [{
        type: 'line',
        left: 0,
        top: -20,
        shape: {
          x1: 0,
          y1: 0,
          x2: 60,
          y2: 0
        },
        style: {
          stroke: style.lineColor
        }
      }, {
        type: 'line',
        left: 0,
        top: 20,
        shape: {
          x1: 0,
          y1: 0,
          x2: 60,
          y2: 0
        },
        style: {
          stroke: style.lineColor
        }
      }]
    },
    {
      id: name[idx],
      type: 'group',
      left: pos.left + 2,
      top: pos.top,
      children: [{
        type: 'polyline',
        left: 90,
        top: -12,
        shape: {
          points: line
        },
        style: {
          stroke: 'transparent',
          key: name[0]
        },
        onclick: function () {
          var name = this.style.key
          handleEvents.resetOption(chart, option, name)
        }
      }, {
        type: 'text',
        left: 0,
        top: 'middle',
        style: {
          text: '中国',
          textAlign: 'center',
          fill: style.textColor,
          font: style.font
        },
        onclick: function () {
          handleEvents.resetOption(chart, option, '中国')
        }
      }, {
        type: 'text',
        left: 0,
        top: 10,
        style: {
          text: 'China',
          textAlign: 'center',
          fill: style.textColor,
          font: '12px "Microsoft YaHei", sans-serif'
        },
        onclick: function () {
          handleEvents.resetOption(chart, option, '中国')
        }
      }]
    }
    ],
    geo: {
      map: opt.mapName,
      roam: true,
      zoom: 1,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(147, 235, 248, 1)',
          borderWidth: 1,
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [{
              offset: 0,
              color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
            }, {
              offset: 1,
              color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          },
          shadowColor: 'rgba(128, 217, 248, 1)',
          // shadowColor: 'rgba(255, 255, 255, 1)',
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 10
        },
        emphasis: {
          areaColor: '#389BB7',
          borderWidth: 0
        }
      },
      regions: opt.activeArea.map(function (item) {
        if (typeof item !== 'string') {
          return {
            name: item.name,
            itemStyle: {
              normal: {
                areaColor: item.areaColor || '#389BB7'
              }
            },
            label: {
              normal: {
                show: item.showLabel,
                textStyle: {
                  color: '#fff'
                }
              }
            }
          }
        } else {
          return {
            name: item,
            itemStyle: {
              normal: {
                borderColor: '#91e6ff',
                areaColor: '#389BB7'
              }
            }
          }
        }
      })
    },
    series: [{
      name: '点',
      type: 'scatter',
      coordinateSystem: 'geo',
      symbolSize: 10,
      symbol: 'pin', // 气泡
      symbolSize: function (val) {
        var a = (maxSize4Pin - minSize4Pin) / (max - min)
        var b = minSize4Pin - a * min
        b = maxSize4Pin - a * max
        return (a + b) * 5
      },
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#fff',
            fontWeight: 'bolder',
            fontSize: 12
          },
          formatter: function (val) {
            return val['data']['value'][2]
          }
        }
      },
      itemStyle: {
        normal: {
          color: '#F62157' // 标志颜色
        }
      },
      zlevel: 6,
      // data: convertData(data),

      data: handleEvents.initSeriesData(opt.data)
    },
    {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: convertData(opt.data.sort(function (a, b) {
        return b.value - a.value
      }).slice(0, 5)),
      symbolSize: function (val) {
        return val[2] / 10
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
        },
        zlevel: 1,
        data: handleEvents.initSeriesData(opt.data)
      },
      itemStyle: {
        normal: {
          color: '#05C3F9',
          shadowBlur: 10,
          shadowColor: '#05C3F9'
        }
      }
    }

    ]
  }
  chart.setOption(option)
  // 添加事件
  chart.on('click', function (params) {
    var _self = this
    if (opt.goDown && params.name !== name[idx]) {
      for (let i = 0; i < opt.data.length; i++) {
        if (opt.data[i].code == params.name) {
          curGeoJson = dataConfig.cityMap[params.name]
          echartsMap.registerMap(params.name, dataConfig.cityMap[params.name])
          handleEvents.resetOption(_self, option, params.name)
        }
      }
    }
  })

  chart.setMap = function (mapName) {
    var _self = this
    if (mapName.indexOf('市') < 0) {
      mapName = mapName + '市'
    }
    if (dataConfig.cityMap[mapName]) {
      curGeoJson = dataConfig.cityMap[mapName]
      echartsMap.registerMap(mapName, dataConfig.cityMap[mapName])
      handleEvents.resetOption(_self, option, mapName)
    }
  }

  return chart
}

export { echartsMap }
