<!--  -->
<style lang='less' scoped>
@import "./styles.less";
</style>

<template>
    <div>
        <div>
            <ticket-time-form @queryParams="getQueryParams"></ticket-time-form>
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
import ticketTimeForm from "./components/form";
import Echarts from "./components/dataEcharts";
import analysisTable from "./components/table";
import * as dataConfig from "./dataConfig";
import _ from "underscore";
export default {
  name: "ticket-time",
  components: {
    ticketTimeForm,
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
    //获取接口数据
    ticketTime() {
      return this.$store.state.analysis.ticketTime;
    }
  },

  methods: {
    init() {
      this.getApiData();
    },
    //请求接口数据
    getApiData: async function() {
      let params = {
        start: arguments[0],
        end: arguments[1],
        site: arguments[2] || "_ALL_"
      };
      // 请求接口
      await this.$store.dispatch("ticketTime", params);
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites;
      if (!_.isEmpty(this.ticketTime) && !_.isEmpty(sites)) {
        this.buildSeries(this.ticketTime, sites);
      }
    },

    buildSeries() {
      let arg = arguments[0];
      let sites = arguments[1];
      // 组装option数据
      let ticketTimeOption = dataConfig.process(arg, sites);
      // 给页面option赋值
      this.$store.commit("TICKET_TIME_OPTION", ticketTimeOption);
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
        key: "ticketTimeOption",
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
