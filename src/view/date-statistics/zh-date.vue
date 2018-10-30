<style lang="less">
    @import 'styles.less';
</style>

<template>
  <div>
    <synStatForm @queryParams="getQueryParams"></synStatForm>
    <statDataTable :statType="statType" :columnsList="columnsList" v-model="sourceData.rows"></statDataTable>
    <periodModal></periodModal>
  </div>

</template>

<script>
import synStatForm from './components/synStatForm'
import statDataTable from './components/statDataTable'
import periodModal from './components/periodModal'
import _ from 'underscore'
export default {
  name: 'zh-data',
  components: {
    synStatForm, statDataTable, periodModal
  },
  data () {
    return {
      // columnsList: [],
      statType: ''
    }
  },
  computed: {
    // table表头前段固定字段
    synHeaderHead: function () {
      return this.$store.state.statSyn.synHeaderHead
    },
    // table表头中间动态变化字段
    synHeaderDynamic: function () {
      return this.$store.state.statSyn.synHeaderDynamic
    },
    columnsList () {
      return _.union(this.synHeaderHead, this.synHeaderDynamic, this.synHeaderFoot)
    },
    // table表头末段固定字段
    synHeaderFoot: function () {
      return this.$store.state.statSyn.synHeaderFoot
    },
    // 监控table数据
    sourceData: function () {
      return this.$store.state.statSyn.synDayData
    }
  },
  methods: {
    getQueryParams: function () {
      let args = arguments[0]
      this.statType = args['statType']
      this.getSynDay(args)
    },
    getSynDay: function (args) {
      // 获取业务数据
      this.$store.dispatch('getSynDay', args)
    }
  },
  created () {
    this.synDayData = {rows: [], count: 0}
  }
}
</script>
