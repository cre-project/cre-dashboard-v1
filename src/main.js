// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueFire from 'vuefire'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import accounting from 'accounting'

Vue.filter('money', function (value) {
  return accounting.formatMoney(value)
})

Vue.use(Buefy)

Vue.config.productionTip = false

Vue.use(VueFire)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// event bus
export const eb = new Vue()
