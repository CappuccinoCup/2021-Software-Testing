<template>
  <DefaultWelcome user-type="客户"></DefaultWelcome>
</template>

<script>
  import DefaultWelcome from "../DefaultWelcome";

  export default {
    name: 'CustomerWelcome',
    data() {
      return {}
    },
    components: {
      DefaultWelcome
    }
  }
</script>
