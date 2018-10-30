
import _ from 'underscore'

const INIT_OPTION = {
  backgroundColor: '#18202d',
  title: {
    text: '西坡',
    textStyle: {
      color: '#fff',
      fontSize: 14,
      align: 'center'
    }
  },

  series: [{
    type: 'liquidFill',
    animation: true,
    waveAnimation: true,
    // data: [0.76, 0.70, 0.68],
    data: [],
    color: ['#49d088', '#38b470', '#2aaf66'],
    center: ['25%', '50%'],
    waveLength: '60%',
    amplitude: 8,
    radius: '50%',
    label: {
      normal: {
        // formatter: function() {
        //     return '售票\n\n76人';
        // },
        textStyle: {
          fontSize: 20,
          color: '#44c078'
        },
        position: ['50%', '34%']
      }
    },
    outline: {
      itemStyle: {
        borderColor: '#49d088',
        borderWidth: 3
      },
      borderDistance: 0
    },
    itemStyle: {
      normal: {
        backgroundColor: '#fff'
      }
    }
  }, {
    animation: true,
    waveAnimation: true,
    type: 'liquidFill',
    data: [0.66, 0.6, 0.5],
    color: ['#eb594b', '#e44d46', '#dc403f'],
    center: ['75%', '50%'],
    radius: '50%',
    amplitude: 8,
    label: {
      normal: {
        // formatter: function() {
        //     return '验票\n\n66人'
        // },
        textStyle: {
          fontSize: 20,
          color: '#e35140'
        },
        position: ['50%', '34%']
      }
    },
    outline: {
      itemStyle: {
        borderColor: '#e35140',
        borderWidth: 3
      },
      borderDistance: 0
    },
    itemStyle: {
      normal: {
        backgroundColor: '#fff'
      }
    }
  }]
}

const process = function () {
  let arg = arguments[0]
  let options = JSON.parse(JSON.stringify(INIT_OPTION))
  try {
    let w_data = _.filter(arg, cur => { return cur['name'] === 'W001' })

    let sell = 0
    let check = 0
    if (!_.isEmpty(w_data)) {
      check = w_data[0]['check']
      sell = w_data[0]['sell']
    }
    // for (let i=0;i<arg.length;i++) {
    //     if(arg[i]['name']==='W001'){
    //         sell = arg[i]['sell']
    //         check = arg[i]['check']
    //     }else if(!arg[i]['name']==='W001'){
    //         sell = 0
    //         check = 0

    //     }
    //  }
    function labelFormatter () {
      return '售票\n\n' + sell + '人'
    }
    function labelFormatterSecond () {
      return '验票\n\n' + check + '人'
    }

    options['series'][0]['data'] = [sell / 13000, sell / 13000 - 0.06, sell / 13000 - 0.1]
    options['series'][0]['label']['normal']['formatter'] = labelFormatter
    options['series'][1]['data'] = [check / 13000, check / 13000 - 0.06, check / 13000 - 0.1]
    options['series'][1]['label']['normal']['formatter'] = labelFormatterSecond

    return options
  } catch (e) {
    console.log(e)
    return options
  }
}

export { process, INIT_OPTION}
