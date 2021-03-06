import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import friend from './modules/friends';
import monitors from './modules/monitor';
import devices from './modules/device';
import getters from './getters';
import strategy from './modules/strategy';
import history from './modules/history';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
  	selected: 'monitor',
    user,
    friend,
    monitors,
    devices,
    strategy,
    history,
  },
  getters
});

export default store
