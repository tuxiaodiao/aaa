<!--  -->
<style lang='less' scoped>
    @import '../styles.less';
    .ivu-form-item{
        margin-bottom: 18px;
        .ivu-checkbox-wrapper,.ivu-radio-wrapper{
            line-height: 25px;
        }

    }

</style>
<template>
  <Modal title="注册用户" width="450" class="addUser" v-model="modalAddUser">
        <Form :rules="ruleValidate"
            ref='registerValidate'
            :label-width="71"
            :model="registerValidate">
            <Form-item prop="loginName" label="登录名" >
                <i-input class='input-width' type="text" v-model="registerValidate.loginName" clearable >
                </i-input>
            </Form-item>
            <Form-item prop="loginPw" label="登录密码" >
                <i-input class='input-width' type="password" v-model="registerValidate.loginPw" clearable >
                </i-input>
            </Form-item>
            <Form-item prop="userName" label="用户姓名" >
                <i-input class='input-width'  v-model="registerValidate.userName" clearable >
                </i-input>
            </Form-item>
            <Form-item prop="phone" label="手机号码" >
                <i-input class='input-width'  v-model="registerValidate.phone" clearable >
                </i-input>
            </Form-item>
            <Form-item prop="mail" label="邮箱" >
                <i-input class='input-width'  v-model="registerValidate.mail" clearable >
                </i-input>
            </Form-item>
            <Form-item label="权限" prop="access">
                <Radio-group v-model="registerValidate.access">
                    <Radio v-for="(fm, index) in showUserAccess" :label="fm" >{{fm}}</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="景区权限" prop="siteAccess">
                <CheckboxGroup v-model="registerValidate.siteAccess">
                    <Checkbox v-for="item in showSiteAccess" :key="item.code" :label="item.name + '[' + item.code +']'"></Checkbox>
                </CheckboxGroup>
            </Form-item>
            <Form-item class="reset-pw-btns margin-bottom-15">
                <i-button type="ghost" @click="handleResetInfo('registerValidate')" >重置</i-button>
                <i-button type="primary" @click="handleSubmitInfo('registerValidate')" style="margin-left: 8px">提交</i-button>
            </Form-item>
        </Form>

    </Modal>
</template>

<script>
import _ from 'underscore'
import * as dataConfig from '../dataConfig'
export default {
  name: 'addUser',
  data () {
    const validatePhone = (rule, value, callback) => {
      var reg = 11 && /^((13|14|15|16|17|18)[0-9]{1}\d{8})$/
      if (value && !reg.test(value)) {
        callback(new Error('手机格式不正确'))
      } else {
        callback()
      }
    }
    return {

      registerValidate: {
        loginName: '',
        loginPw: '',
        userName: '',
        phone: '',
        mail: '',
        access: '',
        siteAccess: []
      },
      showSiteAccess: [],
      showUserAccess: [],
      ruleValidate: {
        loginName: [
          { required: true, message: '登录名不能为空', trigger: 'blur' }
        ],
        loginPw: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        phone: [
          {validator: validatePhone, trigger: 'blur' }
        ],
        mail: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        access: [
          { required: true, message: '请选择权限', trigger: 'change' }
        ],
        siteAccess: [
          { required: true, type: 'array', min: 1, message: '请选择景区权限', trigger: 'change' }
        ]
      }
    }
  },

  computed: {
    dctSites: function () {
      return this.$store.state.statCommon.dctSites
    },
    getUserAccess: function () {
      return this.$store.state.user.access
    },
    getUserSites: function () {
      return this.$store.state.user.sites
    },
    modalAddUser: {
      get () {
        return this.$store.state.user.modalAddUser
      },
      set (val) {
        this.$store.commit('modalAddUser', false)
      }
    }
  },

  methods: {
    initSitesAccess () {
      this.getUserSites.forEach(element => {
        let find = _.find(this.dctSites, function (site) { return site.code === element })
        this.showSiteAccess.push(find)
      })
    },
    initUserAccess () {
      for (let i = 0; i < this.getUserAccess.length; i++) {
        for (let k in dataConfig.access) {
          if (k == this.getUserAccess[i]) {
            this.showUserAccess.push(dataConfig.access[k])
          }
        }
      }
    },
    handleResetInfo (name) {
      this.$refs[name].resetFields()
    },
    handleSubmitInfo (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$store.commit('loading',true)
          this.registerUser()
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    registerUser: function () {
      let args = {
        login: this.registerValidate.loginName,
        password: this.registerValidate.loginPw,
        username: this.registerValidate.userName,
        phone: this.registerValidate.phone,
        email: this.registerValidate.mail,
        roles: this.registerValidate.access,
        sites: (this.registerValidate.siteAccess).toString()
      }
      this.$store.dispatch('registerUser', args).then((res) => {
        this.$store.commit('loading', false)
        this.$store.commit('modalAddUser', false)
        this.$Message.info('提交成功')
        this.registerValidate = {}
        this.$store.commit('truncateList')
        this.$store.dispatch('getUserList')
      })
    }
  },

  watch: {
    modalAddUser (val) {
      if (val === true) {
        this.initSitesAccess()
        this.initUserAccess()
      } else {
        this.showSiteAccess = []
        this.showUserAccess = []
      }
    }
  }

}

</script>
