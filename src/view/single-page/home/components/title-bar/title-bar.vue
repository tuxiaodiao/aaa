<!--  -->
<template>

    <div class="title-bar">
        <div class="date">
            <span >{{ getDate() + '  ' + getWeek() + ' ' + getTime() }}</span>
        </div>
        <h2>长白山数据分析平台</h2>
        <Icon class="screenBtn" v-bind:type="screenText" @click="screenFn"></Icon>
        <div class="circulation">
            <Dropdown trigger="click" style="margin-left: 20px" :transfer='true'>
                <a href="javascript:void(0)">
                    刷新间隔
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem :divided='true'>30s</DropdownItem>
                    <DropdownItem :divided='true'>1min</DropdownItem>
                    <DropdownItem :divided='true'>5min</DropdownItem>
                    <DropdownItem :divided='true'>10min</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>

</template>

<script>
import moment from 'moment-timezone'
import _ from 'underscore'
import $ from 'jquery'
export default {
  name: 'title-bar',
  data () {
    return {
      screenText: 'md-expand'
    }
  },

  components: {},

  computed: {},

  methods: {
    getDate () {
      return moment().format('YYYY年MM月DD日')
    },
    getWeek () {
      return moment().format('dddd')
    },
    getTime () {
      return moment().format('h:mm')
    },
    screenFn () {
      if (this.screenText == 'md-expand') {
        this.screenText = 'md-contract'
        $('.content-wrapper').css({padding: 0})
        this.requestFullScreen(document.documentElement)
      } else {
        this.screenText = 'md-expand'
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
  }
}
</script>
<style lang='less' scoped>
@import "../../styles.less";
</style>
