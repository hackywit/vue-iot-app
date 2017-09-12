<template>
  <div class="devices">
    <!--header-->
    <mu-appbar title="设备" class='header'>
      <mu-icon-button icon="add" slot="right" ref='button' @click='toggle'/>
    </mu-appbar>
    <!-- popmenu -->
    <mu-popover :open='openDialog' :autoPosition='false' :trigger='trigger' :anchorOrigin="anchorOrigin"
                :targetOrigin="targetOrigin" @close="handleClose">
      <mu-menu>
        <mu-menu-item title='添加设备组' @click='openAddGroup'/>
      </mu-menu>
    </mu-popover>
    <mu-list vlaue='selected'>
      <!--此处不选择v-show是应为这个指令不支持模板，会出错-->
      <mu-list-item v-if="isShow" title="产品" class='list-item' @click='getProductList'>
        <mu-icon slot="left" value="playlist_add_check" :size='30'/>
      </mu-list-item>
      <mu-list-item v-for='item in deviceLists' :key='item.deviceGroup' :title='item.deviceGroup' :open='false'
                    class='group' toggleNested>
        <mu-icon-button slot='left' icon='share' @click='shareGroup(item.deviceGroup)'></mu-icon-button>
        <mu-list-item v-for='sub in item.deviceInformation' :key='sub.deviceAlias' :title='sub.deviceAlias'
                      slot='nested' class='titleStyle'>
          <mu-icon v-if="sub.status == 'ONLINE'" slot="left" value="cloud_done" :size='35' color='green'/>
          <mu-icon v-else-if="sub.status == 'OFFLINE'" slot="left" value="cloud_off" :size='35' color='red'/>
          <mu-icon v-else slot="left" value="cloud_circle" :size='40'/>
          <!--<mu-icon slot='right' value='menu'></mu-icon>-->
          <span slot='describe'>
        				<span slot='left'>设备序列号：{{sub.deviceName}}</span><br/>
        				<span slot='right'>状态：{{sub.status}}</span>
        			</span>
          <mu-icon-menu slot="right" icon="menu" tooltip="操作">
            <mu-menu-item title="查看" to='/devices/infor' @click='getDeviceInfo(sub, item.deviceGroup)'/>
            <mu-menu-item title="分享" to='/devices/share' @click='getDeviceInfo(sub, item.deviceGroup)'/>
            <mu-menu-item title="删除" @click='openDelDialog(sub)'/>
          </mu-icon-menu>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
    <!-- add device group dialog -->
    <mu-dialog :open='addGroupDialog' title='添加设备分组' @close='closeDialog'>
      <mu-text-field hintText='新增设备分组名称' v-model='group_name'></mu-text-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='addGroupName' primary label='添加'/>
    </mu-dialog>
    <mu-dialog :open='deleteDialog' title='删除设备' @close='closeDialog'>
      <p>确定删除设备: {{deviceInfo.deviceAlias}} ?</p>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='deleteDevice' primary label='删除'/>
    </mu-dialog>
    <transition name='router-show'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        isShow: false,
        openDialog: false,
        trigger: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        targetOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        addGroupDialog: false,
        deleteDialog: false,
        group_name: '',
        titleStyle: 'titleStyle',
        interval: 0
      }
    },
    created () {
      this.$store.dispatch('getDevices');
      this.isShow = this.$store.state.user.userinfo.userType === 'producter';
//      this.interval = setInterval(this.getALLDeviceStatus, 2000);
    },
    mounted () {
      this.trigger = this.$refs.button.$el;
    },
    computed: {
      deviceInfo() {
        return this.$store.state.devices.deviceinfo;
      },
      deviceLists() {
        return this.$store.state.devices.deviceLists;
      }
    },
    methods: {
      toggle () {
        this.openDialog = !this.openDialog;
      },
      handleClose () {
        this.openDialog = false;
      },
      //打开设备分组对话框
      openAddGroup () {
        this.openDialog = false;
        this.addGroupDialog = true;
        this.group_name = '';
      },
      //关闭弹框
      closeDialog () {
        this.addGroupDialog = false;
        this.deleteDialog = false;
      },
      //添加设备分组
      addGroupName() {
        this.addGroupDialog = false;
        console.log("---------------------" + this.group_name);
        if (this.group_name) {
          this.$store.dispatch('addDeviceGroup', this.group_name).then(() => {
            this.$store.dispatch('getDevices');
            console.log('添加设备分组成功');
          }).catch(err => {
            console.log('添加设备分组失败!');
          });
        }
      },
      //查看设备详细信息
      getDeviceInfo(value, group) {
        let obj = {};
        obj.deviceinfo = value;
        obj.groupName = group;
        //console.log(obj);
        this.$store.dispatch('setDeviceInfo', obj);
        this.$store.dispatch('getDeviceGroup');
        this.closeDialog();
        this.$store.dispatch('getDeviceData', obj);

      },
      //打开删除设备对话框
      openDelDialog(value) {
        console.log(value);
        this.$store.state.deviceInfo = value;
        this.deleteDialog = true;
      },
      deleteDevice() {
        this.deleteDialog = false;
      },
      getProductList() {
        this.$store.dispatch('getProducts').then(() => {
          this.$router.push({path: '/devices/product/list'});
          console.log('获取产品列表成功');
        }).catch(err => {
          console.log('获取产品列表失败!');
        });
      },
      shareGroup(name) {
        console.log(name);
        this.$store.commit('SET_SHAREDEVICEGROUP', name);
        this.$router.push({path: '/devices/share'});
      },
      getALLDeviceStatus() {
        this.$store.dispatch('getALLDeviceStatus').then(() => {
          console.log('获取设备状态');
        }).catch(err => {
          console.log('获取设备状态失败!');
        });
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
  .title {
    text-align: left;
  }

  .router-show-enter-active, .router-show-leave-active {
    transition: all .4s;
  }

  .router-show-enter, .router-show-leave {
    transform: translateX(100%)
  }

  .titleStyle {
    padding-left: 0px;
    margin-left: 0px;
  }

  .list-item {
    margin-left: 5px;
    border-bottom: 1px solid lightgray;
  }
</style>
