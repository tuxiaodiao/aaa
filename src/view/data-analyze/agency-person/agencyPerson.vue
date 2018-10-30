<!--  -->
<style lang='less' scoped>
@import "./styles.less";
</style>

<template>
    <div>
        <div>
            <agency-person-form @queryParams="getQueryParams"></agency-person-form>
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
import agencyPersonForm from "./components/form";
import Echarts from "./components/dataEcharts";
import analysisTable from "./components/table";
import * as dataConfig from "./dataConfig";
import _ from "underscore";

export default {
  name: "agencyPerson",
  components: {
    agencyPersonForm,
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
    agencyPerson() {
      return this.$store.state.analysis.agencyPerson;
    }
  },

  methods: {
    init() {
      let agencyPersonOption = dataConfig.INIT_OPTION;
      this.$store.commit("AGENCY_PERSON_OPTION", agencyPersonOption);
      this.getApiData();
    },
    getQueryParams() {
      let params = arguments[0];
      this.$store.commit("INIT_ANALYSIS_PROPERTY", {
        key: "agencyPersonOption",
        data: dataConfig["INIT_OPTION"]
      });
      this.getApiData(params["start"], params["end"], params["site"]);
    },
    getApiData: async function() {
      let params = {
        start: arguments[0],
        end: arguments[1],
        site: arguments[2] || "_ALL_"
      };
      // 请求接口
      await this.$store.dispatch("agencyPerson", params);
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites;
      if (!_.isEmpty(this.agencyPerson) && !_.isEmpty(sites)) {
        this.buildSeries(this.agencyPerson, sites);
      }
    },
    buildSeries() {
      let arg = arguments[0];
      let sites = arguments[1];
      // 组装option数据
      let agencyPersonOption = dataConfig.process(arg, sites);
      // 给页面option赋值
      this.$store.commit("AGENCY_PERSON_OPTION", agencyPersonOption);
      let resData = dataConfig.deal(arg, sites);
      this.columnsList = [];
      this.tableData = [];
      this.columnsList = resData.configColumns;
      this.tableData = resData.tableData;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
