<!--  -->
<style lang='less' scoped>
@import './styles.less';
</style>

<template>
  <div>
      <div>
            <appointment-form @queryParams="getQueryParams"></appointment-form>
        </div>
        <div>
            <Echarts> </Echarts>
        </div>
  </div>
</template>

<script>
import appointmentForm from './components/form'
import Echarts from './components/dataEcharts'
import * as dataConfig from './dataConfig'
import _ from 'underscore'
export default {
  name: 'appointment',
  data () {
    return {
    }
  },

  components: {
    appointmentForm, Echarts
  },

  computed: {
    // 获取接口数据
    appointment () {
      return this.$store.state.analysis.appointment
    }
  },

  methods: {
    init () {
      let appointmentOption = dataConfig.INIT_OPTION
      this.$store.commit('APPOINTMENT_OPTION', appointmentOption)
      // this.getApiData();
    },
    getQueryParams () {
      let params = arguments[0]
      this.$store.commit('INIT_ANALYSIS_PROPERTY', { key: 'appointmentOption', data: dataConfig['INIT_OPTION'] })

      this.getApiData(params['start'], params['end'], params['site'])
    },
    getApiData: async function () {
      let params = {
        start: arguments[0],
        end: arguments[1],
        site: arguments[2] || '_ALL_'
      }

      // 请求接口
      await this.$store.dispatch('appointment', params)
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites
      if (!_.isEmpty(this.appointment) && !_.isEmpty(sites)) {
        this.buildSeries(this.appointment, sites)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      let sites = arguments[1]
      // 组装option数据
      let appointmentOption = dataConfig.process(arg, sites)
      // 给页面option赋值
      this.$store.commit('APPOINTMENT_OPTION', appointmentOption)
    }

  },

  mounted () {
    this.init()
  }
}

</script>
