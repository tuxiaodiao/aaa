<style lang="less">
  @import './styles.less';
</style>

<template>
  <div class="login" @keydown.enter="handleLogin">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <loginForm @on-success-valid="handleSubmit"></loginForm>
          <p class="login-tip">输入用户名和密码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import loginForm from './components/loginForm'
import { mapActions } from 'vuex'
export default {
  components: {
    loginForm
  },
  computed: {
    sites () {
      return this.$store.state.user.sites
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    initBaseData: function() {
      // 下面为业务初始化操作，必须在用户session存在下才执行
      console.log(JSON.stringify(this.sites));
      let params = { site: this.sites && this.sites.length > 0 ? this.sites.toString() : '' }
      this.$store.dispatch('getDct', params)
    },
    handleSubmit ({ userName, password }) {
      console.log('userName: ' + userName)
      console.log('password: ' + password)
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.initBaseData()
          this.$router.push({
            name: 'home'
          })
        })
      })
    }
  }
}
</script>

<style>

</style>
