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
  name: 'thermaEcharts',
  data () {
    return {
    }
  },

  components: {},

  computed: {
    // 获取接口数据
    // payChannel() {
    //   return this.$store.state.analysis.payChannel;
    // }
    options () {
      return this.$store.state.home.thermaOption
    }
  },

  methods: {
    init () {
      let thermaOption = dataConfig.INIT_OPTION
      this.$store.commit('THERMA_OPTION', thermaOption)
    }
  },

  mounted () {
    this.init()
  }
}

</script>
