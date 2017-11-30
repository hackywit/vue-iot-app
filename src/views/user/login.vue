<template>
  <div>
    <h3>用户登录</h3>
    <!--v-model指令实现数据的双向绑定，是个语法糖-->
    <mu-text-field label="用户名" hintText="请输入用户名" v-model="userName"></mu-text-field>
    <br/>
    <mu-text-field label="密 码" hintText="请输入密码" type="password" v-model="password"></mu-text-field>
    <br/>
    <mu-raised-button label="登录" primary @click="userlogin"/>
    <div class="link">
      <mu-flat-button to='/register' label="注册账号" class="flat-button" primary/>
      <mu-flat-button label="找回密码" class="flat-button" primary @click='openBottomSheet'/>
    </div>
    <mu-dialog :open="alertDialog" v-if="alertDialog" :showHide="alertDialog" title="提示">
      <p>{{ alertText }}</p>
      <mu-flat-button label="确定" slot="actions" primary @click="closeAlert"/>
    </mu-dialog>
    <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
      <mu-list @itemClick="closeBottomSheet">
        <mu-sub-header>请选择找回密码的方式</mu-sub-header>
        <mu-list-item to='/getpassword/tel' title="手机号码验证"/>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        /**
         * 界面布局相关变量
         */
        //弹出窗口相关变量
        alertDialog: false,
        bottomSheet: false,
        /**
         * v-model相关的变量
         */
        userName: '',
        password: '',
        /**
         * 自定义变量
         */
        alertText: '',
      }
    },
    methods: {
      /**
       * 窗口的打开和关闭
       */
      closeAlert() {
        this.alertDialog = false;
      },
      openBottomSheet() {
        this.bottomSheet = true;
      },
      closeBottomSheet() {
        this.bottomSheet = false;
      },
      /**
       * 与store的数据交互
       */
      //登录
      userlogin() {
        //校验---密码不能为空
        if (this.password.length <= 0) {
          this.alertDialog = true;
          this.alertText = '密码不能为空';
          return
        }
        let postObj = {};
        postObj.userName = this.userName;
        postObj.password = this.password;
        this.$store.dispatch('login', postObj).then(() => {
          this.$router.push({path: '/devices'});
        }).catch(err => {
          this.alertDialog = true;
          this.alertText = this.$store.state.user.error.errorMessage;
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .link {
    margin: 150px auto 0;
    //border: 1px solid #000;
    width: 180px;
    height: 40px;
    .flat-button {
      &:first-child {
        float: left;
      }
      &:last-child {
        float: right;
      }
    }
  }
</style>
