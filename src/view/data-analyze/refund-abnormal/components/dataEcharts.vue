<!--  -->
<style lang='less' scoped>
@import '../styles.less';
</style>

<template>
  <div>
    <card :bordered="false">
        <chart ref='raChart' :options="options" auto-resize class="chart"></chart>
    </card>
  </div>
</template>

<script>
import * as dataConfig from '../dataConfig'

export default {
  name: 'dataEcharts',
  data () {
    return {

    }
  },

  computed: {
    options () {
      return this.$store.state.analysis.refundAbnormalOption
    }
  },

  methods: {

  }

}

</script>
