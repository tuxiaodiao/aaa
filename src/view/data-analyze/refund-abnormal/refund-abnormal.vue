<!--  -->
<style lang='less' scoped>
    @import './styles.less';
</style>

<template>
    <div>
        <div>
            <refund-abnormal-form @queryParams="getQueryParams"></refund-abnormal-form>
        </div>
        <div>
            <Echarts> </Echarts>
        </div>
    </div>
</template>

<script>
import refundAbnormalForm from './components/form'
import Echarts from './components/dataEcharts'
import * as dataConfig from './dataConfig'
import _ from 'underscore'
export default {
  name: 'refund-abnormal',
  components: {
    refundAbnormalForm, Echarts
  },
  data () {
    return {
    }
  },

  computed: {
    // 获取接口数据
    refundAbnormal () {
      return this.$store.state.analysis.refundAbnormal
    }

  },

  methods: {
    init () {
      let refundAbnormalOption = dataConfig.INIT_OPTION
      this.$store.commit('REFUND_ABNORMAL_OPTION', refundAbnormalOption)
      this.getApiData()
    },
    // 请求接口数据
    getApiData: async function () {
      let params = {
        start: arguments[0],
        end: arguments[1],
        site: arguments[2] || '_ALL_'
      }

      // 请求接口
      await this.$store.dispatch('refundAbnormal', params)
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites

      if (!_.isEmpty(this.refundAbnormal) && !_.isEmpty(sites)) {
        this.buildSeries(this.refundAbnormal, sites)
      }
    },

    buildSeries () {
      let arg = arguments[0]
      let sites = arguments[1]
      // 组装option数据
      let refundAbnormalOption = dataConfig.process(arg, sites)
      // 给页面option赋值
      this.$store.commit('REFUND_ABNORMAL_OPTION', refundAbnormalOption)
    },
    // 查询（接受子组件参数传递）
    getQueryParams () {
      let params = arguments[0]
      this.$store.commit('INIT_ANALYSIS_PROPERTY', { key: 'refundAbnormalOption', data: dataConfig['INIT_OPTION'] })
      this.getApiData(params['start'], params['end'], params['site'])
    }

  },
  mounted () {
    this.init()
  }

}

</script>
