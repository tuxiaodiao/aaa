<template>
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'
import { findNodeUpperByClasses } from '@/libs/util'

export default {
  name: 'CollapsedMenu',
  mixins: [ mixin, itemMixin ],
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    rootIconSize: {
      type: Number,
      default: 16
    }
  },
  data () {
    return {
      placement: 'right-end'
    }
  },
  methods: {
    handleClick (name) {
      this.$emit('on-click', name)
    },
    handleMousemove (event, children) {
      const { pageY } = event
      const height = children.length * 38
      const isOverflow = pageY + height < window.innerHeight
      this.placement = isOverflow ? 'right-start' : 'right-end'
    }
  },
  mounted () {
    let dropdown = findNodeUpperByClasses(this.$refs.dropdown.$el, ['ivu-select-dropdown', 'ivu-dropdown-transfer'])
    if (dropdown) dropdown.style.overflow = 'visible'
  }
}
</script>
