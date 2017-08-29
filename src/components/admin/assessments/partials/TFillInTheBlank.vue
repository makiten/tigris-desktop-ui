<template>
  <input ref="input"
         class="full-width"
         v-model="value"
         @input="setValue"
         :placeholder="$t('assessments.answer.placeholder')" />
</template>

<script>
export default {
  name: 't-fill-in-the-blank',
  props: ['index'],
  data () {
    return {
      value: ''
    }
  },
  watch: {},
  methods: {
    setValue () {
      let data = this.value.trim()
      this.$emit('set', this.index, data)
    }
  }
}
</script>

<style lang="stylus">
</style>
