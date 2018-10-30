
<style lang="less" >
@import './styles.less';
</style>

<template>
  <div>
    <Card>
      <searchForm ref="searchForm"></searchForm>
    </Card>
    <div v-for='(item, index) in listByOrder'>
      <searchTable :order="item.order" :tickets="item.tickets"></searchTable>
      <Page class="order-detail-page"
            ref="detail-pages"
            :total="orderCount"
            :page-size="limit"
            size="small"
            show-total
            @on-change="handlePageDown">
      </Page>
    </div>
    <orderInfo></orderInfo>
    <ticketInfoDetail></ticketInfoDetail>
  </div>
</template>

<script>
import searchForm from './components/searchForm'
import searchTable from './components/searchTable'
import orderInfo from './components/orderInfo'
import ticketInfoDetail from './components/ticketInfoDetail'
export default {
  name: 'real-time-search',
  data () {
    return {
      offset: 0,
      limit: 1
    }
  },
  components: {
    searchForm, searchTable, orderInfo, ticketInfoDetail
  },
  methods: {
    setStatus () {
      this.$store.commit('IF_REFESH', true)
    },
    // 分页
    handlePageDown: function (val) {
      console.log('val: ' + val)
      this.offset = val === 1 ? 0 : (val - 1) * this.limit
      let params = { offset: this.offset, limit: this.limit }
      console.log('params: ' + JSON.stringify(params))
      this.$refs['searchForm'].handleSearch(params)
    }
  },
  computed: {
    orderCount: function () {
      return this.$store.state.ticket.orderCount
    },
    listByOrder: function () {
      return this.$store.state.ticket.listByOrder
    },
    ticketList: function () {
      return this.$store.state.ticket.ticketList
    }
  },
  mounted () {

  }
}
</script>
