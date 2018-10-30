<style lang='less' scoped>
  @import '../styles.less';

</style>

<template>
 <Modal v-model="modal1"
        title="消息体"
        width=800
        @on-cancel="cancel">
        <div>
          <VueJsonPretty :data="currentBody">
          </VueJsonPretty>
        </div>
    <div slot="footer">
        <i-button type="ghost" size="large" @click="cancel">取消</i-button>
        <i-button type="primary" size="large" @click="ok">确定</i-button>
    </div>
  </Modal>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import _ from 'underscore'

export default {
  name: 'sourBodyDetail',
  data () {
    return {
    }
  },

  components: {
    VueJsonPretty
  },

  computed: {
    currentBody: function () {
      let tmpData = this.$store.state.source.currentBody
      if (!_.isEmpty(tmpData)) {
        return tmpData
      } else {
        return {}
      }
    },
    modal1: {
      get () {
        return this.$store.state.source.modal1
      },
      set (val) {
        this.$store.commit('MODAL_BODY_INFO', val)
      }
    }
  },
  methods: {
    cancel () {
      this.modal1 = false
      this.$store.commit('TRUNCATE_BODY_INFO')
    },
    ok () {
      this.modal1 = false
      this.$store.commit('TRUNCATE_BODY_INFO')
    }
  }
}
</script>
