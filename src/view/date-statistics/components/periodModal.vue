<style lang="less">
    @import '../styles.less';
</style>

<template>
  <Modal width="80" v-model="open"
         :mask-closable="false"
         :closable="false"
         cancel-text="取消"
         ok-text="关闭"
         @on-ok="ok"
         @on-cancel="cancel">
    <div slot="header">
      <Row >
        <Col span="10">
          <p>
            时间段数据
          </p>
        </Col>
        <Col span="14">
          <span>时间段:</span>
          <TimePicker :value="currentTickerTime"
                      confirm
                      size="small"
                      :steps="[1, 30, 15]"
                      format="HH:mm"
                      type="timerange"
                      placeholder="选择时间段"
                      @on-change="handleTimeChange"
                      >
          </TimePicker>
          <span>间隔:</span>
          <RadioGroup v-model="periodSet"
                      v-for="item in periodList"
                      type="button"
                      size="small"
                      @on-change="handlePeriodSet">
            <Radio :label="item.key">{{ item.label }}</Radio>
          </RadioGroup>
        </Col>
      </Row>
    </div>

    <statDataTable :columnsList="columnsList" v-model="tableData"></statDataTable>

    <div slot="footer" class="period-modal-slot-footer">
      <Button type="warning" size="small" @click="cancel">关闭</Button>
      <Button type="primary" size="large" @click="ok">查询</Button>
    </div>
  </Modal>

</template>

<script>
import * as dataConfig from '../dataConfig'
import statDataTable from './statDataTable'
export default {
  name: 'periodModal',
  components: {
    statDataTable
  },
  data () {
    return {
      title: '',
      currentTickerTime: ['03:00', '16:00'],
      periodList: [],
      periodSet: 'HALF',
      tableData: []
    }
  },
  computed: {
    open: {
      get () {
        return this.$store.state.statSyn.periodOpen
      },
      set (val) {
        this.$store.commit('SYN_OPEN_PERIOD', false)
      }
    },
    columnsList: {
      get () {
        return this.$store.state.statSyn.periodColumnsList
      },
      set (val) {
        this.$store.commit('SET_PERIOD_COLUMNS_LIST', val)
      }
    }
  },
  methods: {
    init () {
      this.periodList = dataConfig.periodSet
      this.columnsList = dataConfig.periodColumn(this.currentTickerTime, this.periodSet)
    },
    handlePeriodSet: function (val) {
      console.log(val)
    },
    handleTimeChange: function (val) {
      console.log(val)
      this.currentTickerTime = val
    },
    ok () {
      this.columnsList = dataConfig.periodColumn(this.currentTickerTime, this.periodSet)
    },
    cancel () {
      this.open = false
    }
  },
  created () {
    this.init()
  }
}
</script>
