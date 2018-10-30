<!--  -->
<style lang='less' scoped>
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
import * as dataConfig from '../dataConfig'

export default {
  name: 'dataEcharts',
  data () {
    return {

    }
  },

  computed: {
    options () {
      return this.$store.state.analysis.agencyOption
    }
  },

  methods: {

  }

}

</script>
