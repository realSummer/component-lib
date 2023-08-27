<template>
  <div class="at-form-component" :class="configData.className || ''">
    <span class="finance-form-text">
      {{ configData.formatData ? configData.formatData(searchVal) : searchVal }}
    </span>
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
<style lang="scss">
.finance-form-text {
  color: $infoColor;
  word-break: break-all;
}
</style>
