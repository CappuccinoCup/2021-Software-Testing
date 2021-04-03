import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    userDetails: JSON.parse(localStorage.getItem('userDetails')) || null,
    themeIsDark: localStorage.getItem('theme') === 'dark'
  },
  mutations: {
    login(state, data) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userDetails', JSON.stringify(data.userDetails));
      state.userDetails = data.userDetails;
      state.token = data.token;
    },
    logout(state) {
      // 移除token
      localStorage.removeItem('token');
      localStorage.removeItem('userDetails');
      state.userDetails = null;
      state.token = null;
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
