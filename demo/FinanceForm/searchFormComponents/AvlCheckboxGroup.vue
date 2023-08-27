<template>
  <div class="at-form-component" :class="configData.className || ''">
    <el-checkbox-group
      v-bind="propAttrs"
      :key="configData.propName"
      v-model="searchVal"
      :size="configData.size || ''"
      :disabled="disabled"
      @change="handleSearch"
    >
      <template v-if="configData.showBtnStyle">
        <el-checkbox-button
          v-for="item in options"
          :key="item.value"
          :disabled="item.disabled"
          :label="item.value"
          :border="configData.showBorder"
        >{{ item.label }}</el-checkbox-button>
      </template>
      <template v-else>
        <el-checkbox
          v-for="item in options"
          :key="item.value"
          :disabled="item.disabled"
          :label="item.value"
          :border="configData.showBorder"
        >{{ item.label }}</el-checkbox>
      </template>
    </el-checkbox-group>
  </div>
</template>

<script>
import minxi from './mixin'
export default {
  mixins: [minxi],
  computed: {
    propAttrs() {
      let attrs = {}
      if (this.configData.showBtnStyle && this.configData.btnStyle) {
        attrs = {
          ...attrs,
          'text-color': this.configData.btnStyle.textColor || 'ffffff',
          fill: this.configData.btnStyle.fill || '#409EFF'
        }
      }
      if (this.configData.min) {
        attrs = {
          ...attrs,
          min: this.configData.min
        }
      }

      if (this.configData.max) {
        attrs = {
          ...attrs,
          max: this.configData.max
        }
      }
      return attrs
    }
  },
  created() {
    this.initValueWatch()
    this.initOptionsWatch()
  }
}
</script>
