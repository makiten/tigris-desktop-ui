<template>
  <div class="row gutter">
    <div class="fit">
      <h4>{{ $t('content.courses.module.quiz.types.fitb.question') }}</h4>
      <p>{{ $t('content.courses.module.quiz.types.fitb.instructions') }}</p>
      <p>
        {{questionPreBlank}}
        <input ref="input"
               type="text"
               v-bind:value="value"
               @input="setValue($event.target.value)"
               :placeholder="$t('content.courses.module.quiz.types.fitb.placeholder')">
        {{questionPostBlank}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fitb',
  props: ['question', 'value'],
  data: () => ({
    questionPreBlank: '',
    questionPostBlank: ''
  }),
  methods: {
    setValue (val) {
      this.$emit('input', val)
    }
  },
  watch: {
    choice () {
      // this.$emit('input', this.choice)
    }
  },
  created () {
    const questionSections = this.question.split('[input]')
    this.questionPreBlank = questionSections[0]
    this.questionPostBlank = questionSections[1]
  }
}
</script>
