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
              <v-text-field label="交易账号" ref="accountNum"
                            dense rounded outlined v-model="accountNum"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="流水号" ref="transactionNum"
                            dense rounded outlined v-model="transactionNum"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="交易代码" ref="transactionCode"
                            dense rounded outlined v-model="transactionCode"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center" no-gutters>
        <v-col cols="11">
          <v-row justify="center">
            <v-col cols="4">
              <v-menu v-model="startDateMenu" :close-on-content-click="false" :nudge-right="50"
                      transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="beginDate" label="开始日期" ref="beginDate"
                                prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="beginDate"
                               @input="startDateMenu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4">
              <v-menu v-model="endDateMenu" :close-on-content-click="false" :nudge-right="50"
                      transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="endDate" label="结束日期" ref="endDate"
                                prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="endDate"
                               @input="endDateMenu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4">
              <v-btn outlined class="mt-3 ml-5" elevation="3" plain @click="queryProds">搜索</v-btn>
              <v-btn outlined class="mt-3 ml-5" elevation="3" plain @click="resetForm">重置</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="trans" :loading="prodsLoading" disable-sort
                    :items-per-page.sync="itemsPerPage" :page.sync="page">
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'QueryTransFlow',
    data() {
      return {
        app: this.$root.$children[0],
        refs: ['accountNum', 'transactionNum', 'transactionCode', 'beginDate', 'endDate'],
        accountNum: '',
        transactionNum: '',
        transactionCode: '',
        beginDate: '',
        startDateMenu: false,
        endDate: '',
        endDateMenu: false,
        itemsPerPage: 5,
        page: 1,
        prodsLoading: false,
        headers: [
          {text: '交易账号', align: 'center', value: 'account.accountNum'},
          {text: '流水号', align: 'center', value: 'transactionNum'},
          {text: '交易代码', align: 'center', value: 'transactionCode'},
          {text: '交易类型', align: 'center', value: 'transactionType'},
          {text: '金额', align: 'center', value: 'amount'},
          {text: '余额', align: 'center', value: 'balance'},
          {text: '操作时间', align: 'center', value: 'operatedTime'}
        ],
        trans: []
      }
    },
    methods: {
      queryProds: function () {
        this.app.overlay = true;
        this.$axios.get('/transactions', {
          params: {
            pageNum: this.page,
            pageSize: this.itemsPerPage,
            accountNum: this.accountNum === '' ? null : this.accountNum,
            transactionNum: this.transactionNum === '' ? null : this.transactionNum,
            transactionCode: this.transactionCode === '' ? null : this.transactionCode,
            beginDate: this.beginDate === '' ? null : this.beginDate,
            endDate: this.endDate === '' ? null : this.endDate
          }
        })
          .then(resp => {
            if (resp.data.code === 200) {
              this.trans = resp.data.data;
            }
            this.app.overlay = false;
          })
          .catch(() => {
            this.app.message('获取交易流水失败', 'error');
            this.app.overlay = false;
          })
      },
      resetForm: function () {
        this.refs.forEach(e => {
          this.$refs[e].reset();
        })
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
