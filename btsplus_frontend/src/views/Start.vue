<template>
  <v-app id="start" :class="app.backgroundStyle">
    <Navigation data-test="nav" :show-drawer="false"></Navigation>
    <v-main>
      <v-container class="mb-12 pb-12">
        <v-row class="mt-16 mb-16" justify="center">
          <v-img src="../assets/Logo.png"
                 max-width="80%" data-test="logo"></v-img>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" md="9">
            <v-card :color="app.whiteOpacity" class="mt-3" data-test="card">
              <v-card-title class="display-1 font-weight-light" data-test="title">
                欢迎来到 BTSplus
              </v-card-title>
              <v-card-subtitle class="title font-weight-thin" data-test="subtitle">
                一个银行管理系统
              </v-card-subtitle>
              <v-card-text class="headline font-weight-light mt-5">
                BTSplus 是一个神奇的网站。
                没有人知道它是做什么用的，也没有人知道它将会变成什么样子。
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-container fluid style="z-index: 5;opacity: 0">
      <v-row>
        <a @click="openEntry1">Entry1</a>
        <v-spacer></v-spacer>
        <a @click="openEntry2">Entry2</a>
      </v-row>
    </v-container>
    <Footer></Footer>
  </v-app>
</template>

<script>
  import Navigation from '../components/Navigation'
  import Footer from "../components/Footer";

  export default {
    name: 'Start',
    data() {
      return {
        app: this.$root.$children[0]
      }
    },
    components: {
      Navigation, Footer
    },
    methods: {
      openEntry1() {
        this.$router.replace({path: '/hanako'});
      },
      openEntry2() {
        this.$router.replace({path: '/madoka'});
      }
    }
  }
</script>

<style>
  .lightBg {
    background: url("/img/light_bg.jpg") center fixed !important;
  }

  .darkBg {
    background: url("/img/dark_bg.jpg") center fixed !important;
  }
</style>
