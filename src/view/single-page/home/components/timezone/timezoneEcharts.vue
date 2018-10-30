<!--  -->
<style lang='less' scoped>
@import '../../styles.less';
</style>

<template>
  <div>
    <div v-for="item in options">
        <chart :options="item" auto-resize ref="myChart" class="echarts-peroid"></chart>
    </div>

  </div>
</template>

<script>
import _ from 'underscore'
import * as dataConfig from './dataConfig'

export default {
  name: 'timezoneEcharts',
  data () {
    return {
      peroidData: null
    }
  },

  components: {

  },

  computed: {
    // 获取接口数据
    timezone () {
      let tmp = this.$store.state.home.timezone
      this.peroidData = !_.isEmpty(tmp) ? tmp['data'] : []
      return tmp
    },
    options () {
      return this.$store.state.home.timezoneOption
    }
  },

  methods: {
    initTimezone () {
      if (!_.isEmpty(this.timezone)) {
        this.buildSeries(this.timezone)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      // 组装option数据
      let timezoneOption = dataConfig.process(arg)
      // 给页面option赋值
      this.$store.commit('TIMEZONE_OPTION', timezoneOption)
    }
  },
  mounted () {
    this.initTimezone()
  },
  watch: {
    timezone: function (val) {
      if (val) {
        this.initTimezone()
      }
    }
  }
}

</script>
