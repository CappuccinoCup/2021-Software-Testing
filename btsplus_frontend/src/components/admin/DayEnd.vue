<template>
  <v-container>
    <v-card :color="app.whiteOpacity">
      <v-card-title>
        柜面还款
      </v-card-title>
    </v-card>
    <v-row justify="center" class="mt-16 pt-16">
      <v-col cols="10" md="6">
        <v-btn :color="app.whiteOpacity" block rounded min-height="100px"
               @click="dayEndProcess">
          <div class="text-h5">账号查询</div>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DayEnd',
    data() {
      return {
        app: this.$root.$children[0],
      }
    },
    methods: {
      dayEndProcess: function () {
        this.app.message('日终处理完成', 'success');
      }
    }
  }
</script>
