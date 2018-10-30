<style lang="less">
    @import '../styles.less';
</style>

<template>
    <div>
        <Table :loading="loading" :columns="columns" :data="thisTableData" border :size="size"
               disabled-hover></Table>
    </div>
</template>

<script>
import _ from 'underscore'
import dataConfig from '../dataConfig'
const detail = (vm, h, currentRow, index) => {
  return h('Button', {
    props: {
      type: 'info'
    },
    style: {
      margin: '0 5px'
    },
    on: {
      'click': () => {
        // 此处写票详情弹出框
        // vm.$store.commit('SHOW_PEIROD_INFO', {ticket: currentRow, open: true});
      }
    }
  }, '分时段数据')
}
export default {
  name: 'statDateTable',
  props: {
    columnsList: Array,
    loading: Boolean,
    statType: String,
    value: Array,
    size: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      columns: [],
      thisTableData: []
    }
  },
  created () {
    this.init()
  },
  computed: {
    // 获取景点权限
    dctSites: function () {
      return this.$store.state.statCommon.dctSites
    },
    // 获取景点权限
    currentSite: function () {
      return this.$store.state.statDay.presentSite
    },
    // 通用数据字典（dctTabDctDct 中 rel_type=0 需要从这里获取中文说明）
    dctTabDctCommon: function () {
      return this.$store.state.statCommon.dctTabDctCommon
    },
    // 自定义数据字典(dctTabDctDct 中 rel_type=1 需要从这里获取中文说明)
    dctTabDctSpec: function () {
      return this.$store.state.statCommon.dctTabDctSpec
    }
  },
  methods: {
    init () {
      let cloneData = this.value && this.value.length > 0 ? JSON.parse(JSON.stringify(this.value)) : []
      let cloneColumns = JSON.parse(JSON.stringify(this.columnsList)) || []

      this.thisTableData = cloneData
      this.columns = cloneColumns
      this.columns.forEach(item => {
        // 匹配景区名称
        if (item.key === 'site') {
          item.render = (h, param) => {
            let currentSite = this.currentSite
            let currentRow = param.row
            let showValue = currentRow[item.key]
            const type = 'String'
            const currentSiteDct = _.find(this.dctSites, function (site) { return site.code === currentSite })
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
        // 匹配虚拟票标识
        if (item.key === 'is_virtual') {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = currentRow[item.key]
            const type = 'String'
            const text = showValue === 1 ? '是' : '否'
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
        // 查询方式
        if (item.key === 'stat_date_type') {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = currentRow[item.key]
            const type = 'String'
            const text = showValue === '11' ? '销售时间' : '入园时间'
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
        // 金额字典全部转换成元，保留小数点后两位
        if (item.key === 'amount' || item.key === 'free_amount') {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = currentRow[item.key]
            const type = 'String'
            const text = showValue ? (showValue / 100).toFixed(2) : '0.00'
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
        // 处理动态字段
        if (item.hasOwnProperty('rel_type')) {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = currentRow[item.key]
            const type = 'String'
            let text = item.rel_type ? this.dctTabDctSpec[this.currentSite][item.key][showValue] : this.dctTabDctCommon[item.key][showValue]
            let style = { margin: '0px' }
            if (!text && showValue) {
              text = '[' + showValue + ']'
              style = { margin: '0px', color: '#F00'}
            }
            return h('div', {
              props: {
                type: type
              },
              style: style
            }, text)
          }
        }

        // 查看分时段数据
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
    value () {
      this.init()
    }
  }
}
</script>
