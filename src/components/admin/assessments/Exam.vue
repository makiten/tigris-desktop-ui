<template>
  <div class="layout-padding scroll">
    <h3>{{ $t('buttons.add', {n: $t('labels.test', {}, 1)}) }}</h3>
    <form method="post" v-on:submit.prevent>
      <div class="row gutter">
        <div>
          <label>
            {{ $t('labels.questions') }}
            <q-numeric :min="1" :max="50" v-model="count" />
          </label>
        </div>
      </div>
      <template v-if="questions.length > 0" v-for="(question, index) in questions">
        <question @reset="resetQuestions" @save="saveQuestion" @send-toast="sendToast" :action="action" :partial="true" :quiz="question" :order="index" />
      </template>
      <template v-for="n in count" v-else>
        <question @reset="resetQuestions" @save="saveQuestion" @send-toast="sendToast" :action="action" :partial="true" :order="n - 1" />
      </template>
      <div class="row large-gutter">
        <div>
          <button class="secondary big round" @click="addTest(false)" v-if="test.id === 0">
            {{ $t('buttons.add', {n: $t('labels.test', {}, 1)}) }}
          </button>
          <button class="secondary big round" @click="updateTest(false)" v-else>
            {{ $t('buttons.save', {n: $t('labels.test', {}, 1)}) }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from 'quasar'
import Question from './Question'

export default {
  name: 'exam',
  props: ['course', 'tigris'],
  data () {
    return {
      action: 'add',
      count: 1,
      test: { id: 0 },
      questions: [],
      publish: false
    }
  },
  computed: {},
  watch: {
    course (val) {
      this._onCreated()
    },
    tigris (val) {
      this._onCreated()
    }
  },
  created () {
    this._onCreated()
  },
  methods: {
    _createQuestionVar (count) {
    },
    _examExists () {
      return !(typeof this.test === 'undefined' || this.test === null || this.test === '')
    },
    _getExam () {
      return this.tigris.test.retrieve(null, this.course.id, true).then(r => {
        return r.data
      })
    },
    _onCreated () {
      if (!(typeof this.tigris.test === 'undefined' || typeof this.course.id === 'undefined')) {
        this._getExam().then(test => {
          if (test !== '') {
            this.test = test
            this._processExam(test)
          }
        })
      }
    },
    _processExam (test) {
      test.data.questions.forEach(question => {
        var quiz = {'course-id': test.id, status: test.status, data: question}
        quiz.data.messages = {
          correct: {heading: '', message: ''},
          incorrect: {}
        }
        if (question.type === 'mc') {
          for (var k in question.choices) {
            quiz.data.messages.incorrect[k] = {heading: '', message: ''}
          }
        } else {
          quiz.data.messages.incorrect = {heading: '', message: ''}
        }
        this.questions.push(quiz)
      })
      this.count = test.data.questions.length
      this.publish = (test.status === 1)
      this.action = 'edit'
    },
    addQuestion (question) {
      this.questions.push(question)
    },
    addTest (publish) {
      const data = {
        'course-id': this.course.id,
        status: Number(publish),
        details: {
          length: 180000,
          instructions: '',
          questions: this.questions
        }
      }
      this.tigris.test.create(data).then(r => {
        if (r.data.result === 1) {
          this.$emit('send-toast', 'positive', this.$t('result.success.message'))
        } else {
          this.$emit('send-toast', 'negative', this.$t('result.failure.message'))
        }
      }).catch(e => {
        if (process.env.NODE_ENV !== 'production') { console.error(e) }
        this.$emit('send-toast', 'negative', this.$t('result.failure.message'))
      })
    },
    resetQuestions () {
      this.questions = []
    },
    saveQuestion (question, index) {
      const exists = typeof this.questions[index] !== 'undefined'
      if (exists) {
        this.questions[index] = question
      } else {
        this.addQuestion(question)
      }
    },
    sendToast (type, msg) {
      Toast.create[type]({
        html: msg
      })
    },
    updateTest (publish) {
      const data = {
        details: {
          status: Number(publish),
          data: {
            length: 180000,
            instructions: '',
            questions: this.questions
          }
        }
      }
      this.tigris.test.update(this.test.id, data).then(r => {
        if (r.data.result === 1) {
          this.$emit('send-toast', 'positive', this.$t('result.success.message'))
        } else {
          this.$emit('send-toast', 'negative', this.$t('result.failure.message'))
        }
      }).catch(e => {
        if (process.env.NODE_ENV !== 'production') { console.error(e) }
        this.$emit('send-toast', 'negative', this.$t('result.failure.message'))
      })
    }
  },
  components: {
    Question
  }
}
</script>

<style lang="stylus">
</style>
