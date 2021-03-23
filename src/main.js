import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueCurrencyInput from 'vue-currency-input'
import FlagIcon from 'vue-flag-icon'

const pluginOptions = {
}
import VueApexCharts from 'vue-apexcharts'
import i18n from './i18n'


Vue.use(VueApexCharts)
Vue.use(VueCurrencyInput, pluginOptions)
Vue.use(FlagIcon);



Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
