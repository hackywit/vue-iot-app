<template>
  <div class="monitor">
    <mu-appbar title="监控" class='header'>
      <mu-icon-button icon="add" slot="right" to='/monitor/addmonitor'/>
    </mu-appbar>
    <div class="monitor-data">
      <mu-flexbox class='flex-box'>
        <mu-flexbox-item class='flex-item'>名称</mu-flexbox-item>
        <mu-flexbox-item class='flex-item'>数值</mu-flexbox-item>
        <mu-flexbox-item class='flex-item'>时间</mu-flexbox-item>
        <mu-flexbox-item class='flex-item'>操作</mu-flexbox-item>
      </mu-flexbox>
      <div id='sortable'>
        <div v-for='(device,index) in monitorData' :key='index'>
          <mu-flexbox class='flex-box'>
            <span class="monitor-dev">产品: {{ device.productName }}</span>
            <span class="monitor-dev">设备: {{ device.deviceAlias }}</span>
          </mu-flexbox>
          <mu-flexbox class='flex-box' v-for='(value, key) in device.state.reported' :key='key'>
            <mu-flexbox-item class='flex-item-monitor'>
              <span class="monitor-key">{{key}}</span>
            </mu-flexbox-item>
            <mu-flexbox-item class='flex-item-monitor'>
              {{value}}
            </mu-flexbox-item>
            <mu-flexbox-item class='flex-item-time' v-for='(value1, key1) in device.metadata.reported'
                             v-if='key1 === key'>
              {{value1.timestamp | time}}
            </mu-flexbox-item>
            <mu-flexbox-item class='flex-item-monitor'>
              <mu-icon-menu icon="menu" tooltip="操作" :anchorOrigin="targetOrigin" :targetOrigin="targetOrigin">
                <mu-menu-item title="反控" @click='getMonitorInfo(index,key,value)'/>
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
  import Sortable from 'sortablejs'
  import MuFlexbox from "../../../node_modules/muse-ui/src/flexbox/flexbox";
  export default {
    components: {MuFlexbox},
    data () {
      return {
        targetOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        tableData: [],
        newList: [],
        interval: 0
      }
    },
    created() {
      this.$store.state.selected = 'monitor';
//		this.interval = setInterval(this.getAllData, 1000);
      this.getAllData();
      //TODO:由于缓存的失败找不到原因，先在这边是获取到用户信息，作为暂时的处理，后期再找bug
      this.$store.dispatch('getUserinfo');
    },
    mounted () {
    },
    computed: {
      monitorData() {
        return this.$store.state.monitors.monitorData;
      }
    },
    filters: {
      time: function (timestamp) {
        return new Date(parseInt(timestamp) * 1000).toLocaleString().substr(0, 17)
      }
    },
    methods: {
      getMonitorInfo(index, key, value) {
        let infor = {};
        infor.deviceAlias = this.$store.state.monitors.monitorData[index].deviceAlias;
        infor.deviceName = this.$store.state.monitors.monitorData[index].deviceName;
        infor.productKey = this.$store.state.monitors.monitorData[index].productKey;
        infor.productName = this.$store.state.monitors.monitorData[index].productName;
        infor.version = this.$store.state.monitors.monitorData[index].version;
        infor.monitorName = key;
        infor.monitorData = value;
        this.$store.commit('SET_MONITORINFO', infor);
        this.$router.push('/monitor/infor');
      },
      getAllData() {
        this.$store.dispatch('getAllData');
      }
    },
    beforeDestroy () {
      console.log('清除定时器' + this.interval);
      clearInterval(this.interval);
    }
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
        .monitor-dev {
          display: block;
          height: 30px;
          line-height: 30px;
        }
      }
      .flex-item-time {
        text-align: center;
      }
    }
  }
</style>
