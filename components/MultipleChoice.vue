<template>
  <v-layout row>
    <h3 v-html="question" />
    <p>{{ $t('assessment.mc.instructions') }}</p>

    <v-list>
      <template v-for="(answer, index) in answers">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-checkbox v-model="choice" :value="answer.value" />
          </v-list-tile-action>
          <v-list-tile-content @click="choice = answer.value">
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
    choice: ''
  }),
  methods: {
    setValue (idx, val) {
      this.$emit('input', val)
    }
  },
  watch: {
    choice () {}
  },
  created () {
  }
}
</script>
