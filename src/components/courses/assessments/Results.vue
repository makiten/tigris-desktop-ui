<template>
  <div class="full-width">
    <h2>{{ $t('content.courses.exam.results.heading') }}</h2>
    <p>
      <big class="sentiment-score">
        <i class="text-positive" v-if="results.score >= 80">sentiment_very_satisfied</i>
        <i class="text-warning" v-else-if="results.score < 80 && results.score >= 60">sentiment_neutral</i>
        <i class="text-negative" v-else>sentiment_very_dissatisfied</i>
      </big>
      <big v-html="$t('content.courses.exam.results.score', {n: results.score, class: getCssClass(results.score)})"></big>
    </p>
    <div class="list">
      <div class="item item-delimiter multiple-lines" v-for="(r, i) in results.results">
        <div class="item-primary">{{ i + 1 }}.</div>
        <div class="item-content has-secondary">
          <div><strong>{{ $t('content.courses.exam.results.question') }}</strong> {{ exam.data.questions[i].question.replace('[input]', '&mdash;') }}</div>
          <div class="item-label item-smaller">
            <strong>{{ $t('content.courses.exam.results.answers.yours') }}</strong>
            {{ parseAnswer(exam.data.questions[i], submission[i]) }}
          </div>
          <div class="item-label item-smaller">
            <strong>{{ $t('content.courses.exam.results.answers.correct') }}</strong>
            {{ parseCorrectAnswer(exam.data.questions[i], r.answer) }}
          </div>
        </div>
        <i :class="'item-secondary ' + $t('result.success.class')" v-if="r.correct">{{ $t('result.success.icon') }}</i>
        <i :class="'item-secondary ' + $t('result.failure.class')" v-else>{{ $t('result.failure.icon') }}</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'results',
  props: ['exam', 'submission', 'results'],
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
    getCssClass (score) {
      if (score >= 80) {
        return 'text-positive'
      } else if (score >= 60 && score < 80) {
        return 'text-warning'
      } else {
        return 'text-negative'
      }
    },
    parseAnswer (question, answer) {
      var parsed
      if (typeof answer === 'string' && answer.indexOf('answer') === 0) {
        const idx = parseInt(answer.substring(6))
        parsed = question.choices[idx]
      } else if (typeof answer === 'object') {
        var selections = []
        for (var c in answer) {
          if (answer[c].model) {
            selections.push(answer[c].answer)
          }
        }
        parsed = selections.join(', ')
      } else {
        parsed = answer
      }
      return parsed
    },
    parseCorrectAnswer (question, answer) {
      var parsed
      if (typeof answer === 'number') {
        const idx = parseInt(answer)
        parsed = question.choices[idx]
      } else if (typeof answer === 'object') {
        var selections = []
        for (var i = 1; i <= answer.length; i++) {
          selections.push(question.choices[i.toString()])
        }
        parsed = selections.join(', ')
      } else {
        parsed = answer
      }
      return parsed
    }
  }
}
</script>

<style lang="stylus">
.sentiment-score
  i
    font-size 3rem
</style>
