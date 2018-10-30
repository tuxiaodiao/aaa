

var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];

const INIT_OPTION = {
    backgroundColor: '#18202d',
    title: {
        text: '售票渠道分析',
        x:'left',
        textStyle:{
            color:'#fff',
            fontSize:14,
            height:16,
            lineHeight:16
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLine:{
            lineStyle:{
                color:'#fff'
            },
        },
        axisLabel: {        
            show: true,
            
            textStyle: {
                color: '#fff',
                fontSize:'12'
            }
        },
        splitLine:{
            lineStyle:{
                color:"#999"
            }
        }
    },
    yAxis: {
        type: 'category',
        data: [],
        axisLabel: {        
            show: true,
            textStyle: {
                color: '#fff',
                fontSize:'12'
            }
        },
        axisLine:{
            lineStyle:{
                color:'#fff'
            },
        },
        
    },
    series: [
        {
            name: '',
            type: 'bar',
            itemStyle: {
                normal: {
                    
                }
            },
            data: [],
        },
    ]
};

const process = function() {
    let arg = arguments[0];
    let options = JSON.parse(JSON.stringify(INIT_OPTION));
    try{
        let yAxisData =[]
        let seriesData =[]
        for (let i=0;i<arg.length;i++) {
            yAxisData.push(arg[i]['name'])       
            seriesData.push(arg[i]['value'])       
        }
        function seriesColor(params) {
            var num = myColor.length;
            return myColor[params.dataIndex % num]
        }
        options['yAxis']['data'] =  yAxisData   
        options['series'][0]['data'] = seriesData
        options['series'][0]['itemStyle']['normal']['color'] = seriesColor
        return options;
    }catch(e){
        console.log(e);
            return options;
    }
}

export { process, INIT_OPTION}