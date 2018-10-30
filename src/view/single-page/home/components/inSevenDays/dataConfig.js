
import _ from 'underscore'
// import { TRUNCATE_SOURCE_DATA } from '../../../../../store/mutation-types';
const INIT_OPTION = {
  backgroundColor: '#18202d',
  title: {
    text: '近七天入园人数',
    x: 'left',
    textStyle: {
      color: '#fff',
      fontSize: 14
    }
  },
  tooltip: {
    trigger: 'axis'

  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff',
        fontSize: '12'
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff',
        fontSize: '12'
      }
    }
  },
  series: [{
    data: [],
    type: 'line'
  }]
}

const process = function () {
  let arg = arguments[0]
  let dctSites = arguments[1]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))

  try {
    for (let i = 0; i < arg['data'].length; i++) {
      let currentSite = _.filter(dctSites, cur => { return cur['code'] == arg['site'] })
      let tmp = {}
      tmp['name'] = currentSite['name']
      tmp['type'] = 'line'
      tmp['data'] = arg['data'][i]['data']
      options['series'].push(tmp)
    }
    options['xAxis']['data'] = arg['days']

    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION}
