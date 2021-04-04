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
          <v-btn outlined class="mt-2 ml-5" @click="queryProds">查询</v-btn>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="wmprods" :loading="prodsLoading" disable-sort
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
        customerCode: '',
        itemsPerPage: 5,
        page: 1,
        totalItems: 10,
        prodsLoading: false,
        headers: [
          {text: '产品名', align: 'center', value: 'name'},
          {text: '产品种类', value: 'calories'},
          {text: '单价', value: 'price'},
          {text: '持有数量', value: 'quantity'}
        ],
        wmprods: []
      }
    },
    methods: {
      queryProds: function () {
        console.log(this.customerCode);
        this.wmprods = [
          {
            id: 1,
            name: '一号产品',
            calories: '股票',
            price: 20,
            quantity: 20
          },
          {
            id: 2,
            name: '二号产品',
            calories: '基金',
            price: 20,
            quantity: 20
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
