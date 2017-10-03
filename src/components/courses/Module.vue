<template>
  <div class="shadow-2 round-borders bg-white">
    <div class="layout-padding">
      <div class="flex justify-center current-position">
        <p>
          <i>my_location</i>
          <template v-if="view === 'quiz'">
            {{ $t('content.courses.module.actions.quiz', { title: course.title, module: module.title }), '' }}
          </template>
          <template v-else-if="view === 'lesson'">
            {{ $t('content.courses.module.actions.read', { title: course.title, module: module.title }), '' }}
          </template>
          <template v-else>
            {{ $t('content.courses.exam.label', { title: course.title, module: module.title }), '' }}
          </template>
        </p>
      </div>
      <div class="flex justify-center quiz" v-if="quizExists">
        <button class="secondary round big" v-if="view === 'quiz'" @click="view = 'lesson'">
          <i class="on-left">book</i>
          {{ $t('content.courses.module.actions.read') }}
        </button>
        <button class="primary round big" v-else @click="view = 'quiz'">
          <i class="on-left">assignment</i>
          {{ $t('content.courses.module.actions.quiz') }}
        </button>
      </div>
      <div class="flex justify-center quiz" v-else>
        <button class="primary round big" @click="continueCourse">
          {{ $t('content.courses.detail.buttons.continue') }}
        </button>
      </div>
      <hr>
      <transition name="module-quiz-fade" mode="out-in">
        <component :is="view" :auth="auth" :course="course" :enrollment="enrollment" :module="module" :token="token"></component>
      </transition>
      <div class="flex justify-center" v-if="quizExists">
        <button class="primary round big" @click="view = 'quiz'" v-if="view === 'lesson'">
          <i class="on-left">assignment</i>
          {{ $t('content.courses.module.actions.quiz') }}
        </button>
      </div>
      <div class="flex justify-center quiz" v-else>
        <button class="primary round big" @click="continueCourse">
          {{ $t('content.courses.detail.buttons.continue') }}
        </button>
      </div>
    </div>

    <button class="primary circular shadow-3 absolute-bottom-right" style="right:20px; bottom:20px;" @click="$refs.toc.open()" v-if="$route.fullPath.substring($route.fullPath.length - 4) !== 'exam'">
      <i>list</i>
      <q-tooltip anchor="center left" self="center right" :offset="[-10, 0]">
        {{ $t('header.nav.tooltips.toc') }}
      </q-tooltip>
    </button>

    <q-modal ref="toc" :content-css="{minWidth: '60vw', minHeight: '80vh'}">
      <q-layout>
        <div class="toolbar" slot="header">
          <q-toolbar-title :padding="1">
            {{ course.title }}
          </q-toolbar-title>
          <button @click="$refs.toc.close()">
            <i>close</i>
          </button>
        </div>
        <div class="scroll full-width">
          <div class="list platform-delimiter full-width">
            <div v-for="(module, i) in modules" class="item item-delimiter item-link" @click="goToModule(module.slug)">
              <div class="item-primary">{{ i + 1 }}</div>
              <div class="item-content has-secondary">
                <div>{{ module.title }}</div>
              </div>
              <i class="item-secondary">class</i>
            </div>
          </div>
        </div>
      </q-layout>
    </q-modal>
  </div>
</template>

<script>
import { Loading } from 'quasar'
import { Tigris } from '../../api'
import { mapActions, mapGetters } from 'vuex'
import Lesson from './Lesson.vue'
import Quiz from './assessments/Quiz.vue'

function load (options) {
  Loading.show(options)
}

function finish () {
  Loading.hide()
}

export default {
  name: 'module',
  props: ['course', 'modules', 'token'],
  data: () => ({
    view: 'lesson',
    module: { title: '' },
    enrollment: {},
    errors: [],
    quizExists: false,
    tigris: null
  }),
  computed: {
    ...mapGetters({
      auth: 'auth/auth'
      // token: 'token/token'
    })
  },
  mounted () {
    // Update progress
  },
  beforeCreate () {
  },
  created () {
    load({ spinner: 'facebook' })
    this._onCreated()
    finish()
  },
  watch: {
    '$route' (to, from) {
      load({ spinner: 'facebook' })
      this._onCreated()
      finish()
    }
  },
  methods: {
    ...mapActions([]),
    _findModule (modules, slug) {
      return modules.filter(m => m.slug === slug)[0]
    },
    _findEnrollment (tigris, courseId) {
      return tigris.user.retrieve(this.auth.id).then(r => {
        const enrollments = r.data.enrollments
        const resultInProgress = enrollments.in_progress.filter(e => e.course.id === courseId)[0]
        const resultCompleted = enrollments.completed.filter(e => e.course.id === courseId)[0]
        if (resultInProgress) {
          return resultInProgress
        } else if (resultCompleted) {
          return resultCompleted
        } else {
          return null
        }
      })
    },
    _onCreated () {
      Tigris.initializeWithToken(this.auth.id, this.token).then(tigris => {
        this.tigris = tigris
        const courseSlug = this.$route.params.courseName.toLowerCase()
        this.getCourse(tigris, courseSlug).then(course => {
          this._findEnrollment(tigris, course.id).then(enrollment => {
            const moduleSlug = this.$route.params.moduleName.toLowerCase()
            this.getModule(tigris, course.id, moduleSlug).then(module => {
              this.module = module
              return module
            }).then(module => {
              this.getQuiz(module.id).then(r => {
                this.quizExists = !!r.data
              })
              if (enrollment) {
                const progress = enrollment.progress
                progress.modules.current = {id: module.id, slug: module.slug}
                const data = {fields: {progress: progress}}
                this.updateEnrollment(tigris, enrollment.id, data).then(r => {
                  if (r === 1) {
                    enrollment.progress = progress
                    this.enrollment = enrollment
                  }
                })
              } else {
                const progress = {
                  modules: {
                    current: {id: module.id, slug: module.slug},
                    completed: []
                  }
                }
                const data = {fields: {course_id: course.id, progress: progress}}
                this.addEnrollment(tigris, data).then(enrollmentId => {
                  tigris.user.retrieve(this.auth.id, enrollmentId).then(newEnrollment => {
                    this.enrollment = newEnrollment.data
                  })
                })
              }
            })
            this.view = 'lesson'
          })
        })
      }).catch(e => {
        // console.error(e)
      })
    },
    addEnrollment (tigris, data) {
      return tigris.user.create(this.auth.id, data).then(r => {
        return r.data.result[0].id
      })
    },
    continueCourse () {
      const nextIndex = this.modules.findIndex(m => m.id === this.module.id) + 1
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
      delete enrollmentToSend.course
      let data
      if (nextIndex >= this.modules.length) {
        this.getExam().then(exam => {
          let routeName
          const courseName = this.$route.params.courseName.toLowerCase()
          if (exam) {
            routeName = 'exam'
          } else {
            routeName = 'done'
            enrollmentToSend.completed_on = new Date()
          }
          data = {fields: enrollmentToSend}
          this.updateEnrollment(this.tigris, enrollmentToSend.id, data).then(result => {
            if (result) {
              this.$router.push({name: routeName, params: {courseName: courseName}})
            }
          }).catch(e => { console.error(e) })
        })
      } else {
        const nextUrl = this.modules[nextIndex].slug
        data = {fields: enrollmentToSend}
        this.updateEnrollment(this.tigris, enrollmentToSend.id, data).then(result => {
          if (result) {
            this.$router.push({name: 'module', params: {moduleName: nextUrl}})
          }
        })
      }
    },
    getCourse (tigris, slug) {
      return tigris.course.retrieve({ type: 4, query: slug }).then(r => {
        return r.data
      })
    },
    getExam () {
      return this.tigris.test.retrieve(null, this.course.id).then(t => {
        return t.data
      })
    },
    getModule (tigris, courseId, slug) {
      return tigris.module.retrieve(courseId, null, { slug: slug }).then(r => {
        return r.data
      })
    },
    getQuiz (moduleId) {
      return this.tigris.quiz.retrieve(null, moduleId).then(r => {
        return r.data
      }).catch(e => {})
    },
    goToModule (slug) {
      this.$refs.toc.close(() => this.$router.push({ name: 'module', params: { moduleName: slug } }))
    },
    updateEnrollment (tigris, enrollmentId, data) {
      return tigris.user.update(this.auth.id, enrollmentId, data).then(r => {
        return r.data.result
      })
    }
  },
  components: {
    Lesson,
    Quiz
  }
}
</script>

<style lang="stylus">
.module-content
  padding 1.5vh 1vw
.current-position
  p
    font-size 1.5rem
    i
      color #fc763c
button
  font-size 1rem
  font-family 'oxygenbold'
</style>
