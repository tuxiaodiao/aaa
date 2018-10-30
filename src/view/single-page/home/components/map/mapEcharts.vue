<!--  -->
<style lang='less' scoped>
@import '../../styles.less';
</style>

<template>
  <div>
    <dataEcharts :customersNum = 'mainCustomersNum' :bgColor = 'bgColor' style="width:100%"> </dataEcharts>
  </div>
</template>

<script>
import _ from 'underscore'
import * as dataConfig from './dataConfig'
import dataEcharts from '_c/attr-place/dataEcharts'

export default {
  name: 'mapEcharts',
  data () {
    return {
      currentHandleDate: null,
      bgColor: '#18202d'
    }
  },

  components: {dataEcharts},

  computed: {
    // 获取接口数据
    mainCustomersNumData () {
      return this.$store.state.home.mainCustomersNumData
    },
    mainCustomersNum () {
      return this.$store.state.home.mainCustomersNum
    }

  },

  methods: {
    init () {
      this.getDataApi()
    },
    getDataApi: function () {
      // 请求接口
      // this.$store.dispatch('HomeAttrPlace')

      if (!_.isEmpty(this.mainCustomersNumData)) {
        this.buildSeries(this.mainCustomersNumData)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      // 组装option数据
      let mainCustomersNum = dataConfig.process(arg)
      // 给页面option赋值
      this.$store.commit('MAIN_CUSTOMERS_NUM', JSON.stringify(mainCustomersNum))
    }
  },

  watch: {
    mainCustomersNumData (val) {
      if (val) {
        setTimeout(() => {
          this.init()
        }, 1000)
      }
    }
  }

}

</script>
