// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false
Vue.use(VueMaterial)

// This is a global mixin, it is applied to every vue instance
Vue.mixin({
  data: function() {
    let tempConstant = {
      BASE_URL_WEBSERVICE_API : "http://localhost:8525/PowerShellService/"
    };
    return {
      get CONSTANTS(){
        return Object.freeze(tempConstant);
      }
    }
    /*
    let CONSTANTS = {
      get BASE_URL_WEBSERVICE_API() {
        
        return "http:8525//";
      }
    }
    return {
      get CONSTANTS(){
        return CONSTANTS;
      }
    };
    */
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
