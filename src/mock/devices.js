import Mock from 'mockjs'

const List = [];
const List1 = [];
const count = 20;
const ListP = [];

for(let i=0; i< count; i++) {
	List.push(Mock.mock({
		deviceId: '@natural(0)',
		deviceName: '@string("upper", 10,16)',
		deviceAlias: '@ctitle(4,10)',
		deviceSecret: '@string(10)',
		providerName: '@cname()',
		userName: '@first()',
		productKey: '@string("upper", 8)',
		groupName: '',
		status: '0'
	}));
	List1.push(Mock.mock({
		deviceId: '@natural(0)',
		deviceName: '@string("upper", 10,16)',
		deviceAlias: '@ctitle(4,10)',
		deviceSecret: '@string(10)',
		providerName: '@cname()',
		userName: '@first()',
		productKey: '@string("upper", 8)',
		groupName: '@string',
		status: '0'
	}));
	ListP.push(Mock.mock({
		productKey: '@string("upper", 8)',		//
		productName: '@ctitle(4,10)',	//
		productDesc: '@csentence(10)'		//
	}));
}

export default {
	addDevice: () => {
		return 'success';
	},
	shareDevice: () => {
		return 'success';
	},
	shareDeviceGroup: () => {
		return 'success';
	},
	getDevices: () => {
		return {
			deviceLists: [
				{
					deviceGroup: '我的设备',
					deviceInformation: [
						{
							deviceId: '1',
							deviceName: 'ab',
							deviceAlias: '设备1',
							deviceSecret: 'ddddd',
							providerName: 'Mike',
							userName: 'Lily',
							productKey: 'DDDD'
							//status: ''
						},
						{
							deviceId: '2',
							deviceName: 'ac',
							deviceAlias: '设备2',
							deviceSecret: 'ddddd',
							providerName: '产品',
							userName: 'Lily1',
							productKey: 'DDDD'
							//status: ''
						},
						{
							deviceId: '3',
							deviceName: 'ad',
							deviceAlias: '设备3',
							deviceSecret: 'dddddddd',
							providerName: '产品3',
							userName: 'Lily3',
							productKey: 'DDDD'
							//status: ''
						}
					]
				}
			]
		}
	},
	getDeviceData: () => {
		return {
			"state": {
				"reported": {
					"temperature": "1001",
					"switch": "1000"
				}
			},
			"metadata": {
				"reported": {
					"temperature": {
						"timestamp": 1501837336
					},
					"switch": {
						"timestamp": 1501837336
					}
				}
			},
			"timestamp": 1501840311,
			"version": 337
		}
	},
	addDeviceGroup: () => {
		return 'success';
	},
	getDeviceGroup: () => {
		return {
			deviceGroup: [
				{
					groupName: '我的设备'
				},
				{
					groupName: '好友分享设备'
				}
			]
		}
	},
	updateDeviceGroup: () => {
		return 'success';
	},
	getProducts: () => {
		return {
			productList: [
				{
					productKey: 'KJHGGTYHH',
					productName: '产品1',
					productDesc: '产品1描述信息',
					deviceList: List,
				},
				{
					productKey: 'HUUHGHKKK',
					productName: '产品2',
					productDesc: '产品2描述信息',
					deviceList: List1,
				}
			]
		}
	},
	addProduct: () => {
		return 'success';
	},
	updateProduct: () => {
		return 'success';
	},
	deleteProduct: () => {
		return 'success';
	},
	getALLDeviceStatus: () => {
		return {
			deviceStatusList: [
				{
					deviceId: 1,
					deviceName: 'ab',
					deviceAlias: 'HMI1',
					status: 'UNACTIVE'
				},
				{
					deviceId: 2,
					deviceName: 'ac',
					deviceAlias: 'HMI2',
					status: 'OFFLINE'
				},
				{
					deviceId: 3,
					deviceName: 'ad',
					deviceAlias: 'HMI3',
					status: 'ONLINE'
				}
			]
		}
	},
	getDeviceStatus: () => {
		return {
			deviceStatusList: [
				{
					deviceId: 1,
					deviceName: 'ab',
					deviceAlias: 'HMI1',
					status: 'ONLINE'
				}
			]
		}
	}
}
