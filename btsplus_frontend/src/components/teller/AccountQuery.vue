<template>
  <v-container>
    <v-card :color="app.whiteOpacity">
      <v-card-title>
        柜面还款
      </v-card-title>
    </v-card>
    <v-row justify="center" class="mt-16 pt-16">
      <v-col cols="3">
        <v-dialog
          transition="dialog-bottom-transition"
          max-width="700"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn :color="app.whiteOpacity" block rounded min-height="70px"
                   v-bind="attrs"
                   v-on="on"
            >
              <div class="text-h5">账号查询</div>
            </v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >账号面板
              </v-toolbar>
              <v-card-text>
                <v-text-field full-width="" label="身份证号" class="mt-6 ml-3" dense outlined
                              v-model="IDNumber"></v-text-field>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialog.value = false & closeDialog()"
                >查找
                </v-btn>
                <v-btn
                  text
                  @click="dialog.value = false & closeDialog()"
                >取消
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AccountQuery",
  data() {
    return {
      app: this.$root.$children[0],
      IDNumber: '',
      accounts: [],
    }
  },
  methods: {
    queryAccounts: function () {

    },
    closeDialog: function () {
      this.IDNumber = "";
    }

  }
}
</script>

<style scoped>

</style>
