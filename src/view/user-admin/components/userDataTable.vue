<style lang="less" scope>
    @import '../styles.less';

</style>

<template>
   <div>
        <Table :columns="columns" :data="value" border disabled-hover :loading="loading" ></Table>
        <user-sites :param="id_param" :rolesParam="roles_param" :sitesParam="sites_param"></user-sites>
        <user-roles :param="id_param" :rolesParam="roles_param"></user-roles>
        <reset-password :param="id_param"></reset-password>
        <add-user :param="id_param"></add-user>
    </div>
</template>

<script>
import _ from 'underscore'
import userSites from './userSites'
import userRoles from './userRoles'
import resetPassword from './resetPassword'
import addUser from './addUser'
import { setTimeout } from 'timers'
import moment from 'moment-timezone'

const setStatusButton = (vm, h, currentRow, index, type, text) => {
  return h('i-button', {
    props: {
      type: type,
      loading: false
    },
    style: {margin: '0 5px', padding: '6px 5px'},
    on: {
      'click': () => {
        vm.loading = true
      }
    }
  }, text)
}

export default {
  name: 'userDataTable',
  props: {
    columnsList: Array,
    loading: Boolean,
    value: Array,
    access: Object
  },
  components: {
    userSites, userRoles, resetPassword, addUser
  },

  data () {
    return {
      columns: [],
      id_param: '',
      roles_param: '',
      sites_param: ''
    }
  },
  computed: {
    dctSites: function () {
      return this.$store.state.statCommon.dctSites
    }

  },
  methods: {
    initData () {
      let self = this
      let cloneColumns = JSON.parse(JSON.stringify(self.columnsList))
      self.columns = cloneColumns
      self.columns.forEach(item => {
        // 匹配景区名称
        if (item.key === 'sites') {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = currentRow[item.key]
            const type = 'String'
            var currentSiteDct = {}
            var text = ''
            if (showValue.indexOf(',') >= 0) {
              let arr = showValue.split(',')
              let newArr = []
              for (let index = 0; index < arr.length; index++) {
                currentSiteDct = _.find(this.dctSites, function (site) { return site.code === arr[index] })
                text = currentSiteDct.name
                newArr.push(text)
                text = newArr.join('，')
              };
            } else {
              currentSiteDct = _.find(this.dctSites, function (site) { return site.code === showValue })
              text = currentSiteDct.name
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
        // 匹配用户状态
        if (item.key === 'is_enable') {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = parseInt(currentRow[item.key])
            const type = showValue == 1 ? 'success' : 'error'
            let text = showValue == 1 ? '正常' : '停用'
            return h('Button', {
              props: {
                type: type,
                size: 'small'
              },
              style: {
                margin: '0px'
              }
            }, text)
          }
        }

        // 显示权限名称
        if (item.key === 'roles') {
          item.render = (h, param) => {
            let currentRow = param.row
            let text = self.getAccess(currentRow[item.key])
            const type = 'String'
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
        // 显示时间格式
        if (item.key === 'last_login_time' || item.key === 'create_time') {
          item.render = (h, param) => {
            let currentRow = param.row
            let text = currentRow[item.key] ? moment(currentRow[item.key]).format('YYYY-MM-DD HH:MM:ss') : ''
            const type = 'String'
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

        // 操作
        if (item.key === 'action') {
          item.render = (h, param) => {
            let self = this
            let currentRow = param.row
            let text = ''
            let type = ''

            switch (currentRow.is_enable) {
              case 0:
                text = '启用'
                type = 'success'
                break
              case 1:
                text = '禁用'
                type = 'error'
                break
              default:
            }

            return h('div', {
              props: {size: 'large'},
              on: {'on-change': () => {}}
            }, [
              h('i-button', {
                props: {type: type, loading: false},
                style: {margin: '0 5px', padding: '6px 5px'},
                on: {click (event) {
                  console.log(currentRow._index)
                  event.currentTarget.setAttribute('loading', true)
                  self.id_param = currentRow.id
                  setTimeout(function () {
                    self.setStatus()
                  }, 800)
                }}
              }, text),
              h('i-button', {
                props: {type: 'ghost'},
                style: {margin: '0 5px', padding: '6px 5px'},
                on: {click () {
                  self.$store.commit('modalPassword', true)
                  self.id_param = currentRow.id
                }}
              }, '重置密码'),
              h('i-button', {
                props: {type: 'ghost'},
                style: {margin: '0 5px', padding: '6px 5px'},
                on: {click () {
                  self.$store.commit('modalRoles', true)
                  self.id_param = currentRow.id
                  self.roles_param = currentRow.roles
                }}
              }, '用户权限'),
              h('i-button', {
                props: {type: 'ghost'},
                style: {margin: '0 5px', padding: '6px 5px'},
                on: {click () {
                  self.$store.commit('modalSites', true)
                  self.id_param = currentRow.id
                  self.roles_param = currentRow.roles
                  self.sites_param = currentRow.sites
                }}
              }, '景点权限')
            ])
          }
        }
      })
    },

    setStatus: function () {
      let args = {
        user_id: this.id_param
      }
      this.$store.dispatch('setStatus', args).then((res) => {
        this.$store.dispatch('getUserList')
      })
    },
    // 获取权限说明
    getAccess: function (val) {
      return this.access[val]
    }

  },
  created () {
    this.initData()
  }
}
</script>
