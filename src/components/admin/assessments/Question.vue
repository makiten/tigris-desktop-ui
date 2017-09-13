<template>
  <div>
    <h3 v-if="!partial">
      <button class="big" @click="$emit('close', 'list', '')">
        <i>keyboard_arrow_left</i>
      </button>
      {{ $t('assessments.types.quiz') }}
    </h3>
    <div class="row gutter">
      <div>
        <h4>{{ $t('assessments.question.heading') }}</h4>
      </div>
    </div>
    <div class="row gutter">
      <div class="auto">
        <input type="text" class="full-width" v-model="question" :placeholder="$t('assessments.question.placeholder')" @input="_triggerChange" />
        <small class="note" v-if="view === 'fitb'">
          <i class="big text-info">info</i>
          <span v-html="$t('assessments.question.fitb')"></span>
        </small>
      </div>
    </div>
    <div class="row gutter">
      <div>
        <h4>{{ $t('assessments.answer.heading') }}</h4>
      </div>
    </div>
    <div class="row gutter justify-center">
      <div class="column">
        <label>
          <q-radio @input="resetAnswers" v-model="view" val="fitb"></q-radio>
          <span>{{ $t('assessments.answer.types.fitb') }}</span>
        </label>
      </div>
      <div class="column">
        <label>
          <q-radio @input="resetAnswers" v-model="view" val="ma"></q-radio>
          <span>{{ $t('assessments.answer.types.ma') }}</span>
        </label>
      </div>
      <div class="column">
        <label>
          <q-radio @input="resetAnswers" v-model="view" val="mc"></q-radio>
          <span>{{ $t('assessments.answer.types.mc') }}</span>
        </label>
      </div>
    </div>
    <template v-if="view === 'fitb'">
      <div class="row large-gutter">
        <div class="auto">
          <div class="stacked-label">
            <t-fill-in-the-blank @set="updateFillInTheBlankModel" v-model="answers[0].value" :index="0" :value="answers[0].value" />
            <label>
              {{ $t('assessments.answer.label') }}
            </label>
          </div>
        </div>
      </div>
      <div class="row large-gutter" v-if="!partial">
        <div class="auto">
          <div class="stacked-label">
            <input type="text" class="full-width" v-model="answers[0].message" :index="0" />
            <label>
              {{ $t('assessments.message.labels.correct') }}
            </label>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="view === 'ma'">
      <div class="row large-gutter">
        <div class="auto text-center">
          <big>{{ $t('assessments.answer.types.label') }}</big>
          <q-numeric @input="toggleQuestions(counts.ma)" v-model="counts.ma" :min="2" :max="5" />
        </div>
      </div>
      <div class="row large-gutter">
        <div class="auto">
          <table class="q-table full-width highlight horizontal-delimiter responsive">
            <thead>
              <tr>
                <th class="text-left">{{ $t('assessments.table.answer') }}</th>
                <th class="text-center">{{ $t('assessments.table.correct') }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(answer, index) in answers">
                <t-multiple-answer @set="updateMultipleAnswerModel" :index="index" :model="answer" />
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row large-gutter" v-if="!partial">
        <div class="auto">
          <div class="stacked-label">
            <input type="text" class="full-width" v-model="ma.correct" />
            <label>
              {{ $t('assessments.message.labels.correct') }}
            </label>
          </div>
        </div>
        <div class="auto">
          <div class="stacked-label">
            <input type="text" class="full-width" v-model="ma.incorrect" />
            <label>
              {{ $t('assessments.message.labels.incorrect') }}
            </label>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="view === 'mc'">
      <div class="row large-gutter">
        <div class="auto text-center">
          <big>{{ $t('assessments.answer.types.label') }}</big>
          <q-numeric @input="toggleQuestions(counts.mc)" v-model="counts.mc" :min="2" :max="5" />
        </div>
      </div>
      <div class="row large-gutter">
        <div class="auto">
          <table class="q-table full-width highlight horizontal-delimiter responsive">
            <thead>
              <tr>
                <th class="text-left">{{ $t('assessments.table.answer') }}</th>
                <th class="text-left" v-if="!partial">{{ $t('assessments.table.message') }}</th>
                <th class="text-center">{{ $t('assessments.table.correct') }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(answer, index) in answers">
                <tr>
                  <td>
                    <t-multiple-choice @set="updateMultipleChoiceModel" :index="index" v-model="answer.value" :model="answer.value" />
                  </td>
                  <td v-if="!partial">
                    <input @input="updateMultipleChoiceMessage(index, $event.target.value)" class="full-width" :placeholder="$t('assessments.message.placeholder')" :value="(typeof answer.message === 'undefined') ? '' : answer.message" />
                  </td>
                  <td class="text-center">
                    <q-radio @input="updateSelection" v-model="mc.choice" :val="index" />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    <div class="row large-gutter" v-if="!partial">
      <div>
        <button class="secondary big round" @click="addQuiz" v-if="action === 'add'">
          {{ $t('buttons.add', {n: $t('assessments.types.quiz')}) }}
        </button>
        <button class="secondary big round" @click="saveQuiz" v-else-if="action === 'edit'">
          {{ $t('buttons.save') }}
        </button>
        <button class="tertiary big round" @click="cancel">
          {{ $t('buttons.cancel') }}
        </button>
      </div>
      <div class="text-right auto">
        <button class="" @click="deleteQuestion">
          <i class="text-negative">delete</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TFillInTheBlank from './partials/TFillInTheBlank'
import TMultipleAnswer from './partials/TMultipleAnswer'
import TMultipleChoice from './partials/TMultipleChoice'

export default {
  name: 'question',
  props: ['action', 'module', 'order', 'partial', 'testQuestion', 'tigris'],
  data () {
    return {
      answers: [{value: '', message: ''}],
      counts: {
        fitb: 1,
        ma: 3,
        mc: 3
      },
      fitb: {
        message: '',
        value: ''
      },
      ma: {
        correct: '',
        incorrect: ''
      },
      mc: {
        choice: false,
        message: '',
        value: ''
      },
      question: '',
      quiz: {},
      view: 'fitb'
    }
  },
  computed: {},
  watch: {
    counts: {
      handler (val) {
        this.answers = this._updateAnswerVar(val)
      },
      deep: true
    },
    module (val) {
      this.quiz = val
    },
    quiz (val) {
      this._prepareForm(this.quiz)
    },
    testQuestion (val) {
      this.quiz = val
      /*
      if (this.testQuestion.data.choices.length > 0) {
        this._onCreated()
      }
      */
    }
  },
  created () {
    this._onCreated()
  },
  methods: {
    _createAnswerVar (count) {
      const obj = {value: '', message: '', checked: false}
      var answers = []
      for (var i = 1; i <= count; i++) {
        answers.push(obj)
      }
      return answers
    },
    _updateAnswerVar (count) {
      var answers = this._createAnswerVar(count)
      for (var i in this.answers) {
        answers[i] = this.answers[i]
      }
      return answers
    },
    _onCreated () {
      if (this.action === 'add') {
        this.answers = this._createAnswerVar(this.counts[this.view])
      } else {
        if (this.module) {
          this.quiz = this.module.quiz
        } else if (this.testQuestion) {
          this.quiz = this.testQuestion
        }
      }
    },
    __processFillInTheBlank (quiz) {
      const answer = {
        value: quiz.data.answer,
        message: quiz.data.messages.correct.message,
        checked: true
      }
      this.answers = this._createAnswerVar(1)
      this.answers[0] = answer
    },
    __processMultipleAnswer (quiz) {
      var fetchMessage = function (choice, answer) {
        if (answer.indexOf(choice) >= 0) {
          return quiz.data.messages.correct.message
        } else {
          return quiz.data.messages.incorrect.message
        }
      }
      const count = Object.keys(quiz.data.choices).length
      this.counts.ma = (count > 1) ? count : this.counts.ma
      var answers = this._createAnswerVar(this.counts.ma)
      const choices = quiz.data.choices
      Object.keys(choices).forEach(i => {
        answers[parseInt(i) - 1] = {
          value: quiz.data.choices[i],
          message: fetchMessage(parseInt(i), quiz.data.answer),
          checked: quiz.data.answer.indexOf(parseInt(i)) >= 0
        }
      })
      if (answers.find(a => { return a.checked })) {
        this.ma.correct = answers.find(a => { return a.checked }).message
      } else {
        this.ma.correct = ''
      }
      if (answers.find(a => { return !a.checked })) {
        this.ma.incorrect = answers.find(a => { return !a.checked }).message
      } else {
        this.ma.incorrect = ''
      }
      this.answers = answers
    },
    __processMultipleChoice (quiz) {
      var fetchMessage = function (choiceIdx, answerIdx) {
        if (choiceIdx === answerIdx) {
          return quiz.data.messages.correct.message
        } else {
          return quiz.data.messages.incorrect[choiceIdx].message
        }
      }
      const count = Object.keys(quiz.data.choices).length
      this.counts.mc = (count > 1) ? count : this.counts.mc
      var answers = this._createAnswerVar(this.counts.mc)
      const choices = quiz.data.choices
      Object.keys(choices).forEach(i => {
        answers[parseInt(i) - 1] = {
          value: quiz.data.choices[i],
          message: fetchMessage(parseInt(i), quiz.data.answer) || '',
          checked: parseInt(i) === quiz.data.answer
        }
        if (parseInt(i) === quiz.data.answer) {
          this.mc.choice = parseInt(i) - 1
        }
      })
      this.answers = answers
    },
    _prepareForm (quiz) {
      this.view = quiz.data.type
      this.question = quiz.data.question

      switch (this.view) {
        case 'fitb':
          this.__processFillInTheBlank(quiz)
          break
        case 'ma':
          this.__processMultipleAnswer(quiz)
          break
        case 'mc':
          this.__processMultipleChoice(quiz)
          break
      }
    },
    _prepareData () {
      var data = {
        messages: {
          correct: {
            heading: this.$t('assessments.messages.correct.heading')
          }
        },
        type: this.view,
        question: this.question,
        answer: null,
        choices: [],
        instructions: ''
      }
      const correctAnswers = this.answers.filter(a => a.checked)
      if (correctAnswers.length === 0) { return data }
      var choices
      switch (this.view) {
        case 'ma':
          data.answer = []
          data.messages.correct.message = this.ma.correct
          data.messages.incorrect = {
            heading: this.$t('assessments.messages.incorrect.heading'),
            message: this.ma.incorrect
          }
          choices = {}
          for (var i = 0; i < this.answers.length; i++) {
            choices[(i + 1).toString()] = this.answers[i].value
            if (this.answers[i].checked) {
              data.answer.push(i + 1)
            }
          }
          data.choices = choices
          break
        case 'mc':
          const idx = this.answers.findIndex(a => a.checked)
          data.answer = idx + 1
          data.messages.correct.message = correctAnswers[0].message
          data.messages.incorrect = {}

          choices = {}
          for (i = 0; i < this.answers.length; i++) {
            choices[(i + 1).toString()] = this.answers[i].value
          }
          data.choices = choices
          choices = [...this.answers.keys()]
          choices.splice(idx, 1)
          choices.forEach(c => {
            data.messages.incorrect[(c + 1).toString()] = {
              heading: this.$t('assessments.messages.incorrect.heading'),
              message: this.answers[c].message
            }
          })
          break
        case 'fitb':
          data.answer = correctAnswers[0].value
          data.instructions = ''
          data.messages.correct.message = this.answers[0].message
          data.messages.incorrect = {
            heading: this.$t('assessments.messages.incorrect.heading'),
            message: this.$t('assessments.messages.incorrect.message')
          }
          break
      }
      return data
    },
    _triggerChange () {
      if (this.partial) {
        // this.setTestQuestion()
        let set = this._.debounce(this.setTestQuestion, 150, { leading: true })
        set()
      }
    },
    addBlankQuestions (counts) {
      const answers = this._createAnswerVar(counts - this.answers.length)
      Array.prototype.push.apply(this.answers, answers)
    },
    addQuiz () {
      const data = {
        'course-id': this.module.course_id,
        'module-id': this.module.id,
        status: 1,
        details: this._prepareData()
      }
      this.tigris.quiz.create(data).then(r => {
        if (r.data.result === 1) {
          this.$emit('close', 'list', '')
          this.$emit('save', 'positive', this.$t('result.success.message'))
        } else {
          this.$emit('save', 'negative', this.$t('result.failure.message'))
        }
      }).catch(e => {
        this.$emit('save', 'negative', this.$t('result.failure.message'))
      })
    },
    cancel () {
      this.$emit('close', 'list', '')
    },
    deleteQuestion () {
      this.tigris.quiz.destroy(this.quiz.id).then(r => {
        if (r.data.result === 1) {
          this.$emit('close', 'list', '')
          this.$emit('save', 'positive', this.$t('result.success.message'))
        } else {
          this.$emit('save', 'negative', this.$t('result.failure.message'))
        }
      }).catch(e => {
        this.$emit('save', 'negative', this.$t('result.failure.message'))
      })
    },
    removeQuestions () {
      this.answers.pop()
    },
    resetAnswers () {
      if (this.action === 'edit' &&
          !!this.quiz &&
          !!this.quiz.data &&
          this.quiz.data.type === this.view &&
          this.quiz.data.choices.length > 0) {
        this._prepareForm(this.quiz)
      } else {
        this.answers = this._createAnswerVar(this.counts[this.view])
      }
      this._triggerChange()
    },
    saveQuiz () {
      const data = {details: {data: this._prepareData()}}
      this.tigris.quiz.update(this.quiz.id, data).then(r => {
        if (r.data.result === 1) {
          this.$emit('close', 'list', '')
          this.$emit('save', 'positive', this.$t('result.success.message'))
        } else {
          this.$emit('save', 'negative', this.$t('result.failure.message'))
        }
      }).catch(e => {
        this.$emit('save', 'negative', this.$t('result.failure.message'))
      })
    },
    setTestQuestion () {
      const question = this._prepareData()
      this.$emit('save', question, this.order)
    },
    toggleQuestions (counts) {
      if (this.answers.length < counts) {
        this.addBlankQuestions(counts)
      } else if (counts < this.answers.length) {
        this.removeQuestions()
      }
    },
    updateFillInTheBlankModel (index, value) {
      const data = {value: value, message: this.answers[0].message, checked: true}
      this.$set(this.answers, index, data)
      this._triggerChange()
    },
    updateMultipleAnswerModel (index, value) {
      this.$set(this.answers, index, value)
      this._triggerChange()
    },
    updateMultipleChoiceModel (index, value) {
      this.$set(this.answers, index, {value: value, message: this.answers[index].message, checked: this.mc.choice === index})
      this._triggerChange()
    },
    updateMultipleChoiceMessage (index, message) {
      const data = {value: this.answers[index].value, message: message, checked: this.mc.choice === index}
      for (var k in this.answers) {
        var answer = this.answers[k]
        this.$set(this.answers, k, answer)
      }
      this.$set(this.answers, index, data)
      this._triggerChange()
    },
    updateSelection () {
      for (var i = 0; i < this.answers.length; i++) {
        const data = {value: this.answers[i].value, message: this.answers[i].message, checked: this.mc.choice === i}
        this.$set(this.answers, i, data)
      }
      this._triggerChange()
    }
  },
  components: {
    TFillInTheBlank,
    TMultipleAnswer,
    TMultipleChoice
  }
}
</script>

<style lang="stylus">
big
  display block
.note
  display block
  i
    font-size 1.5rem
</style>
