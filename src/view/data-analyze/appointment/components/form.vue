<style lang="less">
    @import '../styles.less';
</style>

<template>
  <div>
    <Form ref="analysisForm" inline>
      <FormItem class="site-select-width" prop="site">
        <Select v-model="site" placeholder="请选择景区">
          <Option v-for="(item, index) in dctSites" :value="item.code" :key="item.code">
          <span :class="item.code === '_ALL_' ? 'select-all-item' : ''"> {{ item.name + '[' + item.code +']' }} </span>
        </Option>
        </Select>
      </FormItem>

      <FormItem prop="selectDate">
        <DatePicker class="select-date-bottom-end-width"
                    v-model="currentHandleDate"
                    type="date"
                    placeholder="选择日期"
                    @on-change="handleDateChange"></DatePicker>
      </FormItem>

      <FormItem>
        <Button type="primary" icon="ios-search" @click="handleSearch()">查询</Button>
      </FormItem>

    </Form>
  </div>

</template>

<script>
import moment from 'moment-timezone'
export default {
  name: 'repeatForm',
  components: {
  },
  data () {
    return {
      site: null,
      currentHandleDate: null
      // stat_date: null,

    }
  },
  computed: {
    // 获取景点权限
    dctSites: function () {
      let sites = this.$store.state.statCommon.dctSites
      // this.site = sites[0] && sites[0].hasOwnProperty('code') ? sites[0]['code'] : '';
      // console.log("this.site: " + this.site)
      return sites
    }
  },
  methods: {
    init () {
      this.site = '_ALL_'
      // this.stat_date = moment().format('YYYY-MM-DD');
      // console.log(this.stat_date)
      this.currentHandleDate = moment().format('YYYY-MM-DD')
    },
    // 查询
    handleSearch () {
      // 此处应该有表单校验  TODO ...
      let params = {
        stat_date: this.currentHandleDate,
        site: this.site
      }
      // 传给父组件
      console.log(JSON.stringify(params))
      this.$emit('queryParams', params)
    },
    // 改变日期
    handleDateChange (val) {
      this.currentHandleDate = val
      console.log(this.currentHandleDate)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
