<template>
	<div>
		<component v-for="item in formConfig" :key="item.id" v-bind:is="item.type" v-on="$listeners" :configData="item"></component>
		<slot></slot>
	</div>
</template>

<script>

import libSwitch from "./components/LibSwitch";
import libRadioGroup from "./components/LibRadioGroup";
import libSelect from "./components/LibSelect";
import libInput from "./components/LibInput";
import libCheckboxGroup from "./components/LibCheckboxGroup";
import libCascader from "./components/LibCascader";

export default {
	name: 'comForm',
	props: {
		formConfig: {
			type: Array,
			required: true,
		}
	},
	components: {
		"lib-switch": libSwitch,
		"lib-radio": libRadioGroup,
		"lib-select": libSelect,
		"lib-input": libInput,
		"lib-checkboxGroup": libCheckboxGroup,
		"lib-cascader": libCascader,
	},
	data() {
		return {

		}
	}
}

</script>

<style>
.com-form--search {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.com-from-component:not(:last-child) {
	margin-right: 20px;
}

.com-form-component {
	margin-bottom: 20px;
}
</style>
