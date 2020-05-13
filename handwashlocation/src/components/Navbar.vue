<template>
  <nav class="x-navbar" :class="{fixed: 'x-navbar-expand'}">

  </nav>
</template>

<script>
export default {
    props:{
        fixed : {type: Boolean, default: false}
    }
}
</script>

<style lang="scss" scoped>
    .x-navbar{
        height: 40px;
        background-color: dodgerblue;
        display: flex;
        padding: 0 15px;
        align-items: center;

        &.x-navbar-expand{
            position: fixed;
            width: 100%;
        }
    }
    
</style>