/**
 * Created by hackywit on 2017/10/23.
 */
const common = {
  isObjectEmpty(obj){
    for (let i in obj) {//如果不为空，则会执行到这一步，返回true
      return false;
    }
    return true;
  }
};

export default common;
