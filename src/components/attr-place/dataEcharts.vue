<style lang='less' scoped>
  #chart-panel{
    width: 20%;
    >div{
      width: 100%;
    }
  }
</style>

<template>
  <div id="chart-panel" style="height: 600px;"></div>
</template>

<script>
import * as dataConfig from './dataConfig'
import { echartsMap } from './echartsMap'

export default {
  name: 'dataEcharts',
  data () {
    return {
      options: {
        tmpData: null
      }
    }
  },
  computed: {

  },
  props: {
    customersNum: String,
    bgColor: String
  },

  methods: {
    init: function () {
      echartsMap.registerMap('中国', dataConfig.cityMap['中国'])
      echartsMap.extendsMap('chart-panel', {
        bgColor: this.bgColor, // 画布背景色
        mapName: '中国', // 地图名
        text: '客源地',
        goDown: true, // 是否下钻
        // 下钻回调
        callback: function (name, option, instance) {
          // console.log(name, option, instance);
        },
        // 数据展示
        data: JSON.parse(this.customersNum) || []
      })
    }
  },

  mounted () {
    this.init()
  },
  watch: {
    customersNum: function (val) {
      if (val && val !== this.tmpData) {
        this.tmpData = val
        this.init()
      }
    }
  }
}

</script>
