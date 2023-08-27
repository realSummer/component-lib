<template>
  <div class="at-form-component" :class="configData.className || ''">
    <el-radio-group
      v-bind="propAttrs"
      :key="configData.propName"
      v-model="searchVal"
      :size="configData.size || ''"
      :disabled="disabled"
      @change="handleSearch"
    >
      <template v-if="configData.showBtnStyle">
        <el-radio-button
          v-for="item in options"
          :key="item.value"
          :disabled="item.disabled"
          :label="item.value"
          :border="configData.showBorder"
        >{{ item.label }}</el-radio-button>
      </template>
      <template v-else>
        <el-radio
          v-for="item in options"
          :key="item.value"
          :disabled="item.disabled"
          :label="item.value"
          :border="configData.showBorder"
        >{{ item.label }}</el-radio>
      </template>
    </el-radio-group>
  </div>
</template>

<script>
import minxi from './mixin'
export default {
  mixins: [minxi],
  computed: {
    propAttrs() {
      if (this.configData.showBtnStyle && this.configData.btnStyle) {
        return {
          'text-color': this.configData.btnStyle.textColor || 'ffffff',
          fill: this.configData.btnStyle.fill || '#409EFF'
        }
      } else {
        return {}
      }
    }
  },
  created() {
    this.initValueWatch()
    this.initOptionsWatch()
  }
}
</script>
