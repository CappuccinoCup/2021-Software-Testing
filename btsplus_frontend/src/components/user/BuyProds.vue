<template>
  <v-container>
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
    <v-data-table :headers="headers" :items="wmprods" :loading="prodsLoading" disable-sort
                  :items-per-page.sync="itemsPerPage" :page.sync="page" :server-items-length="totalItems">
      <template v-slot:item.actions="{ item }">
        <v-btn text color="blue" @click="buy(item.id)">购买</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    name: 'MyProds',
    data() {
      return {
        app: this.$root.$children[0],
        tab: 0,
        itemsPerPage: 5,
        page: 1,
        totalItems: 10,
        prodsLoading: false,
        types: [
          {id: 0, name: '股票'},
          {id: 1, name: '基金'},
          {id: 2, name: '定期理财产品'}
        ],
        headers: [
          {text: '产品名', align: 'center', value: 'name'},
          {text: '产品种类', value: 'calories'},
          {text: '单价', value: 'price'},
          {text: '', value: 'actions'}
        ],
        wmprods: []
      }
    },
    methods: {
      changeTab: function (id) {
        console.log(id)
      },
      getProds: function () {
        console.log(this.tab)
        this.wmprods = [
          {
            id: 1,
            name: '一号产品',
            calories: '股票',
            price: 20
          },
          {
            id: 2,
            name: '二号产品',
            calories: '基金',
            price: 20
          },
        ];
      },
      buy: function (id) {
        console.log(id)
      }
    },
    watch: {
      itemsPerPage: function () {
        this.getProds();
      },
      page: function () {
        this.getProds();
      }
    },
    mounted() {
      this.getProds();
    }
  }
</script>
