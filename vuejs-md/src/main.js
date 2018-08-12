// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'
import App from './App'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import Toasted from 'vue-toasted';

Vue.use(Toasted) 
Vue.use(VueSweetalert2);

Vue.config.productionTip = false
Vue.use(VueMaterial)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
