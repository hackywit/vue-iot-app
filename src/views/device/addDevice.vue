<template>
  <div class="add-device">
    <mu-appbar :title='productInfo.productName' class='header'>
      <mu-icon-button slot='left' icon='keyboard_arrow_left' style='color: #fff' @click="this.history.back()"/>
    </mu-appbar>
    <div class="page-part">
      <mu-text-field label="设备名称" hintText="请输入设备名称" v-model="deviceInfo.deviceAlias"></mu-text-field>
      <br/>
      <mu-text-field label="设备序列号" hintText="请输入设备序列号" v-model="deviceInfo.deviceName"></mu-text-field>
      <br/>
    </div>
    <mu-raised-button label="添加设备" class="demo-raised-button" primary @click='addDevice'/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        /**
         * v-model相关的变量
         */
        deviceInfo: {
          deviceAlias: '',
          deviceName: ''
        },
        /**
         * 与store数据交互的自定义变量
         */
        productInfo: {}
      }
    },
    created(){
      /**
       * 初始化变量
       */
      //由于不需要实时变化，所以不需要放到计算属性中
      this.productInfo = this.$store.state.devices.productInfo;
    },
    methods: {
      /**
       * 与store的数据交互
       */
       /*本界面的数据交互*/
      addDevice() {
        let postObj = {
          productKey: this.productInfo.productKey,
          deviceLists: [
            {
              deviceName: this.deviceInfo.deviceName,
              deviceAlias: this.deviceInfo.deviceAlias
            }
          ]
        };
        this.$store.dispatch('addDevice', postObj).then(() => {
          this.$router.go(-1);
          this.$store.dispatch('getProducts');
        }).catch(err => {
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .select {
    text-align: left;
  }

  .add-device {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background-color: #fff;
    .page-part {
      padding-top: 62px;
    }
  }
</style>
