<template>
  <div class="add-monitor">
    <!--header-->
    <mu-appbar title='添加监控点' class='header'>
      <router-link to='/monitor' slot='left'>
        <mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
      </router-link>
    </mu-appbar>
    <div class="page-part">
      <el-select v-model="groupIndex" placeholder="请选择设备组">
        <el-option v-for="group,groupIndex in deviceLists" :key="group.deviceGroupId" :label="group.deviceGroupName"
                   :value="groupIndex">
        </el-option>
      </el-select>
      <br/>
      <el-select v-model="deviceIndex" placeholder="请选择设备" @change="getAttributes">
        <el-option v-for="device,deviceIndex in deviceLists[groupIndex].deviceInformation" :key="device.deviceId"
                   :label="device.deviceAlias"
                   :value="deviceIndex">
        </el-option>
      </el-select>
      <br/>
      <el-select v-model="attribute" placeholder="请选择监控字段">
        <el-option v-for="(value,key) in attributes" :label="key" :value="key">
        </el-option>
      </el-select>
      <br/>
      <el-button type="primary" @click="addMonitorPoint">添加监控点</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        /*v-model相关*/
        groupIndex: 0,
        deviceIndex: '',
        attribute: '',
        /*自定义变量*/
        attributes: {},
      }
    },
    computed: {
      deviceLists(){
        return this.$store.state.devices.deviceLists;
      },
    },
    methods: {
      /*界面间的数据传递*/
      addMonitorPoint() {
        let obj = {};
        obj.productKey = this.deviceLists[this.groupIndex].deviceInformation[this.deviceIndex].productKey;
        obj.deviceName = this.deviceLists[this.groupIndex].deviceInformation[this.deviceIndex].deviceName;
        obj.attribute = this.attribute;
        this.$store.commit('SET_MONITORDATA', obj);
        //TODO:这边需要同步执行
        let postObj = {};
        postObj.strategyId = this.$store.state.strategy.strategyId;
        postObj.strategy = this.$store.state.strategy.strategy;
        this.$store.dispatch('changeStrategy', postObj);
        this.$router.go(-1);
      },
      /*通过store和后台数据的交互*/
      getAttributes(){
        let postObj = {};
        postObj.productKey = this.deviceLists[this.groupIndex].deviceInformation[this.deviceIndex].productKey;
        postObj.deviceName = this.deviceLists[this.groupIndex].deviceInformation[this.deviceIndex].deviceName;
        this.$store.dispatch('getDeviceDate', postObj).then(() => {
          this.attributes = this.$store.state.devices.deviceDate.state.reported;
//          console.log(JSON.stringify(this.attributes));
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .add-monitor {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background-color: #fff;
  }

  .select {
    text-align: left;
  }

  .page-part {
    padding-top: 60px;
  }
</style>
