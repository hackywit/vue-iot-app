

//验证用户名
export function checkUserName(str) {
	 let reg=/^[a-zA-Z]\w{3,15}$/;
	 return reg.test(str);
}
//验证邮箱
 export function checkEmail(str){
 let reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
 return reg.test(str);
}

//验证手机号码
export function checkPhoneNum(str){
	let reg = /^1[0-9]{10}$/;
	return reg.test(str);
}
