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
		SET_USERID: (state, user_id) => {
			state.userinfo.userId = user_id;
		},
		SET_EMAIL: (state, email) => {
			state.email = email;
		},
		SET_PHONE_NUMBER: (state, phone_num) => {
			state.tel = phone_num;
		},
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		SET_DEVICES: (state, devices) => {
			state.devices = devices;
		},
		SET_LOGIN: (state, login) => {
			state.login = login;
		},
		SET_COUNTRY: (state, country) => {
			state.country = country;
		},
		SET_PROVINCE: (state, province) => {
			state.province = province;
		},
		SET_COMPANY: (state, company) => {
			state.company = company;
		},
		SET_USERTYPE: (state, usertype) => {
			state.usertype = usertype;
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
					console.log(error);
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
