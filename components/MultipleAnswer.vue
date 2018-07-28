<template>
  <v-layout row>
    <h3 v-html="question" />
    <p>{{ $t('assessment.ma.instructions') }}</p>

    <v-list>
      <template v-for="(answer, index) in answers">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-checkbox v-model="choices[index.toString()]" :value="answer.value" />
          </v-list-tile-action>
          <v-list-tile-content @click="setChoice(index, answer.value)">
            <v-list-tile-title>{{ answer.value }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-layout>
</template>

<script>
export default {
  name: 'ma',
  props: ['question', 'answers', 'value'],
  data: () => ({
    choices: {}
  }),
  methods: {
    setChoice (idx, val) {
      if (this.choices[idx.toString()]) {
        this.choices[idx.toString()] = null
      } else {
        this.choices[idx.toString()] = val
      }
    },
    setValue (idx, val) {
      const choices = this.value
      choices[idx.toString()].model = val
      this.$emit('input', choices)
    }
  },
  watch: {
    choice () {}
  },
  created () {
  }
}
</script>
