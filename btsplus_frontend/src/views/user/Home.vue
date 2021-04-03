<template>
  <v-app id="home">
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
