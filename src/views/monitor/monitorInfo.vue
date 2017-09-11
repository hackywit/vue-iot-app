<template>
	<div class="monitor-info">
		<!--header-->
		<mu-appbar title='详细信息' class='header'>
			<router-link to='/monitor' slot='left'>
				<mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
			</router-link>
		</mu-appbar>
		<div class="page-part">
			<!--<mu-text-field label="监控数据名称" hintText="请输入监控数据名称" v-model="deviceinfo.device_name"></mu-text-field></br>
			<mu-text-field label="设备序列号" hintText="请输入设备序列号" v-model="deviceinfo.serial"></mu-text-field></br>
			<mu-text-field label="设备密码" hintText="请输入设备密码" type="password" v-model="deviceinfo.password"></mu-text-field></br>
			<mu-select-field class='select' v-model="deviceGroup" label="请选择设备组">
				<mu-menu-item v-for='text,index in list' :key='index' :value='index' :title='text' />
			</mu-select-field>-->
			<div>
				<p><span>监控点名称：</span> {{ monitorInfo.monitor }}</p>
			</div>
			<div>
				<p><span>所属设备名称：</span> {{ monitorInfo.device_name }}</p>
			</div>
			<div>
				<p><span>监控点状态：</span> {{ monitorInfo.status }}</p>
			</div>
			<div>
				<p><span>数据：</span> {{ monitorInfo.data }}{{monitorInfo.unit}}  </p>
			</div>
			<div>
				<p>
					<span>开关：</span>
					<mu-switch v-model="monitorInfo.switch" class="monitor-switch" />
				</p>
			</div>
		</div>
		<mu-raised-button label="保存" class="demo-raised-button" primary @click='addDevice'/>
    </div>
</template>

<script>
export default {
	data () {
		return {
			deviceinfo: {
				id: 0,
				device_name: '',
				monitor: '',
				unit: '',
				status: 0,
				data: 0,
				switch: false
			},
			deviceGroup: 0,
			list: ['我的设备', '上海设备', '北京设备']
		}
	},
	mounted () {
		
	},
	computed: {
		monitorInfo() {
			return this.$store.state.monitors.monitorInfo;
		}
	},
	methods: {
		/*back() {
			this.$router.go(-1);
			//this.$router.push({ path: '/devices' });
		},*/
		addDevice() {
			console.log(deviceinfo);
			this.$store.dispatch('addDevice', this.deviceinfo).then(() => {
				console.log('添加设备成功！');
				this.$router.push({ path: '/devices' });
			}).catch(err => {
				console.log('添加设备失败!');
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped> 
.monitor-info {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 200;
	background: #ebebeb;
	.page-part {
		padding-top: 65px;
		padding-left: 15px;
		text-align: left;
		div p{
			padding-left: 10px;
			line-height: 40px;
			//border: 1px solid red;
			span {
				//border: 1px solid green;
				display: inline-block;
				width: 100px;
				text-align: right;
			}
		}
	}
}
</style>