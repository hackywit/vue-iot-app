import { login, register, getUserinfo, updatePassword } from '@/api/main';
import Cookies from 'js-cookie';

const user = {
	state: {
		userinfo: {
			userName: '',
			status: '',
			email: '',
			userId: '',
			tel: '',
			country: '',
			province: '',
			company: '',
			userType: ''
		},
		token: ''
	},
	mutations: {
		SET_USERNAME: (state, name) => {
			state.userinfo.userName = name;
		},
		SET_USERTYPE: (state, usertype) => {
			state.userinfo.usertype = usertype;
		},
		SET_USERID: (state, user_id) => {
			state.userinfo.userId = user_id;
		},
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		SET_USERINFO: (state, userinfo) => {
			state.userinfo = userinfo;
		}
	},

	actions: {
		//用户注册
		userRegister({ commit }, userinfo) {
			return new Promise((resolve, reject) => {
				register(userinfo).then(response => {
					const data = response.data;
					resolve();
				}).catch(error => {
					reject(error);
				})
			})
		},
		//用户登录
		userLogin({ commit }, userinfo) {
			return new Promise((resolve, reject) => {
				login(userinfo.userType, userinfo.userName, userinfo.password).then(response => {
					const data = response.data;
					//登录成功设置cookie字段
					Cookies.set('username', userinfo.userName, { expires: 365});
					Cookies.set('userid', data.userId, { expires: 365 });
					Cookies.set('password', userinfo.password, { expires: 365 });
					Cookies.set('usertype', userinfo.userType, { expires: 365 });
					const token = 'username=' + Cookies.get('username') +
									';password=' + Cookies.get('password') +
									';usertype=' + Cookies.get('usertype') +
									';userid=' + Cookies.get('userid');
					commit('SET_USERNAME', userinfo.userName);
					commit('SET_USERTYPE', userinfo.userType);
					commit('SET_TOKEN', token);
					resolve();
				}).catch(error => {
					reject(error);
				})
			})
		},
		//获取用户信息
		getUserinfo({ commit }) {
			return new Promise((resolve, reject) => {
				getUserinfo().then(response => {
					const data = response.data;
					console.log(data);
					commit('SET_USERINFO', data);
					resolve();
				}).catch(error => {
					console.log(error);
					reject(error);
				})
			})
		},
		updatePassword({commit}, info) {
			return new Promise((resolve, reject) => {
				updatePassword(info).then(response => {
					const data = response.data;
					console.log(data);
					resolve();
				}).catch(error => {
					console.log(error);
					reject(error);
				})
			})
		}
	}
};

export default user;
