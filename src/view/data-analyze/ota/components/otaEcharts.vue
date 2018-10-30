<template>
  <div>
    <chart :options="options" auto-resize ref="myChart" class="chart"></chart>
  </div>
</template>

<script>
export default {
  name: 'otaEcharts',
  data () {
    return {}
  },
  computed: {
    // 动态显示与处理option选项
    options () {
      return this.$store.state.analysis.otaOption
    }
  }
}
</script>

<style lang="less">
  @import '../styles.less';
</style>
