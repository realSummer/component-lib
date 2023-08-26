export default {
	data() {
		return {
			searchVal: this.configData.defaultValue
		};
	},
	props: {
		configData: {
			type: Object,
			required: true
		}
	},
	methods: {
		// 筛选框数据回调
		handleSearch() {
			this.$emit("handleEventChange", {
				[this.configData.propName]: this.searchVal,
			});
		}
	}
};
