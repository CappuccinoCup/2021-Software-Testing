<template>
  <v-container>
    <v-card :color="app.whiteOpacity">
      <v-card-title>
        流水交易查询
      </v-card-title>
      <v-row justify="center" no-gutters>
        <v-col cols="11">
          <v-row justify="center">
            <v-col cols="4">
              <v-text-field label="流水号" dense outlined v-model="serialNumber"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="交易账号" dense outlined v-model="transAccount"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="交易代码" dense outlined v-model="transCode"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center" no-gutters>
        <v-col cols="11">
          <v-row justify="center">
            <v-col cols="4">
              <v-menu
                v-model="startDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    label="开始日期"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4">
              <v-menu
                v-model="endDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDate"
                    label="结束日期"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="endDate"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4">
              <v-btn outlined class="mt-3 ml-5" elevation="3" plain @click="queryProds">搜索</v-btn>
              <v-btn outlined class="mt-3 ml-5" elevation="3" plain @click="queryProds">重置</v-btn>
            </v-col>
          </v-row>
        </v-col>

      </v-row>
      <v-data-table :headers="headers" :items="trans" :loading="prodsLoading" sort-by="serialNumber"
                    :items-per-page.sync="itemsPerPage" :page.sync="page" :server-items-length="totalItems">
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'QueryProds',
  data() {
    return {
      app: this.$root.$children[0],
      serialNumber: '',
      transAccount: '',
      transCode: '',
      startDate: '',
      startDateMenu: false,
      endDate: '',
      endDateMenu: false,
      itemsPerPage: 5,
      page: 1,
      totalItems: 10,
      prodsLoading: false,
      headers: [
        {text: '流水号', align: 'center', value: 'serialNumber'},
        {text: '办理机构', align: 'center', value: 'org'},
        {text: '交易类型', align: 'center', value: 'type'},
        {text: '金额', align: 'center', value: 'amount'},
        {text: '交易账号', align: 'center', value: 'account'},
        {text: '操作时间', align: 'center', value: 'opTime'}
      ],
      trans: []
    }
  },
  methods: {
    queryProds: function () {
      this.trans = [
        {
          id: 1,
          serialNumber: 'AB21210005206202103271823041',
          org: '南京分行',
          type: '柜员主管资料维护',
          amount: 500000,
          account: 6161594194842824932,
          opTime: '2021-03-27 18:23:05'
        },
        {
          id: 2,
          serialNumber: 'AB21210005208202104012343491',
          org: '南京分行',
          type: '一本通开户',
          account: 'AB2121202103251',
          opTime: '2021-03-27 18:23:05'
        },
      ];
    }
  },
  watch: {
    itemsPerPage: function () {
      this.queryProds();
    },
    page: function () {
      this.queryProds();
    }
  }
}
</script>
