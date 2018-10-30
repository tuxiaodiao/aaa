<!--  -->
<style lang='less' scoped>
    @import './styles.less';
</style>

<template>
    <div>
        <div>
            <seller-form @queryParams="getQueryParams"></seller-form>
        </div>
        <div>
            <Echarts> </Echarts>
        </div>
    </div>
</template>

<script>
import sellerForm from './components/form'
import Echarts from './components/dataEcharts'
import * as dataConfig from './dataConfig'
import _ from 'underscore'
export default {
  name: 'seller',
  components: {
    sellerForm, Echarts
  },
  data () {
    return {
    }
  },

  computed: {
    // 获取接口数据
    seller () {
      return this.$store.state.analysis.seller
    }
  },

  methods: {
    init () {
      let sellerOption = dataConfig.INIT_OPTION
      this.$store.commit('SELLER_OPTION', sellerOption)
      this.getApiData()
    },
    getQueryParams () {
      let params = arguments[0]
      this.$store.commit('INIT_ANALYSIS_PROPERTY', { key: 'sellerOption', data: dataConfig['INIT_OPTION'] })
      this.getApiData(params['start'], params['end'], params['site'])
    },
    getApiData: async function () {
      let params = {
        start: arguments[0],
        end: arguments[1],
        site: arguments[2] || '_ALL_'
      }
      // 请求接口
      await this.$store.dispatch('seller', params)
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites
      if (!_.isEmpty(this.seller) && !_.isEmpty(sites)) {
        this.buildSeries(this.seller, sites)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      let sites = arguments[1]
      // 组装option数据
      let sellerOption = dataConfig.process(arg, sites)
      // 给页面option赋值
      this.$store.commit('SELLER_OPTION', sellerOption)
    }
  },
  mounted () {
    this.init()
  }
}

</script>
