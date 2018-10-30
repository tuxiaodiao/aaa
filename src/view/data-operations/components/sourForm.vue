<style lang='less' scoped>
@import "../styles.less";
</style>

<template>
  <div>
      <Form ref="sourForm" inline>
        <FormItem>
            <Select v-model="queue"  style="width:150px;" placeholder="选择数据源">
                <Option v-for="item in queues" :value="item.queue" :key="item.queue" >{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem>
            <DatePicker class="data-picker"
                        type="daterange"
                        :value="currentTickerDate"
                        placeholder="选择日期"
                        @on-change="handleDateChange"></DatePicker>
        </FormItem>
        <FormItem>
            <Input class='input-width' v-model="msg_id" placeholder="输入消息ID" clearable ></Input>
        </FormItem>
        <FormItem>
            <Select v-model="currentProcessed" style="width:150px;" placeholder="选择处理方式">
                <Option v-for="item in processed"
                        :value="item.code"
                        :key="item.code"
                        :class="item.code === null ? 'select-all-item' : ''"
                        placeholder="请选择处理方式">
                       {{item.name}}</Option>
            </Select>
        </FormItem>
        <FormItem>
        <Button type="primary" icon="ios-search" @click="handleSearch()">搜索</Button>
      </FormItem>
    </Form>

  </div>
</template>

<script>
import moment from 'moment-timezone'
export default {
  name: 'sourForm',
  data () {
    return {
      queue: null,
      msg_id: null,
      currentProcessed: '_ALL_',
      currentTickerDate: [],
      offset: 0,
      limit: 10
    }
  },

  computed: {
    queues: function () {
      let queues = this.$store.state.source.queues
      this.queue = queues[0]['queue']
      return queues
    },
    sourceData: function () {
      return this.$store.state.source.sourceData
    },
    processed: function () {
      return this.$store.state.source.processed
    }
  },

  methods: {
    // 获取当前数据配置，设置临时变量，
    initDate: function () {
      this.currentTickerDate = [moment().add(-7, 'day').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
    },
    // 选择日期
    handleDateChange: function (val) {
      this.currentTickerDate = val
    },
    handleSearch: function () {
      this.$store.commit('loading', true)
      this.$store.commit('TRUNCATE_SOURCE_DATA')
      let params = {
        queue: this.queue,
        msg_id: this.msg_id,
        processed: this.currentProcessed,
        start: this.currentTickerDate[0],
        end: this.currentTickerDate[1]
      }
      this.$emit('queryParams', params)
    }
  },
  created () {
    this.initDate()
  }
}

</script>
