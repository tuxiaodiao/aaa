<!--  -->
<style lang='less' scoped>
@import '../../styles.less';
</style>

<template>
  <div>
    <chart :options="options" auto-resize ref="myChart" class="chart"></chart>
  </div>
</template>

<script>
import _ from 'underscore'
import * as dataConfig from './dataConfig'

export default {
  name: 'inSevenDaysEcharts',
  data () {
    return {
    }
  },

  components: {},

  computed: {
    // 获取接口数据
    inSevenDays () {
      return this.$store.state.home.inSevenDays
    },
    options () {
      return this.$store.state.home.inSevenDaysOption
    }
  },

  methods: {
    init () {
      this.getDataApi()
    },
    getDataApi: async function () {
      // 请求接口
      await this.$store.dispatch('dayPeriod')
      let sites = this.$store.state.statCommon.dctSites

      if (!_.isEmpty(this.inSevenDays)) {
        this.buildSeries(this.inSevenDays, sites)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      let sites = arguments[1]
      // 组装option数据
      let inSevenDaysOption = dataConfig.process(arg)
      // 给页面option赋值
      this.$store.commit('IN_SEVEN_DAYS_OPTION', inSevenDaysOption)
    }
  },
  mounted () {
    this.init()
  }
}

</script>
