<template>
  <div class="finance-form-component" :class="configData.className || ''">
    <el-select
      v-if="configData.loadMore"
      :key="configData.propName"
      v-model="searchVal"
      v-el-select-loadmore="debounce(loadMore)"
      :size="configData.size || ''"
      :placeholder="configData.placeholder || ''"
      v-bind="propAttrs"
      popper-class="finance-form-component--popper"
      :disabled="disabled"
      @change="handleSearch"
      @clear="filterMethod('')"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="
          configData.getValueObject
            ? {
              value: item.value,
              label: item.label
            }
            : item.value
        "
        :disabled="item.disabled"
        :title="item.label"
      />
    </el-select>
    <el-select
      v-else
      :key="configData.propName"
      v-model="searchVal"
      v-hideSelectRemove="defalutValueRequired()"
      :size="configData.size || ''"
      :placeholder="configData.placeholder || ''"
      v-bind="propAttrs"
      popper-class="finance-form-component--popper"
      :disabled="disabled"
      @change="handleSearch"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="
          configData.getValueObject
            ? {
              value: item.value,
              label: item.label
            }
            : item.value
        "
        :disabled="item.disabled"
        :title="item.disabled?'单据审批流程配置的抄送人员，禁止编辑勾选':item.label"
      />
    </el-select>
  </div>
</template>
<script>
import minxi from './mixin'
import loadmore from '../directive/elSelectLoadmore/loadmore'
import hideSelectRemove from '@/directive/hideSelectRemove/hideSelectRemove'
export default {
  directives: {
    'el-select-loadmore': loadmore,
    hideSelectRemove: hideSelectRemove
  },
  mixins: [minxi],
  data() {
    return {
      page: 1,
      size: this.configData.size || 30,
      totalPage: Infinity,
      filterVal: ''
    }
  },
  computed: {
    propAttrs() {
      let attrs = {}
      if (this.configData.clearable) {
        attrs = {
          ...attrs,
          clearable: true
        }
      }

      if (this.configData.filterable) {
        attrs = {
          ...attrs,
          filterable: true
        }
      }
      if (
        this.configData.filterable &&
        this.configData.getInitData &&
        this.configData.remote
      ) {
        attrs = {
          ...attrs,
          // remote: true,
          'filter-method': this.debounce(this.filterMethod)
        }
      }
      if (this.configData.multiple) {
        attrs = {
          ...attrs,
          multiple: true
        }
      }
      if (this.configData.multiple && this.configData.multipleLimit) {
        attrs = {
          ...attrs,
          'multiple-limit': this.configData.multipleLimit
        }
      }
      if (this.configData.multiple && this.configData.collapseTags) {
        attrs = {
          ...attrs,
          'collapse-tags': true
        }
      }
      return attrs
    }
  },
  async created() {
    //   如果不能给初始值  那就传入一个方法去获取值
    this.initValueWatch()
    this.initOptionsWatch()
  },
  methods: {
    // 下拉加载更多
    async loadMore() {
      this.page++
      if (this.page > this.totalPage) return
      const res = await this.searchOptions()
      this.options = [...this.options, ...res.data]
    },
    // 远程搜索带分页功能
    async filterMethod(query) {
      this.filterVal = query
      this.page = 1
      const res = await this.searchOptions()
      this.options = res.data
      this.totalPage = res.totalPage
    },
    // 远程搜索功能
    async searchOptions() {
      const formatData = this.configData.formatFormData
        ? this.configData.formatFormData
        : v => v
      const data = {
        page: this.page,
        searchValue: this.filterVal
      }
      const res = await this.configData.getInitData(data)
      return formatData(res)
    },
    debounce(fn, delay = 500) {
      let timer
      return function(...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fn.apply(this, args)
        }, delay)
      }
    },
    // 重置搜索(替换通用mixin)
    async clearSearVal() {
      this.searchVal = this.configData.defaultValue
      this.$emit('handleEventChange', {
        [this.configData.propName]: this.configData.defaultValue
      })
      // 重置还原备选项
      if (
        this.configData.filterable &&
        this.configData.getInitData &&
        this.configData.remote
      ) {
        this.page = 1
        this.filterVal = ''
        const res = await this.searchOptions()
        this.options = res.data
      }
    },
    handleSearch(val) {
      if (this.configData.requestProp && this.configData.requestPropFun) {
        this.$emit('handleEventChange', {
          [this.configData.propName]: val
        })
        this.configData.requestPropFun(val).then(res => {
          this.$emit('handleEventChange', {
            [this.configData.requestProp]: res
          })
        })
      } else {
        this.$emit('handleEventChange', {
          [this.configData.propName]: val
        })
      }
    },

    defalutValueRequired() {
      if (this.configData.defaultRequired) {
        return [this.searchVal, this.options, 'value', 'disabled', true]
      } else {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
// 修改select框样式
.finance-form-component {
  .el-select__tags-text {
    display: inline-block;
    max-width: 200px;
    @include text-ellipsis;
  }
}
.finance-form-component--popper {
  .el-select-dropdown__list {
    width: 250px;
  }
}
</style>
