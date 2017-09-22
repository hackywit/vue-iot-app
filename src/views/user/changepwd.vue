<template>
	<div class="settings">
		<!--header-->
		<mu-appbar title="修改密码" class='header'>
			<router-link to='/me' slot='left'>
				<mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
			</router-link>
		</mu-appbar>
		<div class="page-part">
			<mu-text-field label="新密码" hintText="请输入新密码" v-model="userinfo.userName"></mu-text-field><br/>
		</div>
    </div>
</template>

<script>
import logo from '../../../static/logo.png'
export default {
	created() {
		this.$store.dispatch('getUserinfo')
	},
	data () {
		return {
			open: false,
			imgUrl: logo,
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
			console.log(this.imgUrl);
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
