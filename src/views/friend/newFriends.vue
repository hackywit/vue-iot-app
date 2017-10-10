<template>
  <div class="new-friends">
    <mu-appbar title='新的好友' class='header'>
      <mu-icon-button icon='keyboard_arrow_left' style='color: #fff' slot="left" @click="this.history.back()"/>
    </mu-appbar>
    <div class="page-part">
      <mu-tabs :value="activeTab" @change="handleTabChange" class='tabs'>
        <mu-tab value="requestFriendTab" title="好友请求"/>
        <mu-tab value="applyFriendTab" title="添加好友"/>
      </mu-tabs>
      <div v-if="activeTab === 'requestFriendTab'">
        <mu-list-item v-for='sub in unreceivedList' :key='sub.friendName' :title='sub.friendName' slot='nested'>
          <mu-icon slot="left" value="person"/>
          <span slot='describe'>
        				<span slot='left'>用户类型：{{sub.userType}} </span><br/>
        				<span slot='left'>请求添加你为好友</span>
        			</span>
          <mu-raised-button slot='right' label="接受" class="receive-btn" primary
                            @click='receiveFriend(sub.friendName, sub.userType)'/>
        </mu-list-item>
      </div>
      <div v-if="activeTab === 'applyFriendTab'">
        <mu-list-item v-for='sub in unconfirmedList' :key='sub.friendName' :title='sub.friendName' slot='nested'>
          <mu-icon slot="left" value="person"/>
          <span slot='describe'>
        				<span slot='left'>添加<span> {{sub.friendName}} </span>为好友, 等待对方确认</span>
          </span>
        </mu-list-item>
      </div>
    </div>
    <mu-toast v-if="toastFlag" :message="toastMsg" @close="hideToast"/>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        toastFlag: '',
        activeTab: 'requestFriendTab'
      }
    },
    created () {
      this.$store.dispatch('getUnconfirmedList');
    },
    computed: {
      unreceivedList() {
        return this.$store.state.friend.unreceivedList;
      },
      unconfirmedList() {
        return this.$store.state.friend.unconfirmedList;
      }
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
      handleTabChange(val) {
        this.activeTab = val;
      },
      receiveFriend(name, type) {
        let data = '{ "userName": "' + name + '", "userType": "' + type + ' "}';
        this.$store.dispatch('receiveFriend', data).then(() => {
          this.$store.dispatch('getUnreceivedList').then(() => {
            this.showToast('添加好友成功')
          }).catch(err => {
            this.showToast(err.message);
            console.log(err);
          });
          this.$store.dispatch('getFriends');
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }

</script>

<style lang='scss' scoped>
  .new-friends {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background-color: #fff;
    .page-part {
      padding-top: 60px;
      text-align: left;
      .tabs {
        background-color: #fff;
      }
      .receive-btn {
        margin-right: 20px;
      }
      .friend-name {
        color: #2196f3;
      }
    }
  }

  .mu-tab-link {
    color: #000;
  }

  .mu-tab-active {
    color: #2196f3;
  }
</style>
