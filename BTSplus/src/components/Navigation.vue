<template>
  <div id="navigation">
    <v-app-bar app clipped-left flat color="rgba(0, 0, 0, 0)">
      <v-img :src="require('../assets/Logo.png')" alt="Logo" max-height="50px" max-width="50px"></v-img>
      <v-btn text class="d-none d-sm-flex" @click="openStart">
        <v-toolbar-title class="headline">
          CappuccinoCup
        </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="openStart">
        <v-icon>mdi-home-outline</v-icon>
        <div class="d-none d-md-flex">Home</div>
      </v-btn>
      <v-btn text @click="changeTheme">
        <v-icon>mdi-image-multiple</v-icon>
        <div class="d-none d-md-flex">{{app.isDark ? 'Light' : 'Dark'}}</div>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'Navigation',
    data() {
      return {
        app: this.$root.$children[0]
      }
    },
    methods: {
      openStart: function () {
        if (this.$route.path !== '/') {
          this.$router.push({path: '/'});
        }
      },
      changeTheme: function () {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        this.$store.commit('changeTheme', this.$vuetify.theme.dark);
      }
    }
  }
</script>
