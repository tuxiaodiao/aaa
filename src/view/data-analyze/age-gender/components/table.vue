<!--  -->
<style lang='less' scoped>
    @import '../styles.less';
</style>

<template>
  <div  class="margin-top-20">
        <h3 class="site-title">{{data.site}}</h3>
        <Table :columns="columns" :data='value'  border disabled-hover></Table>
  </div>
</template>

<script>
import * as dataConfig from '../dataConfig'
import _ from 'underscore'

export default {
  props: {
    data: Object
  },
  data () {
    return {
      columns: [],
      value: []
    }
  },

  computed: {},

  methods: {

  },
  watch: {
    data (val) {
      if (!_.isEmpty(val)) {
        let resData = dataConfig.deal(val)
        this.columns = resData.configColumns
        this.value = resData.tableData
      }
    }
  }

}

</script>
