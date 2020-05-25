import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

import massagePlugin from './utils/message.plugin'
import dateFilter from './filters/date.filter.'
import currencyFilter from "./filters/currency.filter";
import tooltipDirective from './directives/tooltip.directives';
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import Loader from "./components/app/Loader";

import firebase from "firebase";
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.use(Vuelidate);
Vue.use(massagePlugin);
Vue.component('Loader', Loader);
Vue.directive('tooltip', tooltipDirective);


firebase.initializeApp({
  apiKey: "AIzaSyDoOcb9u-K4etvvzGYMzdado9wZW5hRlVg",
  authDomain: "vue-crm-8c644.firebaseapp.com",
  databaseURL: "https://vue-crm-8c644.firebaseio.com",
  projectId: "vue-crm-8c644",
  storageBucket: "vue-crm-8c644.appspot.com",
  messagingSenderId: "575971196304",
  appId: "1:575971196304:web:02cd74faa20315e4610715"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});


