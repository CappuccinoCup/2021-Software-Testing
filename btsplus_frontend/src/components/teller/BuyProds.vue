<template>
  <v-container>

    <v-dialog v-model="stockDialog" overlay-opacity="0.9" width="700px">
      <v-card shaped>
        <v-card-title>
          购买股票
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="stockForm" class="ma-7 mb-n5">
            <v-text-field v-model="stockAccountNum" label="银行账户/存折号" ref="stockAccountNum" outlined
                          :rules="[() => !!stockAccountNum || '请输入银行账户/存折号']"></v-text-field>
            <v-text-field v-model="stockPassword" label="密码" outlined type="password"
                          ref="stockPassword" :rules="[() => !!stockPassword || '请输入密码']"></v-text-field>
            <v-text-field v-model="stockCount" label="购买数量" outlined :error-messages="countError"
                          ref="stockCount" :rules="[() => !!stockCount || '请输入购买数量']"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cancel('stock')">取消</v-btn>
          <v-btn color="primary" @click="buyProd('stock')">购买</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="fundDialog" overlay-opacity="0.9" width="700px">
      <v-card shaped>
        <v-card-title>
          购买基金
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="fundForm" class="ma-7 mb-n5">
            <v-text-field v-model="fundAccountNum" label="银行账户/存折号" ref="fundAccountNum" outlined
                          :rules="[() => !!fundAccountNum || '请输入银行账户/存折号']"></v-text-field>
            <v-text-field v-model="fundPassword" label="密码" outlined type="password"
                          ref="fundPassword" :rules="[() => !!fundPassword || '请输入密码']"></v-text-field>
            <v-text-field v-model="fundAmount" label="金额" outlined :error-messages="fundAmountError"
                          ref="fundAmount" :rules="[() => !!fundAmount || '请输入购买金额']"></v-text-field>
            <v-text-field v-model="fundPeriod" label="购买时间，如 2-0-1 表示 2年1天" outlined
                          :error-messages="fundPeriodError"
                          ref="fundPeriod" :rules="[() => !!fundPeriod || '请输入购买时间']"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cancel('fund')">取消</v-btn>
          <v-btn color="primary" @click="buyProd('fund')">购买</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="termDialog" overlay-opacity="0.9" width="700px">
      <v-card shaped>
        <v-card-title>
          购买定期理财产品
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="termForm" class="ma-7 mb-n5">
            <v-text-field v-model="termAccountNum" label="银行账户/存折号" ref="termAccountNum" outlined
                          :rules="[() => !!termAccountNum || '请输入银行账户/存折号']"></v-text-field>
            <v-text-field v-model="termPassword" label="密码" outlined type="password"
                          ref="termPassword" :rules="[() => !!termPassword || '请输入密码']"></v-text-field>
            <v-text-field v-model="termAmount" label="金额" outlined :error-messages="termAmountError"
                          ref="termAmount" :rules="[() => !!termAmount || '请输入购买金额']"></v-text-field>
            <v-text-field v-model="termPeriod" label="购买时间，如 2-0-1 表示 2年1天" outlined
                          :error-messages="termPeriodError"
                          ref="termPeriod" :rules="[() => !!termPeriod || '请输入购买时间']"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cancel('term')">取消</v-btn>
          <v-btn color="primary" @click="buyProd('term')">购买</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card :color="app.whiteOpacity">
      <v-card-title>
        购买理财产品
      </v-card-title>
    </v-card>
    <v-tabs v-model="tab" fixed-tabs>
      <v-tab v-for="type in types" :key="type.name" @click="changeTab(type.id)">
        {{type.name}}
      </v-tab>
    </v-tabs>
    <v-data-table :headers="headers" :items="wmprods" :loading="prodsLoading"
                  disable-sort hide-default-footer>
      <template v-slot:item.actions="{ item }">
        <v-btn text color="blue" @click="buy(item.product.id)">购买</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    name: 'BuyProds',
    data() {
      return {
        app: this.$root.$children[0],
        // 标签页
        tab: 0,
        tabProds: ['stock', 'fund', 'term'],
        // 数据表格
        prodsLoading: false,
        types: [
          {id: 0, name: '股票'},
          {id: 1, name: '基金'},
          {id: 2, name: '定期理财产品'}
        ],
        headers: [
          {text: '产品名', align: 'center', value: 'product.name'},
          {text: '创建时间', align: 'center', value: 'product.createdTime'},
          {text: '单价', align: 'center', value: 'daily.price'},
          {text: '利率', align: 'center', value: 'daily.rate'},
          {text: '日期', align: 'center', value: 'daily.date'},
          {text: '', value: 'actions'}
        ],
        wmprods: [],
        // 对话框
        stockDialog: false,
        fundDialog: false,
        termDialog: false,
        // 选中的购买产品
        prodId: -1,
        // 前端表单验证
        formHasErrors: false,
        stockRefs: ['stockAccountNum', 'stockPassword', 'stockCount'],
        fundRefs: ['fundAccountNum', 'fundPassword', 'fundAmount', 'fundPeriod'],
        termRefs: ['termAccountNum', 'termPassword', 'termAmount', 'termPeriod'],
        countError: '',
        fundAmountError: '',
        fundPeriodError: '',
        termAmountError: '',
        termPeriodError: '',
        // 股票购买
        stockAccountNum: '',
        stockPassword: '',
        stockCount: null,
        // 基金购买
        fundAccountNum: '',
        fundPassword: '',
        fundAmount: null,
        fundPeriod: null,
        // 定期理财产品购买
        termAccountNum: '',
        termPassword: '',
        termAmount: null,
        termPeriod: null
      }
    },
    computed: {
      stockForm: function () {
        return {
          accountNum: this.stockAccountNum,
          password: this.stockPassword,
          count: this.stockCount
        }
      },
      fundForm: function () {
        return {
          accountNum: this.fundAccountNum,
          password: this.fundPassword,
          amount: this.fundAmount,
          period: this.fundPeriod
        }
      },
      termForm: function () {
        return {
          accountNum: this.termAccountNum,
          password: this.termPassword,
          amount: this.termAmount,
          period: this.termPeriod
        }
      }
    },
    methods: {
      changeTab: function (id) {
        this.getProds(this.tabProds[id]);
      },
      getProds: function (prodType) {
        this.app.overlay = true;
        let url = '/financial/' + prodType;
        this.$axios.get(url)
          .then(resp => {
            if (resp.data.code === 200) {
              this.wmprods = resp.data.data;
            }
            this.app.overlay = false;
          })
          .catch(() => {
            this.app.message('获取产品信息失败', 'error');
            this.app.overlay = false;
          });
      },
      buy: function (id) {
        this.prodId = id;
        if (this.tab === 0) {
          this.stockDialog = true;
        } else if (this.tab === 1) {
          this.fundDialog = true;
        } else if (this.tab === 2) {
          this.termDialog = true;
        }
      },
      buyProd: function (prodType) {
        if (this.app.overlay === true) {
          return;
        }
        let form = {};
        let refs = [];
        if (prodType === 'stock') {
          form = this.stockForm;
          refs = this.stockRefs;
        } else if (prodType === 'fund') {
          form = this.fundForm;
          refs = this.fundRefs;
        } else if (prodType === 'term') {
          form = this.termForm;
          refs = this.termRefs;
        }

        // 前端验证
        this.formHasErrors = false;
        refs.forEach(e => {
          this.$refs[e].validate(true);
          if (!this.$refs[e].valid) {
            this.formHasErrors = true;
          }
        });
        if (this.stockCount && !(/^[1-9]\d*$/.test(this.stockCount))) {
          this.countError = '请输入正整数';
          this.formHasErrors = true;
        } else {
          this.countError = '';
        }
        if ((this.fundAmount && !(/^\d+(\.\d+)?$/.test(this.fundAmount)))) {
          this.fundAmountError = '请输入非负浮点数';
          this.formHasErrors = true;
        } else {
          this.fundAmountError = '';
        }
        if (this.fundPeriod && !(/^\d+-\d+-\d+$/.test(this.fundPeriod))) {
          this.fundPeriodError = '请输入正确的购买时间格式，如 2-1-1 表示2年1月1天';
          this.formHasErrors = true;
        } else {
          this.fundPeriodError = '';
        }
        if (this.termAmount && !(/^\d+(\.\d+)?$/.test(this.termAmount))) {
          this.termAmountError = '请输入非负浮点数';
          this.formHasErrors = true;
        } else {
          this.termAmountError = '';
        }
        if (this.termPeriod && !(/^\d+-\d+-\d+$/.test(this.termPeriod))) {
          this.termPeriodError = '请输入正确的购买时间格式，如 2-1-1 表示2年1月1天';
          this.formHasErrors = true;
        } else {
          this.termPeriodError = '';
        }

        if (!this.formHasErrors) {
          this.app.overlay = true;
          let url = '/financial/' + prodType + '/' + this.prodId + '/purchase';
          this.$axios.post(url, form)
            .then(() => {
              this.app.message('购买成功！', 'success');
              this.app.overlay = false;
            })
            .catch(() => {
              this.app.message('购买失败！', 'error');
              this.app.overlay = false;
            })
        }
      },
      resetForm(refs) {
        this.formHasErrors = false;
        refs.forEach((e) => {
          this.$refs[e].reset();
        })
      },
      cancel: function (prodType) {
        if (prodType === 'stock') {
          this.stockDialog = false;
          this.resetForm(this.stockRefs);
          this.countError = '';
        } else if (prodType === 'fund') {
          this.fundDialog = false;
          this.resetForm(this.fundRefs);
          this.fundAmountError = '';
          this.fundPeriodError = '';
        } else if (prodType === 'term') {
          this.termDialog = false;
          this.resetForm(this.termRefs);
          this.termAmountError = '';
          this.termPeriodError = '';
        }
      }
    },
    mounted() {
      this.getProds('stock');
    }
  }
</script>
