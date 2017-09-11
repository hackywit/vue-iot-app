import { getMonitorList, getAllData } from '@/api/monitor';


const monitors = {
	state: {
		monitorInfo: {},
		list: [
		{
			id: 0,
			device_name: '',
			monitor: '',
			unit: '',
			status: 0,
			data: 0,
			switch: false
		}],
		monitorData: [
		]
	},
	mutations: {
		SET_MONITORLIST: (state, list) => {
			state.list = list;
		},
		SET_MONITORINFO: (state, infor) => {
			state.monitorInfo = infor;
		},
		SET_MONITORDATA: (state, data) => {
			state.monitorData = data;
		}
	},

	actions: {
		//获取监控数据列表
		getMonitorList({ commit }) {
			return new Promise((resolve, reject) => {
				getMonitorList().then(response => {
					console.log(response);
					const data = Object.keys(response.data).map(key=> response.data[key]);
					console.log(data);
					commit('SET_MONITORLIST', data);
					resolve();
				}).catch(error => {
					console.log(error);
					reject(error);
				})
			})
		},
		getAllData({ commit }) {
			return new Promise((resolve, reject) => {
				getAllData().then(response => {
					console.log(response);
					//const data = Object.keys(response.data).map(key=> response.data[key]);
					const data = response.data.deviceList;
					console.log(data);
					commit('SET_MONITORDATA', data);
					resolve();
				}).catch(error => {
					console.log(error);
					reject(error);
				})
			})
		}
	}
};

export default monitors;