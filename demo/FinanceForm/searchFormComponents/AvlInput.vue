<template>
  <div class="at-form-component" :class="configData.className || ''">
    <el-input
      :key="configData.propName"
      v-model.trim="searchVal"
      :size="configData.size || ''"
      :placeholder="configData.placeholder || ''"
      v-bind="propAttrs"
      :disabled="disabled"
      :type="configData.inputType"
      @input="handleSearch"
    >
      <el-button
        v-if="configData.showSearchIcon"
        slot="append"
        icon="el-icon-search"
        size="small"
        @click="handleSearch"
      />
    </el-input>
  </div>
</template>
<script>
import minxi from './mixin'
export default {
  mixins: [minxi],
  computed: {
    propAttrs() {
      let attrs = {}
      if (this.configData.minlength) {
        attrs = {
          ...attrs,
          minlength: this.configData.minlength
        }
      }
      if (this.configData.maxlength) {
        attrs = {
          ...attrs,
          maxlength: this.configData.maxlength
        }
      }
      if (this.configData.showWordLimit) {
        attrs = {
          ...attrs,
          'show-word-limit': true
        }
      }
      if (this.configData.clearable) {
        attrs = {
          ...attrs,
          clearable: true
        }
      }
      return attrs
    }
  },
  created() {
    this.initValueWatch()
  }
}
</script>
