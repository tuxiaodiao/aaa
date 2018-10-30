<!--  -->
<template>
    <div >
        <Table :loading="loading" :columns="columns" :data="value" border
               disabled-hover></Table>

    </div>

</template>

<script>
import _ from 'underscore'
import { WSAEHOSTUNREACH } from 'constants'

export default {
  name: 'sourTable',
  props: {
    columnsList: Array,
    loading: Boolean,
    value: Array
  },

  data () {
    return {
      columns: []
    }
  },

  computed: {
    dctSites: function () {
      return this.$store.state.statCommon.dctSites
    }
  },

  methods: {
    init () {
      let self = this

      let cloneColumns = JSON.parse(JSON.stringify(self.columnsList))
      self.columns = cloneColumns

      self.columns.forEach(item => {
        // 匹配景区名称
        if (item.key === 'site') {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = currentRow[item.key]
            const type = 'String'
            let currentSiteDct = null
            let text = ''

            if (showValue.indexOf(',') >= 0) {
              let arr = showValue.split(',')
              let newArr = []
              for (let index = 0; index < arr.length; index++) {
                currentSiteDct = _.find(this.dctSites, function (site) { return site.code === arr[index] })
                // console.log(currentSiteDct)
                text = currentSiteDct['name']
                newArr.push(text)
                text = newArr.join('，')
              };
            } else {
              currentSiteDct = _.find(this.dctSites, function (site) { return site.code === showValue })
              text = currentSiteDct['name']
            }

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
        // 匹配处理方式
        if (item.key === 'processed') {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = parseInt(currentRow[item.key])
            const type = 'String'
            let text = ''
            switch (showValue) {
              case 0:
                text = '未处理'
                break
              case 1:
                text = '未处理'
                break
              case 2:
                text = '修改后未处理'
                break
            }
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
        // 匹配消息类型
        if (item.key === 'msg_type') {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = parseInt(currentRow[item.key])
            const type = 'String'
            let text = ''
            switch (showValue) {
              case 1:
                text = '文本'
                break
              case 2:
                text = '图片'
                break
              case 3:
                text = '文件'
                break
            }
            return h('div', {
              props: {
                type: type
              },
              style: {
                margin: '0px'
              }
            }, text)
          }
        };
        // 匹配源
        if (item.key === 'queue') {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = currentRow[item.key]
            const type = 'String'
            let text = ''
            switch (showValue) {
              case 'SELL':
                text = '售票'
                break
              case 'CHECK':
                text = '验票'
                break
              case 'REFUND':
                text = '退票'
                break
            }
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
        // body
        if (item.key === 'body') {
          item.render = (h, param) => {
            let self = this
            let currentRow = param.row
            let showValue = currentRow[item.key]

            const type = 'text'
            let text = '消息体'
            return h('div', {
              props: {type: type},
              style: {margin: '0px', color: '#57a3f3', cursor: 'pointer', border: 'none'},
              on: {
                click: function () {
                  self.$store.commit('MODAL_BODY_INFO', true)
                  self.$store.commit('CURRENT_BODY', JSON.parse(showValue))
                }
              }
            }, text)
          }
        }
      })
    }

  },
  created () {
    // 初始化数据配置
    this.init()
  }
}

</script>
<style lang='less' scoped>
button:focus{
  border:none;
  outline: none;
}
</style>
