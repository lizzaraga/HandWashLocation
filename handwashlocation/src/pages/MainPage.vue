<template>
  <div id="main-page" class="match-parent">
      <!-- <h1>Main page</h1> -->
      <HWLMap></HWLMap>
  </div>
</template>

<script>
//import Map from "../components/Map.vue"
import HWLMap from '../components/app/HWLMap.vue'
export default {
    components:{
        HWLMap
    }
}
</script>

<style lang="scss" scoped>
#main-page{
    background-color: #fff;
}
</style>