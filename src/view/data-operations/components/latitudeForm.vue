<!--  -->
<style lang='less' scoped>
    @import '../styles.less';

</style>
<template>
  <div>
      <Form ref="statForm" inline>
        <FormItem>
            <Input class='input-width' v-model="search" placeholder="输入搜索内容" clearable >
            </Input>
        </FormItem>

        <FormItem>
            <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>
        </FormItem>

        <FormItem>
            <Button type="primary" icon="plus-round" @click="handleAdd()">添加</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>

export default {
  name: 'latitudeForm',
  data () {
    return {
      search: null
    }
  },

  computed: {
    dctConfig: function () {
      return this.$store.state.latiParam.dctConfig
    }
  },

  methods: {
    handleSearch () {
      this.$store.commit('loading', true)
      this.$store.commit('TRUNCATE_CONFIG_DATA')
      let search = this.search == null ? '' : this.search.trim()
      let params = {
        search: search
        // limit: 30
      }

      this.$store.dispatch('getDctConfig', params).then(() => {
        this.$store.commit('loading', false)
      })
    },
    handleAdd () {
      this.$store.commit('MODAL_ADD_LATI', true)
    }

  }

}

</script>
