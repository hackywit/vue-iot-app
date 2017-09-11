<template>
  <div>
  	<div class="main">
      <router-view></router-view>
    </div>
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from './tabbar'
export default {
  components:{
    Navbar
  }
}
</script>

<style> 
</style>
