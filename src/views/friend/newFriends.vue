<template>
	<div class="new-friends">
		<!--header-->
        <mu-appbar title='新的好友' class='header'>
			<router-link to='/friends' slot='left'>
				<mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
			</router-link>
		</mu-appbar>
		<div class="page-part">
			<mu-tabs :value="activeTab" @change="handleTabChange" class='tabs' >
				<mu-tab value="tab1" title="好友请求" />
				<mu-tab value="tab2" title="添加好友" />
			</mu-tabs>
			<div v-if="activeTab === 'tab1'">
				<mu-list-item  v-for='sub in unreceivedList' :key='sub.friendName' :title='sub.friendName' slot='nested'>
        			<mu-icon slot="left" value="person"/>
        			<span slot='describe'>
        				<span slot='left'>用户类型：{{sub.userType}} </span><br/>
        				<span slot='left'>请求添加你为好友</span>
        			</span>
        			<mu-raised-button slot='right' label="接受" class="receive-btn" primary @click='receiveFriend(sub.friendName, sub.userType)'/>
        		</mu-list-item>
			</div>
			<div v-if="activeTab === 'tab2'">
				<mu-list-item  v-for='sub in unconfirmedList' :key='sub.friendName' :title='sub.friendName' slot='nested'>
        			<mu-icon slot="left" value="person"/>
        			<span slot='describe'>
        				<span slot='left'>添加<span> {{sub.friendName}} </span>为好友, 等待对方确认</span>
        			</span>
        		</mu-list-item>
			</div>
		</div>
    </div>
</template>

<script>

export default {
    data () {
		return {
			activeTab: 'tab1'
		}
	},
	created () {
		this.$store.dispatch('getUnconfirmedList');
	},
	computed: {
		unreceivedList() {
			return this.$store.state.friends.unreceivedList;
		},
		unconfirmedList() {
			return this.$store.state.friends.unconfirmedList;
		}
	},
	methods: {
		handleTabChange(val) {
			this.activeTab = val;
		},
		receiveFriend(name, type) {
			var data = '{ "userName": "' + name + '", "userType": "' +  type + ' "}';
			this.$store.dispatch('receiveFriend', data).then(() => {
				console.log('添加好友成功');
				this.$store.dispatch('getFriends');
				this.$store.dispatch('getUnreceivedList');
			}).catch(err => {
				console.log('添加好友失败');
			})
		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
/*.group {
	background: #e1f5fe;
}*/
.new-friends {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 200;
	background-color: #fff;
	.page-part {
		padding-top: 60px;
		text-align: left;
		.tabs {
			background-color: #fff;
		}
		.receive-btn {
			margin-right: 20px;
		}
		.friend-name {
			color: #2196f3;
		}
	}
}

.mu-tab-link {
	color: #000;
}
.mu-tab-active {
	color: #2196f3;
}

</style>
