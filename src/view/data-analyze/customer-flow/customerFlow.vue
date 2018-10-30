<style lang="less" scoped>
@import "./styles.less";
</style>

<template>
  <div>
    <div>
      <analysisForm @queryParams="getQueryParams"> </analysisForm>
    </div>
    <div>
      <Echarts> </Echarts>
    </div>
    <div>
      <analysis-table :columnsList="columnsList" v-model="tableData"></analysis-table>
    </div>
  </div>

</template>
<script>
import analysisForm from "./components/form";
import Echarts from "./components/dataEcharts";
import analysisTable from "./components/table";
import * as dataConfig from "./dataConfig";
import _ from "underscore";
export default {
  name: "customerFlow",
  components: {
    analysisForm,
    Echarts,
    analysisTable
  },
  data() {
    return {
      columnsList: [],
      tableData: []
    };
  },
  computed: {
    // 获取接口数据
    customerFlow() {
      return this.$store.state.analysis.customerFlow;
    }
  },
  methods: {
    init() {
      // 默认获取一周的数据
      this.initOption();
      this.getApiData();
    },
    // 初始化echart option数据
    initOption() {
      this.$store.commit("INIT_ANALYSIS_PROPERTY", {
        key: "customerFlowOption",
        data: dataConfig["INIT_OPTION"]
      });
    },
    // 请求接口数据
    getApiData: async function() {
      let params = {
        start: arguments[0],
        end: arguments[1],
        site: arguments[2] || "_ALL_"
      };
      // 请求接口
      await this.$store.dispatch("customerFlow", params);
      console.log(this.customerFlow)
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites;
      console.log(sites)
      if (!_.isEmpty(this.customerFlow) && !_.isEmpty(sites)) {
        this.buildSeries(this.customerFlow, sites);
      }
    },
    // 处理图表需要显示的数据
    buildSeries() {

      let arg = arguments[0];
      let sites = arguments[1];
      // 组装option数据
      let customerFlowOption = dataConfig.process(arg, sites);
      console.log(customerFlowOption)
      // 给页面option赋值
      this.$store.commit("CUSTOMER_FLOW_OPTION", customerFlowOption);
      let resData = dataConfig.deal(arg, sites)
      this.columnsList = [];
      this.tableData = [];
      this.columnsList = resData.configColumns;
      this.tableData = resData.tableData;
    },

    // 查询（接受子组件参数传递）
    getQueryParams() {
      let params = arguments[0];
      this.initOption();
      this.getApiData(params["start"], params["end"], params["site"]);
    }
  },
  mounted() {
    this.init();
  },
  destroyed() {
    // 清除状态缓存
    this.initOption();
  }
};
</script>