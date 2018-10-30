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
import _ from 'underscore'

export default {
  name: 'dataEcharts',
  data () {
    return {
    }
  },

  components: {},

  computed: {
    options () {
      return this.$store.state.analysis.appointmentOption
    }
  },

  methods: {}
}

</script>
