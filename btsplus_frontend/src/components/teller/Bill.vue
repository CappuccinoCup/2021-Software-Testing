<template>
  <v-container>
    <v-card :color="app.whiteOpacity">
      <v-card-title>
        贷款账户
      </v-card-title>
      <v-card-text>
        <p>
          <span class="mr-4"><b>借据号：</b>{{ this.iouNum }}</span>
          <span class="mr-4"><b>姓名：</b>{{ this.name }}</span>
          <span class="mr-4"><b>性别：</b>{{ this.sex === 0 ? "男" : "女" }}</span>
          <span class="mr-4"><b>客户号：</b>{{ this.code }}</span>
          <span class="mr-4"><b>贷款产品：</b>{{ this.productName }}</span>
          <span class="mr-4"><b>贷款产品编号：</b>{{ this.productCode }}</span>
        </p>
        <v-data-table class="elevation-3" :headers="headers" :items="bills" :loading="prodsLoading" disable-sort
                      hide-default-footer>
          <template v-slot:item.actions="{ item }">
            <!--部分还款 tooltip-->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="repayPartDialog=true" :disabled="item.status===4" class="ml-3">
                  mdi-clipboard-text-search
                </v-icon>
              </template>
              <span>部分还款</span>
            </v-tooltip>


            <!--全额还款 tooltip -->
            <v-tooltip bottom>
              <template v-slot:activator="{on, attrs}">
                <v-icon v-bind="attrs" v-on="on" @click="repayAllDialog=true" :disabled="item.status===4" class="ml-3">
                  mdi-code-greater-than-or-equal
                </v-icon>
              </template>
              <span>全额还款</span>

            </v-tooltip>

          </template>
          <template v-slot:item.remain="{ item }">
            {{ item.remainInterest + item.remainAmount + computePenalty(item) }}
          </template>

          <template v-slot:item.timeState="{ item }">
            {{ printTimeStatus(getTimeStatus(item.beginDate, item.endDate), item.status) }}
          </template>
          <template v-slot:item.state="{ item }">
            {{ getStatus(item.status) }}
          </template>


        </v-data-table>
      </v-card-text>
    </v-card>

    <!--部分还款dialog-->
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="700px"
      v-model="repayPartDialog"
    >
      <template>
        <v-card>
          <v-toolbar
            color="primary"
            dark
          >部分还款
          </v-toolbar>
          <v-card-text class="mt-5">
            <v-row>
              <v-col cols="6"><b>计划本金: </b>{{ item.planAmount }}</v-col>
              <v-col cols="6"><b>实际本金: </b>{{ item.remainAmount }}</v-col>
            </v-row>
            <v-row>
              <v-col><b>计划利息: </b>{{ item.planInterest }}</v-col>
              <v-col><b>实际利息: </b>{{ item.remainInterest }}</v-col>
            </v-row>
            <v-row>
              <v-col><b>计划总计: </b>{{ item.planAmount + item.planInterest }}</v-col>
              <v-col><b>实际总计: </b>{{ item.remainAmount + item.remainInterest }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="6"><b>罚金: </b>{{ computePenalty(item) }}</v-col>
              <v-col cols="5">
                <v-text-field label="还款金额" dense outlined v-model="partAmount"></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="accountNum" label="银行账号" append-icon="mdi-account" dense
                                  outlined></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="password" label="password" append-icon="mdi-fingerprint" dense
                                  outlined></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              text
              @click="repayPart(item)"
            >还款
            </v-btn>
            <v-btn
              text
              @click="closeRepayPartDialog"
            >取消
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <!--全额还款dialog-->
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="700px"
      v-model="repayAllDialog"
    >
      <template>
        <v-card>
          <v-toolbar
            color="primary"
            dark
          >全额还款
          </v-toolbar>
          <v-card-text class="mt-5">
            <v-row>
              <v-col cols="6"><b>计划本金: </b>{{ item.planAmount }}</v-col>
              <v-col cols="6"><b>实际本金: </b>{{ item.remainAmount }}</v-col>
            </v-row>
            <v-row>
              <v-col><b>计划利息: </b>{{ item.planInterest }}</v-col>
              <v-col><b>实际利息: </b>{{ item.remainInterest }}</v-col>
            </v-row>
            <v-row>
              <v-col><b>计划总计: </b>{{ item.planAmount + item.planInterest }}</v-col>
              <v-col><b>实际总计: </b>{{ item.remainAmount + item.remainInterest }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="6"></v-col>
              <v-col cols="6"><b>罚金: </b>{{ computePenalty(item) }}</v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12">
                <v-row>
                  <v-col cols="5">
                    <v-text-field v-model="accountNum" label="银行账号" append-icon="mdi-account" outlined
                                  dense></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field v-model="password" label="password" append-icon="mdi-fingerprint" outlined
                                  dense></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn
              text
              @click="repayAll(item)"
            >还款
            </v-btn>
            <v-btn
              text
              @click="closeRepayAllDialog"
            >取消
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

  </v-container>
</template>

<script>
export default {
  name: "Bill",
  data() {
    return {
      app: this.$root.$children[0],
      formHasErrors: false,
      iouNum: '',
      name: '',
      sex: 0,
      code: '',
      productName: '',
      productCode: '',
      accountNum: "",
      password: "",
      prodsLoading: false,
      repayPartDialog: false,
      partAmount: 0,
      repayAllDialog: false,
      headers: [
        {text: '期号', align: 'center', value: 'planNum'},
        {text: '开始时间', align: 'center', value: 'beginDate'},
        {text: '结束时间', align: 'center', value: 'endDate'},
        {text: '计划本金', align: 'center', value: 'planAmount'},
        {text: '计划利息', align: 'center', value: 'planInterest'},
        {text: '剩余', align: 'center', value: 'remain'},
        {text: '状态', align: 'center', value: 'state'},
        {text: '时间状态', align: 'center', value: 'timeState'},
        {text: '操作', align: 'center', value: 'actions'}
      ],
      bills: [],
      loan: {},
      // bills: [
      //   {
      //     "id": 67,
      //     "creator": null,
      //     "createdTime": "2021-04-03 20:17",
      //     "updatedTime": "2021-04-03 20:17",
      //     "beginDate": "2021-04-03",
      //     "endDate": "2021-05-03",
      //     "planNum": 1,
      //     "planAmount": 33222.4798,
      //     "planInterest": 333.3,
      //     "remainAmount": 33222.4798,
      //     "remainInterest": 333.3,
      //     "status": 1
      //   },
      //   {
      //     "id": 68,
      //     "creator": null,
      //     "createdTime": "2021-04-03 20:17",
      //     "updatedTime": "2021-04-03 20:17",
      //     "beginDate": "2021-05-03",
      //     "endDate": "2021-06-03",
      //     "planNum": 2,
      //     "planAmount": 33333.2103,
      //     "planInterest": 222.5695,
      //     "remainAmount": 33333.2103,
      //     "remainInterest": 222.5695,
      //     "status": 1
      //   },
      //   {
      //     "id": 69,
      //     "creator": null,
      //     "createdTime": "2021-04-03 20:17",
      //     "updatedTime": "2021-04-03 20:17",
      //     "beginDate": "2021-06-03",
      //     "endDate": "2021-07-03",
      //     "planNum": 3,
      //     "planAmount": 33444.3099,
      //     "planInterest": 111.4699,
      //     "remainAmount": 33444.3099,
      //     "remainInterest": 111.4699,
      //     "status": 1
      //   },
      // ],

      // loan: {
      //   "id": 123,
      //   "iouNum": "L2104032014071",
      //   "customer": {
      //     "id": 13,
      //     "code": "AB2121202104031",
      //     "name": "请不要侮辱二次元",
      //     "creator": null,
      //     "createdTime": "2021-04-03 19:33",
      //     "sex": 0,
      //     "phone": "13333333333",
      //     "email": "3333333@fudan.edu.cn",
      //     "address": "上海市杨浦区键盘侠只能出门右转2500号"
      //   },
      //   "creator": null,
      //   "createdTime": "2021-04-03 20:14",
      //   "loanDate": "2021-04-03",
      //   "productCode": "20005",
      //   "productName": "请键盘侠出门右转贷款",
      //   "amount": 100000,
      //   "interest": 667.3394,
      //   "total": 100667.3394
      // },
    }
  },

  computed: {},
  methods: {
    getStatus: function (type) {
      let res = "";
      switch (type) {
        case 1:
          res = "未还款，无罚金";
          break;
        case 2:
          res = "未还款，有罚金";
          break;
        case 3:
          res = "未还款，还完罚金";
          break;
        case 4:
          res = "已还款";
          break;
      }
      return res;
    },

    printTimeStatus: function (type, status) {
      let res = "";
      switch (type) {
        case 1:
          res = "未到还款时间";
          break;
        case 2:
          res = "当期";
          break;
        case 3:
          res = "逾期";
          break;
      }
      if (status === 4) {
        res = "已还完"
      }
      return res;
    },
    getTimeStatus: function (begin, end) {
      begin = begin.split('-');
      let beginYear = begin[0];
      let beginMonth = begin[1];
      let beginDate = begin[2];
      end = end.split('-');
      let endYear = end[0];
      let endMonth = end[1];
      let endDate = end[2];
      let now = this.$store.state.systemTime;
      let nowYear = now.getFullYear();
      let nowMonth = now.getMonth() + 1;
      let nowDate = now.getDate();
      if (nowYear < beginYear) {
        return 1;
      } else if (nowYear == beginYear) {
        if (nowMonth < beginMonth) {
          return 1;
        } else if (nowMonth == beginMonth && nowDate < beginDate) {
          return 1;
        }
      }
      if (nowYear > endYear) {
        return 3;
      } else if (nowYear == endYear) {
        if (nowMonth > beginMonth) {
          return 3;
        } else if (nowMonth == endMonth && nowDate > endDate) {
          return 3;
        }
      }
      return 2;
    },

    judgeAccount: function () {
      if (this.accountNum === "") {
        this.formHasErrors = true;
        this.app.message("银行账户不能为空");
      } else if (this.password === "") {
        this.formHasErrors = true;
        this.app.message("密码不能为空");
      } else {
        this.formHasErrors = false;
      }

    },

    closeRepayPartDialog: function () {
      this.clearForm();
      this.repayPartDialog = false;
    },
    closeRepayAllDialog: function () {
      this.clearForm();
      this.repayAllDialog = false;
    },
    clearForm: function () {
      this.accountNum = "";
      this.password = "";
      this.partAmount = 0;
    },
    checkPartAmount: function (item) {
      let amount = item.remainInterest + item.remainAmount + this.computePenalty(item);
      if (this.partAmount > amount) {
        this.partAmount = amount;
      }
    },

    repayPart: function (item) {
      this.judgeAccount();
      if (!this.formHasErrors) {
        let api = `/customer/loan/bill/${item.id}/payment`;
        this.$axios.put(api, {
          accountNum: this.accountNum,
          password: this.password,
          amount: this.partAmount
        }).then(resp => {
          if (resp.data.code === 200) {
            this.app.message(resp.data.message);
            this.getBills();
          } else {
            this.app.message("系统出现故障");
          }
        })
        this.closeRepayPartDialog();
      }

    },

    repayAll: function (item) {
      this.judgeAccount();
      let amount = item.remainInterest + item.remainAmount + this.computePenalty(item);
      if (!this.formHasErrors) {
        let api = `/customer/loan/bill/${item.id}/payment`;
        this.$axios.put(api, {
          accountNum: this.accountNum,
          password: this.password,
          amount: amount
        }).then(resp => {
          if (resp.data.code === 200) {
            this.app.message(resp.data.message);
            this.getBills();
          } else {
            this.app.message("系统出现故障");
          }
        })
        this.closeRepayAllDialog();
      }

    },
    computePenalty: function (item) {
      const rate = 0.05;
      if (this.getTimeStatus(item.beginDate, item.endDate) === 3) {
        return (item.remainAmount + item.remainInterest) * rate;
      }
      return 0;
    },
    getBills: function () {
      let api = `/customer/loan/${this.iouNum}/bills`;
      this.axios.get(api, {
        params: {}
      }).then(resp => {
        if (resp.data.code === 200) {
          let data = resp.data.data;
          if (data.length === 0) {
            this.app.message("该贷款账户无账单");
          } else {
            let bills = [];
            for (let i = 0; i < data.length; i++) {
              let bill = {
                id: data[i].id,
                creator: data[i].creator,
                createdTime: data[i].createdTime,
                updatedTime: data[i].updatedTime,
                beginDate: data[i].beginDate,
                endDate: data[i].endDate,
                planNum: data[i].planNum,
                planAmount: data[i].planAmount,
                planInterest: data[i].planInterest,
                remainAmount: data[i].remainAmount,
                remainInterest: data[i].remainInterest,
                status: data[i].status,
              };
              bills.push(bill);
            }
            this.bills = bills;
            this.loan = data[0].loan;
          }
        }
      })
    }
  },

  created() {
    this.iouNum = this.$route.query.iouNum;
    this.name = this.$route.query.name;
    this.sex = this.$route.query.sex;
    this.code = this.$route.query.code;
    this.productName = this.$route.query.productName;
    this.productCode = this.$route.query.productCode;
    this.getBills();
  }
}


</script>

<style scoped>

</style>
