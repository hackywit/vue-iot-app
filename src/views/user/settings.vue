<template>
	<div class="settings">
		<!--header-->
		<mu-appbar title="我" class='header'>
			<mu-icon-button icon="settings" slot="right" ref='button' @click='onSetting'/>
		</mu-appbar>
		<!--<mu-list>
			<mu-list-item :title='userinfo.userName' disabled>
				<mu-avatar slot='leftAvatar' src="imgUrl" :iconSize='40'/>
			</mu-list-item>
		</mu-list>
		<ul class='userinfo'>
			<li>
				<p>用户名：</p>
				<p> {{userinfo.userName}} </p>
			</li>
			<li>
				<p>邮箱：</p>
				<p> {{userinfo.email}} </p>
			</li>
			<li>
				<p>手机号码：</p>
				<p> {{userinfo.tel}} </p>
			</li>
			<li>
				<p>公司名称：</p>
				<p> {{userinfo.company}} </p>
			</li>
			<li>
				<p>地址：</p>
				<p> {{userinfo.country}}, {{userinfo.province}} </p>
			</li>
			<li>
				<p>用户类型：</p>
				<p> {{userinfo.userType}} </p>
			</li>
		</ul>-->
		<br/>
    </div>
</template>

<script>
import logo from '../../assets/logo.png'
export default {
	created() {
		this.$store.dispatch('getUserinfo')
	},
	data () {
		return {
			imgUrl: logo
		}
	},
	computed: {
		userinfo() {
			return this.$store.state.user.userinfo;
		}
	},
	methods: {
		onSetting() {
			this.$router.push({ path: '/settings' });
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped> 
.router-show-enter-active,.router-show-leave-active{
	transition: all .4s;
}
.router-show-enter,.router-show-leave{
	transform:translateX(100%)
}
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
	color: #f44336;
}
</style>
