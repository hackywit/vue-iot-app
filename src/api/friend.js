/**
 * Created by hackywit on 2017/9/21.
 */
import axios from '@/utils/http'

/* 获取好友列表信息 */
export function getFriends() {
  return axios({
    url: '/v1/friendlist',
    method: 'get'
  })
}

//添加好友
export function addFriend(data) {
  return axios({
    url: '/v1/addfriend',
    method: 'post',
    data
  })
}

//获取待接受好友列表
export function getUnreceivedList() {
  return axios({
    url: '/v1/unreceived_friendlist',
    method: 'get'
  })
}

//获取待对方确认的好友列表
export function getUnconfirmedList() {
  return axios({
    url: '/v1/unconfirmed_friendlist',
    method: 'get'
  })
}
//接受好友请求
export function receiveFriend(data) {
  return axios({
    url: '/v1/receivefriend',
    method: 'post',
    data
  })
}

//添加好友分组
export function addFriendGroup(data) {
  return axios({
    url: '/v1/addfriendgroup',
    method: 'post',
    data
  })
}

//获取好友列表
export function getFriendGroup() {
  return axios({
    url: '/v1/getfriendgroup',
    method: 'get'
  })
}

//更新好友分组
export function updateFriendGroup(data) {
  return axios({
    url: '/v1/movefriendgroup',
    method: 'post',
    data
  })
}

export function delFriendGroup(data) {
  return axios({
    url: '/v1/delete_friendgroup',
    method: 'post',
    data
  })
}

export function deleteFriend(data) {
  return axios({
    url: '/v1/delete_friend',
    method: 'post',
    data
  })
}
