<template>
<div>
  <form v-on:submit.prevent>
    <h2 v-html=""></h2>
    <p v-html=""></p>

    <div class="row gutter" v-if="quiz.data.type === 'mc'">
      <multiple-choice :question="quiz.data.question" :answers="quiz.data.choices" v-model="choice"></multiple-choice>
    </div>
    <div class="row gutter" v-else-if="quiz.data.type === 'ma'">
      <multiple-answer :question="quiz.data.question" :answers="quiz.data.choices" v-model="choice"></multiple-answer>
    </div>
    <div class="row gutter" v-else-if="quiz.data.type === 'fitb'">
      <fill-in-the-blank :question="quiz.data.question" v-model="choice"></fill-in-the-blank>
    </div>

    <button id="submit-answer" class="round secondary disabled" @click="evaluateChoice">
      {{ $t('content.courses.module.quiz.buttons.submit') }}
    </button>
  </form>

  <q-modal ref="quizModal" @close="continueCourse">
    <div class="layout-padding fit" v-if="message !== {}">
      <div class="row gutter">
        <div class="auto">
          <h4>{{ message.heading }}</h4>
        </div>
        <div class="auto text-right">
          <button @click="continueCourse">
            <i>close</i>
          </button>
        </div>
      </div>
      <div class="row gutter">
        <div class="auto">
          <p v-html="message.message">{{ message.message }}</p>
        </div>
      </div>
      <div class="row gutter">
        <div class="auto">
          <!--<p v-html="quizResult.footer">{{ quizResult.footer }}</p>-->
          <button class="round primary" @click="continueCourse">
            {{ $t('content.courses.module.quiz.buttons.close') }}
          </button>
        </div>
      </div>
    </div>
    <div class="layout-padding fit" v-else>
      <div class="row gutter">
        <div class="auto">
          <h4 v-if="quizResult === true">{{ $t('content.courses.module.quiz.headings.correct') }}</h4>
          <h4 v-else>{{ $t('content.courses.module.quiz.headings.incorrect') }}</h4>
        </div>
        <div class="auto text-right">
          <button @click="continueCourse">
            <i>close</i>
          </button>
        </div>
      </div>
      <div class="row gutter">
        <div class="auto">
        </div>
      </div>
      <div class="row gutter">
        <div class="auto">
          <!--<p v-html="quizResult.footer">{{ quizResult.footer }}</p>-->
          <button class="round primary" @click="continueCourse">
            {{ $t('content.courses.module.quiz.buttons.close') }}
          </button>
        </div>
      </div>
    </div>
  </q-modal>
</div>
</template>

<script>
import { Tigris } from '../../../api'
import { mapGetters } from 'vuex'
import MultipleAnswer from './answer-types/MultipleAnswer'
import MultipleChoice from './answer-types/MultipleChoice'
// import Terminal from './answer-types/Terminal'
import FillInTheBlank from './answer-types/FillInTheBlank'
import QuizModal from './QuizModal'
export default {
  name: 'quiz',
  props: ['course', 'enrollment', 'module'],
  data: () => ({
    quiz: { data: { messages: { } } },
    choice: '',
    correct: false,
    message: {heading: '', message: ''},
    nextUrl: '',
    tigris: {}
  }),
  computed: {
    ...mapGetters({
      auth: 'auth/getUser',
      token: 'token/getToken'
    })
  },
  watch: {
    choice (val) {
      this.choice = val
    }
  },
  methods: {
    continueCourse () {
      let enrollmentToSend = this.enrollment
      let completed
      if (!this.enrollment.progress.modules.completed) {
        completed = []
      } else {
        completed = this.enrollment.progress.modules.completed
      }
      completed.push(this.module.id)
      completed = completed.filter((item, i, arr) => { return arr.indexOf(item) === i })
      enrollmentToSend.progress.modules.completed = completed.sort()
      enrollmentToSend.progress.modules.current = {}
      enrollmentToSend.course_id = this.course.id
      if (this.nextUrl === 'done') {
        enrollmentToSend.completed_on = new Date()
      }
      delete enrollmentToSend.course
      const data = {fields: enrollmentToSend}
      this.tigris.user.update(this.auth.id, this.enrollment.id, data).then(r => {
        const courseName = this.$route.params.courseName.toLowerCase()
        this.$refs.quizModal.close()
        if (this.nextUrl !== '') {
          switch (this.nextUrl) {
            case 'done':
              this.$router.push({name: 'done', params: {courseName: courseName}})
              break
            case 'exam':
              this.$router.push({name: 'exam', params: {courseName: courseName}})
              break
            default:
              this.$router.push({name: 'module', params: {moduleName: this.nextUrl}})
          }
        }
      })
    },
    enableOrDisable () {
      const val = this.choice
      const submitBtn = document.getElementById('submit-answer')
      const className = 'disabled'
      const type = this.quiz.data.type
      var shouldEnable = false
      if (type === 'ma') {
        var checkedVals = []
        Object.values(val).forEach(function (v) { checkedVals.push(v.model) })
        shouldEnable = checkedVals.indexOf(true) >= 0
      } else {
        shouldEnable = val.length > 0
      }

      if (shouldEnable) {
        this.removeClass(submitBtn, className)
      } else {
        this.addClass(submitBtn, className)
      }
    },
    evaluateChoice () {
      const choice = this.choice.trim()
      this.tigris.quiz.evaluate(this.quiz.id, this.course.id, this.module.id, choice).then(r => {
        this.correct = r.data.result.correct
        this.message = r.data.result.message
        this.nextUrl = r.data.result.slug
        this.$refs.quizModal.open()
      }).catch(e => {
        console.error('Could not check answer.')
      })
    },
    getQuiz (moduleId) {
      return this.tigris.quiz.retrieve(null, moduleId).then(r => {
        return r.data
      }).catch(e => {})
    },
    addClass (elt, className) {
      if (elt.className.indexOf(className) < 0) {
        elt.className += ' ' + className
      }
    },
    removeClass (elt, className) {
      elt.className = elt.className.replace(className, '')
    }
  },
  beforeUpdate () {
    this.enableOrDisable()
  },
  created () {
    Tigris.initializeWithToken(this.auth.id, this.token).then(tigris => {
      this.tigris = tigris
      this.getQuiz(this.module.id).then(q => {
        this.quiz = q
      })
    })
  },
  components: {
    MultipleChoice,
    MultipleAnswer,
//    Terminal,
    FillInTheBlank,
    QuizModal
  }
}
</script>

<style lang="stylus">
</style>
