export default {
  data() {
    return {
      searchVal: this.configData.defaultValue,
      options: this.configData.defaultOptions,
      valueUnWatch: v => v,
      optionsUnWatch: v => v
    }
  },
  props: {
    configData: {
      type: Object,
      required: true
    },
    ruleForm: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  created() {
    // 解决显隐之后的数据回显问题
    if (this.ruleForm[this.configData.propName]) {
      this.searchVal = this.ruleForm[this.configData.propName]
    }
  },
  methods: {
    // 每次改变值的触发回调(可用于支持数据改变就触发搜索)
    handleSearch() {
      this.$emit('handleEventChange', {
        [this.configData.propName]: this.searchVal
      })
    },
    // 重置搜索
    clearSearVal() {
      this.searchVal = this.configData.defaultValue
      this.$emit('handleEventChange', {
        [this.configData.propName]: this.configData.defaultValue
      })
    },
    // 通用转换函数
    commonMapFunction(data) {
      return data.map(item => ({
        [item]: this.ruleForm[item]
      }))
    },
    // 初始化options--请求获取options
    async initDefaultOptions() {
      if (!this.configData.defaultOptions) {
        this.configData.defaultOptions = []
      }
      if (
        this.configData.defaultOptions.length === 0 &&
        this.configData.getInitData
      ) {
        const res = await this.searchOptions()
        if (res && res.data) {
          this.options = res.data
          this.totalPage = res.totalPage
        }
      }
    },
    // 初始化watch--改变值
    initValueWatch() {
      const linkValueProps = this.configData.linkValueProps
      if (
        linkValueProps &&
        linkValueProps.length &&
        this.configData.changeValue
      ) {
        linkValueProps.map(item => {
          const watchKey = `ruleForm.${item}`
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
  },
  // 手动销毁监听器-防止内存溢出
  destroyed() {
    this.valueUnWatch()
    this.optionsUnWatch()
  }
}
