/* eslint-disable no-new */

import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueNesClient from './plugins/vue-nes-client'

import is from 'is_js'

import router from '@/router'

import 'normalize.css'
import '@/styles/main.css'

process.env.isMobile = is.mobile()
if (process.env.DEBUG === true) { window.localStorage.debug = 'nova-fass:*' }

Vue.use(VueCookie)
Vue.use(VueNesClient, { url: process.env.WS_URL })
Vue.config.productionTip = false

new Vue({
  router
}).$mount('#root')
