<template>
  <v-container>
    <v-card :color="app.whiteOpacity">
      <v-card-title>
        我持有的理财产品
      </v-card-title>
    </v-card>
    <v-data-table :headers="headers" :items="wmprods" :loading="prodsLoading" disable-sort
                  :items-per-page.sync="itemsPerPage" :page.sync="page" :server-items-length="totalItems">
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    name: 'MyProds',
    data() {
      return {
        app: this.$root.$children[0],
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
      getMyProds: function () {
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
        this.getMyProds();
      },
      page: function () {
        this.getMyProds();
      }
    },
    mounted() {
      this.getMyProds();
    }
  }
</script>
