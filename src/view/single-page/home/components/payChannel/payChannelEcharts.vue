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
  name: 'payChannelEcharts',
  data () {
    return {
    }
  },

  components: {},

  computed: {
    // 获取接口数据
    homePay () {
      return this.$store.state.home.homePay
    },
    options () {
      return this.$store.state.home.homePayOption
    }
  },

  methods: {
    init () {
      this.getApiData()
    },
    getApiData: async function () {
      // 请求接口
      // await this.$store.dispatch('dimensionality');
      // 获取所有景点信息
      if (!_.isEmpty(this.homePay)) {
        this.buildSeries(this.homePay)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      // 组装option数据
      let homePayOption = dataConfig.process(arg)
      // 给页面option赋值
      this.$store.commit('HOME_PAY_OPTION', homePayOption)
    }
  },
  watch: {
    homePay (val) {
      if (val) {
        this.init()
      }
    }
  }
}

</script>
