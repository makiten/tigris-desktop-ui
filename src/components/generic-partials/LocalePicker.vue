<template>
  <q-select
     type="list"
     v-bind:value="value"
     @input="setValue($event)"
     :options="localeOpts"></q-select>
</template>

<script>
export default {
  name: 'locale-picker',
  props: ['value'],
  data () {
    return {
      // locale: this.$i18n.locale(),
      localeOpts: this._i18nOptions()
    }
  },
  methods: {
    _i18nOptions () {
      const keys = Object.keys(this.$store.state.i18n.translations)
      let opts = []
      keys.forEach(k => { opts.push({ value: k, label: this.$store.state.i18n.translations[k].lang }) })
      return opts
    },
    setValue ($e) {
      this.$emit('input', $e)
    }
  }
}
</script>

<style lang="stylus">
</style>
