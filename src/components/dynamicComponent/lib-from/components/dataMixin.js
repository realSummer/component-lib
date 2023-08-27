export default {
	data() {
		return {
			searchVal: this.configData.defaultValue,
			valueUnWatch: v => v,
			optionsUnWatch: v => v
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
		},
		// 初始化watch--改变值
		initValueWatch() {
			const linkValueProps = this.configData.linkValueProps

			if ( linkValueProps && linkValueProps.length &&  this.configData.changeValue ) {

				console.log(linkValueProps)

				linkValueProps.map(item => {
					const watchKey = `ruleForm.${item}`
					console.log(watchKey);

					// 手动增加watch
					this.valueUnWatch = this.$watch(watchKey, async(val, oldVal) => {
						if (val === oldVal || Number.isNaN(val)) {
							return
						}
						const linkValueValues = this.commonMapFunction(linkValueProps)
						this.searchVal = await this.configData.changeValue(linkValueValues)
						// 改变的数据需要手动传递给总数据
						this.handleSearch(this.searchVal)
					})
				})

			}
		},

		// 初始化watch--改变备选项
		initOptionsWatch() {
			const linkOptionsProps = this.configData.linkOptionsProps
			if (
					linkOptionsProps &&
					linkOptionsProps.length &&
					this.configData.changeOptions
			) {
				linkOptionsProps.map(item => {
					const watchKey = `ruleForm.${item}`
					this.optionsUnWatch = this.$watch(watchKey, async(val, oldVal) => {
						if (val === oldVal || Number.isNaN(val)) {
							return
						}
						const linkOptionsValues = this.commonMapFunction(linkOptionsProps)
						this.options = await this.configData.changeOptions(
								linkOptionsValues
						)
					})
				})
			} else {
				// 没有依赖变化就获取默认项
				this.initDefaultOptions()
			}
		}
	}
};
