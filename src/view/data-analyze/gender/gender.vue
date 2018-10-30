<!--  -->
<style lang='less' scoped>
@import "./styles.less";
</style>

<template>
    <div>
        <div>
            <gender-form @queryParams="getQueryParams"></gender-form>
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
import genderForm from "./components/form";
import Echarts from "./components/dataEcharts";
import analysisTable from "./components/table";
import * as dataConfig from "./dataConfig";
import _ from "underscore";
export default {
  name: "gender",
  components: {
    genderForm,
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
    gender() {
      return this.$store.state.analysis.gender;
    }
  },
  methods: {
    init() {
      let genderOption = dataConfig.INIT_OPTION;
      this.$store.commit("GENDER_OPTION", genderOption);
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
      await this.$store.dispatch("gender", params);
      // 获取所有景点信息
      let sites = this.$store.state.statCommon.dctSites;
      if (!_.isEmpty(this.gender) && !_.isEmpty(sites)) {
        this.buildSeries(this.gender, sites);
      }
    },
    buildSeries() {
      let arg = arguments[0];
      let sites = arguments[1];
      // 组装option数据
      let genderOption = dataConfig.process(arg, sites);
      // 给页面option赋值
      this.$store.commit("GENDER_OPTION", genderOption);
      let resData = dataConfig.deal(arg, sites);
      this.columnsList = [];
      this.tableData = [];
      this.columnsList = resData.configColumns;
      this.tableData = resData.tableData;
    },
    getQueryParams() {
      let params = arguments[0];
      this.$store.commit("INIT_ANALYSIS_PROPERTY", {
        key: "genderOption",
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
