<template>
  <div class="tabbar">
    <mu-paper>
      <mu-bottom-nav :value="selected" @change="handleChange">
        <mu-bottom-nav-item value="monitor" title="监控" icon="ondemand_video"/>
        <mu-bottom-nav-item value="devices" title="设备" icon="devices_other"/>
        <mu-bottom-nav-item value="friends" title="好友" icon="group"/>
        <!--<mu-bottom-nav-item value="strategy" title="策略" icon="books"   />-->
        <mu-bottom-nav-item value="me" title="我" icon="home"/>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    computed: {
      selected() {
        if (this.$store.state.selected) {
          return this.$store.state.selected;
        } else {
          return 'devices';
        }
      }
    },
    methods: {
      handleChange (val) {
        if (val === 'monitor') {
          //这边要先从服务器读取用户设置的监控策略,如果没读取到那么默认为空策略
          this.$store.dispatch('getDefaultStrategy').then(() => {
            this.$store.state.selected = val;
            this.$router.push('/' + val);
          })
        } else if (val === 'devices') {
          this.$store.dispatch('getUserinfo').then(() => {
            this.$store.state.selected = val;
            this.$router.push('/' + val);
          })
        } else if (val === 'friends') {
            this.$store.state.selected = val;
            this.$router.push('/' + val);
        } else if (val === 'me') {
            this.$store.state.selected = val;
            this.$router.push('/' + val);
        }
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
