<style lang="less" scope>
    @import 'styles.less';
</style>

<template>
  <div>
    <div>
      <userForm> </userForm>
    </div>

    <Card :bordered="false">
        <div>
             <userDataTable
                    :loading="loading"
                    :columnsList="columnsList"
                    v-model="tableData"
                    :access="access">
            </userDataTable>
        </div>

        <Page class="page"
              ref="user-pages"
              :total="userList.length"
              :page-size="limit"
              size="small"
              show-total
              @on-change="handlePageDown">
        </Page>
    </Card>

  </div>
</template>

<script>
import userForm from './components/userForm'
import userDataTable from './components/userDataTable'
import * as dataConfig from './dataConfig'

export default {
  name: 'user',
  components: {
    userForm, userDataTable
  },

  data () {
    return {
      currentPage: 1,
      offset: 0,
      limit: 10,
      columnsList: [],
      access: {}
    }
  },
  computed: {
    userList: function () {
      return this.$store.state.user.userList
    },
    dctSites () {
      return this.$store.state.statCommon.dctSites
    },
    loading: function () {
      return this.$store.state.statCommon.loading
    },
    // 表数据
    tableData () {
      return this.userList.slice(this.offset, this.offset + this.limit)
    }
  },
  methods: {
    init () {
      this.columnsList = dataConfig.userListColumn
      this.access = dataConfig.access
    },
    // 分页
    handlePageDown: function () {
      let currentPage = this.$refs['user-pages'].currentPage
      this.offset = currentPage === 1 ? 0 : (currentPage - 1) * this.limit
    }

  },
  created () {
    this.init()
  }
}
</script>
