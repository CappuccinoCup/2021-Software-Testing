<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
      //
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
    }
  };
</script>
