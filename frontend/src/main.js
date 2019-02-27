import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

//Vue.config.productionTip = false

import firebase from 'firebase'

const config = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.VUE_FAPP_B_DB_URL,
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FB_MSG_SENDER_ID,
}
firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
