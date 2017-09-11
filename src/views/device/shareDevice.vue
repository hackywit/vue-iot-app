<template>
	<div class="share-device">
		<!--header-->
		<mu-appbar title='分享设备' class='header'>
			<mu-icon-button icon='clear' style='color: #fff' @click='back' slot='left'/>
			<mu-flat-button label="确定" slot='right'@click='showShare'/>
		</mu-appbar>
		<p v-if='shareGroup'>分享<router-link class="device-name" to='/devices/infor'> {{shareGroup}} </router-link> 组内所有设备给好友：</p>
		<p v-else>分享设备<router-link class="device-name" to='/devices/infor'> {{deviceInfo.deviceAlias}} </router-link>给好友: </p>
		<div class="page-part">
			<div v-for='item in friendList' :key='item.groupName'>
				<mu-sub-header>{{ item.groupName }}</mu-sub-header>
				<div v-for='sub in item.friends' :key='sub.friendName'>
					<mu-checkbox :name="item.friendName" :nativeValue="sub.friendName" v-model="friend_id" :label="sub.friendName" class="demo-checkbox"/> <br/>
				</div>
			</div>
		</div>
		 <!-- ensure share dialog -->
        <mu-dialog :open='shareDialog' title='分享' @close='cancelShare' scrollable>
        	</br>
        	<p v-if='shareGroup'>分享设备组：[{{shareGroup}}] 给</p>
        	<p v-else>分享设备：[{{deviceInfo.deviceAlias}}] 给</p>
        	<mu-menu>
        		<mu-menu-item :title="item" v-for="item, index in friend_id" :key="index"/>
        	</mu-menu>
        	<mu-flat-button slot='actions' @click='cancelShare' primary label='取消' />
        	<mu-flat-button slot='actions' @click='shareDevice' primary label='发送' />
        </mu-dialog>
        <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
	data () {
		return {
			deviceinfo: {
				device_name: '',
				serial: '',
				password: ''
			},
			deviceGroup: 0,
			list: ['我的设备'],
			friend_id: [],
			shareDialog: false,
			toast: false,
			toastTimer: 0,
			toastMsg: ''

		}
	},
	created () {
		this.$store.dispatch('getFriends')
		//this.fetchData();
	},
	mounted () {
		
	},
	computed: {
		shareGroup() {
			return this.$store.state.devices.shareDeviceGroup;
		},
		deviceInfo() {
			return this.$store.state.devices.deviceinfo;
		},
		friendList() {
			return this.$store.state.friends.friendList;
		}
	},
	methods: {
		back() {
			this.$store.commit('SET_SHAREDEVICEGROUP', '');
			this.$router.go(-1);
			//this.$router.push({ path: '/devices' });
		},
		handleToggle (key) {
			this[key] = !this[key]
		},
		addDevice() {
			console.log(this.deviceinfo);
			this.$store.dispatch('addDevice', this.deviceinfo).then(() => {
				console.log('添加设备成功！');
				this.$router.push({ path: '/devices' });
			}).catch(err => {
				console.log('添加设备失败!');
			});
		},
		showShare() {
			this.shareDialog = true;
		},
		cancelShare() {
			this.shareDialog = false;
		},
		shareDevice() {
			this.shareDevice = false;
			//this.$router.go(-1);
			var data = '';
			var beShareGroup = this.shareGroup;
			if(!beShareGroup) {
				data = '{ "deviceIdList" : [ "' + this.deviceInfo.deviceId + '" ], "besharedFriendlist" : [ ';
			} else {
				data = '{ "deviceGroupName" : "' + beShareGroup + '", "besharedFriendlist" : [ ';
			}
			for(var i=0, len=this.friend_id.length; i<len; i++) {
				var temp = '{ "beSharedUserName" : "' + this.friend_id[i] + '", "beSharedUserType": "user" }';
				//console.log(temp);
				if(i > 0) {
					data += ','
				}
				data += temp;
			}
			data += '] }';
			console.log(data);
			if(!beShareGroup) {
				this.$store.dispatch('shareDevice', data).then(() => {
					console.log('分享设备成功！');
					this.toastMsg = '分享设备(' + this.deviceInfo.deviceAlias + ')成功!';
					this.showToast();
					//this.$store.dispatch('getDevices');	
				}).catch(err => {
					this.toastMsg = '分享设备失败！';
					this.showToast();
					console.log('分享设备失败');
				})
			} else {
				this.$store.dispatch('shareDeviceGroup', data).then(() => {
					console.log('分享一组设备成功！');
					this.toastMsg = '分享设备组(' + beShareGroup + ')成功!';
					this.showToast();
					//this.$store.dispatch('getDevices');	
				}).catch(err => {
					this.toastMsg = '分享设备组失败！';
					this.showToast();
					console.log('分享设备组失败');
				})
			}
			this.$store.commit('SET_SHAREDEVICEGROUP', '');

		},
		showToast () {
			this.toast = true
			if (this.toastTimer) clearTimeout(this.toastTimer)
				this.toastTimer = setTimeout(() => { this.toast = false; this.$router.go(-1); }, 2000)
		},
		hideToast () {
			this.toast = false
			if (this.toastTimer) clearTimeout(this.toastTimer)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped> 
.select {
	text-align: left;
}
.share-device {
	overflow: hidden;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 200;
	background-color: #fff;
	p {
		position: absolute;
		top: 50px;
		left: 0;
		width: 100%;
		line-height: 40px;
		z-index: 300;
		background-color: #fff;
		border-bottom: 1px solid lightgray;
		text-align: left;
		padding-left: 14px;
	}
	.page-part {
		position: absolute;
		padding-top: 100px;
		top: 10px;
		left: 0;
		right: 0;
		bottom: 0;
		text-align: left;
		padding-left: 15px;
		padding-bottom: 2px;
		margin-bottom: 1px;
		overflow: scroll;
		//border: 1px solid red;
	}
	.device-name {
		color: #2196f3;
	}
}
</style>