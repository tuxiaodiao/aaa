
<!--  -->
<style lang='less' scoped>
  @import "./styles.less";
</style>
<template>
    <div>
        <div>
          <operForm @queryParams="getQueryParams"> </operForm>
        </div>
        <Card>
          <div class="edittable-table-height-con" >
              <can-edit-table
                  :loading="loading"
                  refs="table4"
                  v-model="tableData"
                  @on-cell-change="handleCellChange"
                  @on-change="handleChange"
                  :editIncell="true"
                  :columns-list="editInlineAndCellColumn"
              ></can-edit-table>
          </div>
          <Page class="page"
            ref="comdata-pages"
            :total="editInlineAndCellData.length"
            :page-size="limit"
            size="small"
            show-total
            @on-change="handlePageDown">
          </Page>

        </Card>
    </div>
</template>

<script>
import _ from 'underscore'
import * as dataConfig from './dataConfig'
import canEditTable from './components/canEditTable.vue'
import operForm from './components/operForm.vue'
import { WSANOTINITIALISED } from 'constants'
export default {
  name: 'common-data',
  data () {
    return {
      editInlineAndCellColumn: [],
      editInlineAndCellData: [],
      pageLength: 0,
      limit: 10,
      currentPage: 1,
      offset: 0
    }
  },

  components: {
    canEditTable, operForm
  },

  computed: {
    dctSites: function () {
      let sites = this.$store.state.statCommon.dctSites
      this.site = sites[0] && sites[0].hasOwnProperty('code') ? sites[0]['code'] : ''
      return sites
    },
    dctTabData: function () {
      return this.$store.state.statCommon.dctTabData
    },
    // 表数据
    tableData () {
      return this.editInlineAndCellData.slice(this.offset, this.offset + this.limit)
    },
    loading () {
      return this.$store.state.statCommon.loading
    }

  },

  methods: {
    handlePageDown: function () {
      let currentPage = this.$refs['comdata-pages'].currentPage
      this.offset = currentPage === 1 ? 0 : (currentPage - 1) * this.limit
    },
    getEditInlineAndCellColumn: function () {
      this.editInlineAndCellColumn = dataConfig.editInlineAndCellColumn
    },

    handleCellChange (val, index, key) {
      this.$Message.success('修改成功！')
    },
    handleChange (val, index) {
      this.$Message.success('修改成功！')
    },
    getQueryParams (data) {
      this.editInlineAndCellData = []
      let params = []
      this.dctSites.forEach(element => {
        params.push(element.code)
      })
      params = params.toString()
      this.$store.dispatch('getDct', {site: params})
      this.editInlineAndCellData = data.isRelType == true ? this.dctTabData.dctTabDataSpec[data.currentSite][data.currentShow] : this.dctTabData.dctTabDataCommon[data.currentShow]
    }

  },
  created () {
    this.getEditInlineAndCellColumn()
  }

}
</script>
