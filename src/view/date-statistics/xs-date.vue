
<style lang='less' scoped>
  @import './styles.less';
</style>

<template>
  <div class="margin-top-5">

    <div>
      <statForm @queryParams="getQueryParams" @exportExcel="exportExcel"> </statForm>
    </div>

    <Card :bordered="false">
      <statDataTable ref="refStatDataTable"
                     :loading="loading"
                     :columnsList="columnsList"
                     v-model="tableData">
      </statDataTable>
      <Page class="sale-day-page"
            ref="xs-pages"
            :total="sourceData.rows.length"
            :page-size="limit"
            size="small"
            show-total
            @on-change="handlePageDown">
      </Page>
    </Card>

  </div>
</template>

<script>
import _ from 'underscore'
import statDataTable from './components/statDataTable'
import statForm from './components/statForm'
import moment from 'moment-timezone'
import excel from '@/libs/excel'
export default {
  name: 'xs-data',
  data () {
    return {
      statType: null,
      statDateType: null,
      site: null,
      start: null,
      end: null,
      currentPage: 1,
      offset: 0,
      limit: 10
    }
  },

  components: {
    statForm, statDataTable
  },

  computed: {
    // table表头前段固定字段
    statHeaderHead: function () {
      return this.$store.state.statDay.statHeaderHead
    },
    // table表头中间动态变化字段
    statHeaderDynamic: function () {
      return this.$store.state.statDay.statHeaderDynamic
    },
    // table表头末段固定字段
    statHeaderFoot: function () {
      return this.$store.state.statDay.statHeaderFoot
    },
    // 监控table数据
    sourceData: function () {
      return this.$store.state.statDay.statDayData
    },
    // 表头
    columnsList () {
      return _.union(this.statHeaderHead, this.statHeaderDynamic, this.statHeaderFoot)
    },
    // 表数据
    tableData () {
      return this.sourceData.rows.slice(this.offset, this.offset + this.limit)
    },
    // loading
    loading: function () {
      return this.$store.state.statCommon.loading
    }
  },
  created () {
    this.statDayData = {rows: [], count: 0}
    this.$store.commit('INIT_STAT_HEADER_COLUMN', {})
  },
  methods: {
    // 导出EXCEL
    exportExcel: function () {
      try {
        if (this.sourceData.rows.length) {
          this.$store.commit('STAT_DAY_SET_PROPERTY_BY_KEY', { key: 'exportLoading', value: true })
          // console.log("columnsList: " + JSON.stringify(this.columnsList));
          // console.log("sourceData.rows: " + JSON.stringify(this.sourceData.rows));
          let filename = this.site + '_' + this.statType + '_' + moment(this.start).format('YYMMDD') + '-' + moment(this.end).format('YYMMDD')
          let excelDataList = this.buildExcelData()
          // console.log("excelDataList: " + JSON.stringify(excelDataList));
          const params = {
            title: _.pluck(this.columnsList, 'title'),
            key: _.pluck(this.columnsList, 'key'),
            data: excelDataList,
            autoWidth: true,
            filename: filename
          }
          excel.export_array_to_excel(params)
          this.$store.commit('STAT_DAY_SET_PROPERTY_BY_KEY', { key: 'exportLoading', value: false })
        } else {
          this.$Message.info('表格数据不能为空！')
        }
      } catch (e) {
        this.$store.commit('STAT_DAY_SET_PROPERTY_BY_KEY', { key: 'exportLoading', value: false })
      }
    },
    // excel中data的转换
    buildExcelData: function () {
      let dctSites = this.$refs['refStatDataTable'].dctSites
      // console.log("dctSites: " + JSON.stringify(dctSites));
      let dctTabDctCommon = this.$refs['refStatDataTable'].dctTabDctCommon
      // console.log("dctTabDctCommon: " + JSON.stringify(dctTabDctCommon));
      let dctTabDctSpec = this.$refs['refStatDataTable'].dctTabDctSpec
      // console.log("dctTabDctSpec: " + JSON.stringify(dctTabDctSpec));
      let excelDataList = []
      // 处理原始数据
      for (let cur of this.sourceData.rows) {
        let excelDataDct = {}
        let rel_type =
        excelDataDct['stat_date'] = cur['stat_date']
        excelDataDct['site'] = _.find(dctSites, item => { return item['code'] === cur['site'] })['name']
        excelDataDct['stat_type'] = this.statType === 'SELL' ? '销售' : this.statType === 'REFUND' ? '退票' : this.statType === 'CHECK' ? '验票' : '未知'
        excelDataDct['stat_date_type'] = this.statDateType === '11' ? '销售日期' : '入园日期'
        excelDataDct['is_virtual'] = cur['is_virtual'] ? '是' : '否'
        excelDataDct['total'] = cur['total']
        excelDataDct['amount'] = cur['amount'] ? (cur['amount'] / 100).toFixed(2) : '0.00'
        // console.log("cur: " + JSON.stringify(cur));
        // console.log("this.statHeaderDynamic: " + JSON.stringify(this.statHeaderDynamic));
        // 处理动态字段
        for (let col of this.statHeaderDynamic) {
          excelDataDct[col['key']] = col.rel_type ? dctTabDctSpec[cur['site']][col['key']][cur[col['key']]] : dctTabDctCommon[col['key']][cur[col['key']]]
        }
        excelDataList.push(excelDataDct)
      }
      return excelDataList
    },
    // 分页
    handlePageDown: function () {
      let currentPage = this.$refs['xs-pages'].currentPage
      this.offset = currentPage === 1 ? 0 : (currentPage - 1) * this.limit
    },
    // 获取form数据
    getQueryParams: function () {
      let args = arguments[0]
      this.getStatDay(args)
    },
    // 销售数据表头增加查询方式
    setHeaderHeadFoot: function () {
      let stat_type = arguments[0]
      let params = {}
      switch (stat_type) {
        case 'SELL':
          params['statHeaderHead'] = [{ title: '查询方式', key: 'stat_date_type', width: 100 }]
          params['statHeaderFoot'] = [{ title: '实收金额(元)', key: 'amount' }]
          break
        case 'CHECK':
          params['statHeaderFoot'] = [{ title: '实收金额(元)', key: 'amount' }]
          break
        case 'REFUND':
          params['statHeaderFoot'] = [{ title: '退款金额(元)', key: 'amount' }, { title: '退票费(元)', key: 'free_amount' }]
          break
        default:
      }
      this.$store.commit('INIT_STAT_HEADER_COLUMN', params)
    },
    getStatDay: function () {
      this.$store.commit('TRUNCATE_STAT_DAY_DATA')
      this.$store.commit('STAT_DAY_SET_PROPERTY_BY_KEY', { key: 'loading', value: true })
      let args = arguments[0]
      let stat_type = args['stat_type']
      this.statDateType = args['stat_date_type']
      this.statType = args['stat_type']
      this.site = args['site']
      this.start = args['start']
      this.end = args['end']
      this.setHeaderHeadFoot(stat_type)
      // 获取业务数据
      switch (stat_type) {
        case 'SELL':
          this.$store.dispatch('getSaleDay', args).then(() => {
            this.$store.commit('loading', false)
          })
          break
        case 'CHECK':
          this.$store.dispatch('getCheckDay', args).then(() => {
            this.$store.commit('loading', false)
          })
          break
        case 'REFUND':
          this.$store.dispatch('getRefundDay', args).then(() => {
            this.$store.commit('loading', false)
          })
          break
        default:
      }
    }
  }
}

</script>
