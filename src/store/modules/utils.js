const _ = require('underscore')

// 处理数据字典说明
function dctTabDctListSetDct () {
  let sourceDctDctList = arguments[0]
  let dctTabDctDct = {}
  try {
    for (let item of sourceDctDctList) {
      let key = item['name'].toLowerCase()
      dctTabDctDct[key] = {}
      dctTabDctDct[key]['name'] = item['memo']
      dctTabDctDct[key]['rel_type'] = item['rel_type']
    }
    return dctTabDctDct
  } catch (e) {
    return false
  }
}

// 处理数据字典list成字典类型(通用)
function dctDataListCommonSetDct () {
  let sourceDctData = arguments[0]
  let dctTabDct = {}
  try {
    for (let key in sourceDctData) {
      dctTabDct[key] = {}
      if (sourceDctData[key].length > 0) {
        dctTabDct[key] = _.object(_.pluck(sourceDctData[key], 'code'), _.pluck(sourceDctData[key], 'name'))
      }
    }
    return dctTabDct
  } catch (e) {
    return false
  }
}

// 处理数据字典list成字典类型（景区特殊）
function dctDataListSpecSetDct () {
  let sourceDctData = arguments[0]
  let dctTabDct = {}
  try {
    for (let site in sourceDctData) {
      let dctTmp = sourceDctData[site]
      dctTabDct[site] = {}
      for (let key in dctTmp) {
        dctTabDct[site][key] = {}
        if (dctTmp[key].length > 0) {
          dctTabDct[site][key] = _.object(_.pluck(dctTmp[key], 'code'), _.pluck(dctTmp[key], 'name'))
        }
      }
    }
    return dctTabDct
  } catch (e) {
    return false
  }
}

function fullscreenEvent (vm) {
  vm.$store.commit('initCachepage')
  // 权限菜单过滤相关
  vm.$store.commit('updateMenulist')
  // 全屏相关
};

export { dctTabDctListSetDct, dctDataListCommonSetDct, dctDataListSpecSetDct, fullscreenEvent }
