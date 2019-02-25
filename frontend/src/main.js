import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

//Vue.config.productionTip = false

import firebase from 'firebase'

const config = {
  apiKey: process.env.VUE_FB_API_KEY,//'AIzaSyDLWjPG-DW2DsQo1rg-8vNNmdzqipwVCWU',
  authDomain: process.env.VUE_FB_AUTH_DOMAIN,//'miraiblog-kght6123.firebaseapp.com',
  databaseURL: process.env.VUE_FB_DB_URL,//'miraiblog-kght6123.firebaseio.com',
  projectId: process.env.VUE_FB_PROJECT_ID,//'miraiblog-kght6123',
  storageBucket: process.env.VUE_FB_STORAGE_BUCKET,//'miraiblog-kght6123.appspot.com',
  messagingSenderId: process.env.VUE_FB_MSG_SENDER_ID,//'178147050126'
}
firebase.initializeApp(config)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
