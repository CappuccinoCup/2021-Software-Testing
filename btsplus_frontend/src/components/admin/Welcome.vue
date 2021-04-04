<template>
  <DefaultWelcome user-type="管理员"></DefaultWelcome>
</template>

<script>
  import DefaultWelcome from "../DefaultWelcome";

  export default {
    name: 'AdminWelcome',
    data() {
      return {}
    },
    components: {
      DefaultWelcome
    }
  }
</script>
