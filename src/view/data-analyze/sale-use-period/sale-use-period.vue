<!--  -->
<style lang='less' scoped>
    @import './styles.less';
</style>

<template>
    <div>
        <div>
            <sale-use-period-form @queryParams="getQueryParams"></sale-use-period-form>
        </div>
        <div>
            <Echarts> </Echarts>
        </div>
    </div>
</template>

<script>
import saleUsePeriodForm from './components/form'
import Echarts from './components/dataEcharts'
import * as dataConfig from './dataConfig'
import _ from 'underscore'
export default {
  name: 'sale-use-period',
  components: {
    saleUsePeriodForm, Echarts
  },
  data () {
    return {
    }
  },

  computed: {
    // 获取接口数据
    saleUsePeriod () {
      return this.$store.state.analysis.saleUsePeriod
    }
  },

  methods: {
    init () {
      let saleUsePeriodOption = dataConfig.INIT_OPTION
      this.$store.commit('SALE_USE_PERIOD_OPTION', saleUsePeriodOption)
      // this.getApiData()
    },
    // 请求接口数据
    getApiData: async function () {
      let params = {
        start: arguments[0],
        end: arguments[1],
        site: arguments[2] || '_ALL_'
      }
      // 请求接口
      await this.$store.dispatch('saleUsePeriod', params)
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites
      if (!_.isEmpty(this.saleUsePeriod) && !_.isEmpty(sites)) {
        this.buildSeries(this.saleUsePeriod, sites)
      }
    },

    buildSeries () {
      let arg = arguments[0]
      let sites = arguments[1]
      // 组装option数据
      let saleUsePeriodOption = dataConfig.process(arg, sites)
      // 给页面option赋值
      this.$store.commit('SALE_USE_PERIOD_OPTION', saleUsePeriodOption)
    },
    // 查询（接受子组件参数传递）
    getQueryParams () {
      let params = arguments[0]
      this.$store.commit('INIT_ANALYSIS_PROPERTY', { key: 'saleUsePeriodOption', data: dataConfig['INIT_OPTION'] })
      this.getApiData(params['start'], params['end'], params['site'])
    }
  },
  mounted () {
    this.init()
  }
}

</script>
