<template>
  <div>
    <chart :options="options" auto-resize ref="myChart" class="chart"></chart>
  </div>
</template>

<script>
export default {
  name: 'directEcharts',
  data () {
    return {}
  },
  computed: {
    // 动态显示与处理option选项
    options () {
      return this.$store.state.analysis.directOption
    }
  }
}
</script>

<style lang="less">
  @import '../styles.less';
</style>
