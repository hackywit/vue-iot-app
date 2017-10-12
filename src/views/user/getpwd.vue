<template>
  <div class="getpassword">
    <mu-appbar title="找回密码" class='header'>
      <router-link to='/' slot='left'>
        <mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
      </router-link>
    </mu-appbar>
    <div>
      <mu-text-field label="用户名" hintText="请输入用户名" v-model="userinfo.userName">
      </mu-text-field>
      <br/>
      <mu-select-field v-if='getType === "tel"' v-model='userinfo.userType' label='请选择用户类型'>
        <mu-menu-item value='producter' title='生产设备厂商'/>
        <mu-menu-item value='user' title='用户'/>
      </mu-select-field><br/>
      <mu-text-field class="verify-text-field" v-model="userinfo.verificationCode" hintText="请输入验证码"/>
      <mu-raised-button :label="countDown" primary @click='getTelCode' :disabled='disabled'/>
      <mu-raised-button label="下一步" class="next-btn" primary @click="verify"/>
    </div>
    <mu-dialog :open='resetPwdDialog' title='重置密码' @close='closeDialog'>
      <mu-text-field v-model="userinfo.password" hintText="请输入密码" type='password'>
      </mu-text-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='resetPwd' primary label='确定'/>
    </mu-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userinfo: {
          userType: '',
          userName: '',
          password: '',
          verificationCode: ''
        },
        alertDialog: false,
        alertText: '',
        getType: 'tel',
        count: 0,
        disabled: false,
        resetPwdDialog: false
      }
    },
    created() {
      this.getType = this.$route.params.type;
    },
    computed: {
      countDown() {
        return this.count > 0 ? this.count + 's' : '获取验证码';
      }
    },
    methods: {
      closeDialog(){
        this.resetPwdDialog = false;
      },
      //获取验证码
      getTelCode() {
        //发送验证
        let postObj = {};
        postObj.userName = this.userinfo.userName;
        postObj.userType = this.userinfo.userType;
        this.$store.dispatch('forgetPassword', JSON.stringify(postObj)).then(() => {
          console.log("获取验证码成功!");
        }).catch(err => {
          this.alertDialog = true;
          this.alertText = this.$store.state.user.error.errorMessage;
        });
        //开启验证码计时
        this.disabled = true;
        this.count = 60;
        setTimeout(this.timer, 0);
      },
      //验证码计时函数
      timer() {
        if (this.count > 0) {
          this.count--;
          setTimeout(this.timer, 1000);
        } else {
          this.disabled = false;
        }
      },
      verify(){
        let userInputCode = this.userinfo.verificationCode;
        let serviceBackCode = this.$store.state.user.verificationCode;
        if (userInputCode === serviceBackCode && userInputCode !== '' && serviceBackCode !== '') {
          //这边使用弹出框修改
          this.resetPwdDialog = true;
        } else {
          this.alertDialog = true;
          this.alertText = '验证码不正确';
        }
      },
      resetPwd(){
        let postObj = {};
        postObj.userName = this.userinfo.userName;
        postObj.userType = this.userinfo.userType;
        postObj.password = this.userinfo.password;
        this.$store.dispatch('updatePassword', JSON.stringify(postObj)).then(() => {
          this.resetPwdDialog = false;
          console.log("更改密码成功");
          this.$router.push("/");
        }).catch(err => {
          this.alertDialog = true;
          this.alertText = this.$store.state.user.error.errorMessage;
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .getpassword {
    .verify-text-field {
      width: 154px;
    }
  }

  .next-btn {
    display: block;
    margin: 10px auto;
  }
</style>
