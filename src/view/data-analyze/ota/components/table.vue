<!--  -->
<style lang='less' scoped>
    @import '../styles.less';
</style>

<template>
  <div class="margin-top-20">
      <card :bordered="false">
          <Table :columns="columnsList" :data="value" border disabled-hover></Table>
      </card>      
  </div>
</template>

<script>
export default {
    props: {
        columnsList: Array,
        value: Array,
    },
    data () {
        return {
           
        };
    },

    computed: {},

    methods: {}
}

</script>
