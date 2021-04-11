<template>
  <v-container>
    <v-card :color="app.whiteOpacity">
      <v-card-title>
        查询理财产品盈亏
      </v-card-title>
      <v-row justify="center">
        <v-col cols="8">
          <v-text-field label="请输入用户号" rounded outlined v-model="customerCode"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn outlined class="mt-2 ml-5" @click="queryProds(tab)">查询</v-btn>
        </v-col>
      </v-row>
      <v-tabs v-model="tab" fixed-tabs>
        <v-tab v-for="type in types" :key="type.name" @click="changeTab(type.id)">
          {{type.name}}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-data-table :headers="stockHeaders" :items="wmprods" :loading="prodsLoading"
                        disable-sort hide-default-footer>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-data-table :headers="fundHeaders" :items="wmprods" :loading="prodsLoading"
                        disable-sort hide-default-footer>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-data-table :headers="termHeaders" :items="wmprods" :loading="prodsLoading"
                        disable-sort hide-default-footer>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'QueryProds',
    data() {
      return {
        app: this.$root.$children[0],
        customerCode: '',
        tab: 0,
        tabProds: ['stocks', 'funds', 'terms'],
        prodsLoading: false,
        types: [
          {id: 0, name: '股票'},
          {id: 1, name: '基金'},
          {id: 2, name: '定期理财产品'}
        ],
        stockHeaders: [
          {text: '产品名', align: 'center', value: 'product.name'},
          {text: '购买日期', value: 'purchase.beginDate'},
          {text: '持有数量', value: 'purchase.count'},
          {text: '买时单价', value: 'purchase.initPrice'},
          {text: '当前单价', value: 'daily.price'}
        ],
        fundHeaders: [
          {text: '产品名', align: 'center', value: 'product.name'},
          {text: '开始日期', value: 'purchase.beginDate'},
          {text: '结束日期', value: 'purchase.endDate'},
          {text: '原价', value: 'purchase.initAmount'},
          {text: '现价', value: 'purchase.currAmount'}
        ],
        termHeaders: [
          {text: '产品名', align: 'center', value: 'product.name'},
          {text: '开始日期', value: 'purchase.beginDate'},
          {text: '结束日期', value: 'purchase.endDate'},
          {text: '原价', value: 'purchase.initAmount'},
          {text: '现价', value: 'purchase.currAmount'}
        ],
        wmprods: []
      }
    },
    methods: {
      changeTab: function (id) {
        this.queryProds(id);
      },
      queryProds: function (id) {
        if (this.customerCode === '') {
          return;
        }
        let url = '/customer/' + this.customerCode + '/financial/' + this.tabProds[id] + '/purchases';
        this.$axios.get(url)
          .then(resp => {
            if (resp.data.code === 200) {
              this.wmprods = resp.data.data;
            }
          })
          .catch(() => {
            this.app.message('获取理财产品失败', 'error');
          });
      }
    }
  }
</script>
