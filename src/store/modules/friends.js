import {
  addFriend,
  getFriends,
  getUnreceivedList,
  getUnconfirmedList,
  receiveFriend,
  addFriendGroup,
  getFriendGroup,
  updateFriendGroup,
  delFriendGroup,
  deleteFriend
} from '@/api/main';


const friendMap = {
  state: {
    friendList: [
      {
        groupId: '',
        groupName: '',
        friends: [
          {
            friendName: '',
            userType: ''
          }
        ]
      }
    ],
    unreceivedList: [
      {
        friendName: '',
        userType: '',
        flag: false
      }
    ],	//待接受好友
    unconfirmedList: [], //待对方确认好友请求
    friendGroup: [
      {
        groupId: -1,
        groupName: ''
      }
    ],
    friendInfo: {
      friendName: '',
      userType: '',
      groupName: ''
    }
  },
  mutations: {
    SET_FRIENDLIST: (state, list) => {
      state.friendList = list;
    },
    SET_UNRECEIVED: (state, list) => {
      state.unreceivedList = list;
    },
    SET_UNCONFIRMED: (state, list) => {
      state.unconfirmedList = list;
    },
    SET_FRIENDGROUP: (state, groups) => {
      state.friendGroup = groups;
    },
    SET_FRIENDINFO: (state, infor) => {
      state.friendInfo = infor;
    }
  },

  actions: {
    addFriendGroup({commit}, data) {
      console.log("++++++++++" + data);
      return new Promise((resolve, reject) => {
        addFriendGroup(data).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    //添加好友
    addFriend({commit}, data) {
      return new Promise((resolve, reject) => {
        addFriend(data).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    getFriends({commit}) {
      return new Promise((resolve, reject) => {
        getFriends().then(response => {
          const data = response.data.friendList;
          commit('SET_FRIENDLIST', data);
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    getUnreceivedList({commit}) {
      return new Promise((resolve, reject) => {
        getUnreceivedList().then(response => {
          const data = response.data.unreceivedFriendlist;
          console.log(data);
          commit('SET_UNRECEIVED', data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    getUnconfirmedList({commit}) {
      return new Promise((resolve, reject) => {
        getUnconfirmedList().then(response => {
          const data = response.data.unconfirmedFriendlist;
          console.log(data);
          commit('SET_UNCONFIRMED', data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    //接受好友请求
    receiveFriend({commit}, data) {
      return new Promise((resolve, reject) => {
        receiveFriend(data).then(response => {
          console.log(response);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    getFriendGroup({commit}) {
      console.log('getFriendGroup');
      return new Promise((resolve, reject) => {
        getFriendGroup().then(response => {
          console.log(response);
          const data = response.data.friendGroup;
          //const data = Object.keys(response.data).map(key=> response.data[key]);
          console.log(data);
          commit('SET_FRIENDGROUP', data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    //更新好友分组
    updateFriendGroup({commit}, data) {
      return new Promise((resolve, reject) => {
        updateFriendGroup(data).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    //删除好友分组
    delFriendGroup({commit}, data){
      return new Promise((resolve, reject) => {
        delFriendGroup(data).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    //删除好友
    deleteFriend({commit}, data){
      return new Promise((resolve, reject) => {
        deleteFriend(data).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
};

export default friendMap;
