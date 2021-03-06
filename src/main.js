import Vue from 'vue'

import axios from 'axios'
// axios.defaults.headers["pCode"] = "chenyueqi"
// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded"
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
// import 'vue-directive-image-previewer/dist/assets/style.css'
// Vue.use(VueDirectiveImagePreviewer)

import domain from './utils/getUrl.js';
Vue.prototype.$url = domain.url;

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, {
  locale
})
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
