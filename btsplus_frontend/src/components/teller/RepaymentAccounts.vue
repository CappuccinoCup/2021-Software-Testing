<template>
  <v-container>
    <v-card :color="app.whiteOpacity">
      <v-card-title>
        贷款账户
      </v-card-title>
      <v-card-text>
        <p>
          <span class="mr-4"><b>客户名：</b>{{ this.customer.name }}</span>
          <span class="mr-4"><b>性别：</b>{{ (this.customer === {}) ? "" : (this.customer.sex === 0 ? "男" : "女") }}</span>
          <span class="mr-4"><b>客户号：</b>{{ this.customer.code }}</span>
        </p>
        <v-data-table class="elevation-3" :headers="headers" :items="accounts" :loading="prodsLoading" disable-sort
                      hide-default-footer>
          <template v-slot:item.actions="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="viewBill(item)" class="ml-3">
                  mdi-clipboard-text-search
                </v-icon>
              </template>
              <span>查看账单</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'QueryProds',
  data() {
    return {
      app: this.$root.$children[0],
      dialogRepayAll: false,
      dialogRepayPart: false,
      itemsPerPage: 5,
      page: 1,
      totalItems: 10,
      prodsLoading: false,
      headers: [
        {text: '借据号', align: 'center', value: 'iouNum'},
        {text: '贷款产品', align: 'center', value: 'productName'},
        {text: '贷款产品编码', align: 'center', value: 'productCode'},
        {text: '发放日期', align: 'center', value: 'loanDate'},
        {text: '操作', align: 'center', value: 'actions'}
      ],
      accounts: [],
      customer: {},
      // accounts: [{
      //   "id": 123,
      //   "iouNum": "L2104032014071",
      //   "creator": null,
      //   "createdTime": "2021-04-03 20:14",
      //   "loanDate": "2021-04-03",
      //   "productCode": "20005",
      //   "productName": "请键盘侠出门右转贷款",
      //   "amount": 100000,
      //   "interest": 667.3394,
      //   "total": 100667.3394
      // },
      //   {
      //     "id": 321,
      //     "iouNum": "L2104031952191",
      //     "creator": null,
      //     "createdTime": "2021-04-03 19:52",
      //     "loanDate": "2021-04-03",
      //     "productCode": "20001",
      //     "productName": "买房贷款",
      //     "amount": 20000,
      //     "interest": 66.66,
      //     "total": 20066.66
      //   }],
      // customer: {
      //   "id": 13,
      //   "code": "AB2121202104031",
      //   "name": "请不要侮辱二次元",
      //   "creator": null,
      //   "createdTime": "2021-04-03 19:33",
      //   "sex": 0,
      //   "phone": "13333333333",
      //   "email": "3333333@fudan.edu.cn",
      //   "address": "上海市杨浦区键盘侠只能出门右转2500号"
      // },
    }
  },
  methods: {

    viewBill: function (item) {
      // let api = `/customer/loan/${this.iouNum}/bills`;
      // this.axios.get(api,{
      //   params:{}
      // }).then(resp=>{
      //   if(resp.data.code===200){
      //     let data=resp.data.data;
      //     if(data)
      //   }
      // })
      this.$router.push({
        path: '/teller/bill',
        name: 'Bill',
        query: {
          iouNum: item.iouNum,
          name: this.customer.name,
          sex: this.customer.sex,
          code: this.customer.code,
          productName: this.productName,
          productCode: this.productCode
        }
      })
    }
  },
  created() {
    this.customerCode = this.$route.query.customerCode;
    let api = `/customer/${this.customerCode}/loans`;
    this.$axios.get(api, {
      params: {}
    }).then(resp => {
      if (resp.data.code === 200) {
        let data = resp.data.data;
        //console.log(data);
        if (data.length === 0) {
          this.app.message('目前没有贷款账户');
          this.customer = {};
          this.accounts = [];
        } else {
          let customer = data[0].customer;
          let accounts = [];
          for (let i = 0; i < data.length; i++) {
            let account = {
              id: data[i].id,
              iouNum: data[i].iouNum,
              creator: data[i].creator,
              createdTime: data[i].createdTime,
              loanDate: data[i].loanDate,
              productCode: data[i].productCode,
              productName: data[i].productName,
              amount: data[i].amount,
              interest: data[i].interest,
              total: data[i].total
            };
            accounts.push(account)
          }
          this.accounts = accounts;
          this.customer = customer;
        }
      }
    })
    // this.accounts = this.$route.params.accounts;
    // this.customer = this.$route.params.customer;
  }
}
</script>
