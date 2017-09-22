<template>
  <div class="modify">
    <!--header-->
    <mu-appbar :title="title" class='header'>
      <!--<router-link to='/me' slot='left'>-->
      <mu-icon-button slot='left' icon='keyboard_arrow_left' style='color: #fff' @click="this.history.back()"/>
      <!--</router-link>-->
    </mu-appbar>
    <div class="page-part">
      <br/>
      <mu-text-field v-if='bText == 1' :label="label" :hintText="hintText" :type='textType' v-model="textMsg">
      </mu-text-field>
      <div v-else>
        <mu-select-field v-model='countryIndex' label='请选择国家'>
          <mu-menu-item v-for='(text, index) in countryList' :key='index' :value='index' :title='text'/>
        </mu-select-field>
        <br/>
        <mu-select-field v-model='provinceIndex' label='请选择省份'>
          <mu-menu-item v-for='(item, index) in provinceList' :key='index' :value='index' :title='item.name'/>
        </mu-select-field>
      </div>
      <br/>
      <mu-raised-button label="保存" class="demo-raised-button" primary @click="udpateInfo"/>
    </div>
    <mu-dialog :open="tipDialog" title="提示">
      修改密码成功，将退出登录
      <mu-flat-button label="确定" slot="actions" primary @click="close"/>
    </mu-dialog>
  </div>
</template>

<script>
  import {regions} from '@/utils/region'
  export default {

    data() {
      return {
        //界面布局相关的变量
        title: '',//模板bar的标题
        label: '',//btext为1界面的文本框提示
        hintText: '', //btext为1界面的文本框标头
        textMsg: '', //界面元素
        bText: 1, //控制界面布局的
        textType: '',//文本框类型
        tipDialog: false,

        //界面数据初始化需要的变量
        countryList: ['中国'], //TODO:这边没有国外的省份数据，暂时只有国内
        provinceList: [],
        //从后台获取到的初始化数据
        userInfo: {
          userName: '',
          status: '',
          email: '',
          userId: '',
          tel: '',
          country: '',
          province: '',
          company: '',
          userType: ''
        },

        //v-model变量，随用户操作实时变化
        countryIndex: 0,
        provinceIndex: 8,
      }
    },
    created() {
      this.provinceList = regions;
      this.userInfo = this.$store.state.user.userinfo;
      this.updateTitle();
    },
    computed: {
      userinfo() {
        return this.$store.state.user.userinfo;
      },
    },
    methods: {
      /**
       * 界面初始化相关
       */
      updateTitle() {
        let info = this.$route.params.info;
        switch (info) {
          case('email'): {
            this.bText = 1;
            this.textType = 'email';
            this.title = '修改邮箱';
            this.label = '新的邮箱';
            this.hintText = this.userinfo.email;
            this.newMsg = this.userinfo.email;
            break;
          }
          case ('tel'): {
            this.bText = 1;
            this.textType = 'text';
            this.title = '修改手机号码';
            this.label = '新的手机号码';
            this.hintText = this.userinfo.tel;
            this.newMsg = this.userinfo.tel;
            break;
          }
          case ('company'): {
            this.bText = 1;
            this.title = '修改公司';
            this.label = '新的公司名称';
            this.hintText = this.newMsg = this.userinfo.company;
            break;
          }
          case ('address'): {
            this.bText = 3;
            this.title = '更改地址';
            this.label = '新的地址';
            this.hintText = this.newMsg = '地址';
            break;
          }
          case ('password'): {
            this.textType = 'password';
            this.bText = 1;
            this.title = '修改密码';
            this.label = '新的密码';
            break;
          }
        }
      },
      /**
       * 界面退出相关函数
       */
      close() {
        this.tipDialog = false;
        this.$router.push({path: '/'});
      },
      /**
       * 与后端通信的具体函数
       */
      //更改密码
      updatePassword() {
        let data = '{"userName": "' + this.userinfo.userName +
          '", "userType": "' + this.userinfo.userType +
          '", "password": "' + this.newMsg + '"}';
        this.$store.dispatch('updatePassword', data).then(() => {
          console.log('修改密码成功');
          this.tipDialog = true;
        }).catch(err => {
          console.log('修改密码失败');
        });
      },
      //更改用户信息
      changeUserInfo(country, province, company, tel, email){
        let postObj = {};
        postObj.country = country;
        postObj.province = province;
        postObj.company = company;
        postObj.tel = tel;
        postObj.email = email;
        this.$store.dispatch('changeUserInfo', JSON.stringify(postObj));
      },
      /**
       * 前后端交互的实施函数
       */
      udpateInfo() {
        let info = this.$route.params.info;
        switch (info) {
          case('email'): {
            this.userInfo.email = this.textMsg;
            this.changeUserInfo(this.userInfo.country, this.userInfo.province, this.userInfo.company, this.userInfo.tel, this.userInfo.email);
            this.$router.go(-1);
            break;
          }
          case ('tel'): {
            this.userInfo.tel = this.textMsg;
            this.changeUserInfo(this.userInfo.country, this.userInfo.province, this.userInfo.company, this.userInfo.tel, this.userInfo.email);
            this.$router.go(-1);
            break;
          }
          case ('company'): {
            this.userInfo.company = this.textMsg;
            this.changeUserInfo(this.userInfo.country, this.userInfo.province, this.userInfo.company, this.userInfo.tel, this.userInfo.email);
            this.$router.go(-1);
            break;
          }
          case ('address'): {
            this.userInfo.country = this.countryList[this.countryIndex];
            this.userInfo.province = this.provinceList[this.provinceIndex].name;
            this.changeUserInfo(this.userInfo.country, this.userInfo.province, this.userInfo.company, this.userInfo.tel, this.userInfo.email);
            this.$router.go(-1);
            break;
          }
          case('password'): {
            this.updatePassword();
            break;
          }
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
        //border: 1px solid red;
        display: inline-block;
        width: 75px;
        text-align: right;
      }
      :last-child {
        //border: 1px solid red;
        display: inline-block;
        width: 200px;
        margin-left: 5px;
      }
    }
  }

  .logout {
    //color: #f44336;
    color: red;
  }
</style>
