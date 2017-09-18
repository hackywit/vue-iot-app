<template>
  <div class="getpassword">
    <mu-appbar title="找回密码" class='header'>
      <router-link to='/' slot='left'>
        <mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
      </router-link>
    </mu-appbar>
    <div>
      <mu-text-field label="用户名" hintText="请输入用户名" v-model="userinfo.userName">
      </mu-text-field><br/>
      <mu-select-field v-if='getType === "tel"' v-model='userinfo.userType' label='请选择用户类型'>
        <mu-menu-item value='producter' title='生产设备厂商'/>
        <mu-menu-item value='user' title='用户'/>
      </mu-select-field>
      <div v-if='getType === "tel"'>
        <mu-text-field v-model="userinfo.verificationCode" class='check-text' hintText="请输入验证码"/>
        <mu-raised-button :label="countDown" class="check-btn" primary @click='getTelCode' :disabled='disabled'/>
      </div>
      <mu-raised-button label="下一步" class="next-btn" primary @click="verify"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
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
        disabled: false
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
      timer() {
        if (this.count > 0) {
          this.count--;
          setTimeout(this.timer, 1000);
        } else {
          this.disabled = false;
        }
      },
      verify(){
        if (this.userinfo.verificationCode === this.$store.state.user.verificationCode){
          console.log("++++++++++" + this.$store.state.user.verificationCode);
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .check-tel {
    display: inline-block;
    position: relative;
    .check-text {
      margin-top: 15px;
      text-align: left;
      padding-right: 120px;
    }
    .check-btn {
      position: absolute;
      top: 5px;
      right: 2px;
      z-index: 100;
    }
  }

  .next-btn {
    display: block;
    margin: 10px auto;
  }
</style>
