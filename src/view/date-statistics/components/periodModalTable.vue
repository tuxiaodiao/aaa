<style lang="less">
    @import '../styles.less';
</style>

<template>
  <statDataTable></statDataTable>

</template>

<script>
import statDataTable from './statDataTable'
export default {
  name: 'periodModalTable',
  components: {
    statDataTable
  },
  data () {
    return {
    }
  },
  methods: {
    init () {
    }
  },
  created () {
    this.init()
  }
}
</script>
