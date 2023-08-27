<template>
  <div class="at-form-component" :class="configData.className || ''">
    <el-cascader
      :key="configData.propName"
      v-model="searchVal"
      :options="options"
      :size="configData.size || ''"
      :placeholder="configData.placeholder || ''"
      v-bind="propAttrs"
      :disabled="disabled"
      popper-class="common_cascader_popper"
      @change="handleSearch"
    />
  </div>
</template>
<script>
import minxi from './mixin'
export default {
  mixins: [minxi],
  computed: {
    propAttrs() {
      let attrs = {}
      if (this.configData.clearable) {
        attrs = {
          ...attrs,
          clearable: true
        }
      }

      if (this.configData.filterable) {
        attrs = {
          ...attrs,
          filterable: true
        }
      }
      if (this.configData.filterable && this.configData.filterMethod) {
        attrs = {
          ...attrs,
          'filter-method': this.configData.filterMethod
        }
      }
      if (this.configData.collapseTags) {
        attrs = {
          ...attrs,
          'collapse-tags': true
        }
      }
      if (this.configData.separator) {
        attrs = {
          ...attrs,
          separator: this.configData.separator
        }
      }

      if (this.configData.showLastLevel) {
        attrs = {
          ...attrs,
          'show-all-levels': false
        }
      }

      attrs = {
        ...attrs,
        props: this.configData.props
      }

      return attrs
    }
  },
  created() {
    this.initValueWatch()
    this.initOptionsWatch()
  },
  methods: {
    handleSearch(val) {
      this.$emit('handleEventChange', {
        [this.configData.propName]: val
      })
    }
  }
}
</script>

<style lang="scss">
.common_cascader_popper .el-cascader-menu__list {
  max-width: 200px;
}
</style>
