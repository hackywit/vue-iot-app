/**
 * Created by hackywit on 2017/9/8.
 */
import {getAllStrategies} from '@/api/strategy'

const strategy = {
  state: {
    //这边映射的时候数组是按照数组映射的，在模板中用v-for循环展示出所有的列表
    productsStrategies: [
      {
        productName: '',
        strategies: {
          strategyId: '',
          strategyName: '',
          strategy: ''
        }
      }
    ]
  },
  mutations:{
    GET_ALLSTRATEGY:(state,productsStrategies)=>{
      state.productsStrategies = productsStrategies;
    }
  },
  actions:{
    // 获取所有的设备数据,采用结构函数来传递参数，方便commit函数的调用
    getAllStrategy({commit}){
      //Promise类是ES6支持的编写回调函数处理异步顺序的简洁写法
      return new Promise((resolve, reject)=>{
        //这边需要调用获取策略数据的api函数来获取到策略信息缓存到store里面
        getAllStrategies().then(response=>{
          const data = response.data.productsStrategies;
          commit('GET_ALLSTRATEGY',data);
          console.log(data);
          //这个一定要在业务逻辑处理完毕之后调用
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
