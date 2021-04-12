import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    expires: localStorage.getItem('expires') || null,
    userDetails: JSON.parse(localStorage.getItem('userDetails')) || null,
    systemTime: new Date(localStorage.getItem('systemTime')) || new Date(),
    themeIsDark: localStorage.getItem('theme') === 'dark'
  },
  mutations: {
    login(state, data) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('expires', data.expires);
      state.token = data.token;
      state.expires = data.expires;
    },
    userDetails(state, userDetails) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      state.userDetails = userDetails;
    },
    systemTime(state, systemTime) {
      localStorage.setItem('systemTime', systemTime);
      state.systemTime = new Date(systemTime);
    },
    logout(state) {
      // 移除token等信息
      localStorage.removeItem('token');
      localStorage.removeItem('expires');
      localStorage.removeItem('userDetails');
      localStorage.removeItem('systemTime');
      state.token = null;
      state.expires = null;
      state.userDetails = null;
      state.systemTime = null;
    },
    changeTheme(state, isDark) {
      const theme = isDark ? 'dark' : 'light';
      localStorage.removeItem('theme');
      localStorage.setItem('theme', theme);
      state.themeIsDark = isDark;
    }
  },
  actions: {},
  modules: {}
});
