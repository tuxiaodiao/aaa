<!--  -->

<template>
  <Modal v-model="modalAddLati" title="添加" width="450" >
    <i-form  :label-width="80" ref="formValidate" :model="formValidate" :rules="ruleValidate" class="padding-right-20">
        <Form-item  label="编码"
                    prop="name"
                    class="padding-right-30">
            <i-input type="text" v-model="formValidate.name"></i-input>
        </Form-item>
        <Form-item label="说明"
                    prop="memo"
                    class="padding-right-30">
            <i-input type="text" v-model="formValidate.memo"></i-input>
        </Form-item>
        <Form-item label="属性"
                    class="padding-right-30"
                    prop="current_rel">

            <Select v-model="formValidate.current_rel">
                <Option v-for="item in rel_type" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </Form-item>
        <Form-item label="维护标识"
                    class="padding-right-30"
                    prop="current_auto">
            <Select v-model="formValidate.current_auto">
                <Option v-for="item in set_auto" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </Form-item>
        <Form-item class="add-lati-btns margin-bottom-0">
            <i-button type="ghost" @click="handleReset('formValidate')" >重置</i-button>
            <i-button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</i-button>
        </Form-item>

    </i-form>

  </Modal>
</template>

<script>
import { setTimeout } from 'timers'
export default {
  name: 'addLatiForm',

  data () {
    return {
      formValidate: {
        name: null,
        memo: null,
        current_rel: null,
        current_auto: null
      },
      ruleValidate: {
        name: [
          { required: true, message: '编码不能为空', trigger: 'blur' }
        ],
        memo: [
          { required: true, message: '说明不能为空', trigger: 'blur' }
        ],
        current_rel: [
          { required: true, message: '请选择属性' }
        ],
        current_auto: [
          { required: true, message: '请选择维护标识' }
        ]
      }
    }
  },

  computed: {
    rel_type: function () {
      return this.$store.state.latiParam.rel_type
    },
    set_auto: function () {
      return this.$store.state.latiParam.set_auto
    },
    modalAddLati: {
      get () {
        return this.$store.state.latiParam.modalAddLati
      },
      set (val) {
        this.$store.commit('MODAL_ADD_LATI', false)
      }
    }

  },

  methods: {

    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.addConfig()
          this.$Message.success('提交成功!')
          this.$store.commit('MODAL_ADD_LATI', false)
          this.$store.commit('TRUNCATE_CONFIG_DATA')
          setTimeout(() => {
            this.$store.dispatch('getDctConfig')
          }, 2000)
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },

    addConfig: function () {
      let args = {
        name: this.formValidate.name,
        memo: this.formValidate.memo,
        rel_type: this.formValidate.current_rel,
        set_auto: this.formValidate.current_auto
      }
      this.$store.dispatch('addDctConfig', args)
    }

  }
}

</script>
<style lang='less' >
    @import "../styles.less";
    .ivu-modal-footer{
        display: none !important;
        padding: 0;
    }

</style>
