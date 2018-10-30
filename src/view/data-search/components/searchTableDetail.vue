<style lang="less">
    @import '../styles.less';
</style>

<template>
    <div>
        <Table :loading="loading" :row-class-name="rowClassName" :columns="columns" :data="thisTableData" border
               disabled-hover></Table>
    </div>
</template>

<script>
import _ from 'underscore'
const detail = (vm, h, currentRow, index) => {
  return h('Button', {
    props: {
      type: 'primary'
    },
    style: {
      margin: '0 5px'
    },
    on: {
      'click': () => {
        // 此处写票详情弹出框
        vm.$store.commit('SHOW_TICKET_INFO', {ticket: currentRow, open: true})
      }
    }
  }, '详情')
}
export default {
  name: 'searchTable',
  props: {
    columnsList: Array,
    loading: Boolean,
    value: Array
  },
  data () {
    return {
      columns: [],
      thisTableData: []
    }
  },
  components: {

  },
  created () {
    this.init()
  },
  computed: {
    // 获取当前搜索的景点
    // searchSite: function() {
    //   return this.$store.state.ticket.searchSite;
    // },
    // 获取景点权限
    dctSites: function () {
      return this.$store.state.statCommon.dctSites
    },
    // 获取当前搜索的类型
    searchType: function () {
      return this.$store.state.ticket.searchType
    },
    // 获取当前搜索的
    search: function () {
      return this.$store.state.ticket.search
    }
  },
  methods: {
    rowClassName (row, index) {
      // 当为最小购买单位时给特殊底色
      if (row['is_sell_unit'] === 1) {
        return 'sell_min_unit'
      }
    },
    init () {
      let cloneData = JSON.parse(JSON.stringify(this.value)) || []
      let cloneColumns = JSON.parse(JSON.stringify(this.columnsList)) || []
      this.thisTableData = cloneData
      this.columns = cloneColumns
      this.columns.forEach(item => {
        // 当根据票号查询时，使用粗体显示该票
        if (this.searchType === 'TICKET' && item.key === 'ticket_code') {
          item.render = (h, param) => {
            let row = param.row
            let style = {}
            if (row.ticket_code === this.search) {
              style = { 'font-weight': 'bold', 'font-size': '120%' }
            }
            const type = 'String'
            return h('div', {
              props: {
                type: type
              },
              style: style
            }, row.ticket_code)
          }
        }

        // 匹配景区名称
        if (item.key === 'site') {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = currentRow[item.key]
            const type = 'String'
            const currentSiteDct = _.find(this.dctSites, function (site) { return site.code === showValue })
            const text = currentSiteDct['name']
            return h('div', {
              props: {
                type: type
              },
              style: {
                margin: '0px'
              }
            }, text)
          }
        }

        // 状态显示
        if (item.key === 'status') {
          item.render = (h, param) => {
            let row = param.row
            let text = row.status_desc
            let type = row.status === '10' ? 'info' : row.status === '20' ? 'success' : row.status === '30' || row.status === '31' ? 'warning' : row.status === '40' ? 'error' : 'info'
            return h('Button', {
              props: {
                type: type,
                size: 'small'
              },
              style: { margin: '0' }
            }, text)
          }
        }

        // 金额显示单位换算显示
        if (item.key === 'sell_price') {
          item.render = (h, param) => {
            let row = param.row
            let text = row.sell_price > 0 ? (row.sell_price / 100).toFixed(2) : '0.00'
            const type = 'String'
            return h('div', {
              props: {
                type: type
              },
              style: { margin: '0', fontSize: '18px' }
            }, text)
          }
        }
        // 查看详情显示弹出页面
        if (item.handle) {
          item.render = (h, param) => {
            let currentRowData = this.thisTableData[param.index]
            let children = []
            item.handle.forEach(item => {
              if (item === 'detail') {
                children.push(detail(this, h, currentRowData, param.index))
              }
            })
            return h('div', children)
          }
        }
      })
    }
  },
  watch: {
    value (data) {
      this.init()
    }
  }
}
</script>
