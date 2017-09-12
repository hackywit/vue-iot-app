<template>
	<div class="add-device">
		<mu-appbar :title='productName' class='header'>
			<router-link to='/devices' slot='left'>
				<mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
			</router-link>
		</mu-appbar>
		<div class="page-part">
			<mu-text-field label="设备名称" hintText="请输入设备名称" v-model="deviceinfo.device_name"></mu-text-field><br/>
			<mu-text-field label="设备序列号" hintText="请输入设备序列号" v-model="deviceinfo.serial"></mu-text-field><br/>
		</div>
		<mu-raised-button label="添加设备" class="demo-raised-button" primary @click='addDevice'/>
    </div>
</template>

<script>
export default {
	data () {
		return {
      //从父组件得到的数据,由于不需要计算更新，直接获取一次就直接用了
      productName: this.$store.state.devices.productList[this.$store.state.devices.productListIndex].productName,
      //需要post过去的数据
			deviceinfo: {
				device_name: '',
				serial: '',
				productKey: this.$store.state.devices.productList[this.$store.state.devices.productListIndex].productKey
			}
		}
	},
	methods: {
		addDevice() {
			this.$store.dispatch('addDevice', this.deviceinfo).then(() => {
				this.$store.dispatch('getProducts');
				this.$router.push({ path: '/devices/product/list' });
			}).catch(err => {
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.select {
	text-align: left;
}
.add-device {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 200;
	background-color: #fff;
	.page-part {
		padding-top: 62px;
	}
}
</style>
