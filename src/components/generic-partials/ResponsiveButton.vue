<template>
  <div>
    <div class="lt-md">
    </div>
    <div class="gt-sm">
    </div>
  </div>
</template>

<script>
export default {
  name: 'r-btn',
  props: [],
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="stylus">
</style>
