<style lang="less">
    @import '../styles.less';
</style>

<template>
  <div>
      <Form ref="searchForm" inline>
      <FormItem prop="site">
        <Select class="site-select-width" v-model="site">
          <Option v-for="(item, index) in dctSites" :value="item.code" :key="item.code">{{ item.name + '[' + item.code +']' }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="searchType">
        <Select class="search-type-select-width" v-model="searchType">
            <Option v-for="(item, index) in searchTypes" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Input class='input-width' v-model="search" placeholder="输入搜索内容" clearable >
        </Input>
      </FormItem>

      <FormItem>
        <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'searchForm',
  components: {
  },
  data () {
    return {
      site: '',
      searchType: 'TICKET',
      search: '',
      searchTypes: [
        {code: 'ORDER', name: '订单号'},
        {code: 'TICKET', name: '票号'},
        {code: 'ID', name: '证件号码'}
      ]
    }
  },
  computed: {
    // 获取景点权限
    dctSites: function () {
      let sites = this.$store.state.statCommon.dctSites
      this.site = sites[0] && sites[0].hasOwnProperty('code') ? sites[0]['code'] : ''
      return sites
    }

  },
  methods: {
    handleSearch () {
      let offset = arguments[0]['offset'] || 0
      let limit = arguments[0]['limit'] || 1
      if (!this.search) {
        return
      }
      this.$store.commit('TRUNCATE_TICKET_INFO')
      this.$store.commit('TICKET_SET_PROPERTY_BY_KEY', { key: 'loading', value: true })
      let params = {
        site: this.site,
        search_type: this.searchType,
        search: this.search.trim(),
        offset: offset,
        limit: limit
      }
      this.$store.dispatch('getTicketInfo', params)
    }
  }
}
</script>
