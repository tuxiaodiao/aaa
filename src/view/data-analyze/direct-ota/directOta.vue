<template>
  <div>
    <directOtaForm @queryParams="getQueryParams"></directOtaForm>
    <Card shadow>
      <directOtaEcharts></directOtaEcharts>
    </Card>
  </div>
</template>

<script>
import directOtaForm from './components/form'
import directOtaEcharts from './components/directOtaEcharts'
import * as dataConfig from './dataConfig'
import _ from 'underscore'

export default {
  name: 'directOta',
  components: {
    directOtaForm,
    directOtaEcharts
  },
  data () {
    return {}
  },
  computed: {
    // 获取接口数据
    directOta () {
      return this.$store.state.analysis.directOta
    }
  },
  methods: {
    init () {
      // 默认获取一周的数据
      this.initOption()
      this.getApiData()
    },
    // 初始化echart option数据
    initOption () {
      this.$store.commit('INIT_ANALYSIS_PROPERTY', { key: 'directOtaOption', data: dataConfig['INIT_OPTION'] })
    },
    // 请求接口数据
    getApiData: async function () {
      let params = {
        start: arguments[0],
        end: arguments[1],
        site: arguments[2] || '_ALL_'
      }
      // 请求接口
      await this.$store.dispatch('directOta', params)
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites
      if (!_.isEmpty(this.directOta) && !_.isEmpty(sites)) {
        this.buildSeries(this.directOta, sites)
      }
    },
    // 处理图表需要显示的数据
    buildSeries () {
      let arg = arguments[0]
      let sites = arguments[1]
      // 组装option数据
      let directOtaOption = dataConfig.process(arg, sites)
      // 给页面option赋值
      this.$store.commit('DIRECT_OTA_OPTION', directOtaOption)
    },
    // 查询（接受子组件参数传递）
    getQueryParams () {
      let params = arguments[0]
      this.initOption()
      this.getApiData(params['start'], params['end'], params['site'])
    }
  },
  mounted () {
    this.init()
  },
  destroyed () {
    // 清除状态缓存
    this.initOption()
  }
}
</script>

<style lang="less">
  @import './styles.less';
</style>
