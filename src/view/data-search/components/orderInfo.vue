<style lang="less">
    @import '../styles.less';
</style>

<template>
  <Row>
    <Modal width="700" v-model="showInfo.open" :closable="false" title="订单信息"
    @on-cancel="handleCloseOrderInfo"
    @on-ok="handleCloseOrderInfo">
      <!-- <Table :columns="orderCol" :data="orderData"></Table> -->
      <div class="show-info">
        <Row :gutter="10">
          <Col span="12">
            <dl>
              <dt>订单号：</dt>
              <dd>{{ order.order_code }}</dd>
            </dl>
            <dl>
              <dt>外部订单号：</dt>
              <dd>{{ order.order_code_ext }}</dd>
            </dl>
            <dl>
              <dt>数字账号：</dt>
              <dd>{{ order.usercode }}</dd>
            </dl>
            <dl>
              <dt>IP来源：</dt>
              <dd>{{ order.origin_ip }}</dd>
            </dl>
            <dl>
              <dt>交易号：</dt>
              <dd>{{ order.trace_sn }}</dd>
            </dl>
            <dl>
              <dt>订单时间：</dt>
              <dd>{{ formatDate(order.order_time) }}</dd>
            </dl>
            <dl>
              <dt>总金额：</dt>
              <dd>{{ (order.amount / 100).toFixed(2) }} 元</dd>
            </dl>
            <dl>
              <dt>优惠金额：</dt>
              <dd>{{ (order.free_amount / 100).toFixed(2) }} 元</dd>
            </dl>
          </Col>
          <Col span="12">
            <dl>
              <dt>游客类型：</dt>
              <dd>{{ getDctName(order.site, 'form_type', order.form_type) }}</dd>
            </dl>
            <dl>
              <dt>组织：</dt>
              <dd>{{ getDctName(order.site, 'organization', order.organization) }}</dd>
            </dl>
            <dl>
              <dt>售票员：</dt>
              <dd>{{ getDctName(order.site, 'seller', order.seller) }}</dd>
            </dl>
            <dl>
              <dt>销售渠道：</dt>
              <dd>{{ getDctName(order.site, 'sell_channel', order.sell_channel) }}</dd>
            </dl>
            <dl>
              <dt>支付方式：</dt>
              <dd>{{ getDctName(order.site, 'pay_channel', order.pay_channel) }}</dd>
            </dl>
          </Col>
        </Row>
      </div>
    </Modal>
  </Row>
</template>

<script>
import _ from 'underscore'
import moment from 'moment-timezone'
export default {
  props: {
    orderList: Array
  },
  name: 'orderInfo',
  components: {
  },
  data () {
    return {
      tabDctDct: undefined,
      tabDctCommon: undefined,
      tabDctSpec: undefined,
      order: undefined
    }
  },
  computed: {
    showInfo: {
      get () {
        let showOrder = this.$store.state.ticket.showOrderInfo
        this.order = showOrder.order
        // console.log("this.order: " + JSON.stringify(this.order));
        return showOrder
      },
      set (val) {
        this.$store.commit('SHOW_ORDER_INFO', val)
      }
    },
    searchSite: function () {
      return this.$store.state.ticket.searchSite
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
    formatDate: function (val) {
      if (val) {
        return moment(val).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    },
    handleCloseOrderInfo () {
      this.showInfo = {order: {}, open: false}
    },
    getDctData () {
      this.tabDctDct = this.$store.state.statCommon.dctTabDctDct
      this.tabDctCommon = this.$store.state.statCommon.dctTabDctCommon
      this.tabDctSpec = this.$store.state.statCommon.dctTabDctSpec
    },
    // 根据字典名获取值
    getDctName (site, dctName, value) {
      if (!value) {
        return
      }
      // console.log("this.dctTabDctDct: " + JSON.stringify(this.dctTabDctDct))
      // console.log("dctName: " + dctName);
      let firstSite = site.split(',')[0]
      let dctTab = this.dctTabDctDct[dctName]
      let rel_type = dctTab && dctTab.hasOwnProperty('rel_type') ? dctTab['rel_type'] : 0
      if (rel_type === 1) {
        // console.log("this.dctTabDctSpec: " + JSON.stringify(this.dctTabDctSpec))
        return this.dctTabDctSpec[firstSite][dctName][value]
      } else {
        return this.dctTabDctCommon[dctName][value]
      }
    }
  },
  created () {
    this.getDctData()
  }
}
</script>
