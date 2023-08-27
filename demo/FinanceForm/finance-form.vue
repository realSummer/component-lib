<template>
  <div v-loading="loading" class="finance_form_container">
    <div v-if="!loading">
      <div>
        <div class="finance_form_wrap">
          <el-form
            ref="ruleForm"
            class="finance_el_form"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
          >
            <el-form-item
              v-for="item in mainConfig"
              v-if="changeShow(item)"
              :key="item.id"
              :ref="item.propName"
              class="finance_form_item"
              :rules="changeRules(item)"
              :show-message="changeShowMessage(item)"
              :style="{ width: item.width || '50%' }"
              :class="{ finance_form_item_border: item.border }"
              :label-width="item.labelWidth || 'auto'"
              :label="item.label"
              :prop="item.propName"
              :size="item.size || 'small'"
            >
              <!-- 自定义label -->
              <template v-if="item.customLabel" slot="label">
                <slot :name="item.customLabel" :scope="ruleForm" />
              </template>

              <div class="finance_form_item_title">
                {{ item.title }}
              </div>
              <component
                :is="item.type"
                v-if="item.type !== 'avl-slot'"
                :ref="item.propName"
                :key="item.id"
                :config-data="item"
                :rule-form="ruleForm"
                :disabled="changeDisabled(item)"
                v-on="$listeners"
                @handleEventChange="handleEventChange"
              />
              <slot
                v-if="item.type === 'avl-slot'"
                :name="item.propName"
                :scope="ruleForm"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AvlRadioGroup from './searchFormComponents/AvlRadioGroup.vue'
import AvlCheckboxGroup from './searchFormComponents/AvlCheckboxGroup.vue'
import AvlInput from './searchFormComponents/AvlInput.vue'
import AvlSelect from './searchFormComponents/AvlSelect.vue'
import AvlCascader from './searchFormComponents/AvlCascader.vue'
import AvlSwitch from './searchFormComponents/AvlSwitch.vue'
import AvlText from './searchFormComponents/AvlText.vue'
import fieldPermissions from '@/mixin/fieldPermissions'
export default {
  name: 'FinanceForm',

  components: {
    'avl-radio': AvlRadioGroup,
    'avl-checkbox': AvlCheckboxGroup,
    'avl-input': AvlInput,
    'avl-select': AvlSelect,
    'avl-cascader': AvlCascader,
    'avl-switch': AvlSwitch,
    'avl-text': AvlText
  },
  mixins: [fieldPermissions],
  props: {
    formConfig: {
      type: Array,
      required: true
    },
    formConfigAsync: {
      type: Function
    },
    rules: {
      type: Object
    },
    formSetting: {
      type: Object
    }
  },
  data() {
    return {
      mainConfig: [],
      loading: false,
      ruleForm: {},
      showProp: {},
      scrollDom: ''
    }
  },
  created() {
    // this.regetData();
  },
  methods: {
    commonMapFunction(data) {
      return data.map((item) => ({
        [item]: this.ruleForm[item]
      }))
    },
    // 控制是否显隐
    changeShow(item) {
      // 字段权限
      if (this.hideField(item.propName)) {
        return false
      }
      if (item.linkShowProps && item.linkShowProps.length && item.linkHidden) {
        const linkShowValues = this.commonMapFunction(item.linkShowProps)
        if (item.linkHidden(linkShowValues)) {
          this.showProp[item.propName] = false
          return false
        }
      }
      this.showProp[item.propName] = true
      return true
    },

    // 控制是否改变校验规则
    changeRules(item) {
      if (item.linkRuleProps && item.linkRuleProps.length && item.rules) {
        const linkRuleValues = this.commonMapFunction(item.linkRuleProps)
        return item.rules(linkRuleValues)
      } else if (item.rules) {
        return item.rules()
      }
    },
    // 控制是否显示错误信息 --解决校验规则改变后错误信息不消失的问题
    changeShowMessage(item) {
      if (item.linkRuleProps && item.linkRuleProps.length && item.hideMessage) {
        const linkRuleValues = this.commonMapFunction(item.linkRuleProps)
        return !item.hideMessage(linkRuleValues)
      }
      return true
    },
    // 控制是否禁用
    changeDisabled(item) {
      if (
        item.linkDisabledProps &&
        item.linkDisabledProps.length &&
        item.disabled
      ) {
        const linkDisabledValues = this.commonMapFunction(
          item.linkDisabledProps
        )
        return item.disabled(linkDisabledValues)
      }
      return false
    },
    back() {
      this.$router.go(-1)
    },

    // 内部接受数据为搜索提供数据来源
    handleEventChange(val) {
      this.ruleForm = {
        ...this.ruleForm,
        ...val
      }
    },
    // 重置数据
    resetForm() {
      this.$refs['ruleForm'].resetFields()
      this.$emit('resetSlot')
      this.$emit('handleFormSearchVal', this.ruleForm)
    },
    // 重新获取表单配置
    regetData(data) {
      this.ruleForm = {}
      if (!this.formConfig.length && this.formConfigAsync) {
        this.loading = true
        this.formConfigAsync(data).then((res) => {
          this.mainConfig = res
          this.initRuleForm(res)
          this.loading = false
        })
      } else {
        this.mainConfig = this.formConfig
        this.initRuleForm(this.mainConfig)
      }
    },
    // 初始化表单总数据
    initRuleForm(data) {
      this.ruleForm = {}
      data.map((item) => {
        if (item.propName) {
          this.ruleForm = {
            [item.propName]: item.defaultValue,
            ...this.ruleForm
          }
          if (item.requestProp) {
            this.ruleForm = {
              [item.requestProp]: {},
              ...this.ruleForm
            }
          }
          if (item.linkProps) {
            item.linkProps.map((k) => {
              this.ruleForm = {
                ...k,
                ...this.ruleForm
              }
            })
          }
        }
      })
    },
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs['ruleForm'].validate((valid, object) => {
          if (valid) {
            const finalData = {}
            for (const i in this.ruleForm) {
              finalData[i] = this.ruleForm[i]
            }
            for (const k in this.showProp) {
              !this.showProp[k] && finalData.hasOwnProperty(k)
                ? delete finalData[k]
                : ''
            }
            return resolve(finalData)
          } else {
            // 跳转到错误定位的地方
            for (const i in object) {
              const dom = this.$refs[i]
              if (Object.prototype.toString.call(dom) !== '[object Object]') {
                // 这里是针对遍历的情况（多个输入框），取值为数组
                this.scrollDom = dom[0]
              }
            }
            this.scrollDom.$el.scrollIntoView({
              // 滚动到指定节点
              block: 'center', // 值有start,center,end，nearest，当前显示在视图区域中间
              behavior: 'smooth' // 值有auto、instant,smooth，缓动动画（当前是慢速的）
            })
            return reject('error')
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.finance_form_container {
  max-width: 1100px;
  margin: 0 auto;
  .finance_form_wrap {
    .finance_el_form {
      display: flex;
      // align-items: center;
      flex-wrap: wrap;
      width: 100%;
    }

    .finance_form_item {
      margin-bottom: 18px;

      // padding: 0 7%;
      .finance_form_item_title {
        color: $primaryColor;
        font-size: 16px;
      }

      &.finance_form_item_border {
        padding: 5px 0;
        background: $formBacgroundColor;
        // box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.17);
        // border-bottom: 1px solid $borderLighter;
        // margin-top: 18px;
      }

      .el-input {
        width: 250px;
      }
    }
  }
  .el-form-item__label {
    color: #666;
    font-weight: normal;
  }
}

.form_footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  background-color: $borderLightest;
  z-index: 99;
  @include flex-center;
  .el-button{
    width: 120px;
  }
}

.finance_form_container .el-form-item.is-error .el-input__inner {
  border-color: #dcdfe6;
}
</style>
