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
  name: 'secondIncomeEcharts',
  data () {
    return {
    }
  },

  components: {},

  computed: {
    // 获取接口数据
    secondIncome () {
      return this.$store.state.home.secondIncome
    },
    options () {
      return this.$store.state.home.secondIncomeOption
    }
  },

  methods: {
    initRepeat () {
      this.getDataApi()
    },
    getDataApi: async function () {
      // 请求接口
      await this.$store.dispatch('repeat')
      if (!_.isEmpty(this.secondIncome)) {
        this.buildSeries(this.secondIncome)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      // 组装option数据
      let secondIncomeOption = dataConfig.process(arg)
      // 给页面option赋值
      this.$store.commit('SECOND_INCOME_OPTION', secondIncomeOption)
    }
  },
  mounted () {
    this.initRepeat()
  }
}

</script>
