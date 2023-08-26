<template>
  <div class="com-form-component" :class="configData.className || '' ">

   <el-switch v-model="searchVal" v-bind="configData.config" :disabled="configData.disabled" @change="handleSearch" :width="configData.width"></el-switch>

  </div>
</template>
<script>
import dataMinix from './dataMixin'
export default {
	mixins:[dataMinix]
};
</script>
