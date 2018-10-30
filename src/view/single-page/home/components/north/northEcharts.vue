<!--  -->
<style lang='less' scoped>
@import '../../styles.less';
</style>

<template>
  <div>
    <chart :options="options" auto-resize ref="myChart" class="chart"></chart>
  </div>
</template>

<script>
import _ from 'underscore'
import * as dataConfig from './dataConfig'

export default {
  name: 'northEcharts',
  data () {
    return {
    }
  },

  computed: {
    // 获取接口数据
    siteStat () {
      return this.$store.state.home.siteStat
    },
    options () {
      return this.$store.state.home.northOption
    }
  },

  methods: {
    initNorth () {
      // let northOption = dataConfig.INIT_OPTION;
      // this.$store.commit('NORTH_OPTION', northOption);
      this.getDataApi()
    },
    getDataApi: async function () {
      // 请求接口
      // await this.$store.dispatch('dimensionality');
      if (!_.isEmpty(this.siteStat)) {
        this.buildSeries(this.siteStat)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      // 组装option数据
      let northOption = dataConfig.process(arg)
      // 给页面option赋值
      this.$store.commit('NORTH_OPTION', northOption)
    }
  },

  watch: {
    siteStat (val) {
      if (val) {
        this.initNorth()
      }
    }
  }
}

</script>
