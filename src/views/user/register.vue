<template>
  <div class="register">
    <mu-appbar title='注册账号' class='header'>
      <mu-icon-button slot='left' icon='keyboard_arrow_left' style='color: #fff' @click="this.history.back()"/>
    </mu-appbar>
    <div class="page-part">
      <mu-text-field label="用户名" hintText="请输入用户名" v-model="userinfo.userName"></mu-text-field>
      <br/>
      <mu-text-field label="密码" hintText="请输入密码" type="password" v-model="userinfo.password"></mu-text-field>
      <br/>
      <mu-text-field label="确认密码" hintText="请再次确认密码" type="password" v-model="retypePwd"></mu-text-field>
      <br/>
      <div class="address">
        <mu-select-field v-model='userinfo.country' label='请选择国家'>
          <mu-menu-item v-for='text, index in countryList' :key='index' :value='text' :title='text'/>
        </mu-select-field>
        <mu-select-field v-model='userinfo.province' label='请选择省份'>
          <mu-menu-item v-for='item,index in provinceList' :key='item' :value='item.name' :title='item.name'/>
        </mu-select-field>
      </div>
      <mu-text-field label="手机号" hintText="请输入手机号" v-model="userinfo.tel"></mu-text-field>
      <br/>
      <mu-text-field label="邮箱" hintText="请输入邮箱" type="email" v-model="userinfo.email"></mu-text-field>
      <br/>
      <mu-text-field label="公司名" hintText="请输入公司名称" v-model="userinfo.company"></mu-text-field>
      <br/>
      <mu-select-field v-model='userinfo.userType' label='请选择用户类型'>
        <mu-menu-item value='producter' title='生产设备厂商'/>
        <mu-menu-item value='user' title='用户'/>
      </mu-select-field>
    </div>
    <mu-raised-button label="提交注册信息" class="demo-raised-button" primary @click="userRegister"/>
    <br/><br/><br/>
    <mu-dialog :open="alertDialog" v-if="alertDialog" :showHide="alertDialog" title="提示">
      <p>{{ alertText }}</p>
      <mu-flat-button label="确定" slot="actions" primary @click="closeAlert"/>
    </mu-dialog>
  </div>
</template>

<script>
  import {regions} from '@/utils/region'
  import {checkUserName, checkEmail, checkPhoneNum} from '@/utils/validate'
  export default {
    name: 'register',
    data () {
      return {
        /**
         * 界面布局相关变量
         */
        alertDialog: false,
        /**
         * v-model相关变量
         */
        userinfo: {
          userName: '',
          password: '',
          country: '',
          province: '',
          company: '',
          tel: '',
          email: '',
          userType: ''
        },
        retypePwd: '',
        /**
         * 界面展示数据相关变量
         */
        //自定义的展示变量
        alertText: '',
        countryList: ['中国'],
        provinceList: []
      }
    },
    created(){
      //初始化data中的变量
      this.provinceList = regions;
      this.userinfo.country = '中国';
      this.userinfo.province = '上海';
    },
    methods: {
      /**
       * 窗口的打开和关闭
       */
      closeAlert() {
        this.alertDialog = false;
      },
      /**
       * 与store的数据交互
       */
      //用户注册账户
      userRegister() {
        if (!this.checkUserInput()) {
          this.alertDialog = true;
          return;
        }
        this.$store.dispatch('userRegister', this.userinfo).then(() => {
          this.$router.go(-1);
        }).catch(err => {
          this.alertDialog = true;
          this.alertText = this.$store.state.user.error.errorMessage;
        });
      },
      /**
       * 本地工具函数，减少单个函数的代码量
       */
      checkUserInput() {
        if (!checkUserName(this.userinfo.userName)) {
          this.alertText = '请输入正确的用户名';
          return;
        }
        if (this.userinfo.password.length < 6) {
          this.alertText = '密码不能小于6位';
          return
        }
        if (this.userinfo.password !== this.retypePwd) {
          this.alertText = '两次输入的密码不一致,请重新输入';
          return;
        }
        if (!checkPhoneNum(this.userinfo.tel)) {
          this.alertText = '请输入合法的手机号码';
          return;
        }
        if (!checkEmail(this.userinfo.email)) {
          this.alertText = '请输入合法的邮箱地址';
          return;
        }
        return true;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .regTop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .address .mu-select-field {
    padding-left: 0;
    display: inline-block;
    width: 126px;
  }

  .mu-text-field {
    height: 40px;
  }
</style>
