<template>
  <v-container>
    <v-row justify="center" class="mt-12">
      <v-img src="../assets/Logo.png" max-width="80%"></v-img>
    </v-row>
    <v-row justify="center" class="mt-12">
      <v-col cols="9">
        <v-card :color="app.whiteOpacity">
          <v-card-title class="display-1 font-weight-light">
            您好, 亲爱的 <br class="d-md-none">{{username}} {{userType}}
          </v-card-title>
          <v-card-subtitle class="title font-weight-thin"></v-card-subtitle>
          <v-card-text class="headline font-weight-light">BTSplus 是一个奇妙的网站。
            它似乎每日每夜都在成长，但没有人确切地知道它将会变成什么样子……
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HomeDefault',
    props: {
      userType: String
    },
    data() {
      return {
        app: this.$root.$children[0]
      }
    },
    computed: {
      username: function () {
        return this.$store.state.userDetails ? this.$store.state.userDetails.username : '友人A';
      }
    }
  }
</script>
