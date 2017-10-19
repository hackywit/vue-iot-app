<template>
  <div class="add-device">
    <mu-appbar :title='deviceInfo.deviceAlias' class='header'>
      <mu-icon-button slot='left' icon='keyboard_arrow_left' style='color: #fff' @click="this.history.back()"/>
    </mu-appbar>
    <div class="bottom">
      <div class="choose-attr">
        <el-select v-model="attribute" placeholder="选择需要监控的属性" @change="selectAttributeChange">
          <el-option v-for="(value,key,index) in deviceDate.state.reported" :key="index" :label="key" :value="key">
          </el-option>
        </el-select>
      </div>
      <div id="echart" ref="mychart" style="width: 100%;height: 400px;">
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  let xData = [];//存放表的时间
  let yData = [];//存放表的数值
  export default{
    data(){
      return {
        /*store获取的数据*/
        deviceInfo: {
          deviceName: '',
          productKey: '',
          deviceAlias: '',
        },
        /*设置自定义变量*/
        interval: 0,
        attribute: ''
      }
    },
    created() {
      /*相关变量初始化*/
      this.deviceInfo = this.$store.state.devices.deviceinfo;
      //获取一次deviceData值并给下拉框赋初值
      let postObj = {};
      postObj.productKey = this.deviceInfo.productKey;
      postObj.deviceName = this.deviceInfo.deviceName;
      this.$store.dispatch('getDeviceDate', postObj).then(() => {
        //给下拉框默认值,为第一个值,这边由于获取设备数据是异步的,所以要注意先后次序,同步起来
        for (let key in this.deviceDate.state.reported) {
          this.attribute = key;
          break;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    mounted () {
      //涉及到虚拟DOM的挂载问题都应该在这里面处理,如果在之前处理,DOM都没初始化,会出现挂载错误
      let myChart = this.setCharts();
      //设置获取单台设备数据
      this.interval = setInterval(() => {
        this.getDeviceDate();
        //获取完数据后我们需要将数据放到表横纵坐标数组中
//        xData.push(new Date(parseInt(this.deviceDate.timestamp) * 1000).toLocaleString().substr(0, 24));
        xData.push(new Date().toLocaleTimeString());
        yData.push(this.deviceDate.state.reported[this.attribute]);
        myChart.setOption({
          xAxis: {
            data: xData
          },
          series: [{
            data: yData
          }]
        });
      }, 1000);
    },
    beforeDestroy() {
      xData = [];
      yData = [];
      console.log('清除定时器' + this.interval);
      clearInterval(this.interval);
    },
    computed: {
      deviceDate() {
        return this.$store.state.devices.deviceDate;
      },
      //由于里面有在动态变化的数据,所以只能放在计算属性里面
      optionConfig() {
        return {
          title: {text: '设备数据实时监控'},
          xAxis: {
            data: xData
          },
          yAxis: {},
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
      //请求单个设备的设备数据
      getDeviceDate(){
        let postObj = {};
        postObj.productKey = this.deviceInfo.productKey;
        postObj.deviceName = this.deviceInfo.deviceName;
        this.$store.dispatch('getDeviceDate', postObj).then(() => {
//          console.log(JSON.stringify(this.deviceDate));
        }).catch(err => {
          console.log(err);
        })
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
    .bottom {
      margin-top: 62px;
      .choose-attr {
        margin-top: 72px;
      }
    }
  }
</style>

