import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import friendMap from './modules/friends';
import monitors from './modules/monitor';
import devices from './modules/device';
import getters from './getters';
import strategy from './modules/strategy';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
  	selected: 'monitor',
    user,
    friendMap,
    monitors,
    devices,
    strategy
  },
  getters
});

export default store
