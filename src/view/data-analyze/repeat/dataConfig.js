
import _ from 'underscore'
var dataStyle = {
  normal: {
    label: {
      show: true,
      color: '#333',
      fontSize: 18
    },
    labelLine: {
      // smooth: 0.2,
      length: 50,
      length2: 40
    }
  }
}

var labelShow = {
  show: true,
  color: '#333',
  fontSize: 15,
  formatter: [
    '{d| {d}% }',
    '{b| {b} }'
  ].join('\n'),
  rich: {
    d: {
      fontSize: 14,
      color: '#333'
    },
    b: {
      fontSize: 12,
      color: '#333'
    }
  }
}

var placeHolderStyle = {
  normal: {
    color: 'rgba(0,0,0,0)',
    label: {
      show: false
    },
    labelLine: {
      show: false
    }
  },
  emphasis: {
    color: 'rgba(0,0,0,0)'
  }
}

const INIT_OPTION = {
  title: {
    text: '二次入区分析',
    x: 'left',
    subtext: ''
  },
  color: ['#2078d1', '#8a00ec', '#ff00f3', '#fb0065', '#ff941b'],
  tooltip: {
    show: true,
    formatter: '{b} <br/> {c} ({d}%)'
  },
  angleAxis: {
    type: 'category',
    z: 10,
    axisLine: {
      color: '#333',
      lineStyle: {
        width: 3,
        color: '#333'
      }
    }
  },

  legend: {

    bottom: '5%',
    textStyle: {
      color: '#333'
    },
    itemGap: 12,
    data: ['一类烟']
  },
  radiusAxis: {
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false,
      color: '#fff'
    },
    axisLine: {
      show: false,
      color: '#fff',
      lineStyle: {
        color: '#fff'
      }
    },
    splitLine: {
      color: '#000',
      lineStyle: {
        type: 'dotted',
        color: 'rgba(3,3,3,.5)'
      }
    }

  },
  polar: {
    center: ['50%', '50%'],
    radius: 140
  },
  series: [
    {
      name: '',
      type: 'pie',
      clockWise: false,
      radius: [80, 95],
      itemStyle: dataStyle,
      hoverAnimation: false,
      data: [
        {
          value: 260,
          name: '',
          itemStyle: placeHolderStyle
        },
        {
          value: 100,
          name: '一类烟',
          label: labelShow
        },
        {
          value: 0,
          name: '',
          itemStyle: placeHolderStyle
        }

      ]
    },
    {
      type: 'bar',
      data: [0],
      coordinateSystem: 'polar',
      name: '06a',
      stack: 'a'
    }

  ]

}

const process = function () {
  let arg = arguments[0]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  // try{
  //     let origin = 0;
  //     let total =0;
  //     arg['data']['data'].forEach(e => {
  //         total += e['value']
  //     })
  //     let result = arg['data']['data']
  //     for(let i=0;i<result.length;i++){
  //         let randomStart = Math.floor(Math.random()*70)+60;
  //         let randomWidth = Math.floor(Math.random()*15)+5;
  //         let item = {
  //             type: 'pie',
  //             clockWise: false,
  //             hoverAnimation: false,
  //             //radius: [62, 72],
  //             itemStyle: dataStyle,
  //             textStyle:{fontSize:10},
  //             data: []
  //         };
  //         item.radius=[randomStart , randomStart+randomWidth]
  //         let itemData = [];
  //         itemData = [
  //             {
  //                 value: total-origin-result[i]['value'],
  //                 name:'',
  //                 itemStyle: placeHolderStyle
  //             },{
  //                 value: result[i]['value'],
  //                 name: result[i]['name']?result[i]['name']:'',
  //                 label: labelShow
  //             },{
  //                 value: origin,
  //                 name:'',
  //                 itemStyle: placeHolderStyle
  //             }
  //         ]
  //         origin += result[i]['value']
  //         item.data = itemData
  //         options['series'].push(item)
  //     }
  //     function legendFormatter (name){
  //         return arg['data']['hm_total']+'\n'+arg['data']['rate']+'%'

  //     }
  //     if (!_.isEmpty(result)) {
  //         options['legend']['data'][0]=result[0]['name']
  //     }else{
  //         options['legend']['data'][0] = ''
  //     }
  //     options['legend']['formatter']=legendFormatter

  //     return options;
  // }catch(e){
  //     console.log(e);
  //     return options;
  // }
}

export { process, INIT_OPTION}
