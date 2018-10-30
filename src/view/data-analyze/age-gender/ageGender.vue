<!--  -->
<style lang='less' scoped>
    @import './styles.less';
</style>

<template>
    <div>
        <div>
            <age-gender-form @queryParams="getQueryParams"></age-gender-form>
        </div>
        <div>
            <Echarts> </Echarts>
        </div>
        <div>
            <card :bordered="false" class="margin-top-20">
                <div v-for="item in ageGender.data">
                    <analysis-table :data="item"></analysis-table>
                </div>
            </card>  
        </div>
    </div>
</template>

<script>
import ageGenderForm from './components/form';
import Echarts from './components/dataEcharts';
import analysisTable from './components/table';
import * as dataConfig from './dataConfig';
import _ from 'underscore';
export default {
    name:'ageGender',
    components: {
      ageGenderForm, Echarts, analysisTable,
    },
    data () {
        return {       
        };
    },

    computed: {
        // 获取接口数据
      ageGender() {
        return this.$store.state.analysis.ageGender;
      }
    },

    methods: {
        init(){
            this.getApiData();
        },
         // 请求接口数据
        getApiData: async function() {
            let params = {
            start: arguments[0],
            end: arguments[1],
            site: arguments[2] || '_ALL_'
            }
            // 请求接口
            await this.$store.dispatch('ageGender', params);
            // 获取所有景点信息
            let sites = this.$store.state.statCommon.dctSites;
            if (!_.isEmpty(this.ageGender) && !_.isEmpty(sites) ) {
                this.buildSeries(this.ageGender, sites);
            }
        },

        buildSeries () {
            let arg = arguments[0];
            let sites = arguments[1];
            // 组装option数据
            let ageGenderOption = dataConfig.process(arg, sites);
            // 给页面option赋值
            this.$store.commit('AGE_GENDER_OPTION', ageGenderOption);
        },
        // 查询（接受子组件参数传递）
        getQueryParams () {
            let params = arguments[0];
            this.$store.commit('INIT_ANALYSIS_PROPERTY',{ key: 'ageGenderOption', data: dataConfig['INIT_OPTION'] })
            this.getApiData(params['start'], params['end'], params['site']);
        }

    },
    mounted () {
      this.init();
    },
}

</script>
