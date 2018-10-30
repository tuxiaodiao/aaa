<!--  -->
<style lang='less' scoped>
    @import './styles.less';
</style>

<template>
    <div>
        <div>
            <tickets-kind-form @queryParams="getQueryParams"></tickets-kind-form>
        </div>
        <div>
            <Echarts> </Echarts>
        </div>
    </div>
</template>

<script>
import ticketsKindForm from './components/form'
import Echarts from './components/dataEcharts'
import * as dataConfig from './dataConfig'
import _ from 'underscore'
export default {
  name: 'tickets-kind',
  components: {
    ticketsKindForm, Echarts
  },
  data () {
    return {
    }
  },

  computed: {
    // 获取接口数据
    ticketsKind () {
      return this.$store.state.analysis.ticketsKind
    }
  },

  methods: {
    init () {
      let ticketsKindOption = dataConfig.INIT_OPTION
      this.$store.commit('TICKETS_KIND_OPTION', ticketsKindOption)
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
      await this.$store.dispatch('ticketsKind', params)
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites
      if (!_.isEmpty(this.ticketsKind) && !_.isEmpty(sites)) {
        this.buildSeries(this.ticketsKind, sites)
      }
    },

    buildSeries () {
      let arg = arguments[0]
      let sites = arguments[1]
      // 组装option数据
      let ticketsKindOption = dataConfig.process(arg, sites)
      // 给页面option赋值
      this.$store.commit('TICKETS_KIND_OPTION', ticketsKindOption)
    },
    // 查询（接受子组件参数传递）
    getQueryParams () {
      let params = arguments[0]
      this.$store.commit('INIT_ANALYSIS_PROPERTY', { key: 'ticketsKindOption', data: dataConfig['INIT_OPTION'] })
      this.getApiData(params['start'], params['end'], params['site'])
    }
  },
  mounted () {
    this.init()
  }
}

</script>
