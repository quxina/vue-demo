<template>
  <div id="app">
    <!-- <router-view/> -->
    <div style="text-align: center" class="tabs">
      <router-link to="/" class="tabs-link">to home</router-link>
      <router-link to="/testalert" class="tabs-link">to testalert</router-link>
      <router-link to="/mydialog" class="tabs-link">to Mymodal</router-link>
      <router-link to="/timepicker" class="tabs-link">to timepicker</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  font-size: 14px;
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  color: #2c3e50;
  height: 100%;
}
.tabs {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-around;
  line-height: 10vh;
  height: 10vh;
  background-color:beige;
  bottom: 0;
}
.tabs-link {
  text-decoration: none;
  padding: 0 .6em;
  color: mediumturquoise;
}
</style>
