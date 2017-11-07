<template>
  <q-select
     type="list"
     v-bind:value="value"
     @input="setValue($event)"
     :options="localeOpts"></q-select>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'locale-picker',
  props: ['value'],
  computed: {
    ...mapState({
      i18n: 'i18n'
    })
  },
  data () {
    return {
      // locale: this.$i18n.locale(),
      localeOpts: {}
    }
  },
  created () {
    this.localeOpts = this._i18nOptions()
  },
  methods: {
    _i18nOptions () {
      const keys = Object.keys(this.i18n.translations)
      let opts = []
      keys.forEach(k => { opts.push({ value: k, label: this.i18n.translations[k].lang }) })
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
