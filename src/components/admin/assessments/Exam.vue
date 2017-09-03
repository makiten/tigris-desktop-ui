<template>
  <q-modal ref="exam" class="maximized">
    <q-layout>
      <div class="full-width scroll">
        <div class="row">
          <div class="auto text-right">
            <button @click="$refs.exam.close()">
              <i class="text-primary">close</i>
            </button>
          </div>
        </div>
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
            <template v-if="questions.length > 0">
              <template v-for="(question, index) in questions">
                <question @reset="resetQuestions" @save="saveQuestion" @send-toast="sendToast" :action="'edit'" :partial="true" :testQuestion="question" :order="index" />
              </template>
            </template>
            <template v-if="count > questions.length">
              <template v-for="n in (count - questions.length)">
                <question @reset="resetQuestions" @save="saveQuestion" @send-toast="sendToast" :action="'add'" :partial="true" :order="questions.length + n" />
              </template>
            </template>
            <div class="row large-gutter">
              <div v-if="test.id === 0">
                <button class="outline primary big round" @click="addTest(false)">
                  {{ $t('buttons.draft')  }}
                </button>
                <button class="secondary big round" @click="addTest(true)">
                  {{ $t('buttons.publish') }}
                </button>
              </div>
              <div v-else>
                <button class="outline primary big round" @click="updateTest(false)" v-if="test.status === 0">
                  {{ $t('buttons.draft', {n: $t('labels.test', {}, 1)}) }}
                </button>
                <button class="secondary big round" @click="updateTest(true)">
                  {{ $t('buttons.publish') }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </q-layout>
  </q-modal>
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
    count (val) {
      if (this.test.id !== 0) {
        if (this.count < this.questions.length) {
          this.questions.pop()
        } else if (this.count === this.questions.length) {
          this.questions = []
          this._onCreated()
        }
      }
    },
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
    close () {
      this.$refs.exam.close()
    },
    open () {
      this.$refs.exam.open()
    },
    _createQuestionVar (count) {
    },
    _examExists () {
      return !!this.test && this.test !== ''
    },
    _getExam () {
      return this.tigris.test.retrieve(null, this.course.id, true).then(r => {
        return r.data
      })
    },
    _onCreated () {
      if (!!this.tigris.test && !!this.course.id) {
        this._getExam().then(test => {
          if (test !== '') {
            this.test = test
            this._processExam(this.test)
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
      var questions = []
      this.questions.forEach(q => {
        questions.push(q.data)
      })
      const data = {
        'course-id': this.course.id,
        status: Number(publish),
        details: {
          length: 180000,
          instructions: '',
          questions: questions
        }
      }
      this.tigris.test.create(data).then(r => {
        if (r.data.result === 1) {
          this.$emit('send-toast', 'positive', this.$t('result.success.message'))
          if (publish) {
            this.close()
          } else {
            // if (this.questions.length > 0) {
            //  this.questions.length = 0
            // }
            // this._onCreated()
            this.action = 'edit'
          }
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
    saveQuestion (data, index) {
      const question = {
        'course-id': this.course.id,
        status: 1,
        data: data
      }
      const exists = this.questions[index] !== null
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
      var questions = []
      this.questions.forEach(q => {
        questions.push(q.data)
      })
      const data = {
        details: {
          status: Number(publish),
          data: {
            length: 180000,
            instructions: '',
            questions: questions
          }
        }
      }
      this.tigris.test.update(this.test.id, data).then(r => {
        if (r.data.result === 1) {
          this.$emit('send-toast', 'positive', this.$t('result.success.message'))
          if (publish) { this.close() }
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
