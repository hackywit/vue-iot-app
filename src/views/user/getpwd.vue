<template>
  <div class="getpassword">
    <mu-appbar title="找回密码" class='header'>
      <router-link to='/' slot='left'>
        <mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
      </router-link>
    </mu-appbar>
    <div class="page-part">
      <mu-text-field label="用户名" hintText="请输入用户名" v-model="userinfo.userName"></mu-text-field>
      <mu-text-field v-if='getType === "tel"' 
        label="手机号码" 
        hintText="请输入手机号码"
        type='number' 
        v-model="userinfo.userName">
      </mu-text-field>
      <mu-text-field v-else label="邮箱" 
        hintText="请输入邮箱地址"
        type='email' 
        v-model="userinfo.userName">
      </mu-text-field>
      <div v-if='getType === "tel"' class="check-tel">
        <mu-text-field class='check-text' hintText="请输入验证码"/>
        <mu-raised-button :label="countDown" class="check-btn" primary @click='getTelCode' :disabled='disabled'/>
      </div>
      <div v-else='getType === "tel"' class="check-email">
        <mu-raised-button label="点击获取邮箱验证码" class="check-btn" primary @click='getEmailCode' :disabled='emailDisabled'/>
        <mu-text-field class='check-text' hintText="请输入验证码"/>
      </div>
      <mu-raised-button label="下一步" class="next-btn" primary/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      userinfo: {
        userType: 'producter',
        userName: this.$store.state.user.userinfo.userName,
        password: ''
      },
      alertDialog: false,
      alertText: '',
      getType: 'tel',
      //countDown: '获取验证码',
      count: 0,
      disabled: false,
      emailDisabled: false
    }
  },
  created() {
    this.initData();
  },
  computed: {
    /*userinfo() {
      return {
        name: this.$store.state.user.name
      }
    }*/
    countDown() {
      return this.count > 0 ? this.count + 's': '获取验证码';
    }
  },
  methods: {
    initData() {
      this.getType = this.$route.params.type;
    },
    getTelCode() {
      this.disabled = true;
      this.count = 60;
      setTimeout(this.sended, 2000);
    },
    sended() {
      this.timer();
    },
    timer() {
      if(this.count > 0) {
        this.count--;
        setTimeout(this.timer, 1000);
      } else {
        this.disabled = false;
      }
    },
    getEmailCode() {
      this.emailDisabled = true;
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
.check-email {
  .check-btn {
    margin: 5px 0;
  }
  .check-text {
    margin: 15px 0;
  }
}
.next-btn {
  display: block;
  margin: 10px auto;
}
</style>
