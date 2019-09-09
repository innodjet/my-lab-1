// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import VuejsDialog into project
import VuejsDialog from 'vuejs-dialog';
// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
// Tell Vue to install the plugin.
import VueScrollTo  from 'vue-scrollto';

Vue.use(VueScrollTo);
Vue.use(VuejsDialog);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
