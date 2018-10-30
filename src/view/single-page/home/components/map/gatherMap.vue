<!--  -->
<style lang='less' scoped>
@import '../../styles.less';
</style>

<template>
  <div>
    <gatherMap :customersNum = 'mainCustomersNum' :bgColor = 'bgColor' style="width:100%"> </gatherMap>
  </div>
</template>

<script>
import _ from 'underscore'
import gatherMap from '_c/gather-map/gatherMap'

export default {
  name: 'gatherMap',
  data () {
    return {
      currentHandleDate: null,
      bgColor: '#18202d',

      mainCustomersNum: [
        // {
        //   code: '内蒙古',
        //   value: '10000',
        //   citys: [
        //     {city: '呼伦贝尔', value: '100'},
        //     {city: '赤峰', value: '200'},
        //     {city: '包头', value: '100'},
        //     {city: '通辽', value: '110'},
        //     {city: '巴彦淖尔', value: '300'},
        //     {city: '乌海', value: '100000'}
        //   ]},
        //   {
        //   code: '北京',
        //   value: '20000',
        //   citys: []},
        //   {
        //   code: '河北',
        //   value: '10000',
        //   citys: [
        //     {city: '石家庄', value: '100'}
        //   ]},
        //   {
        //   code: '陕西',
        //   value: '90000',
        //   citys: [
        //     {city: '西安', value: '100'}
        //   ]},
        //   {
        //   code: '湖南',
        //   value: '50000',
        //   citys: [
        //     {city: '长沙', value: '100'}
        //   ]},
        //   {
        //   code: '吉林',
        //   value: '30000',
        //   citys: [
        //     {city: '长春', value: '100'}
        //   ]}
      ]
    }
  },

  components: {gatherMap},

  computed: {
    // 获取接口数据
    // mainCustomersNumData() {
    //    return this.$store.state.home.mainCustomersNumData;
    // },
    // mainCustomersNum () {
    //     return this.$store.state.home.mainCustomersNum;
    // }

  },

  methods: {
    // init(){
    //     this.getDataApi();
    // },
    //  getDataApi:function() {
    //     // 请求接口
    //     //this.$store.dispatch('HomeAttrPlace')

    //     if (!_.isEmpty(this.mainCustomersNumData)) {
    //         this.buildSeries(this.mainCustomersNumData);
    //     }

    // },
    // buildSeries () {
    //     let arg = arguments[0];
    //     // 组装option数据
    //     let mainCustomersNum = dataConfig.process(arg);
    //     // 给页面option赋值
    //     this.$store.commit('MAIN_CUSTOMERS_NUM', mainCustomersNum);
    // },
  },

  watch: {
    // mainCustomersNumData(val){
    //   if(val){
    //     setTimeout(() => {
    //        this.init();
    //     }, 1000)

    //   }
    // }
  }

}

</script>
