import Mock from 'mockjs'

const List = [];
const count = 20;

for(let i=0; i< count; i++) {
	List.push(Mock.mock({
		'id|+1': 0,
		device_name: '@cword(4,10)',
		monitor: '@ctitle(2,4)',
		'data|1-100': 100,
		unit: 'h',
		status: '0'
	}));
}

export default {
	getMonitorList: () => {
		return List
	},
	getAllData: () => {
		return {
			"deviceList": [
			{
				"deviceAlias": "HMI111",
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
			},
			{
				"deviceAlias": "HMI2",
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
			]
		}
	}
}

