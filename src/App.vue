<template>
  <div id="app">
	  <div style=" display: flex; justify-content: center">
		  <div @click="type = 'table'" style="background-color: #0AAEB3; width: 200px">表单和 table 的封装</div>
		  <div @click="type =  'dynamic'" style="background-color: #3a8ee6; width: 200px">动态组件</div>
	  </div>
	  <table-view v-show="type === 'table' " style="width: 100%; height: 400px"></table-view>
	  <financeForm v-show="type === 'dynamic' " style="width: 100%; height: 400px"></financeForm>
  </div>
</template>

<script>

import tableView from './components/table/index.vue'
import financeForm from "./components/dynamicComponent/index.vue"


export default {
  name: 'App',
	components: {
		tableView,
		financeForm
	},
	data() {
		return {
			type: 'dynamic',
		}
	},

	methods: {

	},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
