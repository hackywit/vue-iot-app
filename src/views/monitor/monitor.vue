<template>
  <div class="monitor">
    <mu-appbar title="监控" class='header'>
      <mu-icon-button icon="add" slot="right" @click="gotoAddmonitor"/>
    </mu-appbar>
    <div class="monitor-data">
      <mu-flexbox class='flex-box'>
        <mu-flexbox-item class='flex-item'>名称</mu-flexbox-item>
        <mu-flexbox-item class='flex-item'>数值</mu-flexbox-item>
        <mu-flexbox-item class='flex-item'>时间</mu-flexbox-item>
        <mu-flexbox-item class='flex-item'>操作</mu-flexbox-item>
      </mu-flexbox>
      <div id='sortable' v-show="flag">
        <div v-for='(device,index) in allMonitorData' :key='index'>
          <mu-flexbox class='flex-box'>
            <span class="monitor-dev">产品: {{ device.productName }}</span>&nbsp;---&nbsp;
            <span class="monitor-dev">设备: {{ device.deviceAlias }}</span>
          </mu-flexbox>
          <mu-flexbox class='flex-box' v-for='(value, key) in device.state.reported' :key='key'>
            <mu-flexbox-item class='flex-item-monitor'>
              <span class="monitor-key">{{key | attributeFilter}}</span>
            </mu-flexbox-item>
            <mu-flexbox-item class='flex-item-monitor'>
              {{value}}
            </mu-flexbox-item>
            <mu-flexbox-item class='flex-item-time' v-for='(value1, key1) in device.metadata.reported'
                             v-if='key1 === key'>
              {{value1.timestamp | timeFilter}}
            </mu-flexbox-item>
            <mu-flexbox-item class='flex-item-monitor'>
              <mu-icon-menu icon="menu" tooltip="操作" :anchorOrigin="targetOrigin" :targetOrigin="targetOrigin">
                <mu-menu-item title="反控" @click='getMonitorInfo(index,key,value)'/>
                <mu-menu-item title="删除" @click='deleteMonitorPoint(index,key,value)'/>
              </mu-icon-menu>
            </mu-flexbox-item>
          </mu-flexbox>
        </div>
      </div>
    </div>
    <transition name='router-show'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import base64 from '@/utils/base64'
  import common from '@/utils/common'
  export default {
    data () {
      return {
        /**
         * 界面布局相关变量
         */
        //界面选择性隐藏布局变量
        flag: false,
        //界面事件窗口布局变量
        targetOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        /**
         * 动画相关变量，定时器之类
         */
        interval: 0
      }
    },
    /**
     * 组件的声明周期函数
     */
    created() {
      this.$store.state.selected = 'monitor';
      this.$store.dispatch('getAllData').then(() => {
        this.flag = true;
        this.interval = setInterval(() => {
          this.$store.dispatch('getAllData');
        }, 1000);
      });
    },
    beforeDestroy() {
      console.log('清除定时器' + this.interval);
      clearInterval(this.interval);
    },
    computed: {
      //这边界面的数据是要和store中的数据进行关联的
      allMonitorData() {
        return this.monitorDataFilter(this.$store.state.monitors.allMonitorData);
      },
      monitorData(){
        return this.$store.state.monitors.monitorData;
      },
    },
    filters: {
      //过滤函数，对每个时间戳进行处理
      timeFilter: function (timestamp) {
        return new Date(parseInt(timestamp) * 1000).toLocaleString().substr(0, 24)
      },
      attributeFilter: function (attributeKey) {
        return base64.decode(attributeKey);
      }
    },
    methods: {
      /*过滤函数*/
      //这边也需要一个过滤函数完成对用户添加监控的数据监控
      monitorDataFilter(allMonitorData) {
        let devicesMonitorData = [];
        let i = 0;
        console.log(JSON.stringify(this.monitorData));
        //先从store中循环找到需要监控的数据
        this.monitorData.forEach((attributeData) => {
          allMonitorData.forEach((deviceMonitorData) => {
            if (attributeData.productKey === deviceMonitorData.productKey && attributeData.deviceName === deviceMonitorData.deviceName) {
              let deviceObj = {};
              deviceObj.productKey = attributeData.productKey;
              deviceObj.deviceName = attributeData.deviceName;
              deviceObj.version = deviceMonitorData.version;
              deviceObj.deviceAlias = deviceMonitorData.deviceAlias;
              deviceObj.productName = deviceMonitorData.productName;
              devicesMonitorData[i] = deviceObj;
              //这边有个attribute为空的情况需要处理一下
              if (common.isObjectEmpty(attributeData.attributes)) {
                devicesMonitorData[i].state = {};
                devicesMonitorData[i].state.reported = {};
                devicesMonitorData[i].metadata = {};
                devicesMonitorData[i].metadata.reported = {};
              } else {
                let attributeObj = {};//必须放在外面
                let metadataObj = {};//必须放在外面
                for (let attributeKey in attributeData.attributes) {
                  for (let reportedKey in deviceMonitorData.state.reported) {
                    if (attributeKey === reportedKey) {
                      attributeObj[reportedKey] = deviceMonitorData.state.reported[reportedKey];
                      devicesMonitorData[i].state = {};
                      devicesMonitorData[i].state.reported = attributeObj;
                    }
                  }
                  for (let reportedKey in deviceMonitorData.metadata.reported) {
                    if (attributeKey === reportedKey) {
                      metadataObj[reportedKey] = deviceMonitorData.metadata.reported[reportedKey];
                      devicesMonitorData[i].metadata = {};
                      devicesMonitorData[i].metadata.reported = metadataObj;
                    }
                  }
                }
              }
              i++;
            }
          })
        });
        return devicesMonitorData;
      },
      /**
       * 界面间的数据传递
       */
      getMonitorInfo(index, key, value) {
        let postObj = {};
        postObj.deviceAlias = this.allMonitorData[index].deviceAlias;
        postObj.deviceName = this.allMonitorData[index].deviceName;
        postObj.productKey = this.allMonitorData[index].productKey;
        postObj.productName = this.allMonitorData[index].productName;
        postObj.version = this.allMonitorData[index].version;
        postObj.monitorName = key;
        postObj.monitorData = value;
        postObj.index = index;
        this.$store.commit('SET_MONITORINFO', postObj);
        this.$router.push('/monitor/infor');
      },
      deleteMonitorPoint(index, key, vulue){
        let postObj = {};
        postObj.deviceAlias = this.allMonitorData[index].deviceAlias;
        postObj.deviceName = this.allMonitorData[index].deviceName;
        postObj.productKey = this.allMonitorData[index].productKey;
        postObj.productName = this.allMonitorData[index].productName;
        postObj.version = this.allMonitorData[index].version;
        postObj.monitorName = key;
        postObj.monitorData = vulue;
        postObj.index = index;
        this.$store.commit('DELETE_MONITORDATA', postObj);
      },
      /*和通过store和后台的交互*/
      //界面跳转
      gotoAddmonitor(){
        this.$store.dispatch('getDevices').then(() => {
          this.$router.push('/monitor/addmonitor');
        });
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .mu-th, .mu-td {
    /*border: 1px solid orange;*/
    height: 60px;
    padding: 2px;
    text-align: center;
  }

  .small {
    /*overflow: hidden;*/
    color: lightgray;
    font-size: 10px;
    width: 100px;
    /*border: 1px solid red;*/
  }

  .router-show-enter-active, .router-show-leave-active {
    transition: all .4s;
  }

  .router-show-enter, .router-show-leave {
    transform: translateX(100%)
  }

  .monitor-data {
    text-align: center;
    .flex-box {
      border: 1px solid #e0e0e0;
      .flex-item {
        height: 32px;
        text-align: center;
        line-height: 32px;
      }
      .flex-item-monitor {
        height: 60px;
        //background-color: #e0e0e0;
        text-align: center;
        line-height: 60px;
        .monitor-key {
          color: green;
          display: block;
          height: 30px;
          line-height: 30px;
        }
      }
      .flex-item-time {
        text-align: center;
      }
      .monitor-dev {
        display: block;
        height: 30px;
        line-height: 30px;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
</style>
