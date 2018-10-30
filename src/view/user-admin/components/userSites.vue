<!--  -->
<style lang='less' scoped>
@import '../styles.less';
.ivu-form-inline .ivu-form-item{
    width: 100%;
}
.ivu-checkbox-group-item{
    margin-bottom: 10px;
}
</style>

<template>
    <Modal v-model="modalSites" title="设置景点权限" width="450" @on-ok="ok">
        <Form inline>
            <CheckboxGroup v-model="currentUserSites">
                <Checkbox v-for="(fm, index) in showUserSites" :key="fm.code" :label="fm.name + '[' + fm.code +']'"></Checkbox>
            </CheckboxGroup>
        </Form>
    </Modal>
</template>

<script>
import _ from 'underscore'

export default {
  name: 'userSites',
  props: {
    param: {
      type: [Number, String],
      required: true
    },
    rolesParam: {
      type: String,
      required: true
    },
    sitesParam: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      currentUserSites: [],
      showUserSites: []
    }
  },

  computed: {
    dctSites: function () {
      return this.$store.state.statCommon.dctSites
    },
    getUserSites: function () {
      return this.$store.state.user.sites
    },

    modalSites: {
      get () {
        return this.$store.state.user.modalSites
      },
      set (val) {
        this.$store.commit('modalSites', false)
      }
    }
  },

  methods: {
    initsites () {
      this.getUserSites.forEach(element => {
        let find = _.find(this.dctSites, function (site) { return site.code === element })
        this.showUserSites.push(find)
      })
      // 传递来的用户景区权限字符串转化为数组
      let sitesParamArr = this.sitesParam.split(',')
      sitesParamArr.forEach(e => {
        let find = _.find(this.dctSites, function (site) { return site.code === e })
        this.currentUserSites.push(find.name + '[' + find.code + ']')
      })
    },
    ok () {
      if (this.currentUserSites.length > 0) {
        this.setModifySites()
      }
    },
    setModifySites: function () {
      let paramSites = []
      this.currentUserSites.forEach(item => {
        let tailor = item.split('[')
        let sites = _.last(tailor)
        sites = sites.slice(0, -1)
        paramSites.push(sites)
      })
      let args = {
        user_id: this.param,
        sites: paramSites.toString(),
        roles: this.rolesParam
      }
      this.$store.dispatch('modifySites', args).then((res) => {
        this.$Message.info('提交成功')
        this.$store.dispatch('getUserList')
      })
    }
  },
  watch: {
    modalSites (val) {
      if (val === false) {
        this.currentUserSites = []
        this.showUserSites = []
      } else {
        this.initsites()
      }
    }
  }

}

</script>
