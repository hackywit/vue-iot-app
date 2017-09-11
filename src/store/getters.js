const getters = {
  token: state => state.user.token,
  username: state => state.user.username,
  userid: state => state.user.userid,
  email: state => state.user.email,
  status: state => state.user.status,
  setting: state => state.user.setting,
};
export default getters
