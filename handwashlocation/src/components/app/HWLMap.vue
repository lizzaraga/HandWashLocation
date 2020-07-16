<template>
  <div id="hwl-map" class="match-parent">
      <MglMap :accessToken="accessToken" :mapStyle="mapStyle" @load="onMapLoaded">
          <MglMarker @click="positionPreview(p)" :key="p.key" v-for="p in positions" :coordinates="[p.lng, p.lat]" color="blue" />
          <MglMarker @click="showPositionModal = true" :coordinates="coordinates" color="#2e3c50" />
      </MglMap>
      <position-save-modal :latlng="coordsObject"  :isVisible="showPositionModal" @close='showPositionModal = false'/>
      <view-position-modal :isVisible="showPositionPreview" @close="showPositionPreview = false"/>
      
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker } from "vue-mapbox";
import PositionSaveModal  from './PositionSavedModal.vue'
import ViewPositionModal from './ViewPositionModal'
import {mapActions, mapState} from 'vuex'

const MAP_STYLE = "mapbox://styles/lizzaraga/ckbb4tpt90b1z1imurtusppqz"
const ACCESS_TOKEN = "pk.eyJ1IjoibGl6emFyYWdhIiwiYSI6ImNrMmRmdGdjajAyczczY2xrdnh4NmtuamEifQ.qTuyj40o4v74VhT9BsByCw"


export default {
  components: {
    MglMap, MglMarker, PositionSaveModal, ViewPositionModal
  },
  data() {
    return {
      showPositionModal: false,
      accessToken: ACCESS_TOKEN, // your access token. Needed if you using Mapbox maps
      mapStyle: MAP_STYLE, // your map style
      coordinates: [-111.549668, 39.014],
      map: null,
      mapbox: null,
      showPositionPreview: false
    };
  },
  computed: {
    coordsObject(){
      return {
        lat: this.coordinates[1],
        lng: this.coordinates[0]
      }
    },
    ...mapState('position', ['positions'])
  },
  methods:{
      onMapLoaded(event) {
      // in component
      this.map = event.map;
      // or just to store if you want have access from other components
      const geolocate = new this.mapbox.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation: false,
        showAccuracyCircle: true
      })
      this.map.addControl(geolocate)
      geolocate.on('geolocate',(data)=>{
          const {longitude, latitude} = data.coords;
          this.coordinates = [longitude, latitude]
          //console.log(this.coordinates)
      })
     //console.log("map", this.map)
    },
    positionPreview(position){
      this.showPositionPreview = true
      this.updateSelectedPosition(position)
    },
    ...mapActions('position', ['allPositions', 
    'updateSelectedPosition'])
  },
  created() {
    this.allPositions()
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;

    
    
  }
};
</script>