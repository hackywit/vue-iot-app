<template>
	<div class="settings">
		<!--header-->
		<mu-appbar title="我" class='header'>
			<!--<router-link to='/me' slot='left'>
				<mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
			</router-link>-->
		</mu-appbar>
		<div class="page-part">
			<mu-list>
				<mu-list-item title='用户名' :afterText='userinfo.userName'>
					<!--<mu-icon-menu slot="right" icon="keyboard_arrow_right"></mu-icon-menu>-->
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
				<mu-list-item title='用户类型' :afterText='userinfo.userType === "user" ? "普通用户" : "生产设备厂商"' to='/user/userType'>
					<mu-icon-menu slot="right" icon="keyboard_arrow_right"></mu-icon-menu>
				</mu-list-item>
				<mu-list-item title='修改密码' to='/user/password'>
					<mu-icon-menu slot="right" icon="keyboard_arrow_right"></mu-icon-menu>
				</mu-list-item>
			</mu-list>
		</div>
		<mu-flat-button label="退出当前账号" class="demo-flat-button" secondary  @click="showlogout"/>
		<mu-bottom-sheet :open='open' @close='close'>
			<mu-list @itemClick='close'>
				<mu-list-item :titleClass='logout' title='退出当前账号' @click='userlogout' />
				<mu-list-item title='取消' />
			</mu-list>
		</mu-bottom-sheet>
    </div>
</template>

<script>
//import logo from '../../assets/logo.png'
export default {
	created() {
		this.$store.dispatch('getUserinfo')
	},
	data () {
		return {
			open: false,
			//imgUrl: logo,
			logout: 'logout'
		}
	},
	computed: {
		userinfo() {
			return this.$store.state.user.userinfo;
		},
		address() {
			let data = this.userinfo.country + ' - ' +  this.userinfo.province;
			return data;
		}
	},
	methods: {
		userlogout() {
			this.$router.push({ path: '/' });

		},
		close () {
			this.open = false;
		},
		showlogout() {
			console.log(this.userinfo);
			this.open = true;
			//console.log(this.imgUrl);
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
