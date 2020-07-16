<template>

  <div id="map-cmpnt" class="match-parent">
      <l-map
      :zoom="zoom"
      :center="center"
      style="height: 100%; width: 100%"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      >
      </l-tile-layer>
      <l-marker :icon="icon" :key="index" v-for="(position, index) in positions" :lat-lng="createCoords(position)" @click="click"></l-marker >     
      <l-marker  :lat-lng="locationMarker" @click="click"></l-marker >     
      
    </l-map>

    <PositionSavedModal :latlng='location' :isVisible="showModal" @close="showModal = false"/>
  </div>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LMarker} from "vue2-leaflet";
import PositionSavedModal from "./app/PositionSavedModal.vue"
import {mapState, mapActions} from 'vuex'
/* import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
// Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });
Icon.Default.mergeOptions({
  iconRetinaUrl: require('../assets/logo.png'),
  iconUrl: require('../assets/logo.png'),
 
}); */
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    PositionSavedModal
  },
  data() {
    return {
      showModal: false,
      icon: L.icon({
        iconUrl: '../assets/logo.png',
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
        location: {lat: 0, lng: 0},
        zoom: 13,
        path: "/images/",
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      //marker: latLng(47.41322, -1.219482)
    };
  },
  computed: {
      center(){
          return [this.location.lat, this.location.lng];
      },
      locationMarker(){
          return L.latLng(this.location.lat, this.location.lng - 0.0001);
      },
      ...mapState('position', ['positions'])
      
  },
  methods:{
    click(e){
        console.log(e)
        this.showModal =  true
    },
    createCoords({lat, lng}){
      return L.latLng(lat, lng)
    },
    ...mapActions('position', ['allPositions'])
  },
  created(){
      // this.$watchLocation()
      //   .then((coords)=>{
      //       this.location = coords;
      //       console.log(this.location)
      //   })
      //   .catch((err)=>{
      //     console.log('location error: '+err)
      //   })
      this.allPositions()
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(({coords}) => {
          this.location.lat = coords.latitude;
          this.location.lng = coords.longitude;
          console.log(this.location)
        }, (err) => console.log('location error: '+err))
      }, 5000);
  }
};
</script>
<style lang="scss" scoped>
#map-cmpnt{
  background-color: dodgerblue;
}
</style>