<!--  -->
<template>
  
    <div class="title-bar">
        <div class="date">
            <span >{{ getDate() + '  ' + getWeek() + ' ' + getTime() }}</span>
        </div>
        <h2>长白山数据分析平台</h2>
        <div class="circulation">
            <Dropdown trigger="click" style="margin-left: 20px" :transfer='true' @on-click="handleSelect" >
                <a href="javascript:void(0)">
                    刷新间隔
                    <!-- <Icon type="ios-arrow-down></Icon> -->
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="(value, key) in localList" :name="key" :key="value">{{ value }}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
  
</template>

<script>
import moment from "moment-timezone";
import _ from "underscore";
export default {
    name:'title-bar',
  data() {
    return {
        localList: {
            'thirty': '30s',
            'one': '1min',
            'five': '5min',
            'ten': '10min'
        }
    };
  },

  components: {},

  computed: {},

  methods: {
    getDate() {
      return moment().format("YYYY年MM月DD日");
    },
    getWeek() {
      return moment().format("dddd");
    },
    getTime() {
      return moment().format("h:mm");
    },
    handleSelect(val){
        this.$emit('time-change', val)
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../styles.less";
</style>