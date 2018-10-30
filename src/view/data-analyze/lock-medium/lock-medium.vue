<!--  -->
<style lang='less' scoped>
    @import './styles.less';
</style>

<template>
    <div>
        <div>
            <lock-medium-form @queryParams="getQueryParams"></lock-medium-form>
        </div>
        <div>
            <Echarts> </Echarts>
        </div>
    </div>
</template>

<script>
import LockMediumForm from './components/form'
import Echarts from './components/dataEcharts'
import * as dataConfig from './dataConfig'
import _ from 'underscore'
export default {
  name: 'lock-medium',
  components: {
    LockMediumForm, Echarts
  },
  data () {
    return {
    }
  },

  computed: {
    // 获取接口数据
    LockMedium () {
      return this.$store.state.analysis.LockMedium
    }
  },

  methods: {
    init () {
      let LockMediumOption = dataConfig.INIT_OPTION
      this.$store.commit('LOCK_MEDIUM_OPTION', LockMediumOption)
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
      await this.$store.dispatch('LockMedium', params)
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites
      if (!_.isEmpty(this.LockMedium) && !_.isEmpty(sites)) {
        this.buildSeries(this.LockMedium, sites)
      }
    },

    buildSeries () {
      let arg = arguments[0]
      let sites = arguments[1]
      // 组装option数据
      let LockMediumOption = dataConfig.process(arg, sites)
      // 给页面option赋值
      this.$store.commit('LOCK_MEDIUM_OPTION', LockMediumOption)
    },
    // 查询（接受子组件参数传递）
    getQueryParams () {
      let params = arguments[0]
      this.$store.commit('INIT_ANALYSIS_PROPERTY', { key: 'LockMediumOption', data: dataConfig['INIT_OPTION'] })
      this.getApiData(params['start'], params['end'], params['site'])
    }
  },
  mounted () {
    this.init()
  }
}

</script>
