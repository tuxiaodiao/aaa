<style lang="less" scoped>
    @import './styles.less';
</style>

<template>
  <div>
    <div>
      <map-form @queryParams="getQueryParams"></map-form>
    </div>
    <div>
      <dataEchartsMap :customersNum="customersNum" :bgColor="bgColor" :topNum="topNum" style="width:100%"> </dataEchartsMap>
      <!-- <gather-map :customersNum="customersNum" :bgColor="bgColor"></gather-map> -->
    </div>
  </div>

</template>

<script>
import moment from 'moment-timezone'
import dataEchartsMap from '_c/attr-place/dataEcharts'
// import gatherMap from '_c/gatherMap/gatherMap';
import mapForm from './components/form'
export default {
  name: 'attrPlace',
  components: {
    mapForm, dataEchartsMap
    // mapForm,gatherMap
  },
  data () {
    return {
      site: null,
      currentHandleDate: null,
      start: null,
      end: null,
      bgColor: '#18202d',
      topNum: 1,
      // customersNum:  [
      //   {
      //     name: '上海',
      //     value: 1300
      //   },
      //   {
      //     name: '河北',
      //     value: 2300
      //   },
      //   {
      //     name: '山西',
      //     value: 300
      //   },
      //   {
      //     name: '内蒙古',
      //     value: 600
      //   },
      //   {
      //     name: '辽宁',
      //     value: 100
      //   },
      //   {
      //     name:'吉林',
      //     value:4400
      //   },
      //   {
      //     name: '黑龙江',
      //     value: 1300
      //   },
      //   {
      //     name: '江苏',
      //     value: 2300
      //   },
      //   {
      //     name: '浙江',
      //     value: 300
      //   },
      //   {
      //     name: '安徽',
      //     value: 600
      //   },
      //   {
      //     name: '福建',
      //     value: 100
      //   },
      //   {
      //     name:'江西',
      //     value:4400
      //   },
      //   {
      //     name: '山东',
      //     value: 2300
      //   },
      //   {
      //     name: '河南',
      //     value: 300
      //   },
      //   {
      //     name: '湖北',
      //     value: 600
      //   },
      //   {
      //     name: '湖南',
      //     value: 100
      //   },
      //   {
      //     name:'广东',
      //     value:4400
      //   },
      //   {
      //     name: '广西',
      //     value: 2300
      //   },
      //   {
      //     name: '海南',
      //     value: 300
      //   },
      //   {
      //     name: '四川',
      //     value: 600
      //   },
      //   {
      //     name: '贵州',
      //     value: 100
      //   },
      //   {
      //     name:'云南',
      //     value:4400
      //   },
      //   {
      //     name: '西藏',
      //     value: 2300
      //   },
      //   {
      //     name: '陕西',
      //     value: 300
      //   },
      //   {
      //     name: '甘肃',
      //     value: 600
      //   },
      //   {
      //     name: '青海',
      //     value: 100
      //   },
      //   {
      //     name:'宁夏',
      //     value:4400
      //   },
      //   {
      //     name: '新疆',
      //     value: 2300
      //   },
      //   {
      //     name: '北京',
      //     value: 300
      //   },
      //   {
      //     name: '天津',
      //     value: 600
      //   },
      //   {
      //     name: '重庆',
      //     value: 100
      //   },
      //   {
      //     name:'香港',
      //     value: 4400
      //   }
      // ],

      customersNum: [
        // {
        //   code: '内蒙古',
        //   value: '10000',
        //   cityers: [
        //     {name: '呼伦贝尔', value: '100'},
        //     {name: '赤峰', value: '200'},
        //     {name: '包头', value: '100'},
        //     {name: '通辽', value: '110'},
        //     {name: '巴彦淖尔', value: '300'},
        //     {name: '乌海', value: '100000'}
        //   ]},
        //   {
        //   code: '北京',
        //   value: '20000',
        //   cityers: []},
        //   {
        //   code: '河北',
        //   value: '10000',
        //   cityers: [
        //     {name: '石家庄', value: '100'}
        //   ]},
        //   {
        //   code: '陕西',
        //   value: '90000',
        //   cityers: [
        //     {name: '西安', value: '100'}
        //   ]},
        //   {
        //   code: '湖南',
        //   value: '300',
        //   cityers: [
        //     {name: '长沙', value: '100'}
        //   ]},
        //   {
        //   code: '吉林',
        //   value: '2000',
        //   cityers: [
        //     {name: '长春', value: '100'}
        //   ]}
      ]
    }
  },
  computed: {

  },
  methods: {

    getQueryParams () {
      let params = arguments[0]
      // this.$store.commit('INIT_ANALYSIS_PROPERTY',{ key: 'agencyOption', data: dataConfig['INIT_OPTION'] })
      this.getApiData(params['start'], params['end'], params['site'])
    }
  },
  mounted () {
    // this.init();
  }
}
</script>
