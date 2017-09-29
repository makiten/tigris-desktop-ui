<template>
  <div>
    <div v-html="content">
    </div>
  </div>
</template>

<script>
// import VueMarked from 'vue-marked'
import { Loading } from 'quasar'
import marked from 'marked'

function load (options) {
  Loading.show(options)
}

function finish () {
  Loading.hide()
}

export default {
  name: 'lesson',
  props: ['auth', 'course', 'enrollment', 'module', 'token'],
  computed: {
    content () {
      if (this.module.content) {
        marked.setOptions({
          gfm: true,
          highlight: function (code) {
            return require('highlight.js').highlightAuto(code).value
          }
        })
        return marked(this.module.content)
      } else {
        return ''
      }
    }
  },
  created () {
    load({ spinner: 'facebook' })
  },
  mounted () {
    this.$nextTick(function () { finish() })
  },
  data: () => ({
  })
}
</script>

<style lang="stylus">
h1
  color $tertiary
</style>
