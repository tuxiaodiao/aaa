
<style lang="less">
    @import './editable-table.less';
    @import '../styles.less';
</style>

<template>
    <div>
        <Table :ref="refs" :columns="columnsList" :data="thisTableData" border disabled-hover :loading="loading"></Table>
    </div>
</template>

<script>

const incellEditBtn = (vm, h, param) => {
  if (vm.hoverShow) {
    return h('div', {
      'class': {
        'show-edit-btn': vm.hoverShow
      }
    }, [
      h('Button', {
        props: {
          type: 'text',
          icon: 'edit'
        },
        on: {
          click: (event) => {
            vm.edittingStore[param.index].edittingCell[param.column.key] = true
            vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
          }
        }
      })
    ])
  } else {
    return h('Button', {
      props: {
        type: 'text',
        icon: 'edit'
      },
      on: {
        click: (event) => {
          vm.edittingStore[param.index].edittingCell[param.column.key] = true
          vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
        }
      }
    })
  }
}
const saveIncellEditBtn = (vm, h, param) => {
  return h('Button', {
    props: {
      type: 'text',
      icon: 'checkmark'
    },
    on: {
      click: (event) => {
        vm.edittingStore[param.index].edittingCell[param.column.key] = false
        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
        vm.$emit('input', vm.handleBackdata(vm.thisTableData))
        vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key)
      }
    }
  })
}
const cellInput = (vm, h, param, item) => {
  return h('Input', {
    props: {
      type: 'text',
      value: vm.edittingStore[param.index][item.key]
    },
    on: {
      'on-change' (event) {
        let key = item.key
        vm.edittingStore[param.index][key] = event.target.value
      }
    }
  })
}
export default {
  name: 'canEditTable',
  props: {
    loading: Boolean,
    refs: String,
    columnsList: Array,
    value: Array,
    url: String,
    editIncell: {
      type: Boolean,
      default: false
    },
    hoverShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      columns: [],
      thisTableData: [],
      edittingStore: []
    }
  },
  created () {
    this.init()
  },
  computed: {
    rel_type: function () {
      return this.$store.state.latiParam.rel_type
    },
    set_auto: function () {
      return this.$store.state.latiParam.set_auto
    }

  },
  methods: {
    init () {
      let vm = this
      let editableCell = this.columnsList.filter(item => {
        if (item.editable) {
          if (item.editable === true) {
            return item
          }
        }
      })
      let cloneData = JSON.parse(JSON.stringify(this.value))
      let res = []
      res = cloneData.map((item, index) => {
        let isEditting = false
        if (this.thisTableData[index]) {
          if (this.thisTableData[index].editting) {
            isEditting = true
          } else {
            for (const cell in this.thisTableData[index].edittingCell) {
              if (this.thisTableData[index].edittingCell[cell] === true) {
                isEditting = true
              }
            }
          }
        }
        if (isEditting) {
          return this.thisTableData[index]
        } else {
          this.$set(item, 'editting', false)
          let edittingCell = {}
          editableCell.forEach(item => {
            edittingCell[item.key] = false
          })
          this.$set(item, 'edittingCell', edittingCell)
          return item
        }
      })
      this.thisTableData = res
      this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData))
      vm.columnsList.forEach(item => {
        // 匹配属性
        if (item.key == 'rel_type') {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = currentRow[item.key].toString()
            showValue = showValue == 0 ? '公共' : '景区'
            let self = this
            return h('Select', {
              props: {
                placeholder: showValue
              },
              style: {
                margin: '0px',
                width: '150px'
              },
              on: {'on-change': function (val) {
                let args = {
                  name: currentRow.name,
                  op_type: 1
                }
                self.$store.dispatch('setDctConfig', args)
                console.log('val: ' + val)
                self.$Message.success('修改成功！')
              }}
            }, [
              h('Option', {
                props: {
                  value: 0
                }
              }, '公共'),
              h('Option', {
                props: {
                  value: 1
                }
              }, '景区')
            ])
          }
        };
        // 匹配维护标识
        if (item.key == 'set_auto') {
          item.render = (h, param) => {
            let currentRow = param.row
            let showValue = currentRow[item.key].toString()
            showValue = showValue == 0 ? '手动维护' : '自动维护'
            return h('Select', {
              props: {
                placeholder: showValue
              },
              style: {
                margin: '0px',
                width: '150px'
              },
              on: {'on-change': () => {
                let self = this
                let args = {
                  name: currentRow.name,
                  op_type: 2
                }
                self.$store.dispatch('setDctConfig', args)
                self.$Message.success('修改成功！')
              }}
            }, [
              h('Option', {
                props: {
                  value: 0
                }
              }, '手动维护'),
              h('Option', {
                props: {
                  value: 1
                }
              }, '自动维护')

            ])
          }
        };

        if (item.editable) {
          item.render = (h, param) => {
            let currentRow = this.thisTableData[param.index]
            if (!currentRow.editting) {
              if (this.editIncell) {
                return h('Row', {
                  props: {
                    type: 'flex',
                    align: 'middle',
                    justify: 'center'
                  }
                }, [
                  h('Col', {
                    props: {
                      span: '22'
                    }
                  }, [
                    !currentRow.edittingCell[param.column.key] ? h('span', currentRow[item.key]) : cellInput(this, h, param, item)
                  ]),
                  h('Col', {
                    props: {
                      span: '2'
                    }
                  }, [
                    currentRow.edittingCell[param.column.key] ? saveIncellEditBtn(this, h, param) : incellEditBtn(this, h, param)
                  ])
                ])
              } else {
                return h('span', currentRow[item.key])
              }
            } else {
              return h('Input', {
                props: {
                  type: 'text',
                  value: currentRow[item.key]
                },
                on: {
                  'on-change' (event) {
                    let key = param.column.key
                    vm.edittingStore[param.index][key] = event.target.value
                  }
                }
              })
            }
          }
        }
      })
    },
    handleBackdata (data) {
      let clonedData = JSON.parse(JSON.stringify(data))
      clonedData.forEach(item => {
        delete item.editting
        delete item.edittingCell
        delete item.saving
      })
      return clonedData
    }
  },
  watch: {
    value (data) {
      this.init()
    }
  }
}
</script>
