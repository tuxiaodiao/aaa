<!--  -->
<style lang='less' scoped>
@import '../styles.less';
</style>

<template>
    <Modal v-model="modalRoles" title="设置用户权限" width="450" @on-ok="ok" class="userRoles">
        <Form ref="rolesForm" inline>
            <FormItem class="site-select-width">
                <Radio-group v-model="currentRadio">
                    <Radio v-for="(fm, index) in getUserAccess"
                      :label="fm" > {{ getAccess(fm) }} </Radio>
                </Radio-group>
            </FormItem>
        </Form>

    </Modal>
</template>

<script>
import * as dataConfig from '../dataConfig'
export default {
  name: 'userRoles',
  props: {
    param: {
      type: [Number, String],
      required: true
    },
    rolesParam: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      currentRadio: ''
    }
  },

  computed: {
    getUserAccess: function () {
      return this.$store.state.user.access
    },

    modalRoles: {
      get () {
        return this.$store.state.user.modalRoles
      },
      set (val) {
        this.$store.commit('modalRoles', false)
      }
    }
  },

  methods: {
    ok () {
      if (this.currentRadio) {
        this.setModifyRoles()
      }
    },
    // 获取权限说明
    getAccess: function (val) {
      return val ? dataConfig.access[val] : ''
    },
    setModifyRoles: function () {
      let args = {
        user_id: this.param,
        roles: this.currentRadio
      }
      this.$store.dispatch('modifyRoles', args).then((res) => {
        this.$Message.info('提交成功')
        this.$store.dispatch('getUserList')
      })
    }

  },
  watch: {
    modalRoles (val) {
      if (val === true) {
        this.currentRadio = this.rolesParam
      }
    }
  }

}

</script>
