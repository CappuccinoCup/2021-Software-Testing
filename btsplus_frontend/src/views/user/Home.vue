<template>
  <v-app id="home" :class="app.backgroundStyle">
    <Navigation :items="items"></Navigation>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import Navigation from "../../components/Navigation";

  export default {
    name: 'Home',
    data() {
      return {
        app: this.$root.$children[0],
        items: [
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
        ]
      }
    },
    components: {
      Navigation
    },
    methods: {
      openMyProds: function () {
        if (this.$route.path !== '/home/myprods') {
          this.$router.push({path: '/home/myprods'});
        }
      },
      openBuyProds: function () {
        if (this.$route.path !== '/home/buyprods') {
          this.$router.push({path: '/home/buyprods'});
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
