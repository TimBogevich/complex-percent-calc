import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueCurrencyInput from 'vue-currency-input'

const pluginOptions = {
}
import VueApexCharts from 'vue-apexcharts'


Vue.use(VueApexCharts)
Vue.use(VueCurrencyInput, pluginOptions)




Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
