<template>
  <div>
    <mu-appbar title="设备" class='header'>
      <mu-icon-button icon="add" slot="right" ref='button' @click='toggle'/>
    </mu-appbar>
    <mu-popover :open='openDialog' :autoPosition='false' :trigger='trigger' :anchorOrigin="anchorOrigin"
                :targetOrigin="targetOrigin" @close="handleClose">
      <mu-menu>
        <mu-menu-item title='添加设备组' @click='openAddGroupDialog'/>
      </mu-menu>
    </mu-popover>
    <mu-list vlaue='selected'>
      <mu-list-item v-show="isShow" title="产品" class='list-item' @click='gotoProductList'>
        <mu-icon slot="left" value="storage" :size='30'/>
      </mu-list-item>
      <mu-list-item v-show="flag" v-for='(item,deviceGroupIndex) in deviceLists' :key='item.deviceGroupName'
                    :title='item.deviceGroupName'
                    :open='true' class='group' toggleNested>
        <mu-icon-menu slot='left' icon='more_vert'>
          <mu-menu-item title="分享设备组" @click='openShareDeviceGroupDialog(deviceGroupIndex)'/>
          <mu-menu-item title="删除设备组" @click='openDeleteGroupDialog(deviceGroupIndex)'/>
        </mu-icon-menu>
        <mu-list-item v-for='(sub,deviceIndex) in item.deviceInformation' :key='sub.deviceAlias'
                      :title='sub.deviceAlias'
                      slot='nested' class='titleStyle'>
          <mu-icon v-show="sub.status == 'ONLINE'" slot="left" value="cloud_done" :size='35' color='green'/>
          <mu-icon v-show="sub.status == 'OFFLINE'" slot="left" value="cloud_off" :size='35' color='red'/>
          <mu-icon v-show="sub.status == 'UNACTIVE'" slot="left" value="cloud_circle" :size='40'/>
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
            <mu-menu-item title="设备详情" @click='gotoDeviceInfo(sub, item.deviceGroupName)'/>
            <mu-menu-item title="分享设备" @click='openShareDeviceDialog(deviceGroupIndex,deviceIndex)'/>
            <mu-menu-item title="取消分享" @click='openCancelDeviceShareDialog(deviceGroupIndex,deviceIndex)'/>
            <mu-menu-item title="历史数据" @click='gotoHistoryInfo(sub)'/>
          </mu-icon-menu>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
    <mu-dialog :open='shareDeviceDialog' :title='deviceshare.deciceName' @close='closeDialog'>
      <mu-list-item v-for="(friendGroup,friendGroupIndex) in this.$store.state.friend.friendList"
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
    <mu-dialog :open='shareDeviceGroupDialog' :title='deviceGroup.deviceGroupName' @close='closeDialog'>
      <mu-list-item v-for="(friendGroup,friendGroupIndex) in this.$store.state.friend.friendList"
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
      <mu-text-field hintText='新增设备分组名称' v-model='newDeviceGroupName'></mu-text-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='addDeviceGroup' primary label='添加'/>
    </mu-dialog>
    <mu-dialog :open='delGroupDialog' title='删除设备分组' @close='closeDialog'>
      是否删除设备组：{{ deviceGroup.deviceGroupName }}
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='delDeviceGroup' primary label='删除'/>
    </mu-dialog>
    <mu-dialog :open='cancelDeviceShareDialog' title='取消设备分享' @close='closeDialog'>
      <p>确定撤销设备 {{device.deviceAlias}} 的分享?</p>
      <mu-select-field v-model="beSharedId" :labelFocusClass="['label-foucs']" label="选择你需要取消分享的用户">
        <mu-menu-item v-for="(item,userIndex) in device.beSharedUser" :key="userIndex"
                      :value="item.beSharedId" :title="item.beSharedName"/>
      </mu-select-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='cancelDeviceShare' primary label='确定'/>
    </mu-dialog>
    <mu-toast v-if="toastFlag" :message="toastMsg" @close="hideToast"/>
    <transition name='router-show'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        /**
         * 界面布局有关变量
         */
        //界面选择性展示相关变量
        isShow: false,
        flag: false,
        toastFlag: false,
        //界面弹出窗口相关变量
        openDialog: false,
        delGroupDialog: false,
        shareDeviceGroupDialog: false,
        addGroupDialog: false,
        cancelDeviceShareDialog: false,
        shareDeviceDialog: false,
        //界面事件窗口相关变量
        trigger: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        targetOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        /**
         * v-model相关
         */
        beSharedId: '',
        newDeviceGroupName: '',
        /**
         * 动画相关，定时器之类
         */
        interval: 0,
        /**
         * 自定义变量
         */
        toastMsg: '',
        friendIdList: [],
        //与store交互有关变量
        deviceGroup: {
          deviceGroupName: '',
          deviceGroupId: ''
        },
        device: {
          deviceId: '',
          deviceAlias: '',
          beSharedUser: [
            {
              beSharedId: '',
              beSharedName: ''
            }
          ]
        },
        deviceshare: {
          deviceName: '',
          deviceId: ''
        },
      }
    },
    created () {
      /**
       * 相关变量初始化
       */
      this.isShow = this.$store.state.user.userinfo.userType === 'producter';
      this.getDeviceAndStatus();
    },
    mounted () {
      this.trigger = this.$refs.button.$el;//触发添加按钮dom
    },
    beforeMount(){
      this.interval = setInterval(() => {
        this.$store.dispatch('getALLDeviceStatus');
      }, 1000)
    },
    beforeDestroy() {
      console.log('清除定时器' + this.interval);
      clearInterval(this.interval);
    },
    computed: {
      deviceLists() {
        return this.$store.state.devices.deviceLists;
      },
    },
    methods: {
      /**
       * 界面布局相关函数
       */
      /*界面提示窗口函数*/
      showToast (toastMsg) {
        this.toastMsg = toastMsg;
        this.toastFlag = true;
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.toastFlag = false;
        }, 2000)
      },
      hideToast () {
        this.toastFlag = false;
        if (this.toastTimer) clearTimeout(this.toastTimer);
      },
      /*界面弹出窗口布局函数，弹出之前需要对窗口要用到的数据进行初始化*/
      openAddGroupDialog () {
        this.openDialog = false;
        this.newDeviceGroupName = '';
        this.addGroupDialog = true;
      },
      openDeleteGroupDialog(deviceGroupIndex){
        this.deviceGroup.deviceGroupId = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceGroupId;
        this.deviceGroup.deviceGroupName = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceGroupName;
        this.delGroupDialog = true;
      },
      openShareDeviceDialog(deviceGroupIndex, deviceIndex){
        this.deviceshare.deciceName = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceInformation[deviceIndex].deviceAlias;
        this.deviceshare.deciceId = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceInformation[deviceIndex].deviceId;
        this.$store.dispatch('getFriends');
        this.shareDeviceDialog = true;
      },
      openShareDeviceGroupDialog(deviceGroupIndex) {
        this.deviceGroup.deviceGroupId = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceGroupId;
        this.deviceGroup.deviceGroupName = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceGroupName;
        this.$store.dispatch('getFriends');
        this.shareDeviceGroupDialog = true;
      },
      openCancelDeviceShareDialog(deviceGroupIndex, deviceIndex) {
        this.device.deviceId = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceInformation[deviceIndex].deviceId;
        this.device.beSharedUser = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceInformation[deviceIndex].beSharedUser;
        console.log(JSON.stringify(this.device.beSharedUser));
        this.device.deviceAlias = this.$store.state.devices.deviceLists[deviceGroupIndex].deviceInformation[deviceIndex].deviceAlias;
        this.cancelDeviceShareDialog = true;
      },
      closeDialog () {
        this.addGroupDialog = false;
        this.cancelDeviceShareDialog = false;
        this.delGroupDialog = false;
        this.shareDeviceGroupDialog = false;
        this.shareDeviceDialog = false;
      },
      //界面事件窗口布局函数
      toggle () {
        this.openDialog = !this.openDialog;
      },
      handleClose () {
        this.openDialog = false;
      },
      /**
       * 路由相关函数
       */
      gotoDeviceInfo(value, group) {
        value.groupName = group;
        this.$store.dispatch('setDeviceInfo', value).then(() => {
          this.$router.push('/devices/infor');
        });
      },
      gotoProductList() {
        this.$store.dispatch('getProducts').then(() => {
          this.$router.push('/devices/product/list');
        }).catch(err => {
          console.log(err);
        });
      },
      gotoHistoryInfo(deviceInfo){
        this.$store.dispatch('setDeviceInfo', deviceInfo).then(() => {
          this.$router.push('/devices/history');
        });
      },
      /**
       * 与store数据交互函数
       */
      /*界面内的数据交互*/
      getDeviceAndStatus() {
        this.$store.dispatch('getDevices').then(() => {
          this.$store.dispatch('getALLDeviceStatus').then(() => {
            this.flag = true;//如果获取状态失败也显示
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          console.log(err);
        });
      },
      /*与窗口交互数据的函数，需要在交互成功后关闭窗口*/
      shareDeviceGroup(){
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
        this.$store.dispatch('shareDeviceGroup', postObj).then(() => {
          this.shareDeviceGroupDialog = false;
          this.showToast('分享设备组成功');
          this.getDeviceAndStatus();
        }).catch(err => {
          this.showToast(err.message);
          console.log(err);
        });
      },
      shareDevice(){
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
        this.$store.dispatch('shareDevice', postObj).then(() => {
          this.shareDeviceDialog = false;
          this.showToast('分享设备成功');
          this.getDeviceAndStatus();
        }).catch(err => {
          this.shareDeviceDialog = false;
          this.showToast(err.message);
          console.log(err);
        });
      },
      addDeviceGroup() {
        if (this.newDeviceGroupName) {
          let postObj = {};
          postObj.deviceGroupName = this.newDeviceGroupName;
          this.$store.dispatch('addDeviceGroup', postObj).then(() => {
            this.addGroupDialog = false;
            this.showToast('添加设备组成功');
            this.getDeviceAndStatus();
          }).catch(err => {
            this.showToast(err.message);
            console.log(err);
          });
        }
      },
      delDeviceGroup(){
        let postObj = {};
        postObj.deviceGroupId = this.deviceGroup.deviceGroupId;
        this.$store.dispatch('delDeviceGroup', postObj).then(() => {
          this.delGroupDialog = false;
          this.showToast('删除设备组成功');
          this.getDeviceAndStatus();
        }).catch(err => {
          this.showToast(err.message);
          console.log(err);
        });
      },
      cancelDeviceShare() {
        let postObj = {};
        postObj.deviceId = this.device.deviceId;
        postObj.besharedId = this.beSharedId;
        this.$store.dispatch('cancelDeviceShare', postObj).then(() => {
          this.cancelDeviceShareDialog = false;
          this.showToast('取消设备分享成功');
          this.getDeviceAndStatus();
        }).catch(err => {
          this.showToast(err.message);
          console.log(err);
        })
      }
    }
  }
</script>

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
