import _ from 'underscore';
var colors = ['#00c7ff', '#f87544'];

var xData = function () {
  var data = [];
  for (var i = 1; i < 11; i++) {
    data.push(i + '日');
  }
  return data;
}();

const INIT_OPTION = {
  backgroundColor: '#18202d',
  title: {
    text: '南景区',
    textStyle: {
      fontSize: '14',
      color: '#fff',
    }
  },
  grid: {
    bottom: '1%',
    top: '18%',
    containLabel: true,
    show: false // 网格边框是否显示，上和右边框 
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      textStyle: {
        color: '#fff'
      }

    },
  },
  legend: {
    data: ['预约', '入园'],
    align: 'left',
    textStyle: {
      fontSize: 9,
      color: '#fff',
    },
    left: 160,
    top: 0
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      interval: 1,
      textStyle: {
        fontSize: 9,
        color: '#fff',
      }
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      },

    },
    splitLine: {
      lineStyle: {
        color: "#999"
      }
    },
    data: [],
  },
  yAxis: {
    type: 'value',
    name: '',
    axisLine: {
      show: true,
      lineStyle: {
        color: '#fff'
      },
    },
    axisTick: {
      show: true
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false,
    }
  },
  series: [{
    name: '预约',
    type: 'bar',
    barWidth: 16,
    color: colors[0],
    data: []
  }, {
    name: '入园',
    color: colors[1],
    type: 'line',
    itemStyle: {
      normal: {
        lineStyle: {
          width: 2, //折线宽度
        },
        opacity: 0.4
      }
    },
    data: []
  }]
}

const process = function () {
  let arg = arguments[0];
  // console.log("arg: " + JSON.stringify(arg))
  let optionList = [];
  try {
    let siteData = {};
    for (let cur of arg['data'] || []) {
      let options = JSON.parse(JSON.stringify(INIT_OPTION));
      options['title']['text'] = cur['site'] === 'N001' ? '北景区' : cur['site'] === 'W001' ? '西景区' : cur['site'] === 'S001' ? '南景区' : '';
      options['xAxis']['data'] = _.pluck(cur['data'], 'name');
      options['yAxis']['max'] = Math.max(..._.pluck(cur['data'], 'sell'), ..._.pluck(cur['data'], 'check'));
      options['series'][0]['data'] = _.pluck(cur['data'], 'sell');
      options['series'][1]['data'] = _.pluck(cur['data'], 'check');
      optionList.push(options)
    }
    return optionList;
  } catch (e) {
    console.log(e);
    return optionList;
  }
}

export { process, INIT_OPTION }
