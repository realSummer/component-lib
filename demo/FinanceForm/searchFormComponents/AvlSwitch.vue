<template>
  <div class="at-form-component" :class="configData.className || ''">
    <el-switch
      v-bind="configData.config"
      :key="configData.propName"
      v-model="searchVal"
      :width="configData.width"
      :disabled="disabled"
      @change="handleSearch"
    />
  </div>
</template>
<script>
import minxi from './mixin'
export default {
  mixins: [minxi],
  created() {
    this.initValueWatch()
  }
}
</script>
