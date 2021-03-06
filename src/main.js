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
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
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
