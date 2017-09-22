import {
  addDevice, getDevices, shareDevice, getDeviceData, shareDeviceGroup,
  addDeviceGroup, getDeviceGroup, updateDeviceGroup,
  getProducts, addProduct, updateProduct, deleteProduct,
  getDeviceStatus, getALLDeviceStatus, deleteDevice, cancelDeviceShare, delDeviceGroup
} from '@/api/device';

const devices = {
  state: {
    /**
     * 页面之间传值的变量
     */
    //productList中的选中的那个产品信息
    productInfo: {},
    productDeviceListIndex: '',

    deviceinfo: {
      deviceId: '',		//设备ID
      deviceName: '',		//设备序列号
      deviceAlias: '',	//设备别名（设备名）
      deviceSecret: '',	//设备绑定密码
      providerName: '',	//设备商名称
      userName: '',		//使用商名称
      productKey: '',		//产品key
      productName: '',	//产品名称
      shareId: '',       //分享者id
      shareName: '',     //分享者名字
      groupName: '',
      status: ''
    },
    /**
     * http请求到的数据缓存
     */
    productList: [
      {
        productKey: '',		//
        productName: '',	//
        productDesc: '',	//
        deviceList: [
          {
            deviceId: '',		//设备ID
            deviceName: '',		//设备序列号
            deviceAlias: '',	//设备别名（设备名）
            deviceSecret: '',	//设备绑定密码
            providerName: '',	//设备商名称
            userName: '',		//使用商名称
            productKey: '',		//产品key
            isSelled: '',//判断设备是否已经卖出，也就是分配到了设备组
            status: ''//设备状态
          }
        ]
      }
    ],
    deviceLists: [
      {
        deviceGroupName: '',
        deviceGroupId: '',
        deviceInformation: [
          {
            deviceId: '',		//设备ID
            deviceName: '',		//设备序列号
            deviceAlias: '',	//设备别名（设备名）
            deviceSecret: '',	//设备绑定密码
            beSharedUser: [
              {
                beSharedId: '',
                beSharedName: ''
              }
            ],
            shareId: '',       //分享者id
            shareName: '',     //分享者名字
            productKey: '',		//产品key
            productName: '',		//产品key
            status: ''
          }
        ]
      }
    ],
    deviceData: {},
  },
  mutations: {
    /**
     * 界面传值用到函数
     */
    SET_PRODUCTINFO: (state, data) => {
       state.productInfo = data;
    },
    SET_DEVICEINFO: (state, info) => {
      state.deviceinfo = info;
    },
    SET_DEVICEDATA: (state, data) => {
      state.deviceData = data;
    },
    SET_DEVICELIST: (state, list) => {
      state.deviceLists = list;
    },
    SET_PRODUCTLIST: (state, list) => {
      state.productList = list;
    },
    SET_ISSEHLLED: (state, bool) => {
      //这边要注意，不能用this.productListIndex,this是指的全局vue对象，写错就不能实现功能
      state.productList[state.productListIndex].deviceList[state.productDeviceListIndex].isSelled = bool;
    },
    UPDATE_DEVICESTATUS: (state, data) => {
      data.forEach((deviceStatus) => {
        state.deviceLists.forEach((deviceList) => {
          deviceList.deviceInformation.forEach((deviceInformation) => {
            if (deviceInformation.deviceId === deviceStatus.deviceId) {
              deviceInformation.status = deviceStatus.status;
            }
          })
        })
      });
    },
    ADD_DEVICESTATUS: (state, status) => {
      state.deviceinfo = {...state.deviceinfo, status: status};
      console.log(state.deviceinfo);
    }
  },

  actions: {
    /**
     * 无需与服务器交互数据的设值
     */
    setDeviceInfo({commit}, obj) {
      commit('SET_DEVICEINFO', obj);
    },
    /**
     * 获取服务器数据存在store中的函数
     */
    delDeviceGroup({commit}, data){
      return new Promise((resolve, reject) => {
        delDeviceGroup(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    cancelDeviceShare({commit}, data){
      return new Promise((resolve, reject) => {
        cancelDeviceShare(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    deleteDevice({commit}, deviceId){
      return new Promise((resolve, reject) => {
        const data = `{"deviceId":"${deviceId}"}`;
        deleteDevice(data).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    addDevice({commit}, data) {
      return new Promise((resolve, reject) => {
        addDevice(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    getDevices({commit}) {
      return new Promise((resolve, reject) => {
        getDevices().then(response => {
          const data = response.data.deviceLists;
          commit('SET_DEVICELIST', data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    shareDevice({commit}, data) {
      return new Promise((resolve, reject) => {
        shareDevice(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    shareDeviceGroup({commit}, data) {
      return new Promise((resolve, reject) => {
        shareDeviceGroup(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    getDeviceData({commit}, info) {
      return new Promise((resolve, reject) => {
        const addData = '{ "productKey": "' + info.productKey + '", "deviceName": "' + info.deviceName + '}';
        getDeviceData(addData).then(response => {
          console.log(response);
          const data = response.data;
          commit('SET_DEVICEDATA', data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    addDeviceGroup({commit}, data) {
      return new Promise((resolve, reject) => {
        addDeviceGroup(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    updateDeviceGroup({commit}, info) {
      return new Promise((resolve, reject) => {
        //这边是将一个对象输出为一个json格式的字符串JSON.stringify(info)
        updateDeviceGroup(info).then(response => {
          console.log(response);
          const data = response.data;
          console.log(data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    getProducts({commit}) {
      return new Promise((resolve, reject) => {
        getProducts().then(response => {
          const data = response.data.productList;
          commit('SET_PRODUCTLIST', data);
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    addProduct({commit}, name) {
      console.log(name);
      return new Promise((resolve, reject) => {
        const addData = '{ "productName": "' + name + '"}';
        console.log(addData);
        addProduct(addData).then(response => {
          console.log(response);
          const data = response.data;
          console.log(data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    updateProduct({commit}, product) {
      return new Promise((resolve, reject) => {
        const addData = '{ "productKey": "' + product.productKey + '", "newProductName": "' + product.productName + '", "newProductDesc": "' + product.productDesc + '"}';
        updateProduct(addData).then(response => {
          const data = response.data;
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    deleteProduct({commit}, key) {
      console.log(key);
      return new Promise((resolve, reject) => {
        const addData = '{ "productKey": "' + key + '"}';
        console.log(addData);
        deleteProduct(addData).then(response => {
          console.log(response);
          const data = response.data;
          console.log(data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    getALLDeviceStatus({commit}) {
      return new Promise((resolve, reject) => {
        getALLDeviceStatus().then(response => {
          const data = response.data.deviceStatusList;
          commit('UPDATE_DEVICESTATUS', data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    getDeviceStatus({commit}, info) {
      console.log(info);
      return new Promise((resolve, reject) => {
        getDeviceStatus(info).then(response => {
          console.log(response);
          const data = response.data.deviceStatusList[0];
          console.log(data);
          commit('ADD_DEVICESTATUS', data.status);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    }
  }
};

export default devices;
