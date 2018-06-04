// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import firebase from 'firebase'
import BaseDate from '@/components/BaseDate'

import 'vue-awesome/icons'
import 'vue-awesome/dist/vue-awesome'
import Icon from 'vue-awesome/components/Icon'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.component('BaseDate', BaseDate)

Vue.component('icon', Icon)

Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyDZod57OLrTilKKhqf3Ulvhqfc2AtR-9_E',
  authDomain: 'vfforum-3eda6.firebaseapp.com',
  databaseURL: 'https://vfforum-3eda6.firebaseio.com',
  projectId: 'vfforum-3eda6',
  storageBucket: 'vfforum-3eda6.appspot.com',
  messagingSenderId: '124241809010'
}
firebase.initializeApp(config)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
