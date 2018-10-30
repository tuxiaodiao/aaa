<style lang="less" scoped>
  @import '../styles.less';
</style>

<template>
  <div>
    <card :bordered="false">
      <chart :options="options" auto-resize ref="myChart" class="chart"></chart>
    </card>
  </div>
</template>

<script>
export default {
  name: 'dataEcharts',
  data () {
    return {}
  },
  computed: {
    // 动态显示与处理option选项
    options () {
      return this.$store.state.analysis.customerFlowOption
    }
  },
  mounted () {
  },
  methods: {

  },
  destroyed () {
  }
}
</script>
