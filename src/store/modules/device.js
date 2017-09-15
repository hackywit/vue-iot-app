import {
  addDevice, getDevices, shareDevice, getDeviceData, shareDeviceGroup,
  addDeviceGroup, getDeviceGroup, updateDeviceGroup,
  getProducts, addProduct, updateProduct, deleteProduct,
  getDeviceStatus, getALLDeviceStatus, deleteDevice,cancelDeviceShare, delDeviceGroup
} from '@/api/device';

const devices = {
  state: {
    //本地页面间的传值变量
    productListIndex: '',
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
      groupName: '',
      status: ''
    },
    deviceData: {},
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
            productKey: '',		//产品key
            status: ''
          }
        ]
      }
    ],
    deviceGroup: [
      {
        groupName: ''
      }
    ],
    shareDeviceGroup: '',
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
            isSelled: ''//判断设备是否已经卖出，也就是分配到了设备组
          }
        ]
      }
    ],
    product: {}
  },
  mutations: {
    SET_DEVICEINFO: (state, info) => {
      state.deviceinfo = info;
    },
    SET_DEVICEDATA: (state, data) => {
      state.deviceData = data;
    },
    SET_GROUPNAME: (state, name) => {
      state.deviceinfo.groupName = name;
    },
    SET_DEVICELIST: (state, list) => {
      state.deviceLists = list;
    },
    SET_DEVICEGROUP: (state, group) => {
      state.deviceGroup = group;
    },
    SET_PRODUCTLIST: (state, list) => {
      state.productList = list;
    },
    SET_SHAREDEVICEGROUP: (state, group) => {
      state.shareDeviceGroup = group;
    },
    SET_ISSEHLLED: (state, bool) => {
      //这边要注意，不能用this.productListIndex,this是指的全局vue对象，写错就不能实现功能
      state.productList[state.productListIndex].deviceList[state.productDeviceListIndex].isSelled = bool;
    },
    UPDATE_DEVICESTATUS: (state, status) => {
      console.log(status);
      status.forEach((p) => {
        console.log('forEach(p):' + p.deviceName);
        state.deviceLists.forEach((list) => {
          list.deviceInformation.forEach((pd) => {
            console.log(pd);
            console.log(pd.deviceName);
            console.log('p:' + p.deviceName);
            if (p.deviceName === pd.deviceName) {
              pd.status = p.status;
            }
            console.log(pd.status);
          })
        })
      });
      console.log(state.deviceLists);
      state.deviceLists = state.deviceLists.sort();
    },
    ADD_DEVICESTATUS: (state, status) => {
      state.deviceinfo = {...state.deviceinfo, status: status};
      console.log(state.deviceinfo);
    }
  },

  actions: {
    //删除设备组
    delDeviceGroup({commit}, data){
      return new Promise((resolve, reject) => {
        delDeviceGroup(data).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },

    //取消设备分享
    cancelDeviceShare({commit}, data){
      return new Promise((resolve, reject) => {
        cancelDeviceShare(data).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },

    //删除设备
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

    //注册设备
    addDevice({commit}, deviceinfo) {
      console.log(deviceinfo);
      return new Promise((resolve, reject) => {
        const addData = '{ "productKey": "' + deviceinfo.productKey +
          '", "deviceLists":[  {"deviceName": "' + deviceinfo.serial +
          '", "deviceAlias": "' + deviceinfo.device_name + '"}]}';
        console.log(addData);
        addDevice(addData).then(response => {
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
    //查看用户拥有设备
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
    setDeviceInfo({commit}, obj) {
      console.log(obj);
      commit('SET_DEVICEINFO', obj.deviceinfo);
      commit('SET_GROUPNAME', obj.groupName);
    },
    //分享设备
    shareDevice({commit}, data) {
      commit('SET_SHAREDEVICEGROUP', '');
      return new Promise((resolve, reject) => {
        shareDevice(data).then(response => {
          console.log(response);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    shareDeviceGroup({commit}, data) {
      return new Promise((resolve, reject) => {
        shareDeviceGroup(data).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    //获取设备数据
    getDeviceData({commit}, info) {
      return new Promise((resolve, reject) => {
        const addData = '{ "productKey": "' + info.productKey + '", "deviceName": "' + info.deviceName + '}';
        //console.log(addData);
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
    addDeviceGroup({commit}, name) {
      return new Promise((resolve, reject) => {
        const addData = `{ "deviceGroupName": "${name}"}`;
        console.log("------------------------" + addData);
        addDeviceGroup(addData).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    getDeviceGroup({commit}) {
      return new Promise((resolve, reject) => {
        getDeviceGroup().then(response => {
          console.log(response);
          const data = response.data.deviceGroup;
          console.log(data);
          commit('SET_DEVICEGROUP', data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    updateDeviceGroup({commit}, info) {
      return new Promise((resolve, reject) => {
        //这边是将一个对象输出为一个json格式的字符串JSON.stringify(info)
        updateDeviceGroup(JSON.stringify(info)).then(response => {
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
          console.log(response);
          const data = response.data.deviceStatusList;
          //const data = Object.keys(response.data).map(key=> response.data[key]);
          //alert(data instanceof Array);
          console.log(data);
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
