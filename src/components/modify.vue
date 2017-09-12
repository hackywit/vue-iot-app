<template>
	<div class="modify">
		<!--header-->
		<mu-appbar :title="title" class='header'>
			<router-link to='/me' slot='left'>
				<mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
			</router-link>
		</mu-appbar>
		<div class="page-part">
			<br/>
			<mu-text-field v-if='bText == 1'
				:label="label"
				:hintText="hintText"
				:type='textType'
				v-model="newMsg">
			</mu-text-field>
			<mu-select-field v-else-if='bText == 2'
				v-model='userinfo.userType'
				label='请选择用户类型' >
				<mu-menu-item value='producter' title='生产设备厂商'/>
				<mu-menu-item value='user' title='用户'/>
			</mu-select-field>
			<div class="address" v-else>
				<mu-select-field v-model='countryIndex' label='请选择国家' @change='countryChange'>
					<mu-menu-item v-for='text, index in countryList' :key='index' :value='index' :title='text' />
				</mu-select-field>
				<mu-select-field v-model='provinceIndex' label='请选择省份'  @change='provinceChange'>
					<mu-menu-item v-for='item,index in provinceList' :key='index' :value='index' :title='item.name'/>
				</mu-select-field>
			</div>

			</br>
			<mu-raised-button label="保存" class="demo-raised-button" primary  @click="udpateInfo"/>
		</div>
		<mu-dialog :open="tipDialog" title="提示">
			修改密码成功，将退出登录
		<mu-flat-button label="确定" slot="actions" primary @click="close"/>
  </mu-dialog>
    </div>
</template>

<script>
//import logo from '../../assets/logo.png'
import { regions } from '@/utils/region'
export default {

	data() {
		return {
			title: '修改信息',
			label: '',
			hintText: '请输入',
			newMsg: '',
			bText: 1,
			textType: 'text',
			countryList: ['中国'],
			countryIndex: 0,
			provinceIndex: 8,
			country: '',
			province: '',
			tipDialog: false
		}
	},
	created() {
		this.$store.dispatch('getUserinfo');
		this.updateTitle();
	},
	computed: {
		userinfo() {
			return this.$store.state.user.userinfo;
		},
		address() {
			let data = this.userinfo.country + ' - ' +  this.userinfo.province;
			return data;
		},
		provinceList() {
			return regions;
		}

	},
	methods: {
		userlogout() {
			this.$router.push({ path: '/' });

		},
		updateTitle() {
			let info = this.$route.params.info;
			if(info === 'email') {
				this.bText = 1;
				this.textType = 'email';
				this.title = '修改邮箱';
				this.label = '新的邮箱';
				this.hintText = this.userinfo.email;
				this.newMsg = this.userinfo.email;
			} else if(info === 'tel') {
				this.bText = 1;
				this.textType = 'number';
				this.title = '修改手机号码';
				this.label = '新的手机号码';
				this.hintText = this.userinfo.tel;
				this.newMsg = this.userinfo.tel;
			} else if(info === 'company') {
				this.bText = 1;
				this.title = '修改公司';
				this.label = '新的公司名称';
				this.hintText = this.newMsg = this.userinfo.company;
			} else if(info === 'address') {
				this.bText = 3;
				this.title = '更改地址';
				this.label = '新的地址';
				this.hintText = this.newMsg = '地址';
			} else if(info === 'userType') {
				this.bText = 2;
				this.title = '更改用户类型';
				this.label = '新的用户类型'
			} else if(info === 'password') {
				this.textType = 'password';
				this.bText = 1;
				this.title = '修改密码';
				this.label = '新的密码';
			}
		},
		countryChange() {
			this.country = this.countryList[this.country];
			console.log(this.country);
		},
		provinceChange(val) {
			this.province = regions[val].name;
			console.log(this.province);
		},
		close() {
			this.tipDialog = false;
			this.$router.push({ path: '/' });
		},
		udpateInfo() {
			let info = this.$route.params.info;
			switch(info) {
				case('password'): {
					console.log('password');
					this.updatePassword();
					break;
				}
			}
		},
		updatePassword() {
			let data = '{"userName": "' + this.userinfo.userName +
				'", "userType": "' + this.userinfo.userType +
				'", "password": "' + this.newMsg + '"}';
			console.log(data);
			this.$store.dispatch('updatePassword', data).then(() => {
				console.log('修改密码成功');
				this.tipDialog = true;
			}).catch(err => {
				console.log('修改密码失败');
			});
		}
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
