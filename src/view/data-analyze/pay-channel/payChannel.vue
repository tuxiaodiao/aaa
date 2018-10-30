<!--  -->
<style lang='less' scoped>
@import "./styles.less";
</style>

<template>
    <div>
        <div>
            <pay-channel-form @queryParams="getQueryParams"></pay-channel-form>
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
import payChannelForm from "./components/form";
import Echarts from "./components/dataEcharts";
import analysisTable from "./components/table";
import * as dataConfig from "./dataConfig";
import _ from "underscore";
export default {
  name: "payChannel",
  components: {
    payChannelForm,
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
    payChannel() {
      return this.$store.state.analysis.payChannel;
    }
  },

  methods: {
    init() {
      let payChannelOption = dataConfig.INIT_OPTION;
      this.$store.commit("PAY_CHANNEL_OPTION", payChannelOption);
      this.getApiData();
    },
    // 请求接口数据
    getApiData: async function() {
      let params = {
        start: arguments[0],
        end: arguments[1],
        site: arguments[2] || "_ALL_"
      };
      // 请求接口
      await this.$store.dispatch("payChannel", params);
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites;
      if (!_.isEmpty(this.payChannel) && !_.isEmpty(sites)) {
        this.buildSeries(this.payChannel, sites);
      }
    },

    buildSeries() {
      let arg = arguments[0];
      let sites = arguments[1];
      // 组装option数据
      let payChannelOption = dataConfig.process(arg, sites);
      // 给页面option赋值
      this.$store.commit("PAY_CHANNEL_OPTION", payChannelOption);
      let resData = dataConfig.deal(arg, sites)
      this.columnsList = [];
      this.tableData = [];
      this.columnsList = resData.configColumns;
      this.tableData = resData.tableData;
    },
    // 查询（接受子组件参数传递）
    getQueryParams() {
      let params = arguments[0];
      this.$store.commit("INIT_ANALYSIS_PROPERTY", {
        key: "payChannelOption",
        data: dataConfig["INIT_OPTION"]
      });
      this.getApiData(params["start"], params["end"], params["site"]);
    }
  },
  mounted() {
    this.init();
  }
};
</script>
