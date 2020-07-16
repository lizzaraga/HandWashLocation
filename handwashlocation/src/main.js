import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueGeolocation from "vue-browser-geolocation"
//import * as Vue2Leaflet from "vue2-leaflet"
import * as firebase from "firebase";
import VueFirebase from 'vue-firebase'
//import 'leaflet/dist/leaflet.css';
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";

//import 'mapbox-gl/src/css/mapbox-gl.css'

Vue.use(VueMapbox, { mapboxgl: Mapbox });

window.firebase = firebase
const firebaseConfig = {
    apiKey: "AIzaSyBBK3syRZQn4zVrnn76l5pJAwM5bN3N2h8",
    authDomain: "handwashlocation.firebaseapp.com",
    databaseURL: "https://handwashlocation.firebaseio.com",
    projectId: "handwashlocation",
    storageBucket: "handwashlocation.appspot.com",
    messagingSenderId: "880975348330",
    appId: "1:880975348330:web:ea4d756d9d1f94b451c013",
    measurementId: "G-HQF86WT0YY"
};
Vue.use(VueFirebase, { firebase: firebase, config: firebaseConfig });
Vue.use(VueGeolocation);
//Vue.use(Vue2Leaflet)

Vue.config.productionTip = false
    //window.store = store;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')