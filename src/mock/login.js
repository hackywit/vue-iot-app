const user = {
	admin: {
		token: 'admin',
		userId: 1000001,
		email: 'admin@test.cn',
		phone_num: '15836924591'
	}
};


export default {
	register: () => {
		return 'success';
	},
	login: config => {
		console.log('mock');
		const { userName } = JSON.parse(config.body);
		console.log(userName);
		return user[userName];
	},
	getUserinfo: () => ({
		userName: 'admin',
		status: '',
		email: 'admin@test.cn',
		userId: '100001',
		tel: '18612569874',
		country: '中国',
		province: '上海',
		company: '公司名称',
		userType: 'producter',
		token: 'admin'
	}),
	updatePassword: () => {
		return 'success';
	}
};
