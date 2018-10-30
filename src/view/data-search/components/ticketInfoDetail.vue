<style lang="less">
    @import '../styles.less';
</style>

<template>
  <Row>
    <Modal width="700" v-model="showInfo.open" :closable="false" title="票信息"
    @on-cancel="handleCloseTicketInfo"
    @on-ok="handleCloseTicketInfo">
      <!-- <Table :columns="orderCol" :data="orderData"></Table> -->
      <div class="show-info">
        <Row :gutter="10">
          <Col span="12">
            <dl>
              <dt>票号：</dt>
              <dd>{{ ticket.ticket_code }}</dd>
            </dl>
            <dl>
              <dt>票状态：</dt>
              <dd>{{ ticket.status_desc }}</dd>
            </dl>
            <dl>
              <dt>票类型：</dt>
              <dd>{{ ticket.ticket_type_name }}</dd>
            </dl>
            <dl>
              <dt>票种：</dt>
              <dd>{{ ticket.ticket_kind_name + ' 【' + ticket.ticket_kind + '】' }}</dd>
            </dl>
            <dl>
              <dt>售票时间：</dt>
              <dd>{{ formatDate(ticket.sell_time) }}</dd>
            </dl>
            <dl>
              <dt>入园开始时间：</dt>
              <dd>{{ ticket.start_time }}</dd>
            </dl>
            <dl>
              <dt>入园截止时间：</dt>
              <dd>{{ ticket.end_time }}</dd>
            </dl>
           <!--  <dl>
              <dt>退票截止时间：</dt>
              <dd>{{ ticket.expired_time }}</dd>
            </dl> -->
            <dl>
              <dt>销售金额：</dt>
              <dd>{{ (ticket.sell_price / 100).toFixed(2) }} 元</dd>
            </dl>
            <dl>
              <dt>优惠金额：</dt>
              <dd>{{ (ticket.sell_price / 100).toFixed(2) }} 元</dd>
            </dl>
             <dl>
              <dt>验票时间：</dt>
              <dd>{{ formatDate(ticket.check_time) }}</dd>
            </dl>
            <dl>
              <dt>验票类型：</dt>
              <dd>{{ ticket.check_type_name }}</dd>
            </dl>
            <dl>
              <dt>验票介质：</dt>
              <dd>{{ ticket.check_medium_name }}</dd>
            </dl>
            <dl>
              <dt>验票设备：</dt>
              <dd>{{ ticket.device_name + '【' + ticket.device + '】'}}</dd>
            </dl>
            <dl>
              <dt>设备类型：</dt>
              <dd>{{ ticket.device_type_name }}</dd>
            </dl>
            <dl>
              <dt>退票时间：</dt>
              <dd>{{ formatDate(ticket.refund_time) }}</dd>
            </dl>
            <dl>
              <dt>退票人：</dt>
              <dd>{{ ticket.refund_operator_name }}</dd>
            </dl>
            <dl>
              <dt>退票金额：</dt>
              <dd>{{ (ticket.refund_amount / 100).toFixed(2) }} 元</dd>
            </dl>
            <dl>
              <dt>退票手续费：</dt>
              <dd>{{ (ticket.refund_fee / 100).toFixed(2) }} 元</dd>
            </dl>
          </Col>
          <Col span="12">
            <dl>
              <dt>游客类型：</dt>
              <dd>{{ ticket.customer_type_name }}</dd>
            </dl>
            <dl>
              <dt>游客姓名：</dt>
              <dd>{{ ticket.customer_name }}</dd>
            </dl>
            <dl>
              <dt>国别：</dt>
              <dd>{{ ticket.country_name }}</dd>
            </dl>
            <dl>
              <dt>证件类型：</dt>
              <dd>{{ ticket.id_type_name }}</dd>
            </dl>
            <dl>
              <dt>证件号码：</dt>
              <dd>{{ ticket.id_number }}</dd>
            </dl>
            <dl>
              <dt>年龄段：</dt>
              <dd>{{ ticket.age_period }}</dd>
            </dl>
            <dl>
              <dt>地区：</dt>
              <dd>{{ ticket.province_name + ' ' + ticket.city_name }}</dd>
            </dl>
            <dl>
              <dt>手机号码：</dt>
              <dd>{{ ticket.phone }}</dd>
            </dl>
            <dl>
              <dt>性别：</dt>
              <dd>{{ ticket.gender === 'F' ? '女' : ticket.gender === 'M' ? '男' : '' }}</dd>
            </dl>
            <dl>
              <dt>生日：</dt>
              <dd>{{ ticket.birthday }}</dd>
            </dl>
            <dl>
              <dt>地址：</dt>
              <dd>{{ ticket.address }}</dd>
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
  name: 'ticketInfoDetail',
  components: {
  },
  data () {
    return {
      ticket: undefined
    }
  },
  computed: {
    showInfo: {
      get () {
        let showTicketInfo = this.$store.state.ticket.showTicketInfo
        this.ticket = showTicketInfo['ticket']
        // console.log(showTicketInfo['ticket'])
        return showTicketInfo
      },
      set (val) {
        this.$store.commit('SHOW_TICKET_INFO', val)
      }
    }
  },
  methods: {
    handleCloseTicketInfo () {
      this.showInfo = {ticket: {}, open: false}
    },
    formatDate: function (val) {
      if (val) {
        return moment(val).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    }
  }
}
</script>
