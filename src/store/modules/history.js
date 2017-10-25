/**
 * Created by hackywit on 2017/10/25.
 */
import {
  recordHistory,
} from '@/api/history'

const history = {
  state: {},
  mutations: {},
  actions: {
    recordHistory({commit},data){
      return new Promise((resolve, reject) => {
        recordHistory(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
  }
};
export default history;
