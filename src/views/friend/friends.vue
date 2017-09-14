<template>
  <div class="friends">
    <mu-appbar title="好友" class='header'>
      <mu-icon-button icon="add" slot="right" ref='button' @click='toggle'/>
    </mu-appbar>
    <mu-popover :open='openMenu' :autoPosition='false' :trigger='trigger' :anchorOrigin="anchorOrigin"
                :targetOrigin="targetOrigin" @close="handleClose">
      <mu-menu>
        <mu-menu-item title='添加好友列表' @click='openAddGroup' leftIcon="group_add"/>
        <mu-menu-item title='添加好友' @click='openAddFriend' leftIcon="person_add"/>
      </mu-menu>
    </mu-popover>
    <mu-list>
      <mu-list-item title="新的好友" to='/friends/newfriends' class='list-item' @click='getNewFriends'>
        <mu-icon slot="left" value="person_add"/>
      </mu-list-item>
      <mu-list-item v-for='(item,frindGroupIndex) in friendList' :key='item.groupName' :title='item.groupName'
                    :open='false' class='group'
                    toggleNested>
        <mu-icon-menu slot="left" icon="people">
          <mu-menu-item title="删除好友分组" @click="openDeleteFrinedGroupDialog(frindGroupIndex)"/>
        </mu-icon-menu>
        <mu-list-item v-for='sub in item.friends' :key='sub.friendName' :title='sub.friendName' slot='nested'
                      to='/friends/infor' @click='openFriendInfo(sub, item.groupName)'>
          <mu-icon slot="left" value="person"/>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
    <!-- add friend group dialog -->
    <mu-dialog :open='showAddFriend' title='添加好友' @close='closeDialog'>
      <mu-text-field hintText='请输入好友用户名' v-model='friendInfo.friendName'></mu-text-field>
      <mu-select-field v-model='friendInfo.groupName' label='请选择好友列表'>
        <mu-menu-item v-for='item in friendList' :key='item.groupName' :title='item.groupName'
                      :value='item.groupName'></mu-menu-item>
      </mu-select-field>
      <br/>
      <mu-select-field v-model='friendInfo.userType' label='请选择好友用户类型'>
        <mu-menu-item value='producter' title='生产设备厂商'/>
        <mu-menu-item value='user' title='用户'/>
      </mu-select-field>
      <br/>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='addFriend' primary label='添加'/>
    </mu-dialog>
    <mu-dialog :open='showAddGroup' title='添加好友列表' @close='closeDialog'>
      <mu-text-field hintText='新增好友分组名称' v-model='groupNameA'></mu-text-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='addFriendGroup' primary label='添加'/>
    </mu-dialog>
    <mu-dialog :open='delFriendGroupDialog' title='删除好友分组' @close='closeDialog'>
      是否删除好友组：{{ friendGroup.friendGroupName }}
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='delFriendGroup' primary label='删除'/>
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
        //界面展示有关的数据
        friendgroup: {
          friendGroupName: '',
          friendGroupId: ''
        },

        //menu
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
        //groups:[]
        //add friend group
        friendInfo: {
          friendName: '',
          userType: 'user',
          groupName: ''
        },
        groupNameA: '',
        //对话框设置
        showAddGroup: false,
        showAddFriend: false,
        delFriendGroupDialog: false
      }
    },
    created () {
      //this.fetchData();
      this.initData()
    },
    mounted () {
      this.trigger = this.$refs.button.$el;
    },
    computed: {
      friendList() {
        return this.$store.state.friends.friendList;
      },
      friendGroup() {
        return this.$store.state.friends.friendGroup;
      }
    },
    methods: {
      initData() {
        this.$store.dispatch('getFriends');
        this.$store.dispatch('getFriendGroup');
//        this.friendInfo.groupName = this.$store.state.friends.friendGroup[0].groupName;
      },
      //右上角菜单
      toggle () {
        this.openMenu = !this.openMenu;
      },
      handleClose () {
        this.openMenu = false;
      },
      //打开好友分组对话框
      openAddGroup () {
        this.showAddGroup = true;
        this.groupNameA = '';
      },
      //添加好友分组
      addFriendGroup() {
        this.showAddGroup = false;
        if (this.groupNameA) {
          let data = {};
          data.friendGroupName = this.groupNameA;
          console.log("+++++++++++++" + JSON.stringify(data));
          this.$store.dispatch('addFriendGroup', JSON.stringify(data)).then(() => {
            console.log('添加好友列表成功！');
            this.$store.dispatch('getFriends')
          }).catch(err => {
            console.log('添加好友列表失败!');
          });
        }
      },
      closeDialog() {
        this.showAddGroup = false;
        this.showAddFriend = false;
        this.delFriendGroupDialog = false;
      },
      //添加好友
      openAddFriend() {
        this.showAddFriend = true;
      },
      addFriend() {
        this.showAddFriend = false;
        let postObj ={};
        postObj.friendName = this.friendInfo.friendName;
        postObj.userType = this.friendInfo.userType;
        this.$store.dispatch('addFriend', JSON.stringify(postObj)).then(() => {
          console.log('添加好友成功！');
          this.$store.dispatch('getFriends');
          this.$router.push({path: '/friends'});
        }).catch(err => {
          console.log('添加好友失败!');
        });
      },
      getNewFriends() {
        this.$store.dispatch('getUnreceivedList');
      },
      openFriendInfo(friendInfo, groupName) {
        this.friendInfo.friendName = friendInfo.friendName;
        this.friendInfo.userType = friendInfo.userType;
        this.friendInfo.groupName = groupName;
        this.$store.commit('SET_FRIENDINFO', this.friendInfo);
      },
      //打开删除好友组的对话框
      openDeleteFrinedGroupDialog(frindGroupIndex){
        //将要post过去的数据线缓存到data中
        this.friendGroup.friendGroupId = this.$store.state.friends.friendList[frindGroupIndex].groupId;
        this.friendGroup.friendGroupName = this.$store.state.friends.friendList[frindGroupIndex].groupName;
        this.delFriendGroupDialog = true;
      },
      //删除好友分组
      delFriendGroup(){
        this.delFriendGroupDialog = false;
        //拼凑post的json字符串
        let data = {};
        data.friendGroupId = this.friendGroup.friendGroupId;
        this.$store.dispatch('delFriendGroup', JSON.stringify(data)).then(() => {
          console.log('添加好友成功！');
          this.$store.dispatch('getFriends');
          this.$router.push({path: '/friends'});
        }).catch(err => {
          console.log('添加好友失败!');
        });
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  /*.group {
      background: #e1f5fe;
  }*/
  .router-show-enter-active, .router-show-leave-active {
    transition: all .4s;
  }

  .router-show-enter, .router-show-leave {
    transform: translateX(100%)
  }

  .friends {
    margin: 0 5px;
    .list-item {
      border-bottom: 1px solid lightgray;
    }
  }
</style>
