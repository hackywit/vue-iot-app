<template>
  <div class="settings">
    <mu-appbar title="我" class='header'>
      <!--<router-link to='/me' slot='left'>
                <mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
            </router-link>-->
    </mu-appbar>
    <div class="page-part">
      <mu-list>
        <mu-list-item title='用户名' :afterText='userinfo.userName'>
          <mu-icon-menu slot="right" icon="keyboard_arrow_right"></mu-icon-menu>
        </mu-list-item>
        <mu-list-item title='邮箱' :afterText='userinfo.email' to='/user/email'>
          <mu-icon-menu slot="right" icon="keyboard_arrow_right"></mu-icon-menu>
        </mu-list-item>
        <mu-list-item title='手机号码' :afterText='userinfo.tel' to='/user/tel'>
          <mu-icon-menu slot="right" icon="keyboard_arrow_right"></mu-icon-menu>
        </mu-list-item>
        <mu-list-item title='公司名称' :afterText='userinfo.company' to='/user/company'>
          <mu-icon-menu slot="right" icon="keyboard_arrow_right"></mu-icon-menu>
        </mu-list-item>
        <mu-list-item title='地址' :afterText='address' to='/user/address'>
          <mu-icon-menu slot="right" icon="keyboard_arrow_right"></mu-icon-menu>
        </mu-list-item>
        <mu-list-item title='用户类型' :afterText='userinfo.userType === "user" ? "普通用户" : "生产设备厂商"'>
          <mu-icon-menu slot="right" icon="keyboard_arrow_right"></mu-icon-menu>
        </mu-list-item>
        <mu-list-item title='修改密码' to='/user/password'>
          <mu-icon-menu slot="right" icon="keyboard_arrow_right"></mu-icon-menu>
        </mu-list-item>
      </mu-list>
    </div>
    <mu-flat-button label="退出当前账号" class="demo-flat-button" secondary @click="openBottomSheet"/>
    <mu-bottom-sheet :open='bottomSheetFlag' @close='closeBottomSheet'>
      <mu-list @itemClick='close'>
        <mu-list-item titleClass='logout' title='退出当前账号' @click='gotoIndexPage'/>
        <mu-list-item title='取消'/>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        bottomSheetFlag: false
      }
    },
    created() {
      this.$store.dispatch('getUserinfo')
    },
    computed: {
      userinfo() {
        return this.$store.state.user.userinfo;
      },
      address() {
        return `${this.userinfo.country} - ${this.userinfo.province}`;
      }
    },
    methods: {
      /**
       * 界面布局相关函数
       */
       /*底部弹窗相关函数*/
      closeBottomSheet() {
        this.bottomSheetFlag = false;
      },
      openBottomSheet() {
        this.open = true;
      },
      /**
       * 路由相关函数
       */
      gotoIndexPage() {
        this.$router.push('/');
      }
    }
  }
</script>

<style lang='scss' scoped>
  .userinfo {
    list-style: none;
    li {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid lightgray;
      line-height: 50px;
      text-align: left;
      margin-left: 0;
      padding-left: 10px;
      :first-child {
        display: inline-block;
        width: 75px;
        text-align: right;
      }
      :last-child {
        display: inline-block;
        width: 200px;
        margin-left: 5px;
      }
    }
  }

  .logout {
    color: red;
  }
</style>
