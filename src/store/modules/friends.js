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
} from '@/api/friend';


const friend = {
  state: {
    friendList: [
      {
        groupId: '',
        groupName: '',
        friends: [
          {
            friendId:'',
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
    ],
    unconfirmedList: [],
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
    }
  },

  actions: {
    addFriendGroup({commit}, data) {
      return new Promise((resolve, reject) => {
        addFriendGroup(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    addFriend({commit}, data) {
      return new Promise((resolve, reject) => {
        addFriend(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          console.log(error);
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
          console.log(error);
          reject(error);
        })
      })
    },
    getUnreceivedList({commit}) {
      return new Promise((resolve, reject) => {
        getUnreceivedList().then(response => {
          const data = response.data.unreceivedFriendlist;
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
          commit('SET_UNCONFIRMED', data);
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    receiveFriend({commit}, data) {
      return new Promise((resolve, reject) => {
        receiveFriend(data).then(response => {
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    updateFriendGroup({commit}, data) {
      return new Promise((resolve, reject) => {
        updateFriendGroup(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    delFriendGroup({commit}, data){
      return new Promise((resolve, reject) => {
        delFriendGroup(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    deleteFriend({commit}, data){
      return new Promise((resolve, reject) => {
        deleteFriend(JSON.stringify(data)).then(response => {
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    }
  }
};

export default friend;
