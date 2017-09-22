<template>
  <div class="tabbar">
    <mu-paper>
      <mu-bottom-nav :value="selected" @change="handleChange">
        <mu-bottom-nav-item value="monitor" title="监控" icon="ondemand_video" />
        <mu-bottom-nav-item value="devices" title="设备" icon="devices_other"   />
        <mu-bottom-nav-item value="friends" title="好友" icon="group"   />
        <!--<mu-bottom-nav-item value="strategy" title="策略" icon="books"   />-->
        <mu-bottom-nav-item value="me" title="我" icon="home"  />
     </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    selected() {
      console.log(this.$store.state.selected);
      if(this.$store.state.selected) {
        return this.$store.state.selected;
      } else {
        return 'monitor';
      }
    }
  },
  methods: {
    handleChange (val) {
      this.$store.state.selected = val;
      this.$router.push('/' + val);
    }
  }
}
</script>

<style scoped>
.tabbar {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>
