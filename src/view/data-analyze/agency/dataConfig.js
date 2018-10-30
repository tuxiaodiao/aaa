import _ from 'underscore';

    const INIT_OPTION = {
        backgroundColor: '#fff',
        title : {
            text: '',
            x:'center',
            subtext:''
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
    
        },
        legend: {
            
            orient: 'vertical',
            x: 'left',
            itemWidth: 14,
            itemHeight: 14,
            align: 'left', 
            data:[],
            textStyle: {
                color: '#333'
            }
        },
        series: [
            {
                name:'团队来源',
                type:'pie',
                hoverAnimation: false,
                legendHoverLink:false,
                radius: ['40%', '42%'],
                color: ['#915872', '#3077b7', '#307889','#9a8169', '#3f8797', '#5b8144',  '#9c6a79'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                   
                },
                tooltip: {
                   show:false,
                },
                
                data:[]
            },
            {
                name:'团队来源',
                type:'pie',
                radius: ['42%', '55%'],
                color: ['#d74e67', '#0092ff', '#01949b','#eba954', '#21b6b9', '#60a900',  ' #f17677'],
                label: {
                    normal: {
                        formatter: '{b}\n{d}%'
                    },
              
                },
                data:[]
            }
        ]
    };

    const process = function() {
        let arg = arguments[0];
        let dctSites = arguments[1];
        let options = JSON.parse(JSON.stringify(INIT_OPTION));
        let currentSite = _.find(dctSites, cur => { return cur['code'] === arg['sites'][0] });
        
        try {
            // 数据转换，组装echart需要的字段数据
            let legendData = [];
            
            var merge = [];
            arg['data'].forEach(item=>{
                item['data'].forEach(element => {
                    merge.push(element)
                })
            })
    
            var result = {};
            for(var i=0;i<merge.length;i++){
                //如果对象存在就累加，否则使用第一个值。
                result[(merge[i].organization_name)||"未知"] =! result[merge[i].organization_name] ? merge[i].value : result[merge[i].organization_name] + merge[i].value ;
            }
            for(let k in result){
                let insideTmp = {};
                insideTmp['name'] = '';
                insideTmp['value'] = result[k];
                let tmp = {};
                tmp['name'] = k;
                tmp['value'] = result[k];  
                options['series'][0]['data'].push(insideTmp)
                options['series'][1]['data'].push(tmp)
                legendData.push(tmp['name']);
            }
                       
            options['legend']['data'] = legendData           
            options['title']['text'] = '团队游客组成'   
            options['title']['subtext'] = currentSite.name+' '+arg['start']+'至'+arg['end'] 
            return options;
            } catch (e) {
                console.log(e);
                return options;
            }

    }

    const deal = function(){
        let arg = arguments[0];
        let dctSites = arguments[1];
        //表头数据
        let configColumns = [
            {title:'团队名称',key:'organization_name'},
            {title:'数量',key:'value'},
        ];
        //表格data
        let tableData = [];
      
        for(let item of arg['data']){ 
            let tmp = {};
            tmp['organization_name'] = item['organization_name']||'未知'
            tmp['value'] = item['value']
            tableData.push(tmp)
        }
        return {configColumns:configColumns, tableData:tableData};
      };
      

export { process, INIT_OPTION, deal}