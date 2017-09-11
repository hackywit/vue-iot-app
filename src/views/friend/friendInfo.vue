<template>
	<div class="new-friends">
		<!--header-->
        <mu-appbar :title='friendInfo.friendName' class='header'>
			<router-link to='/friends' slot='left'>
				<mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
			</router-link>
			<mu-icon-button icon="done" slot="right" @click='update'/>
		</mu-appbar>
		<div class="page-part">
			<div>
				<p>
					<span>好友用户名：</span>
					<span>{{ friendInfo.friendName }}</span>
					
				</p>
			</div>
			<div>
				<p>
					<span>备注：</span>
					<span> {{ friendInfo.friendName }}</span>
					<mu-icon-button tooltip="修改备注" tooltipPosition="top-right" icon="mode_edit" slot="right" class='edit-btn' touch/>
				</p>
			</div>
			<div>
				<p v-if='friendInfo.userType === "user"'><span>好友用户类型：</span> 用户</p>
				<p v-else><span>好友用户类型：</span> 设备厂商</p>
			</div>
			<div>
				<p><span>所在分组：</span> {{ friendInfo.groupName }}</p>
			</div></br>
			<div>
				<mu-select-field v-model='updateFriend.bemoveGroupName' label='移动好友至' class='move-select'>
        			<mu-menu-item v-for='item in groupList' :key='item.groupId' :title='item.groupName' :value='item.groupName'></mu-menu-item>
        		</mu-select-field></br>
			</div>
		</div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
    data () {
		return {
			updateFriend: {
				friendName: '',
				friendType: '',
				bemoveGroupName: ''
			}
		}
	},
	created () {
		this.initData();
	},
	computed: {
		friendInfo() {
			return this.$store.state.friends.friendInfo;
		},
		groupList() {
			let groups = this.$store.state.friends.friendGroup;
			return groups.filter(this.filterGroup);
		}
	},
	methods: {
		initData() {
			this.updateFriend.friendName = this.friendInfo.friendName;
			this.updateFriend.friendType = this.friendInfo.userType;
			//this.updateFriend.bemoveGroupName = this.groupList[0].groupName;
		},
		filterGroup(groups) {
			return groups.groupName !== this.friendInfo.groupName;
		},
		update() {
			this.updateFriend.friendName = this.friendInfo.friendName;
			this.updateFriend.friendType = this.friendInfo.userType;
			console.log(this.updateFriend);
			if(!this.updateFriend.bemoveGroupName) {
				console.log('好友列表不能为空');
				return;
			}
			this.$store.dispatch('updateFriendGroup', this.updateFriend).then(() => {
				console.log('更新列表成功！');
				this.$store.dispatch('getFriends');
				this.$router.push({ path: '/friends' });
			}).catch(err => {
				console.log('更新好友列表失败!');
			});
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
		padding-top: 65px;
		padding-left: 15px;
		text-align: left;
		div p{
			padding-left: 10px;
			line-height: 40px;
			//border: 1px solid red;
			span:first-child {
				//border: 1px solid green;
				display: inline-block;
				width: 100px;
				text-align: right;
			}
			.edit-btn {
				//border: 1px solid green;
				color: #2196f3;
				width: 40px;
				height: 40px;
				margin-left: 20px;
				padding: 0;
			}
		}
		div .move-select {
			margin-left: 35px;
			line-height: 40px;
			color: #000;
		}
	}
}


</style>