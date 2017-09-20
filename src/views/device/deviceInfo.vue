<template>
  <div class="device-info">
    <mu-appbar title='设备信息' class='header'>
      <router-link to='/devices' slot='left'>
        <mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
      </router-link>
    </mu-appbar>
    <div class="page-part">
      <div class="info-item">
        <p><span>设备名称：</span> {{ deviceInfo.deviceAlias }}</p>
      </div>
      <div class="info-item">
        <p><span>设备序列号：</span> {{ deviceInfo.deviceName }} </p>
      </div>
      <div class="info-item">
        <p><span>状态：</span>{{ deviceInfo.status }}</p>
      </div>
      <div class="info-item">
        <p><span>产品Key：</span> {{ deviceInfo.productKey }} </p>
      </div>
      <div class="info-item">
        <p><span>产品名称：</span> {{ deviceInfo.productName }} </p>
      </div>
      <div class="info-item">
        <p><span>所在设备组：</span> {{ deviceInfo.groupName }} </p>
      </div>
      <div>
        <mu-select-field v-model='updateGroup.changeGroupName' label='移动设备至' class='move-select'>
          <mu-menu-item v-for='(deviceList,index) in this.$store.state.devices.deviceLists' :key='index'
                        :title='deviceList.deviceGroupName' :value='deviceList.deviceGroupName'></mu-menu-item>
        </mu-select-field>
        <mu-flat-button label="移动分组" class="demo-flat-button" primary @click='updateDeviceGroup'/>
        <br/>
      </div>
    </div>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        //需要用的到展示数据
        deviceInfo: {},

        updateGroup: {
          deviceId: '',
          changeGroupName: ''
        },
        interval: 0,
        toast: false,
        toastTimer: 0,
        toastMsg: ''
      }
    },
    created() {
      this.deviceInfo = this.$store.state.devices.deviceinfo;
    },
    computed: {},
    methods: {
      updateDeviceGroup() {
        this.updateGroup.deviceId = this.deviceInfo.deviceId;
        console.log(this.updateGroup);
        this.$store.dispatch('updateDeviceGroup', this.updateGroup).then(() => {
          console.log('更改设备组成功');
          //更改成功之后跳回之前的界面
          this.$router.push('/devices');
          this.$store.dispatch('getDevices');
          this.toastMsg = '更改设备组成功！';
        }).catch(err => {
          console.log('更改设备组失败!');
        });
      },
      hideToast () {
        this.toast = false;
        if (this.toastTimer) clearTimeout(this.toastTimer)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .device-info {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background-color: #ebebeb;
    .page-part {
      padding-top: 65px;
      text-align: left;
      .info-item {
        padding-left: 15px;
        p {
          padding-left: 10px;
          line-height: 40px;
          span {
            display: inline-block;
            width: 90px;
            text-align: right;
          }
        }
      }
      .move-select {
        margin-left: 20px;
        margin-right: 10px;
        width: 200px;
      }
      .device-data {
        .data-item {
          display: inline-block;
          margin-left: 20px;
          width: 150px;
          height: 200px;
          float: left;
        }
        .data-paper {
          width: 120px;
          height: 120px;
          text-align: center;
          p {
            line-height: 60px;
          }
        }
      }
    }
    .demo-raised-button {
      margin-top: 10px;
    }
  }
</style>
