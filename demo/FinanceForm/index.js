import FinanceForm from './finance-form.vue'
const components = {
  FinanceForm
}

const install = function(Vue, opts = {}) {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}
export default install
