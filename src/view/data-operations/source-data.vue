<!--  -->
<style lang='less' scoped>
    @import "./styles.less";
</style>
<template>
    <div>
        <div>
            <sourForm @queryParams="getParams" > </sourForm>
        </div>
        <Card :bordered="false">
          <sourTable :columnsList="columnsList"  v-model="tableData" class="margin-top-10" :loading="loading">  </sourTable>
          <Page class="page"
              ref="sourdata-pages"
              :total="sourceData.rows.length"
              :page-size="limit"
              size="small"
              show-total
              @on-change="handlePageDown">
          </Page>
        </Card>
        <sourBodyDetail></sourBodyDetail>
    </div>
</template>

<script>
import _ from 'underscore'
import sourTable from './components/sourTable'
import sourForm from './components/sourForm'
import sourBodyDetail from './components/sourBodyDetail'
import * as dataConfig from './dataConfig'

export default {
  name: 'source-data',
  data () {
    return {
      columnsList: [],
      limit: 10,
      currentPage: 1,
      offset: 0
    }
  },

  components: {
    sourForm, sourTable, sourBodyDetail
  },

  computed: {
    // 监控table数据
    sourceData: function () {
      return this.$store.state.source.sourceData
    },
    tableData () {
      return this.sourceData.rows.slice(this.offset, this.offset + this.limit)
    },
    // loading
    loading: function () {
      return this.$store.state.statCommon.loading
    }
  },

  methods: {
    handlePageDown: function () {
      let currentPage = this.$refs['sourdata-pages'].currentPage
      this.offset = currentPage === 1 ? 0 : (currentPage - 1) * this.limit
    },
    getParams: function () {
      let args = arguments[0]
      this.getSource(args)
    },
    getSource: function (args) {
      // 获取业务数据
      this.$store.dispatch('getSource', args).then(() => {
        this.$store.commit('loading', false)
      })
    },

    initClumns () {
      let self = this
      self.columnsList = dataConfig.sourTableColumns
    }
  },

  created () {
    this.initClumns()
  }
}

</script>
