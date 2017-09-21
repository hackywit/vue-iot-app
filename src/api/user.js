import axios from '@/utils/http'

//用户注册
export function register(data) {
	return axios({
		url: '/v1/register',
		method: 'post',
		data
	})
}

//用户登录
export function login(data) {
	return axios({
		url: '/v1/login',
		method: 'post',
		data
	});
}

//获取用户信息
export function getUserinfo() {
	return axios({
		url: '/v1/user_information',
		method: 'get'
	})
}

//修改密码
export function updatePassword(data) {
	return axios({
		url: '/v1/change_password',
		method: 'post',
		data
	});
}

export function forgetPassword(data) {
  return axios({
    url: '/v1/forget_password',
    method: 'post',
    data
  })
}

export function changeUserInfo(data) {
  return axios({
    url: '/v1/change_userinfor',
    method: 'post',
    data
  })
}
