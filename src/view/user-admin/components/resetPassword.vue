<!--  -->
<style lang='less' scoped>
    @import '../styles.less';

</style>
<template>
  <Modal title="重置密码" width="450" class="resetPassword" v-model="modalPassword">
        <i-form :rules="ruleResetpw"
            ref='formValidate'
            :label-width="80"
            :model="formValidate">
            <Form-item prop="pw" label="设置新密码" >
                <i-input class='input-width' type="password" v-model="formValidate.pw" clearable >
                </i-input>
            </Form-item>
            <Form-item prop="c_pw" label="确认新密码" >
                <i-input class='input-width' type="password" v-model="formValidate.c_pw" clearable >
                </i-input>
            </Form-item>
            <Form-item class="reset-pw-btns margin-bottom-15">
                <i-button type="ghost" @click="handleReset('formValidate')" >重置</i-button>
                <i-button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</i-button>
            </Form-item>
        </i-form>

    </Modal>
</template>

<script>
export default {
  name: 'resetPassword',
  props: {
    param: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formValidate.c_pw !== '') {
          // 对第二个密码框单独验证
          this.$refs.formValidate.validateField('c_pw')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formValidate.pw) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      formValidate: {
        pw: '',
        c_pw: ''
      },

      ruleResetpw: {
        pw: [
          { validator: validatePass, trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        c_pw: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    modalPassword: {
      get () {
        return this.$store.state.user.modalPassword
      },
      set (val) {
        this.$store.commit('modalPassword', false)
      }
    }
  },

  methods: {
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.resetPassword()
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    resetPassword: function () {
      let args = {
        user_id: this.param,
        password: this.formValidate.pw
      }
      this.$store.dispatch('resetPassword', args).then((res) => {
        this.$store.commit('modalPassword', false)
        this.$Message.info('提交成功')
      })
    }
  },

  watch: {
    modalPassword (val) {
      if (val === false) {
        this.formValidate = {}
      }
    }
  }

}

</script>
