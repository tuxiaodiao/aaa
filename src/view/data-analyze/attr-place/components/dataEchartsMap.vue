<template>
  <div id="chart-panel" style="width: 70%; height: 600px;"></div>
</template>

<script>
import * as dataConfig from './dataConfig'
import { echartsMap } from './echartsMap'

export default {
  name: 'dataEchartsMap',
  data () {
    return {
      options: {}
    }
  },
  computed: {

  },
  props: {
    customersNum: Array,
    bgColor: String,
    topNum: Number
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
        data: this.customersNum,
        topNum: this.topNum
      })
    }
  },

  mounted () {
    console.log(this.customersNum)
    this.init()
  }
}

</script>
