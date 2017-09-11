<template>
  <div class="header">
    <mu-appbar :title="text" >
        <!--<mu-icon-button icon='keyboard_arrow_left' @click="back"  slot="left"/>-->
        <mu-icon-button icon="expand_more" slot="right"/>
    </mu-appbar>
  </div>
</template>

<script>
export default {
  data(){
      return{
          text:'监控'
      }
  },
  methods:{
      back(){
        this.$router.go(-1)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style> 
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>