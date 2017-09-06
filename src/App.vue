<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view :currentYear="currentYear"></router-view>
  </div>
</template>

<script>
/*
 * Root component
 */
export default {
  data () {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  watch: {
  }
}
</script>

<style lang="stylus">
</style>
