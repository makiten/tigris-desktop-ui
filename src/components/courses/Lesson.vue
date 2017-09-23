<template>
  <div>
    <div v-html="content">
    </div>
  </div>
</template>

<script>
// import VueMarked from 'vue-marked'
import marked from 'marked'

export default {
  name: 'lesson',
  props: ['module'],
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
  data: () => ({
  })
}
</script>

<style lang="stylus">
h1
  color $tertiary
</style>
