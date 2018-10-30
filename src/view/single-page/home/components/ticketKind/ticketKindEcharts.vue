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
  name: 'ticketKindEcharts',
  data () {
    return {
    }
  },

  components: {},

  computed: {
    // 获取接口数据
    ticketKind () {
      return this.$store.state.home.ticketKind
    },
    options () {
      return this.$store.state.home.ticketKindOption
    }
  },

  methods: {
    init () {
      this.getApiData()
    },
    getApiData: async function () {
      // 请求接口
      // await this.$store.dispatch('dimensionality');
      // 获取所有景点信息
      if (!_.isEmpty(this.ticketKind)) {
        this.buildSeries(this.ticketKind)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      // 组装option数据
      let ticketKindOption = dataConfig.process(arg)
      // 给页面option赋值
      this.$store.commit('TICKET_KIND_OPTION', ticketKindOption)
    }
  },
  watch: {
    ticketKind (val) {
      if (val) {
        this.init()
      }
    }
  }
}

</script>
