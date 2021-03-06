import { login,isUserExist, register, getUserinfo, updatePassword,forgetPassword,regist_verify,changeUserInfo } from '@/api/user';
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
		},
    //错误消息提示
    error:{
		  errorNumber: 0,
      errorMessage: ''
    },
    //忘记密码相关
    verificationCode: ''
	},
	mutations: {
		SET_USERNAME: (state, name) => {
			state.userinfo.userName = name;
		},
		SET_USERINFO: (state, userinfo) => {
			state.userinfo = userinfo;
		},
		SET_ERROR: (state, errorInfo) => {
		  state.error = errorInfo;
    },
    SET_VERIFICATIONCODE: (state, verificationCode)=> {
		  state.verificationCode = verificationCode;
    }
	},

	actions: {
		//用户注册
		userRegister({ commit }, userinfo) {
			return new Promise((resolve, reject) => {
				register(userinfo).then(response => {
					resolve();
				}).catch(error => {
          let errorInfor = {};
          errorInfor.errorNumber = error.code;
          errorInfor.errorMessage = error.message;
          commit('SET_ERROR', errorInfor);
					reject(error);
				})
			})
		},
    //判断用户是否存在
    isUserExist({ commit }, data) {
      return new Promise((resolve, reject) => {
        isUserExist(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          let errorInfor = {};
          errorInfor.errorNumber = error.code;
          errorInfor.errorMessage = error.message;
          commit('SET_ERROR', errorInfor);
          reject(error);
        })
      })
    },
		//用户登录
		login({ commit }, data) {
			return new Promise((resolve, reject) => {
				login(JSON.stringify(data)).then(response => {
          // // 设置cookie字段
          // Cookies.set('username', userinfo.userName, {expires: 365});
          // Cookies.set('userid', data.userId, {expires: 365});
          // Cookies.set('usertype', userinfo.userType, {expires: 365});
          //
          // Cookies.set('path', '/', {expires: 365});
					commit('SET_USERNAME', data.userName);
					resolve();
				}).catch(error => {
				  let errorInfor = {};
				  errorInfor.errorNumber = error.code;
				  errorInfor.errorMessage = error.message;
          commit('SET_ERROR', errorInfor);
					reject(error);
				})
			})
		},
		//获取用户信息
		getUserinfo({ commit }) {
			return new Promise((resolve, reject) => {
				getUserinfo().then(response => {
					const data = response.data;
					commit('SET_USERINFO', data);
					resolve();
				}).catch(error => {
					console.log(error);
					reject(error);
				})
			})
		},
		updatePassword({commit}, data) {
			return new Promise((resolve, reject) => {
				updatePassword(JSON.stringify(data)).then(response => {
					const data = response.data;
					console.log(data);
					resolve();
				}).catch(error => {
					console.log(error);
					reject(error);
				})
			})
		},
    forgetPassword({commit}, data){
      return new Promise((resolve, reject) => {
        forgetPassword(data).then(response => {
          const data = response.data.message;
          commit('SET_VERIFICATIONCODE',data);
          resolve();
        }).catch(error => {
          let errorInfor = {};
          errorInfor.errorNumber = error.code;
          errorInfor.errorMessage = error.message;
          commit('SET_ERROR', errorInfor);
          reject(error);
        })
      })
    },
    regist_verify({commit}, data){
      return new Promise((resolve, reject) => {
        regist_verify(data).then(response => {
          const data = response.data.message;
          commit('SET_VERIFICATIONCODE',data);
          resolve();
        }).catch(error => {
          let errorInfor = {};
          errorInfor.errorNumber = error.code;
          errorInfor.errorMessage = error.message;
          commit('SET_ERROR', errorInfor);
          reject(error);
        })
      })
    },
    changeUserInfo({commit}, data){
      return new Promise((resolve, reject) => {
        changeUserInfo(data).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    }
	}
};

export default user;
