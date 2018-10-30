<!--  -->
<style lang='less' scoped>
@import './styles.less';
</style>

<template>
  <div>
      <div>
            <age-form @queryParams="getQueryParams"></age-form>
        </div>
        <div>
            <Echarts> </Echarts>
        </div>
         <div>
            <analysis-table :columnsList="columnsList" v-model="tableData"></analysis-table>
        </div>
  </div>
</template>

<script>
import ageForm from './components/form'
import Echarts from './components/dataEcharts'
import analysisTable from './components/table'
import * as dataConfig from './dataConfig'
import _ from 'underscore'
export default {
  name: 'age',
  data () {
    return {
      columnsList: [],
      tableData: []
    }
  },

  components: {
    ageForm, Echarts, analysisTable
  },

  computed: {
    // 获取接口数据
    age () {
      return this.$store.state.analysis.age
    }
  },

  methods: {
    init () {
      this.getApiData()
    },
    getQueryParams () {
      let params = arguments[0]
      this.$store.commit('INIT_ANALYSIS_PROPERTY', { key: 'ageOption', data: dataConfig['INIT_OPTION'] })
      this.getApiData(params['start'], params['end'], params['site'])
    },
    getApiData: async function () {
      let params = {
        start: arguments[0],
        end: arguments[1],
        site: arguments[2] || '_ALL_'
      }

      // 请求接口
      await this.$store.dispatch('age', params)
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites
      if (!_.isEmpty(this.age) && !_.isEmpty(sites)) {
        this.buildSeries(this.age, sites)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      let sites = arguments[1]
      // 组装option数据
      let ageOption = dataConfig.process(arg, sites)
      // 给页面option赋值
      this.$store.commit('AGE_OPTION', ageOption)
      this.columnsList = []
      this.tableData = []
      this.columnsList = dataConfig.deal(arg, sites).configColumns
      this.tableData = dataConfig.deal(arg, sites).tableData
    }

  },

  mounted () {
    this.init()
  }
}

</script>
