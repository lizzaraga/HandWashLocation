import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueGeolocation from "vue-browser-geolocation"
import * as Vue2Leaflet from "vue2-leaflet"
import 'leaflet/dist/leaflet.css';
Vue.use(VueGeolocation);
Vue.use(Vue2Leaflet)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')