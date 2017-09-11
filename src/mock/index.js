import Mock from 'mockjs'
import loginAPI from './login'
import monitorAPI from './monitor'
import friendAPI from './friends'
import deviceAPI from './devices'
import strategyAPI from './strategy'
//
//
// //登录相关
// Mock.mock(/\/v1\/register/, 'post', loginAPI.register)
// Mock.mock(/\/v1\/login/, 'post', loginAPI.login)
// Mock.mock(/\/v1\/user_information/, 'get', loginAPI.getUserinfo);
// Mock.mock(/\/v1\/change_password/, 'post', loginAPI.updatePassword)
//
// //监控数据
// Mock.mock(/\/v1\/monitor/, 'get', monitorAPI.getMonitorList)
//
// Mock.mock(/\/v1\/alldevice_data/, 'get', monitorAPI.getAllData)
//
//
// //获取好友列表
// Mock.mock(/\/v1\/addfriend/, 'post', friendAPI.addFriend)
// Mock.mock(/\/v1\/friendlist/, 'get', friendAPI.getFriends)
// Mock.mock(/\/v1\/unreceived_friendlist/, 'get', friendAPI.getUnreceivedList)
// Mock.mock(/\/v1\/unconfirmed_friendlist/, 'get', friendAPI.getUnconfirmedList)
// Mock.mock(/\/v1\/receivefriend/, 'post', friendAPI.receiveFriend)
// Mock.mock(/\/v1\/addfriendgroup/, 'post', friendAPI.addFriendGroup)
// Mock.mock(/\/v1\/getfriendgroup/, 'get', friendAPI.getFriendGroup)
// Mock.mock(/\/v1\/movefriendgroup/, 'post', friendAPI.updateFriendGroup)
//
// //注册设备
// Mock.mock(/\/v1\/register_devices/, 'post', deviceAPI.addDevice)
// Mock.mock(/\/v1\/devices/, 'get', deviceAPI.getDevices)
// Mock.mock(/\/v1\/sharedevice/, 'post', deviceAPI.shareDevice)
// Mock.mock(/\/v1\/share_group_device/, 'post', deviceAPI.shareDevice)
// Mock.mock(/\/v1\/device_data/, 'post', deviceAPI.getDeviceData)
// Mock.mock(/\/v1\/add_device_group/, 'post', deviceAPI.addDeviceGroup)
// Mock.mock(/\/v1\/deviceGroup/, 'get', deviceAPI.getDeviceGroup)
// Mock.mock(/\/v1\/change_group/, 'post', deviceAPI.updateDeviceGroup)
// Mock.mock(/\/v1\/products/, 'get', deviceAPI.getProducts)
// Mock.mock(/\/v1\/add_product/, 'post', deviceAPI.addProduct)
// Mock.mock(/\/v1\/modify_product/, 'post', deviceAPI.updateProduct)
// Mock.mock(/\/v1\/delete_product/, 'post', deviceAPI.deleteProduct)
// Mock.mock(/\/v1\/alldevice_status/, 'get', deviceAPI.getALLDeviceStatus)
// Mock.mock(/\/v1\/devices_status/, 'post', deviceAPI.getDeviceStatus)
//
// 获取策略
// Mock.mock(/\/v1\/getall_strategy/, 'get', strategyAPI.getAllStrategy);
export default Mock;
