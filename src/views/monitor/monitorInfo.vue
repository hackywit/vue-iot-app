<template>
  <div class="monitor-info">
    <!--header-->
    <mu-appbar title='详细信息' class='header'>
      <router-link to='/monitor' slot='left'>
        <mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
      </router-link>
    </mu-appbar>
    <div class="page-part">
      <div>
        <p><span>所属产品名称：</span> {{ monitorInfo.productName }}</p>
      </div>
      <div>
        <p><span>所属设备名称：</span> {{ monitorInfo.deviceAlias }}</p>
      </div>
      <div>
        <p><span>监控点名称：</span> {{ monitorInfo.monitorName }}</p>
      </div>
      <div>
        <p><span>数据：</span>
          <mu-text-field v-model="monitorInfo.monitorData"/>
          <br/></p>
      </div>
    </div>
    <mu-raised-button label="确认反控" class="demo-raised-button" primary @click='updateDeviceData'/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        //反控操作需要用到的数据
        monitorInfo: {
          deviceAlias: '',
          deviceName: '',
          productKey: '',
          productName: '',
          monitorName: '',
          monitorData: '',
          version: '',
          index:''
        }
      }
    },
    created(){
      this.monitorInfo = this.$store.state.monitors.monitorInfo;
    },
    methods: {
      updateDeviceData(){
        //拼凑反控设备的post数据
        let postObj = {};
        postObj.productKey = this.monitorInfo.productKey;
        postObj.deviceName = this.monitorInfo.deviceName;
        postObj.shadowVersion = this.monitorInfo.version + 1;//要更新版本必须大于原来的版本
        postObj.updataMessage = {};
        let obj = {};
        obj[this.monitorInfo.monitorName] = this.monitorInfo.monitorData;
        postObj.updataMessage = obj;
        this.$store.dispatch('deviceUpdateData', JSON.stringify(postObj)).then(() => {
          //反控成功的话需要将version加1,更改版本号
          this.$store.state.monitors.monitorData[this.monitorInfo.index].version += 1;
          this.$router.push('/monitor');
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .monitor-info {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 200;
    background: #ebebeb;
    .page-part {
      padding-top: 65px;
      padding-left: 15px;
      text-align: left;
      div p {
        padding-left: 10px;
        line-height: 40px;
        //border: 1px solid red;
        span {
          //border: 1px solid green;
          display: inline-block;
          width: 100px;
          text-align: right;
        }
      }
    }
  }
</style>
