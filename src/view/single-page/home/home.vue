
<style lang="less" >
@import "./styles.less";
</style>

<template>
  <div class="home-bgc">
    <div>
      <title-bar></title-bar>
    </div>
    <div class="gradient-line"></div>
    <div class="echarts-group">
       <Row>
         <i-col span="6" class="left">
            <div>
              <pay-channel-echarts></pay-channel-echarts>
            </div>
            <div>
              <ticket-kind-echarts></ticket-kind-echarts>
            </div>
            <div>
              <visitor-echarts></visitor-echarts>
            </div>
            <div>
              <ahead-echarts></ahead-echarts>
            </div>
             <div>
              <second-income-echarts></second-income-echarts>
            </div>
         </i-col>
         <i-col span="12" class="center">
           <div class="center-t clearfix">
             <span >售票：{{siteStatTotal.sell}}</span>
             <span style="float:right">验票：{{siteStatTotal.check}}</span>
           </div>
           <div class="map">
              <map-echarts></map-echarts>
           </div>
           <Row class="row-p">
              <i-col span="12" class="center-b1">
                <div>
                  <therma-echarts></therma-echarts>
                </div>
              </i-col>
              <i-col span="12" class='center-b2'>
                <div>
                  <timezone-echarts></timezone-echarts>
                </div>

              </i-col>
           </Row>
         </i-col>
         <i-col span="6" class="right">
            <div>
              <west-echarts></west-echarts>
            </div>
            <div>
              <north-echarts></north-echarts>
            </div>
            <div>
              <south-echarts></south-echarts>
            </div>
            <div>
              <in-seven-days-echarts></in-seven-days-echarts>
            </div>
         </i-col>
       </Row>
    </div>
  </div>
</template>

<script>
import titleBar from './components/title-bar/title-bar.vue'
import payChannelEcharts from './components/payChannel/payChannelEcharts.vue'
import ticketKindEcharts from './components/ticketKind/ticketKindEcharts.vue'
import visitorEcharts from './components/visitor/visitorEcharts.vue'
import aheadEcharts from './components/ahead/aheadEcharts.vue'
import secondIncomeEcharts from './components/secondIncome/secondIncomeEcharts.vue'
import timezoneEcharts from './components/timezone/timezoneEcharts.vue'
import thermaEcharts from './components/therma/thermaEcharts.vue'
import northEcharts from './components/north/northEcharts.vue'
import westEcharts from './components/west/westEcharts.vue'
import southEcharts from './components/south/southEcharts.vue'
import inSevenDaysEcharts from './components/inSevenDays/inSevenDaysEcharts.vue'
import mapEcharts from './components/map/mapEcharts.vue'
import _ from 'underscore'
import $ from 'jquery'
export default {
  name: 'home',
  components: {
    titleBar,
    payChannelEcharts,
    ticketKindEcharts,
    visitorEcharts,
    aheadEcharts,
    secondIncomeEcharts,
    timezoneEcharts,
    thermaEcharts,
    northEcharts,
    westEcharts,
    southEcharts,
    inSevenDaysEcharts,
    mapEcharts
  },
  data () {
    return {
      screenText: 'arrow-expand'
    }
  },
  computed: {
    // 获取景点权限
    dctSites: function () {
      let sites = _.filter(this.$store.state.statCommon.dctSites, item => {
        return item['code'] !== '_ALL_'
      })
      this.site =
        sites[0] && sites[0].hasOwnProperty('code') ? sites[0]['code'] : ''
      this.siteName =
        sites[0] && sites[0].hasOwnProperty('name') ? sites[0]['name'] : ''
      return sites
    },
    siteStatTotal () {
      return this.$store.state.home.siteStatTotal
    }
  },
  methods: {
    initData () {
      this.getApi()
    },
    getApi: function () {
      // 请求接口
      this.$store.dispatch('dimensionality')
      this.$store.dispatch('HomeAttrPlace')
      this.$store.dispatch('hourPeriod')
    },
    handleSelectSite (val) {
      if (val) {
        this.site = val.split('_')[0]
        this.siteName = val.split('_')[1]
      }
    },

    screenFn () {
      if (this.screenText == 'arrow-expand') {
        this.screenText = 'arrow-shrink'
        $('.content-wrapper').css({padding: 0})
        this.requestFullScreen(document.documentElement)
      } else {
        this.screenText = 'arrow-expand'
        $('.content-wrapper').css({padding: '18px'})
        this.exitFull()
      }
      $('.left-sider, .header-con, .tag-nav-wrapper').fadeToggle()
    },
    // 全屏
    requestFullScreen (element) {
      var requestMethod = element.requestFullScreen || // W3C
        element.webkitRequestFullScreen || // Chrome等
        element.mozRequestFullScreen || // FireFox
        element.msRequestFullScreen // IE11
      if (requestMethod) {
        requestMethod.call(element)
      } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    },
    // 推出全屏
    exitFull () {
      var exitMethod = document.exitFullscreen || // W3C
        document.mozCancelFullScreen || // Chrome等
        document.webkitExitFullscreen || // FireFox
        document.webkitExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
  },

  mounted () {
    this.initData()
  }
}
</script>
