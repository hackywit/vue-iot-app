import { getAllData,deviceUpdateData } from '@/api/monitor';


const monitors = {
	state: {
	  /**
	   * http请求获取到的变量
	   */
		monitorData:  [
      {
        deviceAlias: "",
        deviceName: "",
        productKey: "",
        productName: "",
        state: {
          reported: {
          }
        },
        metadata: {
          reported: {
          }
        },
        timestamp: 0,
        version: 0
      }
    ],
    /**
     * 界面间传递数据的变量
     */
    monitorInfo: {},
  },
	mutations: {
		SET_MONITORINFO: (state, infor) => {
			state.monitorInfo = infor;
		},
		SET_MONITORDATA: (state, data) => {
			state.monitorData = data;
		}
	},

	actions: {
		getAllData({ commit }) {
			return new Promise((resolve, reject) => {
				getAllData().then(response => {
					const data = response.data.deviceList;
          console.log(data);
					commit('SET_MONITORDATA', data);
					resolve();
				}).catch(error => {
          console.log(error);
					reject(error);
				})
			})
		},
    deviceUpdateData({ commit }, data){
      console.log(data);
      return new Promise((resolve, reject) => {
        deviceUpdateData(data).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    }
	}
};

export default monitors;
