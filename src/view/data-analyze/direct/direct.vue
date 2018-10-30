<template>
  <div>
    <directForm @queryParams="getQueryParams"></directForm>
    <Card shadow>
      <directEcharts></directEcharts>
    </Card>
    <div>
      <analysis-table :columnsList="columnsList" v-model="tableData"></analysis-table>
    </div>
  </div>
</template>

<script>
import directForm from "./components/form";
import directEcharts from "./components/directEcharts";
import analysisTable from "./components/table";
import * as dataConfig from "./dataConfig";
import _ from "underscore";

export default {
  name: "direct",
  components: {
    directForm,
    directEcharts,
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
    direct() {
      return this.$store.state.analysis.direct;
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
        key: "directOption",
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
      await this.$store.dispatch("direct", params);
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites;
      if (!_.isEmpty(this.direct) && !_.isEmpty(sites)) {
        this.buildSeries(this.direct, sites);
      }
    },
    // 处理图表需要显示的数据
    buildSeries() {
      let arg = arguments[0];
      let sites = arguments[1];
      // 组装option数据
      let directOption = dataConfig.process(arg, sites);
      // 给页面option赋值
      this.$store.commit("DIRECT_OPTION", directOption);
      let resData = dataConfig.deal(arg, sites);
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

<style lang="less">
@import "./styles.less";
</style>
