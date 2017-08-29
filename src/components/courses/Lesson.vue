<template>
  <div>
    <div>
      <h1>{{ module.title }}</h1>
      <div v-html="module.content">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lesson',
  props: ['module'],
  data: () => ({
  })
}
</script>

<style lang="stylus">
h1
  color $tertiary
</style>
