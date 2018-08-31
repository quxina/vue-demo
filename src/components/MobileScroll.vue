<template>
  <div class="main">
    <div style="height: 1880px;"></div>
    <div class="scroll">
      <div style="height: 999px; backgroundColor: lightgrey"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 90%;
  background-color: aquamarine;
  overflow: scroll;
}
.scroll {
  position: absolute;
  width: 50%;
  height: 45vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: scroll;
}
</style>
