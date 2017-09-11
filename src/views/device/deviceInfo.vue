<template>
	<div class="device-info">
		<!--header-->
		<mu-appbar title='设备信息' class='header'>
			<router-link to='/devices' slot='left'>
				<mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
			</router-link>
			<mu-icon-button icon="screen_share" slot="right" ref='button' @click='share'/>
		</mu-appbar>
		<div class="page-part">
			<div class="info-item">
				<p><span>设备名称：</span> {{ deviceInfo.deviceAlias }}</p>
			</div>
			<div class="info-item">
				<p><span>设备序列号：</span> {{ deviceInfo.deviceName }} </p>
			</div>
			<div class="info-item">
				<p>
				<span>状态：</span>
				 {{ deviceInfo.status }} 
				 <mu-icon slot="right" value="cloud_done" color='green' class='device-status'/>
				</p>
			</div>
			<div class="info-item">
				<p><span>备注：</span>  </p>
			</div>
			<div class="info-item">
				<p><span>产品Key：</span> {{ deviceInfo.productKey }} </p>
			</div>
			<div class="info-item">
				<p><span>产品名称：</span> {{ deviceInfo.productName }} </p>
			</div>
			<div class="info-item">
				<p><span>设备商：</span> {{ deviceInfo.providerName }} </p>
			</div>
			<div class="info-item">
				<p><span>使用商：</span> {{ deviceInfo.userName }} </p>
			</div>
			<div class="info-item">
				<p><span>所在设备组：</span> {{ deviceInfo.groupName }} </p>
			</div>
			</br>
			<div>
				<mu-select-field v-model='updateGroup.changeGroupName' label='移动设备至' class='move-select'>
        			<mu-menu-item v-for='item in groupList' :key='item.groupName' :title='item.groupName' :value='item.groupName'></mu-menu-item>
        		</mu-select-field>
        		<mu-flat-button label="移动分组" class="demo-flat-button" primary @click='updateDeviceGroup'/>
        		<br/>
			</div>
			<div class="device-data" v-if='deviceData.state'>
				<div class="data-item" v-for='(value, key) in deviceData.state.reported' :key='key'>
					<mu-paper class="data-paper" :zDepth="5" >
        					<p>{{key}}</p>
        					<p>{{value}}</p>
        				</mu-paper>
        				<p v-for='(value1, key1) in deviceData.metadata.reported'
        					v-if='key1 === key'
        					:key='key1'>
        					{{value1.timestamp | time}}	
        				</p>
				</div>
				<!--<mu-flexbox class='flex-box' >
        			<mu-flexbox-item class='flex-item-data' v-for='(value, key) in deviceData.state.reported' :key='key'>
        				<mu-paper class="data-paper"  :zDepth="5" >
        					<p>{{key}}</p>
        					<p>{{value}}</p>
        					
        				</mu-paper>
        				<p v-for='(value1, key1) in deviceData.metadata.reported'
        					v-if='key1 === key'
        					:key='key1'>
        					{{value1.timestamp | time}}	
        				</p>
        			</mu-flexbox-item>
        		</mu-flexbox>-->
			</div>
		</div>
		<mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
	data () {
		return {
			updateGroup: {
				deviceId: '',
				changeGroupName: ''
			},
			interval: 0,
			toast: false,
			toastTimer: 0,
			toastMsg: ''
		}
	},
	created() {
		this.interval = setInterval(this.getData(), 1000);
		//this.getDeviceData();
	},
	mounted () {
		
	},
	computed:{
		deviceInfo() {
			return this.$store.state.devices.deviceinfo;
		},
		deviceData() {
			return this.$store.state.devices.deviceData;
		},
		groupList() {
			let groups = this.$store.state.devices.deviceGroup;
			//console.log(groups);
			return groups.filter(this.filterGroup);
		}	
	},
	filters: {
		time: function (timestamp) { 
			return new Date(parseInt(timestamp) * 1000).toLocaleString().substr(0,17)
		} 
	},
	methods: {
		/*back() {
			this.$router.go(-1);
			//this.$router.push({ path: '/devices' });
		},*/
		getData() {
			this.getDeviceData();
			this.getDeviceStatus();
		},
		filterGroup(groups) {
			return groups.groupName !== this.deviceInfo.groupName;
		},
		share() {
			this.$router.push({path: '/devices/share'});
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
		getDeviceData() {
			console.log(this.deviceInfo)
			this.$store.dispatch('getDeviceData', this.deviceInfo).then(() => {
				console.log('获取设备数据成功！');
			}).catch(err => {
				console.log('获取设备数据失败!');
			});
		},
		updateDeviceGroup() {
			this.updateGroup.deviceId = this.deviceInfo.deviceId;
			console.log(this.updateGroup);
			this.$store.dispatch('updateDeviceGroup', this.updateGroup).then(() => {
				console.log('更改设备组成功');
				this.getDeviceData();
				this.toastMsg = '更改设备组成功！';
				this.showToast();
			}).catch(err => {
				console.log('更改设备组失败!');
			});
		},
		showToast () {
			this.toast = true
			if (this.toastTimer) clearTimeout(this.toastTimer)
				this.toastTimer = setTimeout(() => { this.toast = false; }, 2000)
		},
		hideToast () {
			this.toast = false
			if (this.toastTimer) clearTimeout(this.toastTimer)
		},
		getDeviceStatus() {
			var data = '{ "deviceLists": [{ "productKey": "' + this.deviceInfo.productKey + '", "deviceName": "' + 
				this.deviceInfo.deviceName + '" }]}';
			this.$store.dispatch('getDeviceStatus').then(() => {
				console.log('获取设备状态');
			}).catch(err => {
				console.log('获取设备状态失败!');
			});
		}
	},
	beforeDestroy () {
		console.log('清除定时器' + this.interval);
		clearInterval(this.interval);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped> 
.select {
	text-align: left;
}
.device-info {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 200;
	background-color: #ebebeb;
	.page-part {
		padding-top: 65px;
		text-align: left;
		.info-item {
			padding-left: 15px;
			p{
				//border: 1px solid gray;
				padding-left: 10px;
				line-height: 40px;
				span {
					display: inline-block;
					width: 90px;
					text-align: right;
				}
				.device-status{
					//border: 1px solid red;
				}
			}
		}
		.move-select{
			margin-left: 20px;
			margin-right: 10px;
			width: 200px;
		}
		/*.device-data{
			.flex-box {
				border: 1px solid gray;
				.flex-item-data {
					text-align: center;
					.data-paper {
						display: inline-block;
						width: 100px;
						height: 100px;
						margin: 10px;
						text-align: center;
						background-color: #fff;//#8bc34a;
						//color: #fff;
					}
				}
			}
		}*/
		.device-data {
			.data-item {
				//border: 1px solid red;
				display: inline-block;
				margin-left: 20px;
				width: 150px;
				height: 200px;
				float: left;
			}
			.data-paper {
				width: 120px;
				height: 120px;
				text-align: center;
				p {
					line-height: 60px;
				}
			}
		}
	}
	.demo-raised-button {
		margin-top: 10px;
	}

}
</style>