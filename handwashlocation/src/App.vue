<template>
  <div id="app" class="match-parent">
   
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: 'segoe ui';
  src: url('./assets/Segoe UI.ttf');
}


*{
  box-sizing: border-box;
  font-family: 'segoe ui';
}
html,body{
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  background-color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.match-parent{
  width: 100%;
  height: 100%;
}

.x-btn-link, .x-btn{
  text-decoration: none;
  padding: 10px 18px;
  font-size: 11px;
  color: black;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  &:hover{
    background-color: #eee;
  }
}
.x-btn{
  border: none;

}
// CONTROLS THEME

.red-highlight-theme{
  background: transparent;
  color: crimson;
  outline-color: crimson;
  transition: all 0.3s linear;

  &:hover{
    background-color: #eee;
  }
}
.blue-highlight-theme{
  background: transparent;
  color: royalblue;
  outline-color: royalblue;
  transition: all 0.3s linear;
  &:hover{
    background-color: #eee;
  }
  &:disabled{
     background-color: #eee;
     color: #888;
     cursor: not-allowed;
  }
}
.blue-theme{
  background: royalblue;
  color: white;
  outline: none;
  transition: all 0.3s linear;
  &:hover{
    background: royalblue;
    color: white;
  }
  &:disabled{
     background-color: #eee;
     color: #888;
     cursor: not-allowed;
  }
}

.absolute-center-box{
  position: absolute;
  flex-direction: column;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}
.circle-loading{
  display: inline-block;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 2px solid #ddd;
  position: relative;
  
  &::after{
    content: "";
    position: absolute;
    left: -2px;
    right: -2px;
    top: -2px;
    bottom: -2px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #2e3c50;
    animation: turn 0.7s linear infinite;
  }
}

@keyframes turn {
  from{
    transform: rotate(0);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
