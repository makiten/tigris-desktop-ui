<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view :currentYear="currentYear" :apiHost="apiHost"></router-view>
  </div>
</template>

<script>
/*
 * Root component
 */
export default {
  data () {
    return {
      currentYear: new Date().getFullYear(),
      apiHost: process.env.apiHost
    }
  },
  watch: {
  }
}
</script>

<style lang="stylus">
</style>
