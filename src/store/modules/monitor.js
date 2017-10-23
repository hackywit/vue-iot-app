import {getAllData, deviceUpdateData} from '@/api/monitor';
import common from '@/utils/common';

const monitors = {
  state: {
    /*界面交互需要的变量*/
    monitorData: [
      {
        deviceName: '',
        productKey: '',
        attributes: {}
      }
    ],
    /**
     * http请求获取到的变量
     */
    allMonitorData: [
      {
        deviceAlias: "",
        deviceName: "",
        productKey: "",
        productName: "",
        state: {
          reported: {}
        },
        metadata: {
          reported: {}
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
    SET_MONITORINFO: (state, data) => {
      state.monitorInfo = data;
    },
    SET_ALLMONITORDATA: (state, data) => {
      state.allMonitorData = data;
    },
    /*界面间的变量通信*/
    SET_MONITORDATA: (state, data) => {
      let i = 0;
      let flag = 0;
      state.monitorData.forEach((value) => {
        if (value.deviceName === data.deviceName && value.productKey === data.productKey) {
          flag = 1;
          value.attributes[data.attribute] = '';
        }
        i++;
        if (i === state.monitorData.length && flag === 0) {
          let obj = {};
          obj.deviceName = data.deviceName;
          obj.productKey = data.productKey;
          obj.attributes = {};
          obj.attributes[data.attribute] = '';
          state.monitorData.push(obj);
        }
      })
    },
    DELETE_MONITORDATA: (state, data) => {
      state.monitorData.forEach((value) => {
        if (value.deviceName === data.deviceName && value.productKey === data.productKey) {
          for (let key in value.attributes) {
            if (key === data.monitorName) {
              delete value.attributes[key];
              //判断是否为空,为空则将机器的属性清空
              if (common.isObjectEmpty(value.attributes)){
                value.deviceName = '';
                value.productKey = '';
              }
            }
          }
        }
      });
      //这边需要将空的数据元素清空
      let i = 0;
      state.monitorData.forEach((value) => {
        //这边要求i!==0是为了确保第一个为空不清除,不然会出错
        if (value.deviceName === '' && i !== 0) {
          state.monitorData.splice(i,1);
        }
        i++;
      });
    }
  },

  actions: {
    getAllData({commit}) {
      return new Promise((resolve, reject) => {
        getAllData().then(response => {
          const data = response.data.deviceList;
          commit('SET_ALLMONITORDATA', data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    deviceUpdateData({commit}, data){
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
