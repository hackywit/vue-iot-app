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
      <mu-list-item v-for='(item,deviceGroupIndex) in deviceLists' :key='item.deviceGroupName'
                    :title='item.deviceGroupName'
                    :open='true' class='group' toggleNested>
        <mu-icon-menu slot='left' icon='more_vert'>
          <mu-menu-item title="分享设备组" @click='openShareDeviceGroupDialog(deviceGroupIndex)'/>
          <mu-menu-item title="删除设备组" @click='openDeleteGroupDialog(deviceGroupIndex)'/>
        </mu-icon-menu>
        <mu-list-item v-for='(sub,deviceIndex) in item.deviceInformation' :key='sub.deviceAlias'
                      :title='sub.deviceAlias'
                      slot='nested' class='titleStyle'>
          <mu-icon v-if="sub.status == 'ONLINE'" slot="left" value="cloud_done" :size='35' color='green'/>
          <mu-icon v-else-if="sub.status == 'OFFLINE'" slot="left" value="cloud_off" :size='35' color='red'/>
          <mu-icon v-else slot="left" value="cloud_circle" :size='40'/>
          <span slot='describe'>
        				<span slot='left'>设备序列号：{{sub.deviceName}}</span><br/>
        				<span slot='right'>设备Id：{{sub.deviceId}}</span>
        				<span slot='right'>设备名：{{sub.deviceAlias}}</span>
        				<span slot='right'>设备密码：{{sub.deviceSecret}}</span>
        				<span slot='right'>产品key：{{sub.productKey}}</span>
        				<span slot='right'>产品名称：{{sub.productName}}</span>
        				<span slot='right'>状态：{{sub.status}}</span>
        			</span>
          <mu-icon-menu slot="right" icon="menu" tooltip="操作">
            <mu-menu-item title="查看" to='/devices/infor' @click='getDeviceInfo(sub, item.deviceGroup)'/>
            <mu-menu-item title="分享" @click='openShareDeviceDialog(deviceGroupIndex,deviceIndex)'/>
            <mu-menu-item title="取消分享" @click='openDelDialog(deviceGroupIndex,deviceIndex)'/>
          </mu-icon-menu>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
    <!-- add device group dialog -->
    <!--单个设备分享弹出框-->
    <mu-dialog :open='shareDeviceDialog' :title='deviceshare.deciceName' @close='closeDialog'>
      <mu-list-item v-for="(friendGroup,friendGroupIndex) in this.$store.state.friendMap.friendList"
                    :title="friendGroup.groupName" :open='false' toggleNested>
        <mu-list-item v-for="(friend,friendIndex) in friendGroup.friends" :key="friendIndex"
                      :value="friend.friendName"
                      :title="friend.friendName" slot='nested'>
          <mu-checkbox slot="left" class="demo-checkbox" :nativeValue="friend.friendId" v-model="friendIdList"/>
        </mu-list-item>
      </mu-list-item>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='shareDevice' primary label='确定'/>
    </mu-dialog>
    <!--设备组分享弹出框-->
    <mu-dialog :open='shareDeviceGroupDialog' :title='deviceGroup.deviceGroupName' @close='closeDialog'>
      <mu-list-item v-for="(friendGroup,friendGroupIndex) in this.$store.state.friendMap.friendList"
                    :title="friendGroup.groupName" :open='false' toggleNested>
        <mu-list-item v-for="(friend,friendIndex) in friendGroup.friends" :key="friendIndex"
                      :value="friend.friendName"
                      :title="friend.friendName" slot='nested'>
          <mu-checkbox slot="left" class="demo-checkbox" :nativeValue="friend.friendId" v-model="friendIdList"/>
        </mu-list-item>
      </mu-list-item>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='shareDeviceGroup' primary label='确定'/>
    </mu-dialog>
    <mu-dialog :open='addGroupDialog' title='添加设备分组' @close='closeDialog'>
      <mu-text-field hintText='新增设备分组名称' v-model='group_name'></mu-text-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='addGroupName' primary label='添加'/>
    </mu-dialog>
    <mu-dialog :open='delGroupDialog' title='删除设备分组' @close='closeDialog'>
      是否删除设备组：{{ deviceGroup.deviceGroupName }}
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='delDeviceGroup' primary label='删除'/>
    </mu-dialog>
    <mu-dialog :open='deleteDialog' title='取消设备分享' @close='closeDialog'>
      <p>确定撤销设备 {{device.deviceAlias}} 的分享?</p>
      <!--让用户选择撤销的分享的用户-->
      <mu-select-field v-model="value" :labelFocusClass="['label-foucs']" label="选择你需要取消分享的用户">
        <mu-menu-item v-for="(beSharedUser,userIndex) in device.beSharedUser" :key="userIndex"
                      :value="beSharedUser.beSharedName" :title="beSharedUser.beSharedName"
                      @click="setUserIndex(userIndex)"/>
      </mu-select-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='cancelDeviceShare' primary label='确定'/>
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
        //界面DOM展示有关
        isShow: true,
        openDialog: false,
        delGroupDialog: false,
        shareDeviceGroupDialog: false,
        addGroupDialog: false,
        deleteDialog: false,
        shareDeviceDialog: false,
        userIndex: '',
        value: 0,
        friendValue: 0,
        friendIdList: [],//这个是checkbox的value集合
        //界面数据展示有关
        device: {
          deviceId: '',
          beSharedUser: [
            {
              beSharedId: '',
              beSharedName: ''
            }
          ]
        },
        deviceGroup: {
          deviceGroupName: '',
          deviceGroupId: ''
        },

        //和单个设备分享有关的缓存变量
        deviceshare: {
          deviceName: '',
          deviceId: ''
        },

        trigger: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        targetOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        group_name: '',
        titleStyle: 'titleStyle',
        interval: 0
      }
    },
    created () {
      this.isShow = this.$store.state.user.userinfo.userType === 'producter';
      this.$store.dispatch('getDevices');
      this.friendIdList = [];//不初始化，缓存可能会影响某些操作
      //每隔2s获取获取设备状态
      this.getALLDeviceStatus();
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
      //打开删除设备组的对话框
      openDeleteGroupDialog(deviceGroupIndex){
        //将即将要post过去删除设备组的数据存到data中
        this.deviceGroup.deviceGroupId = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceGroupId;
        this.deviceGroup.deviceGroupName = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceGroupName;
        this.delGroupDialog = true;
      },
      openShareDeviceDialog(deviceGroupIndex, deviceIndex){
        this.deviceshare.deciceName = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceInformation[deviceIndex].deviceAlias;
        this.deviceshare.deciceId = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceInformation[deviceIndex].deviceId;
        //查找到好友信息并缓存到store中
        this.$store.dispatch('getFriends');
        this.shareDeviceDialog = true;
      },
      openShareDeviceGroupDialog(deviceGroupIndex) {
        this.deviceGroup.deviceGroupId = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceGroupId;
        this.deviceGroup.deviceGroupName = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceGroupName;
        //查找到好友信息并缓存到store中
        this.$store.dispatch('getFriends');
        this.shareDeviceGroupDialog = true;
      },
      //关闭弹框
      closeDialog () {
        this.addGroupDialog = false;
        this.deleteDialog = false;
        this.delGroupDialog = false;
        this.shareDeviceGroupDialog = false;
        this.shareDeviceDialog = false;
      },
      //分享设备组设备
      shareDeviceGroup(){
        this.shareDeviceGroupDialog = false;
        //拼凑需要传过去的post数据
        let postObj = {};
        let i = 0;
        postObj.deviceGroupName = this.deviceGroup.deviceGroupName;
        postObj.besharedFriendlist = [];
        this.friendIdList.forEach((friendId) => {
          let obj = {};
          obj.beSharedUserId = friendId;
          postObj.besharedFriendlist[i] = obj;
          i++;
        });
        this.$store.dispatch('shareDeviceGroup', JSON.stringify(postObj));
      },
      //分享单个设备
      shareDevice(){
        this.shareDeviceDialog = false;
        //拼凑需要发送的post数据
        let postObj = {};
        let deviceIdList = [];
        let i = 0;
        deviceIdList[0] = this.deviceshare.deciceId;
        postObj.deviceIdList = deviceIdList;
        postObj.besharedFriendlist = [];
        this.friendIdList.forEach((friendId) => {
          let obj = {};
          obj.beSharedUserId = friendId;
          postObj.besharedFriendlist[i] = obj;
          i++;
        });
        this.$store.dispatch('shareDevice', JSON.stringify(postObj));
      },
      //添加设备分组
      addGroupName() {
        this.addGroupDialog = false;
        if (this.group_name) {
          this.$store.dispatch('addDeviceGroup', this.group_name).then(() => {
            this.$store.dispatch('getDevices');
            console.log('添加设备分组成功');
          }).catch(err => {
            console.log('添加设备分组失败!');
          });
        }
      },
      //删除设备分组
      delDeviceGroup(){
        this.delGroupDialog = false;
        let data = {};
        data.deviceGroupId = this.deviceGroup.deviceGroupId;
        this.$store.dispatch('delDeviceGroup', JSON.stringify(data)).then(() => {
          this.$store.dispatch('getDevices');
          console.log('添加设备分组成功');
        }).catch(err => {
          console.log('添加设备分组失败!');
        });
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
      openDelDialog(deviceGroupIndex, deviceIndex) {
        //获取到被分享的用户信息
        this.device.deviceId = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceInformation[deviceIndex].deviceId;
        this.device.beSharedUser = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceInformation[deviceIndex].beSharedUser;
        this.deleteDialog = true;
      },
      setUserIndex(userIndex){
        this.userIndex = userIndex;
      },
      cancelDeviceShare() {
        this.deleteDialog = false;
        this.friendIdList = [];
        //将得到的数据分发给store中的取消分享的事件
        let postObj = {};
        postObj.deviceId = this.device.deviceId;
        postObj.besharedId = this.device.beSharedUser[this.userIndex].beSharedId;
        const data = JSON.stringify(postObj);
        this.$store.dispatch('cancelDeviceShare', data).then(() => {
          //删除设备后及时刷新一次
          this.$store.dispatch('getDevices');
        })
      },
      getProductList() {
        this.$store.dispatch('getProducts').then(() => {
          this.$router.push({path: '/devices/product/list'});
          console.log('获取产品列表成功');
        }).catch(err => {
          console.log('获取产品列表失败!');
        });
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
    padding-left: 0;
    margin-left: 0;
  }

  .list-item {
    margin-left: 5px;
    border-bottom: 1px solid lightgray;
  }
</style>
