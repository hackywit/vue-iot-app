import axios from '@/utils/http'


//获取监控数据列表
export function getMonitorList() {
	return axios({
		url: '/v1/monitor',
		method: 'get'
	})
}
export function getAllData() {
	return axios({
		url: '/v1/alldevice_data',
		method: 'get'
	})
}
