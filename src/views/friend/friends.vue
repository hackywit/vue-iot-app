<template>
  <div class="friends">
    <mu-appbar title="好友" class='header'>
      <mu-icon-button icon="add" slot="right" ref='button' @click='toggle'/>
    </mu-appbar>
    <mu-popover :open='openMenu' :autoPosition='false' :trigger='trigger' :anchorOrigin="anchorOrigin"
                :targetOrigin="targetOrigin" @close="handleClose">
      <mu-menu>
        <mu-menu-item title='添加好友列表' @click='openAddGroupDialog' leftIcon="group_add"/>
        <mu-menu-item title='添加好友' @click='openAddFriendDialog' leftIcon="person_add"/>
      </mu-menu>
    </mu-popover>
    <mu-list>
      <mu-list-item title="新的好友" class='list-item' @click='gotoNewFriends'>
        <mu-icon slot="left" value="person_add"/>
      </mu-list-item>
      <mu-list-item v-for='(item,friendGroupIndex) in friendList' :key='item.groupName' :title='item.groupName'
                    :open='false' toggleNested>
        <mu-icon-menu slot="left" icon="people">
          <mu-menu-item title="删除好友分组" @click="openDeleteFrinedGroupDialog(friendGroupIndex)"/>
        </mu-icon-menu>
        <mu-list-item v-for='(sub,friendIndex) in item.friends' :key='sub.friendName' :title='sub.friendName'
                      slot='nested' @click="gotoFriendInfor">
          <mu-icon-menu slot="left" icon="people">
            <mu-menu-item title="移动好友" @click="openMoveFrinedDialog(friendGroupIndex,friendIndex)"/>
            <mu-menu-item title="删除好友" @click="openDeleteFrinedDialog(friendGroupIndex,friendIndex)"/>
          </mu-icon-menu>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
    <!-- add friend group dialog -->
    <mu-dialog :open='showAddFriend' title='添加好友'>
      <mu-text-field hintText='请输入好友用户名' v-model='friendName'></mu-text-field>
      <br/>
      <mu-select-field v-model='userType' label='请选择好友用户类型'>
        <mu-menu-item value='producter' title='生产设备厂商'/>
        <mu-menu-item value='user' title='用户'/>
      </mu-select-field>
      <br/>
      <mu-flat-button slot='actions' @click='closeAllDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='addFriend' primary label='添加'/>
    </mu-dialog>
    <mu-dialog :open='showAddGroup' title='添加好友列表'>
      <mu-text-field hintText='新增好友分组名称' v-model='addGroupName'></mu-text-field>
      <mu-flat-button slot='actions' @click='closeAllDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='addFriendGroup' primary label='添加'/>
    </mu-dialog>
    <mu-dialog :open='delFriendGroupDialog' title='删除好友分组'>
      是否删除好友组：{{ friendGroup.friendGroupName }}
      <mu-flat-button slot='actions' @click='closeAllDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='delFriendGroup' primary label='删除'/>
    </mu-dialog>
    <mu-dialog :open='delFriendDialog' title='删除好友'>
      是否删除好友：{{ friendInfo.friendName }}
      <mu-flat-button slot='actions' @click='closeAllDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='delFriend' primary label='删除'/>
    </mu-dialog>
    <mu-dialog :open='moveFriendDialog' title='移动好友分组'>
      是否移动好友{{ friendInfo.friendName }}到 ：<br/>
      <mu-select-field v-model="friendGroupName">
        <mu-menu-item v-for='(item,index) in friendList' :key='index' :value='item.groupName' :title='item.groupName'/>
      </mu-select-field>
      <mu-flat-button slot='actions' @click='closeAllDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='moveFriend' primary label='确定'/>
    </mu-dialog>
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
         * 界面布局相关变量
         */
        //弹出框布局变量
        showAddGroup: false,
        showAddFriend: false,
        delFriendGroupDialog: false,
        moveFriendDialog: false,
        delFriendDialog: false,
        //界面事件窗口布局变量
        openMenu: false,
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
         * v-model变量
         */
        //添加好友组相关变量
        addGroupName: '',
        //添加好友相关变量
        friendName: '',
        userType: '',
        //移动好友相关变量
        friendGroupName: '',
        /**
         * 自定义临时变量
         */
        //保存选中组的好友组信息
        friendGroup: {
          friendGroupName: '',
          friendGroupId: ''
        },
        //保存选中组的选中好友信息
        friendInfo: {
          friendName: '',
          userType: '',
          groupName: ''
        },
      }
    },
    created () {
      /**
       * 初始化相关
       */
      this.$store.dispatch('getFriends');
    },
    mounted () {
      this.trigger = this.$refs.button.$el;
    },
    computed: {
      friendList() {
        return this.$store.state.friend.friendList;
      }
    },
    methods: {
      /**
       * 界面布局相关函数
       */
      /*界面弹出窗口布局函数，打开之前对对话框需要用到的数据预赋值*/
      openAddGroupDialog () {
        this.addGroupName = '';
        this.showAddGroup = true;
      },
      openDeleteFrinedGroupDialog(friendGroupIndex){
        this.friendGroup.friendGroupId = this.$store.state.friend.friendList[friendGroupIndex].groupId;
        this.friendGroup.friendGroupName = this.$store.state.friend.friendList[friendGroupIndex].groupName;
        this.delFriendGroupDialog = true;
      },
      openAddFriendDialog() {
        this.showAddFriend = true;
      },
      openMoveFrinedDialog(friendGroupIndex, friendIndex){
        this.friendInfo.friendName = this.$store.state.friend.friendList[friendGroupIndex].friends[friendIndex].friendName;
        this.friendInfo.userType = this.$store.state.friend.friendList[friendGroupIndex].friends[friendIndex].userType;
        this.moveFriendDialog = true;
      },
      openDeleteFrinedDialog(friendGroupIndex, friendIndex){
        this.friendInfo.friendName = this.$store.state.friend.friendList[friendGroupIndex].friends[friendIndex].friendName;
        this.friendInfo.userType = this.$store.state.friend.friendList[friendGroupIndex].friends[friendIndex].userType;
        this.delFriendDialog = true;
      },
      closeAllDialog() {
        this.showAddGroup = false;
        this.showAddFriend = false;
        this.delFriendGroupDialog = false;
        this.moveFriendDialog = false;
        this.delFriendDialog = false;
      },
      /*界面事件窗口布局函数*/
      toggle () {
        this.openMenu = !this.openMenu;
      },
      handleClose () {
        this.openMenu = false;
      },
      /**
       * 跳转界面
       */
      gotoFriendInfor(){
//        this.$router.push('/friends/infor');
      },
      gotoNewFriends() {
        this.$store.dispatch('getUnreceivedList').then(() => {
          this.$router.push('/friends/newfriends');
        }).catch(err => {
          console.log(err);
        });
      },
      /**
       * 与store的数据交互
       */
      /*弹出窗口进行的数据交互，交互完毕需要关闭对话框*/
      addFriendGroup() {
        if (this.addGroupName) {
          let postObj = {};
          postObj.friendGroupName = this.addGroupName;
          this.$store.dispatch('addFriendGroup', postObj).then(() => {
            this.showAddGroup = false;
            this.$store.dispatch('getFriends')
          }).catch(err => {
            console.log(err);
          });
        }
      },
      addFriend() {
        let postObj = {};
        postObj.friendName = this.friendName;
        postObj.userType = this.userType;
        this.$store.dispatch('addFriend', postObj).then(() => {
          this.showAddFriend = false;
          this.$store.dispatch('getFriends');
        }).catch(err => {
          console.log(err);
        });
      },
      moveFriend(){
        let postObj = {};
        postObj.friendName = this.friendInfo.friendName;
        postObj.friendType = this.friendInfo.userType;
        postObj.bemoveGroupName = this.friendgroup.friendGroupName;
        this.$store.dispatch('updateFriendGroup', postObj).then(() => {
          this.moveFriendDialog = false;
          this.$store.dispatch('getFriends');
        });
      },
      delFriend(){
        let postObj = {};
        postObj.friendName = this.friendInfo.friendName;
        postObj.friendType = this.friendInfo.userType;
        this.$store.dispatch('deleteFriend', postObj).then(() => {
          this.delFriendDialog = false;
          this.$store.dispatch('getFriends');
        });
      },
      delFriendGroup(){
        let postObj = {};
        postObj.friendGroupId = this.friendGroup.friendGroupId;
        this.$store.dispatch('delFriendGroup', postObj).then(() => {
          this.delFriendGroupDialog = false;
          this.$store.dispatch('getFriends');
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }
</script>

<style lang='scss' scoped>
  .friends {
    margin: 0 5px;
    .list-item {
      border-bottom: 1px solid lightgray;
    }
  }
</style>
