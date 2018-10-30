<style lang="less">
    @import '../styles.less';
</style>

<template>
  <Card>
      <div class="search-table-info" >
        <Row :gutter="3" type="flex" justify="start">
          <Col span="5">
            <!-- <Icon type="ios-list-outline"></Icon> -->
            <dl>
              <dt> 订单: </dt>
              <p> {{ order.order_code && order.order_code.length > 16 ? order.order_code.slice(0, 10) + ' ...' : order.order_code }} </p>
            </dl>
          </Col>
          <Col span="5">
            <dl>
              <dt> 时间: </dt>
              <p> {{ formatDate(order.order_time) }} </p>
            </dl>
          </Col>
          <Col span="4">
            <dt> 渠道: </dt>
            <dd> {{ getDctName(order.site, 'sell_channel', order.sell_channel) }} </dd>
          </Col>
          <Col span="4">
            <dt> 支付: </dt>
            <dd> {{ getDctName(order.site, 'pay_channel', order.pay_channel) }} </dd>
          </Col>
          <Col span="4">
            <dt> 金额:</dt>
            <dd> {{ (order.amount ? order.amount / 100 : 0).toFixed(2) }} 元 </dd>
          </Col>
          <Col span="2">
            <Button
                v-if="order.order_code"
                class='button-style-2'
                type="primary"
                :id="order.order_code"
                @click="handleOpenOrderInfo($event)">订单信息</Button>
          </Col>
        </Row>
      </div>
      <searchTableDetail
        :loading='loading'
        :columnsList='columnsList'
        :value='tickets'>
      </searchTableDetail>
  </Card>
</template>

<script>
import _ from 'underscore'
import moment from 'moment-timezone'
import searchTableDetail from './searchTableDetail'
import * as dataConfig from '../dataConfig'
export default {
  name: 'searchTable',
  props: {
    order: Object,
    tickets: Array

  },
  components: {
    searchTableDetail
  },
  data () {
    return {
      columnsList: [],
      tabDctDct: null,
      tabDctCommon: null,
      tabDctSpec: null
    }
  },
  computed: {
    loading () {
      return this.$store.state.ticket.loading
    },
    orderList: function () {
      return this.$store.state.ticket.orderList
    },
    dctTabDctDct: function () {
      let tabDctDct = this.$store.state.statCommon.dctTabDctDct
      this.tabDctDct = tabDctDct
      return tabDctDct
    },
    dctTabDctCommon: function () {
      let tabDctCommon = this.$store.state.statCommon.dctTabDctCommon
      this.tabDctCommon = tabDctCommon
      return tabDctCommon
    },
    dctTabDctSpec: function () {
      let tabDctSpec = this.$store.state.statCommon.dctTabDctSpec
      this.tabDctSpec = tabDctSpec
      return tabDctSpec
    }
  },
  methods: {
    // 根据字典名获取值
    getDctName (site, dctName, value) {
      if (!value) {
        return
      }
      // console.log("this.dctTabDctDct: " + JSON.stringify(this.dctTabDctDct))
      // console.log("dctName: " + dctName);
      let dctTab = this.dctTabDctDct[dctName]
      let rel_type = dctTab && dctTab.hasOwnProperty('rel_type') ? dctTab['rel_type'] : 0
      if (rel_type === 1) {
        // console.log("order_code: " + this.order.order_code)
        // console.log("this.dctTabDctSpec: " + JSON.stringify(this.dctTabDctSpec))
        // console.log("site: " + site);
        // console.log("dctName: " + dctName);
        // console.log("value: " + value);
        // 当有多个景区时，取第一个景区字典
        let firstSite = site.split(',')[0]
        return this.dctTabDctSpec[firstSite][dctName][value]
      } else {
        return this.dctTabDctCommon[dctName][value]
      }
    },
    formatDate: function (val) {
      if (val) {
        return moment(val).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    },
    handleOpenOrderInfo (event) {
      let order = _.filter(this.orderList, item => { return item['order_code'] === event.currentTarget.id })
      this.$store.commit('SHOW_ORDER_INFO', {order: order[0], open: true})
    },
    init () {
      this.columnsList = dataConfig.ticketInfoBaseColumns
      // console.log(this.tickets);
    }
  },
  created () {
    this.init()
  }
}
</script>
