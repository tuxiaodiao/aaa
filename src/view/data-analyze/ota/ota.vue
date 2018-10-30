<template>
  <div>
    <otaForm @queryParams="getQueryParams"></otaForm>
    <Card shadow>
      <otaEcharts></otaEcharts>
    </Card>
  </div>
</template>

<script>
import otaForm from './components/form'
import otaEcharts from './components/otaEcharts'
import * as dataConfig from './dataConfig'
import _ from 'underscore'

export default {
  name: 'ota',
  components: {
    otaForm,
    otaEcharts
  },
  data () {
    return {}
  },
  computed: {
    // 获取接口数据
    ota () {
      return this.$store.state.analysis.ota
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
      this.$store.commit('INIT_ANALYSIS_PROPERTY', { key: 'otaOption', data: dataConfig['INIT_OPTION'] })
    },
    // 请求接口数据
    getApiData: async function () {
      let params = {
        start: arguments[0],
        end: arguments[1],
        site: arguments[2] || '_ALL_'
      }
      // 请求接口
      await this.$store.dispatch('ota', params)
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites
      if (!_.isEmpty(this.ota) && !_.isEmpty(sites)) {
        this.buildSeries(this.ota, sites)
      }
    },
    // 处理图表需要显示的数据
    buildSeries () {
      let arg = arguments[0]
      let sites = arguments[1]
      // 组装option数据
      let otaOption = dataConfig.process(arg, sites)
      // 给页面option赋值
      this.$store.commit('OTA_OPTION', otaOption)
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
