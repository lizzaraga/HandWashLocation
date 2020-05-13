<template>

  <div id="map">
      <l-map
      :zoom="zoom"
      :center="center"
      style="height: 500px; width: 100%"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      >
      </l-tile-layer>
      <l-marker :lat-lng="locationMarker"></l-marker >     
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker} from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
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
          return latLng(this.location.lat, this.location.lng);
      }
  },
  created(){
      this.$watchLocation()
        .then((coords)=>{
            this.location = coords
        })
  }
};
</script>
