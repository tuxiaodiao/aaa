<style lang="less">
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
            <Button type="primary" icon="plus-round" @click="handleAdd()">添加用户</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'userForm',

  data () {
    return {
      search: ''

    }
  },

  computed: {
    userList: function () {
      return this.$store.state.user.userList
    }

  },

  methods: {

    handleAdd () {
      this.$store.commit('modalAddUser', true)
    },
    handleSearch () {
      this.$store.commit('loading', true)
      let search = this.search == null ? '' : this.search.trim()
      let params = {
        search: search
      }

      this.$store.commit('truncateList')
      this.$store.dispatch('getUserList', params).then(() => {
        this.$store.commit('loading', false)
      })
    }
  }

}
</script>
