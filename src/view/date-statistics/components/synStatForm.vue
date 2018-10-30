<style lang="less">
  @import '../styles.less';
</style>

<template>
  <div>
    <Card class='margin-bottom-20'>
      <CheckboxGroup v-model="currentChecked" @on-change="handleChangeDct()">
        <Checkbox v-for="item in showDctTabList" :label="item.name">{{ item.memo }}</Checkbox>
      </CheckboxGroup>
    </Card>

      <Form ref="synStatForm" inline>
      <FormItem prop="site">
        <Select class="site-select-width" v-model="site">
          <Option v-for="item in dctSites" :value="item.code" :key="item.code">{{ item.name + '[' + item.code +']' }}</Option>
        </Select>
      </FormItem>

      <FormItem class="select-date-width" prop="selectDate">
        <DatePicker v-model="selectDate" type="date" show-week-numbers placeholder="选择日期"></DatePicker>
      </FormItem>

      <FormItem>
        <Select  v-model="selectTypeChecked" class="select-stat-type-style" @on-change="handleSelectType">
          <Option v-for="item in selectType" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>

      <FormItem v-if="formDynomic.length > 0" v-for="fm in formDynomic" >
        <Select
          :class="fm.style"
          v-model="showCol[fm.name]"
          :placeholder="fm.placeholder">
          <Option v-for='item in fm["options"]' :value="item.code" :key="item.code">
            <span :class="item.code === '_ALL_' ? 'select-all-item' : ''"> {{ item.name }} </span>
          </Option>
        </Select>
      </FormItem>

      <FormItem prop="isVirtual">
        <Checkbox v-model="isVirtual">组合票</Checkbox>
      </FormItem>
      <FormItem v-if="selectTypeChecked==='SELL'" prop="isEntryTime">
        <Checkbox v-model="isEntryTime">入园时间</Checkbox>
      </FormItem>

      <FormItem>
        <Button type="primary" icon="ios-search" @click="handleSearch()">查询</Button>
      </FormItem>
    </Form>
  </div>

</template>

<script>
import * as dataConfig from '../dataConfig'
import _ from 'underscore'
import moment from 'moment-timezone'
export default {
  name: 'synStatForm',
  components: {
  },
  data () {
    return {
      site: null,
      isVirtual: false,
      isEntryTime: false,
      selectType: [],
      selectTypeChecked: 'SELL',
      selectDate: new Date(),
      currentChecked: [],
      currentCol: [],
      showCol: {}
    }
  },
  computed: {
    // 获取景点权限
    dctSites: function () {
      let sites = this.$store.state.statCommon.dctSites
      this.site = sites[0] && sites[0].hasOwnProperty('code') ? sites[0]['code'] : ''
      return sites
    },
    // 数据字典的字典(表外勾选的统计维度)
    showDctTabList: function () {
      // 获取所有维度数据
      let dctTabDctDctList = this.$store.state.statCommon.dctTabDctDctList
      // 获取当前页面需要的维度
      let dctTabDynomic = this.getDynomic(this.selectTypeChecked)
      let showList = dctTabDctDctList.filter(item => _.pluck(dctTabDynomic, 'key').indexOf(item.name.toUpperCase()) > -1)
      return showList
    },
    // 字典列表(这些字段都是需要从数据字典中获取中文说明)
    dctTabDctDct: function () {
      return this.$store.state.statCommon.dctTabDctDct
    },
    // 通用数据字典（dctTabDctDct 中 rel_type=0 需要从这里获取中文说明）
    dctTabDctCommon: function () {
      return this.$store.state.statCommon.dctTabData.dctTabDataCommon
    },
    // 自定义数据字典(dctTabDctDct 中 rel_type=1 需要从这里获取中文说明)
    dctTabDctSpec: function () {
      return this.$store.state.statCommon.dctTabData.dctTabDataSpec
    },
    formDynomic: {
      get () {
        return this.currentCol
      },
      set (val) {
        this.currentCol = val
      }
    }
  },
  methods: {
    initDataConfig: function () {
      this.handleSelectTypeChangeShowDct()
      this.selectType = dataConfig.synStatType
    },
    // 根据类型获取动态字典数据
    getDynomic: function () {
      let currentSelectType = arguments[0]
      let dctTabDynomic
      switch (currentSelectType) {
        case 'SELL':
          dctTabDynomic = dataConfig.syncStatSaleDctTabDynomic
          break
        case 'CHECK':
          dctTabDynomic = dataConfig.syncStatCheckDctTabDynomic
          break
        default:
      }
      return dctTabDynomic
    },
    // 获取当前数据配置，设置临时变量
    handleSelectTypeChangeShowDct: function () {
      let currentSelectType = arguments[0] || this.selectTypeChecked
      let dctTabDynomic = this.getDynomic(currentSelectType)
      let dctDynomic = {}
      for (let item of dctTabDynomic) {
        dctDynomic[item['key'].toLowerCase()] = null
      }
      _.extend(this.showCol, dctDynomic)
    },
    // 选择类型
    handleSelectType: function () {
      this.formDynomic = []
      this.currentChecked = []
      this.showCol = {}
      this.handleSelectTypeChangeShowDct(arguments[0])
    },
    // 重新查询
    handleSearch: function () {
      this.$store.commit('TRUNCATE_SYN_DAY_DATA')
      let params = {
        site: this.site,
        isVirtual: this.isVirtual ? 1 : 0,
        stat_date_type: this.isEntryTime ? '12' : '11',
        statType: this.selectTypeChecked,
        searchDate: moment(this.selectDate).format('YYYY-MM-DD'),
        searchItem: []
      }

      for (let check of this.currentChecked) {
        let dct = {
          key: check.toLowerCase(),
          value: this.showCol[check.toLowerCase()]
        }
        params.searchItem.push(dct)
      }

      this.$emit('queryParams', params)
    },
    // 获取当前选定的字典
    handleChangeDct: function () {
      // 修改表头需要重新计算，则删除缓存数据
      this.$store.commit('TRUNCATE_SYN_DAY_DATA')
      let handle = this.currentChecked
      // 设立表头
      let currentCheckedList = []
      // 设立表单
      let selectionList = []
      for (let item of handle) {
        let tmpDct = _.find(this.getDynomic(this.selectTypeChecked), function (result) { return result['key'].toUpperCase() === item.toUpperCase() })
        // 当前维度字典说明
        let currentDctTab = this.dctTabDctDct[item.toLowerCase()]
        // 表头部分
        let dct = {
          title: currentDctTab.name,
          key: item.toLowerCase(),
          align: tmpDct['align'],
          width: tmpDct['width'],
          rel_type: currentDctTab.rel_type
        }
        currentCheckedList.push(dct)

        // 定义选项内容
        let options = [{code: '_ALL_', name: currentDctTab.name}]
        options = options.concat(dct['rel_type'] ? this.dctTabDctSpec[this.site][item.toLowerCase()] : this.dctTabDctCommon[item.toLowerCase()])
        // 表单部分
        let selectionDct = {
          name: item.toLowerCase(),
          placeholder: currentDctTab.name,
          style: tmpDct['className'],
          options: options
        }
        selectionList.push(selectionDct)
      }
      this.formDynomic = selectionList

      // 提交需要显示的字段
      this.$store.commit('SET_SYN_HEADER_DYNAMIC', currentCheckedList)
    }
  },
  mounted () {
    // 初始化数据配置
    this.initDataConfig()
  }
}
</script>
