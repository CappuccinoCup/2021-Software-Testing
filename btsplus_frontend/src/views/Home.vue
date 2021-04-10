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
        if (!this.$store.state.userDetails) {
          return result;
        }
        if (this.$store.state.userDetails.role === 2) {
          result = [
            {
              name: '日终处理',
              icon: 'mdi-circle-slice-7',
              click: this.openDayEndProcess
            }
          ];
        } else if (this.$store.state.userDetails.role === 1) {
          result = [
            {
              name: '柜面还款',
              icon: 'mdi-arrow-up-bold-box-outline',
              click: this.openRepayAtCounter,
            },
            {
              name: '流水交易查询',
              icon: 'mdi-dialpad',
              click: this.openTransFlowQuery,
            },
            {
              name: '查询理财产品盈亏',
              icon: 'mdi-note',
              click: this.openQueryProds
            },
            {
              name: '购买理财产品',
              icon: 'mdi-note-plus',
              click: this.openBuyProds
            },
          ];
        }
        return result;
      }
    },
    methods: {
      openDayEndProcess: function () {
        if (this.$route.path !== '/admin/dayend') {
          this.$router.push({path: '/admin/dayend'});
        }
      },
      openRepayAtCounter: function () {
        if (this.$route.path !== 'teller/accountquery') {
          this.$router.push({path: '/teller/accountquery'});
        }
      },
      openTransFlowQuery: function () {
        if (this.$route.path !== '/teller/querytransflow') {
          this.$router.push({path: '/teller/querytransflow'});
        }
      },
      openQueryProds: function () {
        if (this.$route.path !== '/teller/queryprods') {
          this.$router.push({path: '/teller/queryprods'});
        }
      },
      openBuyProds: function () {
        if (this.$route.path !== '/teller/buyprods') {
          this.$router.push({path: '/teller/buyprods'});
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
