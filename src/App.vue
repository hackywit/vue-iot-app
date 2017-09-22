<template>
  <div id="app">
    <div class="main">
      <router-view></router-view>
    </div>
    <Navbar></Navbar>
  </div>
</template>

<script>
  import Navbar from '@/views/components/tabbar'
  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>

<style lang='scss'>
  @import '../static/css/main.scss';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
