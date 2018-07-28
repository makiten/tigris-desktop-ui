<template>
  <v-layout row>
    <h3 v-html="$t('assessment.fitb.question')" />
    <p>{{ $t('assessment.fitb.instructions') }}</p>

    <p>
      <span v-html="questionPreBlank" />
      <v-text-field
         v-model="answer"
         v-bind:value="value"
         @input="setValue(value)"
         :label="$t('assessment.fitb.answer')"
         box
         />
      <span v-html="questionPostBlank" />
    </p>
  </v-layout>
</template>
<script>
export default {
  name: 'fitb',
  props: ['question', 'value'],
  data: () => ({
    questionPreBlank: '',
    questionPostBlank: '',
    value: ''
  }),
  methods: {
    setValue (val) {
      this.$emit('input', val)
    }
  },
  watch: {
    choice () {
    }
  },
  created () {
    const questionSections = this.question.split('[input]')
    this.questionPreBlank = questionSections[0]
    this.questionPostBlank = questionSections[1]
  }
}
</script>
