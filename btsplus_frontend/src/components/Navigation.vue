<template>
  <div id="navigation">
    <v-navigation-drawer app clipped v-model="drawer" v-if="showDrawer" :color="drawerColor">
      <v-list rounded>
        <v-subheader class="title">导航</v-subheader>

        <v-list-item link v-for="(item, index) in items" @click="item.click" :key="index">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left flat color="rgba(0, 0, 0, 0)">
      <v-app-bar-nav-icon class="d-lg-none" v-if="showDrawer" @click.stop="drawer = !drawer"/>
      <v-img src="../assets/Logo.png" alt="Logo" max-width="250px" class="d-none d-sm-flex"></v-img>
      <v-btn text @click="openStart">
        <v-toolbar-title class="headline pt-1">
          BTSplus
        </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="openStart">
        <v-icon>mdi-home-outline</v-icon>
        <div class="d-none d-md-flex">主页</div>
      </v-btn>
      <v-btn text @click="changeTheme">
        <v-icon>mdi-image-multiple</v-icon>
        <div class="d-none d-md-flex">{{app.isDark ? '亮色' : '暗色'}}</div>
      </v-btn>
      <v-btn text v-if="!hasLoggedIn" @click="openLogin">
        <v-icon>mdi-login</v-icon>
        <div class="d-none d-md-flex">登录</div>
      </v-btn>
      <v-btn text v-if="hasLoggedIn" @click="logout">
        <v-icon>mdi-login</v-icon>
        <div class="d-none d-md-flex">登出</div>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'Navigation',
    props: {
      items: {},
      showDrawer: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        app: this.$root.$children[0],
        drawer: null,
      }
    },
    computed: {
      hasLoggedIn: function () {
        return this.$store.state.token;
      },
      drawerColor: function () {
        return (this.$vuetify.breakpoint.name === 'lg' || this.$vuetify.breakpoint.name === 'xl') ?
          'rgba(255, 255, 255, 0)' : '';
      },
    },
    methods: {
      openStart: function () {
        if (!this.hasLoggedIn) {
          if (this.$route.path !== '/') {
            this.$router.push({path: '/'});
          }
        } else {
          if (this.$store.state.userDetails.authority === 'TELLER') {
            if (this.$route.path !== '/teller') {
              this.$router.push({path: '/teller'});
            }
          } else if (this.$store.state.userDetails.authority === 'CUSTOMER') {
            if (this.$route.path !== '/customer')
              this.$router.push({path: '/customer'});
          }
        }

      },
      openLogin: function () {
        this.$router.push({path: '/login'});
      },
      logout: function () {
        this.$store.commit('logout');
        this.$router.push({path: '/login'});
      },
      changeTheme: function () {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        this.$store.commit('changeTheme', this.$vuetify.theme.dark);
      }
    }
  }
</script>
