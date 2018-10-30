<!--  -->
<style lang='less' scoped>
  @import './styles.less';
</style>

<template>
  <div class="margin-top-20">
    <div>
      <statForm @queryParams="getQueryParams"> </statForm>
    </div>

    <Card :bordered="false">
      <statDataTable :columnsList="columnsList" v-model="sourceData.rows" class="margin-bottom-30 margin-top-10">  </statDataTable>
      <Page :total="40" size="small" show-elevator show-sizer style="text-align:center"></Page>
    </Card>

  </div>
</template>

<script>
import _ from 'underscore'
import statDataTable from './components/statDataTable'
import statForm from './components/statForm'
export default {
  name: 'yp-data',
  data () {
    return {
      columnsList: []
    }
  },

  components: {
    statForm, statDataTable
  },

  computed: {

    // table表头前段固定字段
    checkHeaderHead: function () {
      return this.$store.state.statCheck.checkHeaderHead
    },
    // table表头中间动态变化字段
    checkHeaderDynamic: function () {
      return this.$store.state.statCheck.checkHeaderDynamic
    },
    // table表头末段固定字段
    checkHeaderFoot: function () {
      return this.$store.state.statCheck.checkHeaderFoot
    },
    // 监控table数据
    sourceData: function () {
      return this.$store.state.statCheck.checkDayData
    }
  },

  mounted: {},

  created () {
    this.checkDayData = {
      rows: [],
      count: 0
    }
    this.columnsList = _.union(this.checkHeaderHead, this.checkHeaderDynamic, this.checkHeaderFoot)
  },

  methods: {

    getQueryParams: function () {
      let args = arguments[0]
      console.log(args)
      this.getCheckDay(args)
    },
    getCheckDay: function (args) {
      // 获取业务数据
      this.$store.dispatch('getCheckDay', args)
    }

  },
  watch: {
    // 监控动态表头
    checkHeaderDynamic: function (val) {
      // 返回表头数据
      this.columnsList = _.union(this.checkHeaderHead, val, this.checkHeaderFoot)
    }
  }
}

</script>
