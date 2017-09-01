<template>
  <div class="shadow-2 round-borders bg-white">
    <div class="layout-padding">
      <form v-on:submit.prevent>

        <template v-if="!showResults">
          <div class="row gutter" v-if="currentQuestion.type === 'mc'">
            <multiple-choice :question="currentQuestion.question" :answers="currentQuestion.choices" v-model="choice"></multiple-choice>
          </div>
          <div class="row gutter" v-else-if="currentQuestion.type === 'ma'">
            <multiple-answer :question="currentQuestion.question" :answers="currentQuestion.choices" v-model="choice"></multiple-answer>
          </div>
          <div class="row gutter" v-else-if="currentQuestion.type === 'fitb'">
            <fill-in-the-blank :question="currentQuestion.question" v-model="choice"></fill-in-the-blank>
          </div>
          <div class="row gutter" v-if="questionIdx < exam.data.questions.length - 1">
            <div class="auto text-left" v-if="questionIdx > 0">
              <button class="big round tertiary" v-shortkey.once="['ctrl', 'alt', 'p']" @shortkey="prevQuestion()" @click="prevQuestion">
                <i>navigate_before</i>
                {{ $t('content.courses.exam.buttons.prev') }}
              </button>
              <br>
              <small>{{ $t('content.courses.exam.shortcut') }} <kbd>ctrl + alt + p</kbd></small>
            </div>
            <div class="auto text-right">
              <button class="big round secondary" v-shortkey.once="['ctrl', 'alt', 'n']" @shortkey="nextQuestion()" @click="nextQuestion">
                  {{ $t('content.courses.exam.buttons.next') }}
                  <i>navigate_next</i>
              </button>
              <br>
              <small>{{ $t('content.courses.exam.shortcut') }} <kbd>ctrl + alt + n</kbd></small>
            </div>
          </div>
          <div class="row gutter" v-else-if="questionIdx === exam.data.questions.length - 1">
            <div class="auto text-right">
              <button class="big round primary" v-shortkey="['ctrl', 'alt', 'f']" @shortkey="submitExam()" @click="submitExam">
                <i>send</i>
                {{ $t('content.courses.exam.buttons.finish') }}
              </button>
              <br>
              <small>{{ $t('content.courses.exam.shortcut') }} <kbd>ctrl + alt + f</kbd></small>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row gutter">
            <results :exam="exam" :results="results" :submission="examLog.submission" />
          </div>
          <div class="row gutter">
            <div class="auto text-left">
              <button class="big round secondary" v-shortkey="['ctrl', 'alt', 'r']" @shortkey="repeatExam()" @click="repeatExam">
                <i>repeat</i>
                {{ $t('content.courses.exam.buttons.repeat') }}
              </button>
              <br>
              <small>{{ $t('content.courses.exam.shortcut') }} <kbd>ctrl + alt + r</kbd></small>
            </div>
            <div class="auto text-right">
              <button class="big round primary" v-shortkey="['ctrl', 'alt', 'h']" @shortkey="returnHome()" @click="returnHome">
                <i>home</i>
                {{ $t('content.courses.detail.buttons.return') }}
              </button>
              <br>
              <small>{{ $t('content.courses.exam.shortcut') }} <kbd>ctrl + alt + h</kbd></small>
            </div>
          </div>
        </template>
      </form>
    </div>
  </div>
</template>

<script>
import { Tigris } from '../../../api'
import { mapActions, mapGetters } from 'vuex'
import MultipleAnswer from './answer-types/MultipleAnswer'
import MultipleChoice from './answer-types/MultipleChoice'
// import Terminal from './answer-types/Terminal'
import FillInTheBlank from './answer-types/FillInTheBlank'
import Results from './Results'

export default {
  name: 'exam',
  props: ['course', 'token'],
  data () {
    return {
      choice: '',
      currentQuestion: { question: '', type: '' },
      enrollment: {},
      exam: { data: { questions: [] } },
      examLog: {},
      questionIdx: 0,
      results: {},
      showResults: false,
      tigris: {}
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth'
    })
  },
  methods: {
    ...mapActions([]),
    _createLog (tigris, testId, data) {
      return tigris.test.createEnrollment(testId, data).then(log => {
        return log
      })
    },
    _findEnrollment (enrollments, courseId) {
      const enrollment = enrollments.in_progress.filter(e => e.course.id === courseId)[0] || enrollments.completed.filter(e => e.course.id === courseId)[0]
      return enrollment
    },
    _findLog (tigris, testId, userId, enrollmentId) {
      return tigris.test.retrieveEnrollment(testId, userId, enrollmentId).then(log => {
        return log.data
      })
    },
    _onCreated (authId, token) {
      if (typeof this.course.id !== 'undefined') {
        Tigris.initializeWithToken(authId, token).then(tigris => {
          this.getExam(tigris, this.course)
        })
      }
    },
    addAnswer (tigris, qId) {
      const submission = this.examLog.submission
      const key = qId.toString()

      submission[key] = this.choice
      this.examLog.submission = submission
      tigris.test.updateEnrollment(this.exam.id, this.auth.id, this.enrollment.id, {details: {submission: submission}}).then(r => {
        if (r.data.result === 1) {
          this.choice = ''
          this.questionIdx++
        }
      })
    },
    deleteAnswer (qId) {
    },
    hasUnsubmittedAnswers () {
      const submissionVals = Object.values(this.submission)
      const examQuestionVals = Object.values(this.exam.questions)

      return submissionVals.length !== examQuestionVals.length || submissionVals.indexOf('') >= 0
    },
    getExam (tigris, course) {
      this.tigris = tigris
      tigris.user.retrieve(this.auth.id).then(r => {
        const enrollment = this._findEnrollment(r.data.enrollments, course.id)
        return enrollment
      }).then(enrollment => {
        this.enrollment = enrollment
        tigris.test.retrieve(null, course.id).then(t => {
          this.exam = t.data
          this._findLog(tigris, t.data.id, this.auth.id, enrollment.id).then(log => {
            if (log || log === '' || log.date_completed !== null) {
              const data = {'enrollment-id': enrollment.id}
              this._createLog(tigris, t.data.id, data).then(r => {
                console.log(r.data)
                if (r.data.result === 1) {
                  this._findLog(tigris, t.data.id, this.auth.id, enrollment.id).then(log => {
                    this.examLog = log
                  })
                }
              })
            } else {
              this.examLog = log
            }
          })
          this.currentQuestion = this.exam.data.questions[this.questionIdx]
        })
      }).catch(e => {
        if (process.env.NODE_ENV !== 'production') {
          console.error(e)
        }
      })
    },
    submitExam () {
      const submission = this.examLog.submission
      const key = this.questionIdx.toString()

      submission[key] = this.choice
      this.examLog.submission = submission
      this.tigris.test.updateEnrollment(this.exam.id, this.auth.id, this.enrollment.id, {details: {submission: this.examLog.submission}}).then(r => {
        if (r.data.result === 1) {
          this.choice = ''
        }
        this.tigris.test.evaluate(this.exam.id, {submission: this.examLog.submission}).then(r => {
          if (typeof r.data.result !== 'undefined') {
            this.results = r.data.result
            this.tigris.test.updateEnrollment(this.exam.id, this.auth.id, this.enrollment.id, {details: {score: r.data.result.score, date_completed: true}}).then(s => {
              this.showResults = true
            })
          }
        })
      }).catch(e => {
        if (process.env.NODE_ENV !== 'production') {
          console.error(e)
        }
      })
    },
    nextQuestion () {
      this.addAnswer(this.tigris, this.questionIdx)
    },
    prevQuestion () {
      this.questionIdx--
    },
    repeatExam () {
      this.showResults = false
      this.questionIdx = 0
      this._onCreated(this.token)
    },
    returnHome () {
      this.$router.push('/')
    }
  },
  watch: {
    choice (val) {
      this.choice = val
    },
    course (val) {
      this._onCreated(this.auth.id, this.token)
    },
    questionIdx (val) {
      if (val < 0) {
        this.questionIdx = 0
      } else if (val >= this.exam.data.questions.length) {
        this.questionIdx = this.exam.data.questions.length - 1
      }
      this.currentQuestion = this.exam.data.questions[val]
    }
  },
  created () {
    this._onCreated(this.auth.id, this.token)
  },
  components: {
    MultipleChoice,
    MultipleAnswer,
//    Terminal,
    FillInTheBlank,
    Results
  }
}
</script>

<style lang="stylus">
.test-content
  padding 1.5vh 1vw
button
  font-size 1rem
  font-family 'oxygenbold'
</style>
