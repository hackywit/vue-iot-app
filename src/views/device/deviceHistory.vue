<template>
  <div class="add-device">
    <mu-appbar :title='deviceInfo.deviceAlias' class='header'>
      <mu-icon-button slot='left' icon='keyboard_arrow_left' style='color: #fff' @click="this.history.back()"/>
    </mu-appbar>
    <div class="bottom">
      <div class="choose-attr">
        <el-select v-model="attribute" placeholder="选择需要监控的属性" @change="selectAttributeChange">
          <el-option v-for="(value,key) in deviceDate.state.reported" :key="key" :label="key | attributeFilter" :value="key">
          </el-option>
        </el-select>
      </div>
      <div id="echart" ref="mychart" style="width: 100%;height: 400px;">
      </div>
      <div class="start-history">
        <el-row :gutter="0">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-time-picker v-model="startTime" placeholder="开始记录时间">
              </el-time-picker>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-time-picker v-model="stopTime" placeholder="结束记录时间">
              </el-time-picker>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple"> 时间间隔:
              <el-input-number v-model="timeInterval" :min="1" :step="1"></el-input-number>
              秒
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-button type="primary" @click="recordHistory">开始记录</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/utils/common'
  import base64 from '@/utils/base64'
  import echarts from 'echarts';
  let xData = [];//存放表的时间
  let yData = [];//存放表的数值
  let subtext = '';
  export default{
    data(){
      return {
        /*store获取的数据*/
        deviceInfo: {
          deviceName: '',
          productKey: '',
          deviceAlias: '',
        },
        /*v-model相关*/
        attribute: '',
        startTime: new Date(),
        stopTime: new Date(),
        timeInterval: 5,
        /*设置自定义变量*/
        interval: 0,
      }
    },
    created() {
      /*相关变量初始化*/
      this.deviceInfo = this.$store.state.devices.deviceinfo;
      //给下拉框默认值,为第一个值,这边由于获取设备数据是异步的,所以要注意先后次序,同步起来
      for (let key in this.deviceDate.state.reported) {
        this.attribute = key;
        break;
      }
    },
    mounted () {
      //涉及到虚拟DOM的挂载问题都应该在这里面处理,如果在之前处理,DOM都没初始化,会出现挂载错误
      let myChart = this.setCharts();
      //设置获取单台设备数据
      this.interval = setInterval(() => {
        let postObj = {};
        postObj.productKey = this.deviceInfo.productKey;
        postObj.deviceName = this.deviceInfo.deviceName;
        this.$store.dispatch('getDeviceDate', postObj).then(() => {
          //获取完数据后我们需要将数据放到表横纵坐标数组中
//        xData.push(new Date(parseInt(this.deviceDate.timestamp) * 1000).toLocaleString().substr(0, 24));
          xData.push(new Date().toLocaleTimeString());
          yData.push(this.deviceDate.state.reported[this.attribute]);
          subtext = common.getAttributeWord(this.attribute);
          myChart.setOption({
            title: {
              subtext: subtext,
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              data: xData
            },
            series: [{
              data: yData
            }]
          });
        }).catch(err => {
          console.log(err);
        });
      }, 2000);
    },
    beforeDestroy() {
      xData = [];
      yData = [];
      console.log('清除定时器' + this.interval);
      clearInterval(this.interval);
    },
    filters: {
      attributeFilter: function (attributeKey) {
        return base64.decode(attributeKey);
      }
    },
    computed: {
      deviceDate() {
        return this.$store.state.devices.deviceDate;
      },
      //由于里面有在动态变化的数据,所以只能放在计算属性里面
      optionConfig() {
        return {
          title: {
            text: '设备数据实时监控',
            subtext: subtext,
          },
          xAxis: {
            data: xData
          },
          yAxis: {},
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 1,
              end: 100
            },
            {
              type: 'inside',
              xAxisIndex: [0],
              start: 1,
              end: 100
            }
          ],
          series: [{
            type: 'line',
            smooth: true,
//            symbol: 'none',
            stack: 'a',
            areaStyle: {
              normal: {}
            },
            data: yData
          }]
        }
      }
    },
    methods: {
      /*界面展示相关*/
      setCharts() {
        let dom = this.$refs.mychart;
        let myChart = echarts.init(dom);
        myChart.showLoading();
        myChart.setOption(this.optionConfig);
        myChart.hideLoading();
        return myChart;
      },
      /*界面事件触发*/
      selectAttributeChange(){
        xData = [];
        yData = [];
      },
      /*与store获取后端的数据接口交互*/
      recordHistory() {
        let postObj = {};
        postObj.deviceId = this.deviceInfo.deviceId;
        postObj.attribute = this.attribute;
        postObj.startTime = Date.parse(new Date(this.startTime))/1000;
        postObj.stopTime = Date.parse(new Date(this.stopTime))/1000;
        postObj.interval = this.timeInterval;
        this.$store.dispatch('recordHistory',postObj);
      },
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
    .bottom {
      margin: 62px;
      .choose-attr {
        margin-top: 72px;
      }
      .start-history{
        margin-top: 20px;
        .el-row {
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .el-col {
          border-radius: 4px;
        }
        .bg-purple-dark {
          background: #ffffff;
        }
        .bg-purple {
          background: #ffffff;
        }
        .bg-purple-light {
          background: #ffffff;
        }
        .grid-content {
          border-radius: 4px;
          min-height: 36px;
        }
        .row-bg {
          padding: 10px 0;
          background-color: #f9fafc;
        }
      }
    }
  }
</style>

