<!--  -->
<style lang='less' scoped>
@import "../../styles.less";
</style>

<template>
  <div>
    <chart :options="options" auto-resize ref="myChart" class="chart"></chart>
    <!-- <div id="echarts" class="chart"></div> -->
  </div>
</template>

<script>
import _ from 'underscore'
import * as dataConfig from './dataConfig'
import * as echarts from 'echarts'
import 'echarts-liquidfill/src/liquidFill.js'

export default {
  name: 'westEcharts',
  data () {
    return {
      default: function () {
        return {
          siteStat: {
            siteStat: null
          }
        }
      }
    }
  },

  components: {},

  computed: {
    siteStat () {
      return this.$store.state.home.siteStat
    },
    options () {
      return this.$store.state.home.westOption
    }
  },

  methods: {
    initWest () {
      this.getDataApi()
    },
    getDataApi: async function () {
      // 请求接口
      // await this.$store.dispatch('dimensionality');
      if (!_.isEmpty(this.siteStat)) {
        this.buildSeries(this.siteStat)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      // 组装option数据
      let westOption = dataConfig.process(arg)
      // 给页面option赋值
      this.$store.commit('WEST_OPTION', westOption)
    }
  },
  watch: {
    siteStat (val) {
      if (val) {
        this.initWest()
      }
    }
  }
}
</script>
