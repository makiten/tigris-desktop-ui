<template>
  <tr>
    <td>
      <input ref="input"
             class="full-width"
             v-model="answer.value"
             :placeholder="$t('assessments.answer.placeholder')" />
    </td>
    <td class="text-center">
      <q-toggle ref="toggle" v-model="answer.checked" />
    </td>
  </tr>
</template>

<script>
export default {
  name: 't-multiple-answer',
  props: ['index', 'model'],
  data () {
    return {
      answer: {value: '', message: '', checked: false}
    }
  },
  watch: {
    answer: {
      handler (val) {
        this.$emit('set', this.index, this.answer)
      },
      deep: true
    }
  },
  created () {
    this._onCreated()
  },
  methods: {
    _onCreated () {
      if (!(typeof this.model === 'undefined' || this.model === null)) {
        this.answer.value = this.model.value
        this.answer.checked = this.model.checked
      }
    },
    setValue (val) {
    }
  }
}
</script>

<style lang="stylus">
</style>
