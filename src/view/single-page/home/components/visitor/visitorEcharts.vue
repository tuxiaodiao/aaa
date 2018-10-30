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
  name: 'visitorEcharts',
  data () {
    return {
    }
  },

  components: {},

  computed: {
    // 获取接口数据
    visitor () {
      return this.$store.state.home.visitor
    },
    options () {
      return this.$store.state.home.visitorOption
    }
  },

  methods: {
    initVisitor () {
      this.getDataApi()
    },
    getDataApi: async function () {
      // 请求接口
      // await this.$store.dispatch('dimensionality');
      if (!_.isEmpty(this.visitor)) {
        this.buildSeries(this.visitor)
      }
    },
    buildSeries () {
      let arg = arguments[0]
      // 组装option数据
      let visitorOption = dataConfig.process(arg)
      // 给页面option赋值
      this.$store.commit('VISITOR_OPTION', visitorOption)
    }
  },
  watch: {
    visitor (val) {
      if (val) {
        this.initVisitor()
      }
    }
  }
}

</script>
