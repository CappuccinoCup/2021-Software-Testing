<template>
  <v-app id="home" :class="app.backgroundStyle">
    <Navigation :items="items"></Navigation>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import Navigation from "../components/Navigation";

  export default {
    name: 'Home',
    data() {
      return {
        app: this.$root.$children[0],
      }
    },
    components: {
      Navigation
    },
    computed: {
      items: function () {
        let result = [];
        if (this.$store.state.userDetails.authority === 'TELLER') {
          result = [
            {
              name: '日终处理',
              icon: 'mdi-circle-slice-7',
              click: this.openDayEndProcess
            }
          ];
        } else if (this.$store.state.userDetails.authority === 'CUSTOMER') {
          result = [
            {
              name: '我的理财产品',
              icon: 'mdi-note',
              click: this.openMyProds
            },
            {
              name: '购买理财产品',
              icon: 'mdi-note-plus',
              click: this.openBuyProds
            }
          ];
        }
        return result;
      }
    },
    methods: {
      openDayEndProcess: function () {
        if (this.$route.path !== '/teller/dayend') {
          this.$router.push({path: '/teller/dayend'});
        }
      },
      openMyProds: function () {
        if (this.$route.path !== '/customer/myprods') {
          this.$router.push({path: '/customer/myprods'});
        }
      },
      openBuyProds: function () {
        if (this.$route.path !== '/customer/buyprods') {
          this.$router.push({path: '/customer/buyprods'});
        }
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
