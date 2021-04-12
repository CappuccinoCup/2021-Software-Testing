<template>
  <v-app>
    <!-- 全局 overlay 以及 snackbar，用来跨页面为用户提示消息 -->
    <!-- 使用的方法：通过 this.$root.$children[0] 在其它组件中获得 App.vue 组件的对象 -->
    <v-overlay :value="overlay" z-index="500">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="showSnackbar" :timeout="2000" :color="snackbarType" top>
      {{ snackbarMessage }}
    </v-snackbar>

    <router-view/>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
      overlay: false,
      showSnackbar: false,
      snackbarMessage: '',
      snackbarType: ''
    }),
    computed: {
      isDark: function () {
        // 判断是否是深色主题
        return this.$vuetify.theme.dark;
      },
      whiteOpacity: function () {
        // 用来调整组件在不同主题下的透明度
        return this.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)';
      },
      backgroundStyle: function () {
        // 调整背景图片
        return this.isDark ? 'darkBg' : 'lightBg';
      }
    },
    methods: {
      message(message, type) {
        this.showSnackbar = true;
        this.snackbarMessage = message;
        this.snackbarType = type;
      },
      getTime() {
        // 从后端获取系统时间，如果未登录则不获取
        if (this.$store.state.token) {
          this.$axios.get('/system/time')
            .then(resp => {
              if (resp.data.code === 200) {
                this.$store.commit('systemTime', new Date(resp.data.data));
              } else {
                this.$store.commit('systemTime', new Date());
              }
            })
            .catch(() => {
              this.$store.commit('systemTime', new Date());
            });
        }
        setTimeout(() => {
          this.getTime();
        }, 60000)
      },
      updateToken() {
        // 如果当前时间大于 expires 中保存的过期时间，
        // 则直接退出登录
        if (this.$store.state.token && this.$store.state.expires) {
          let expires = new Date(this.$store.state.expires);
          let now = this.$store.state.systemTime;
          if (now && now >= expires) {
            this.$store.commit("logout");
          }
        }
        setTimeout(() => {
          this.updateToken();
        }, 60000)
      }
    },
    mounted() {
      this.getTime();
      this.updateToken();
    }
  };
</script>
