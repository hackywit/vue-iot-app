import Mock from 'mockjs'

const List1 = [];
const List2 = [];
const ListA = [];
const ListB = [];
const unreceivedList = [];
const unconfirmedList = [];
const count = 20;
const count1 = 5;

for(let i=0; i< count; i++) {
	List1.push(Mock.mock({
		user_id: '@id',
		user_name: '@cname',
	}));
	List2.push(Mock.mock({
		user_id: '@id',
		user_name: '@cname',
	}));
	ListA.push(Mock.mock({
		friendName: '@cname',
		userType: 'user',
	}));
	ListB.push(Mock.mock({
		friendName: '@cname',
		userType: 'producter',
	}));
}
for(let i=0; i< count1; i++) {
	unreceivedList.push(Mock.mock({
		friendName: '@cname',
		userType: 'user',
	}));
	unconfirmedList.push(Mock.mock({
		friendName: '@cname',
		userType: 'user',
	}));
}

export default {
	addFriend: () => {
		return 'success';
	},
	getFriends: () => {
		return {
			friendList: [
				{
					groupName: '我的好友',
					friends: ListA
				},
				{
					groupName: '特殊好友',
					friends: ListB
				}
			]
		}
	},
	getUnreceivedList: () => {
		return {
			unreceivedFriendlist: unreceivedList
		}
	},
	getUnconfirmedList: () => {
		return {
			unconfirmedFriendlist: unconfirmedList
		}
	},
	receiveFriend: () => {
		return 'success';
	},
	addFriendGroup: () => {
		return 'success';
	},
	getFriendGroup: () => {
		return {
			friendGroup: [
				{
					groupId: 1,
					groupName: '我的好友'
				},
				{
					groupId: 2,
					groupName: '特殊好友'
				}
			]
		}
	},
	updateFriendGroup: () => {
		return 'success';
	}
}
