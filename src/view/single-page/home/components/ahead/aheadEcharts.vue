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
  name: 'aheadEcharts',
  data () {
    return {
    }
  },

  components: {},

  computed: {
    // 获取接口数据
    ahead () {
      return this.$store.state.home.ahead
    },
    options () {
      return this.$store.state.home.aheadOption
    }
  },

  methods: {
    init () {
      this.getApiData()
    },
    getApiData: async function () {
      // 请求接口
      await this.$store.dispatch('saleUsePeriod')
      // 获取所有景点信息
      if (!_.isEmpty(this.ahead)) {
        this.buildSeries(this.ahead)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      // 组装option数据
      let aheadOption = dataConfig.process(arg)
      // 给页面option赋值
      this.$store.commit('AHEAD_OPTION', aheadOption)
    }
  },
  mounted () {
    this.init()
  }
}

</script>
