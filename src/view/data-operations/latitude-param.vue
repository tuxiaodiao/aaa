<!--  -->
<template>
  <div>
     <div>
        <latitudeForm> </latitudeForm>
    </div>

    <Card :bordered="false">
        <div>
             <latitudeTable
                    refs="table4"
                    :editIncell="true"
                    :loading="loading"
                    :columnsList="columnsList"
                    v-model="tableData"
                    @on-cell-change="handleCellChange">
            </latitudeTable>
        </div>

      <Page class="page"
            ref="latitude-pages"
            :total="dctConfig.rows.length"
            :page-size="limit"
            size="small"
            show-total
            @on-change="handlePageDown">
      </Page>
    </Card>

    <addLatiForm></addLatiForm>

  </div>
</template>

<script>
import _ from 'underscore'
import latitudeTable from './components/latitudeTable'
import latitudeForm from './components/latitudeForm'
import * as dataConfig from './dataConfig'
import addLatiForm from './components/addLatiForm'
import { WSANOTINITIALISED } from 'constants'

export default {
  name: 'latitude-param',
  components: {
    latitudeForm, latitudeTable, addLatiForm
  },
  data () {
    return {
      currentPage: 1,
      offset: 0,
      limit: 10,
      columnsList: []
    }
  },

  computed: {
    dctConfig: function () {
      return this.$store.state.latiParam.dctConfig
    },
    loading: function () {
      return this.$store.state.statCommon.loading
    },
    // 表数据
    tableData () {
      return this.dctConfig.rows.slice(this.offset, this.offset + this.limit)
    }
  },

  methods: {
    // 分页
    handlePageDown: function () {
      let currentPage = this.$refs['latitude-pages'].currentPage
      this.offset = currentPage === 1 ? 0 : (currentPage - 1) * this.limit
    },

    handleCellChange (val, index, key) {
      this.$Message.success('修改成功！')
    },

    initClumns () {
      let self = this
      self.columnsList = dataConfig.dctConfigColumn
    }
  },

  created () {
    this.initClumns()
  }
}

</script>
<style lang='less' scoped>
@import './styles.less';
</style>
