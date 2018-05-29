// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BaseDate from '@/components/BaseDate'

import 'vue-awesome/icons'
import 'vue-awesome/dist/vue-awesome'
import Icon from 'vue-awesome/components/Icon'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.component('BaseDate', BaseDate)

Vue.component('icon', Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
