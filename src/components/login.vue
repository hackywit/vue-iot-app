<template>
  <div class="login">
    <h3>用户登录</h3>
    <!--v-model指令实现数据的双向绑定，是个语法糖-->
    <mu-text-field label="用户名" hintText="请输入用户名" v-model="userinfo.userName"></mu-text-field>
    <br/>
    <mu-text-field label="密 码" hintText="请输入密码" type="password" v-model="userinfo.password"></mu-text-field>
    <br/>
    <mu-select-field v-model='userinfo.userType' label='请选择用户类型'>
      <mu-menu-item value='producter' title='生产设备厂商'/>
      <mu-menu-item value='user' title='用户'/>
    </mu-select-field>
    <br/>
    <mu-raised-button label="登录" class="demo-raised-button" primary @click="userlogin"/>
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
        <mu-list-item to='/getpassword/email' title="邮箱验证"/>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        //与界面逻辑的变量
        alertDialog: false,
        alertText: '',
        bottomSheet: false,

        //与界面展示数据有关的变量，由于不需要默认展示，所以初始值为空
        userinfo: {
          userType: '',
          userName: '',
          password: ''
        }
      }
    },
    methods: {
      userlogin()
      {
        //校验---密码不能为空
        if (this.userinfo.password.length <= 0) {
          this.alertDialog = true;
          this.alertText = '密码不能为空';
          return
        }
        //将界面输入框的数据分配到store中去处理，验证用户名密码是否正确
        this.$store.dispatch('userLogin', this.userinfo).then(() => {
          console.log('登录成功！');
          this.$router.push({path: '/monitor'});
        }).catch(err => {
          console.log('登录失败！');
        });
      }
      ,
      closeAlert()
      {
        this.alertDialog = false;
      }
      ,
      openBottomSheet()
      {
        this.bottomSheet = true;
      }
      ,
      closeBottomSheet()
      {
        this.bottomSheet = false;
      }
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
      //border: 1px solid red;
      &:first-child {
        float: left;
      }
      &:last-child {
        float: right;
      }
    }
  }
</style>
