import axios from '@/utils/http'


/* 获取用户所有设备列表 */
//注册设备
export function addDevice(data) {
	return axios({
		url: '/v1/register_devices',
		method: 'post',
		data
	})
}

//获取所有设备信息
export function getDevices(token) {
	return axios({
		url: '/v1/devices',
		method: 'get',
		params: { token }
	});
}
//分享设备
export function shareDevice(data) {
	return axios({
		url: '/v1/sharedevice',
		method: 'post',
		data
	})
}
export function shareDeviceGroup(data) {
	return axios({
		url: '/v1/share_group_device',
		method: 'post',
		data
	})
}
//获取设备数据
export function getDeviceData(data) {
	return axios({
		url: '/v1/device_data',
		method: 'post',
		data
	})
}
export function addDeviceGroup(data) {
	return axios({
		url: '/v1/add_device_group',
		method: 'post',
		data
	})
}
export function getDeviceGroup(token) {
	return axios({
		url: '/v1/deviceGroup',
		method: 'get',
		params: { token }
	});
}
export function updateDeviceGroup(data) {
	return axios({
		url: '/v1/change_group',
		method: 'post',
		data
	})
}
export function addProduct(data) {
	return axios({
		url: '/v1/add_product',
		method: 'post',
		data
	})
}
export function getProducts(token) {
	return axios({
		url: '/v1/products',
		method: 'get',
		params: { token }
	});
}
export function updateProduct(data) {
	return axios({
		url: '/v1/modify_product',
		method: 'post',
		data
	})
}
export function deleteProduct(data) {
	return axios({
		url: '/v1/delete_product',
		method: 'post',
		data
	})
}
export function getALLDeviceStatus(token) {
	return axios({
		url: '/v1/alldevice_status',
		method: 'get',
		params: { token }
	});
}
export function getDeviceStatus(data) {
	return axios({
		url: '/v1/devices_status',
		method: 'post',
		data
	})
}
