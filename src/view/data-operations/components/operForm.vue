<!--  -->
<template>
  <div>
      <Form ref="operForm" inline>
        <FormItem prop='commonList'>
            <Select v-model="showTab" style="width:150px;" @on-change="setShowSite">
                <Option v-for="item in dctTabDctDctList" :key="item.name" :value="item.name">{{ item.memo }}</Option>
            </Select>
        </FormItem>

        <FormItem class="site-select-width" prop="site" v-if="showSite">
            <Select v-model="site" placeholder="请选择景区">
                <Option v-for="(item, index) in dctSites" :value="item.code" :key="item.code">
                    <span :class="item.code === '_ALL_' ? 'select-all-item' : ''"> {{ item.name + '[' + item.code +']' }} </span>
                </Option>
            </Select>
      </FormItem>

        <FormItem>
            <Input class='input-width' v-model="search" placeholder="输入搜索内容" clearable >
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'operForm',
  data () {
    return {
      site: null,
      showTab: null,
      search: '',
      showSite: false
    }
  },
  computed: {
    // 获取景点权限
    dctSites: function () {
      let sites = this.$store.state.statCommon.dctSites
      this.site =
        sites[0] && sites[0].hasOwnProperty('code') ? sites[0]['code'] : ''
      return sites
    },
    dctTabDctDctList: function () {
      return this.$store.state.statCommon.dctTabDctDctList
    },
    // loading
    loading: function () {
      return this.$store.state.statCommon.loading
    }
  },
  methods: {
    getArrIndex: function (arr, obj) {
      let index = null
      let key = Object.keys(obj)[0]
      arr.every(function (value, i) {
        if (value[key] === obj[key]) {
          index = i
          return false
        }
        return true
      })
      return index
    },
    handleSearch () {
      this.$store.commit('loading', true)
      // this.$store.commit('TRUNCATE_DCT_COMMON_INFO')
      let val = this.showTab
      let getIndex = this.getArrIndex(this.dctTabDctDctList, { name: val })
      this.dctTabDctDctList[getIndex].rel_type === 0
        ? this.$emit('queryParams', {
          isRelType: false,
          currentSite: this.site,
          currentShow: val.toLowerCase()
        })
        : this.$emit('queryParams', {
          isRelType: true,
          currentSite: this.site,
          currentShow: val.toLowerCase()
        })
    },
    setShowSite: function () {
      this.showSite = false
      let val = this.showTab
      let getIndex = this.getArrIndex(this.dctTabDctDctList, { name: val })
      this.showSite =
        this.dctTabDctDctList[getIndex].rel_type !== 0
    }
  }
}
</script>
<style lang='less' scoped>
@import "../styles.less";
</style>
