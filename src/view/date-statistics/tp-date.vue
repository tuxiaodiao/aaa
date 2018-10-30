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
    refundHeaderHead: function () {
      return this.$store.state.statRefund.refundHeaderHead
    },
    // table表头中间动态变化字段
    refundHeaderDynamic: function () {
      return this.$store.state.statRefund.refundHeaderDynamic
    },
    // table表头末段固定字段
    refundHeaderFoot: function () {
      return this.$store.state.statRefund.refundHeaderFoot
    },
    // 监控table数据
    sourceData: function () {
      return this.$store.state.statRefund.refundDayData
    }
  },

  mounted: {},

  created () {
    this.refundDayData = {
      rows: [],
      count: 0
    }
    this.columnsList = _.union(this.refundHeaderHead, this.refundHeaderDynamic, this.refundHeaderFoot)
  },

  methods: {

    getQueryParams: function () {
      let args = arguments[0]
      console.log(args)
      this.getrefundDay(args)
    },
    getrefundDay: function (args) {
      // 获取业务数据
      this.$store.dispatch('getrefundDay', args)
    }
  },
  watch: {
    // 监控动态表头
    refundHeaderDynamic: function (val) {
      // 返回表头数据
      this.columnsList = _.union(this.refundHeaderHead, val, this.refundHeaderFoot)
    }
  }
}

</script>
