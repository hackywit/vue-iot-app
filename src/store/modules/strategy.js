/**
 * Created by hackywit on 2017/9/8.
 */
import common from '@/utils/common';
import {
  getDefaultStrategy,
  changeStrategy,
} from '@/api/strategy';

const strategy = {
  state: {
    //这边映射的时候数组是按照数组映射的，在模板中用v-for循环展示出所有的列表
    strategyId: '',
    strategy: [
      {
        deviceName: '',
        productKey: '',
        attributes: {}
      }
    ],
  },
  mutations: {
    GET_STRATEGY: (state, data) => {
      state.strategyId = data.strategyId;
      state.strategy = data.strategy;
    },
    SET_MONITORDATA: (state, data) => {
      let i = 0;
      let flag = 0;
      state.strategy.forEach((value) => {
        if (value.deviceName === data.deviceName && value.productKey === data.productKey) {
          flag = 1;
          value.attributes[data.attribute] = '';
        }
        i++;
        if (i === state.strategy.length && flag === 0) {
          let obj = {};
          obj.deviceName = data.deviceName;
          obj.productKey = data.productKey;
          obj.attributes = {};
          obj.attributes[data.attribute] = '';
          state.strategy.push(obj);
        }
      });
    },
    DELETE_MONITORDATA: (state, data) => {
      state.strategy.forEach((value) => {
        if (value.deviceName === data.deviceName && value.productKey === data.productKey) {
          for (let key in value.attributes) {
            if (key === data.monitorName) {
              delete value.attributes[key];
              //判断是否为空,为空则将机器的属性清空
              if (common.isObjectEmpty(value.attributes)) {
                value.deviceName = '';
                value.productKey = '';
              }
            }
          }
        }
      });
      //这边需要将空的数据元素清空
      let i = 0;
      state.strategy.forEach((value) => {
        //这边要求i!==0是为了确保第一个为空不清除,不然会出错
        if (value.deviceName === '' && i !== 0) {
          state.strategy.splice(i, 1);
        }
        i++;
      });
    }
  },
  actions: {
    // 获取所有的设备数据,采用结构函数来传递参数，方便commit函数的调用
    getDefaultStrategy({commit}){
      //Promise类是ES6支持的编写回调函数处理异步顺序的简洁写法
      return new Promise((resolve, reject) => {
        //这边需要调用获取策略数据的api函数来获取到策略信息缓存到store里面
        getDefaultStrategy().then(response => {
          const data = response.data;
          commit('GET_STRATEGY', data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    changeStrategy({commit}, data) {
      return new Promise((resolve, reject) => {
        //这边需要调用获取策略数据的api函数来获取到策略信息缓存到store里面
        changeStrategy(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    }
  }
};
export default strategy;
