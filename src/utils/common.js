/**
 * Created by hackywit on 2017/10/23.
 */
import base64 from '@/utils/base64';
const common = {
  isObjectEmpty(obj){
    for (let i in obj) {//如果不为空，则会执行到这一步，返回true
      return false;
    }
    return true;
  },
  getAttributeWord(attribute){
    let attributeKey = base64.decode(attribute);
    let arr = attributeKey.split("_",2); //按照_分割为最多2个元素
    return arr[0];
  },
  getAttributeUnit(attribute){
    let attributeKey = base64.decode(attribute);
    let arr = attributeKey.split("_",2); //按照_分割为最多2个元素
    return arr[1];
  },
};
export default common;
