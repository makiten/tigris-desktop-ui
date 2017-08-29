<template>
  <input ref="input"
         class="full-width"
         v-model="value"
         @input="setValue"
         :placeholder="$t('assessments.answer.placeholder')" />
</template>

<script>
export default {
  name: 't-multiple-choice',
  props: ['index', 'model'],
  data () {
    return {
      value: ''
    }
  },
  watch: {},
  created () {
    this._onCreated()
  },
  methods: {
    _onCreated () {
      if (!(typeof this.model === 'undefined' || this.model === null)) {
        this.value = this.model
      }
    },
    setValue () {
      let data = this.value.trim()
      this.$emit('set', this.index, data)
    }
  }
}
</script>

<style lang="stylus">
</style>
