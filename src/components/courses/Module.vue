<template>
  <div class="shadow-2 round-borders bg-white">
    <div class="layout-padding">
      <div class="flex justify-center current-position">
        <p>
          <i>my_location</i>
          <template v-if="view === 'quiz'">
            {{ $t('content.courses.module.actions.quiz', { title: course.title, module: module.title }), '' }}
          </template>
          <template v-else>
            {{ $t('content.courses.module.actions.read', { title: course.title, module: module.title }), '' }}
          </template>
        </p>
      </div>
      <div class="flex justify-center quiz">
        <button class="secondary round big" v-if="view === 'quiz'" @click="view = 'lesson'">
          <i class="on-left">book</i>
          {{ $t('content.courses.module.actions.read') }}
        </button>
        <button class="primary round big" v-else @click="view = 'quiz'">
          <i class="on-left">assignment</i>
          {{ $t('content.courses.module.actions.quiz') }}
        </button>
      </div>
      <hr>
      <transition name="module-quiz-fade" mode="out-in">
        <component :is="view" :auth="auth" :course="course" :enrollment="enrollment" :module="module" :token="token"></component>
      </transition>
      <div class="flex justify-center">
        <button class="primary round big" @click="view = 'quiz'" v-if="view === 'lesson'">
          <i class="on-left">assignment</i>
          {{ $t('content.courses.module.actions.quiz') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Tigris } from '../../api'
import { mapActions, mapGetters } from 'vuex'
import Lesson from './Lesson.vue'
import Quiz from './assessments/Quiz.vue'
export default {
  name: 'module',
  props: ['course', 'modules', 'token'],
  data: () => ({
    view: 'lesson',
    module: { title: '' },
    enrollment: {},
    errors: []
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
  created () {
    this._onCreated()
  },
  watch: {
    '$route' (to, from) {
      this._onCreated()
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
        const courseSlug = this.$route.params.courseName.toLowerCase()
        this.getCourse(tigris, courseSlug).then(course => {
          this._findEnrollment(tigris, course.id).then(enrollment => {
            const moduleSlug = this.$route.params.moduleName.toLowerCase()
            this.getModule(tigris, course.id, moduleSlug).then(module => {
              this.module = module
              if (enrollment) {
                const progress = enrollment.progress
                progress.modules = {current: {id: module.id, slug: module.slug}}
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
        console.log(r.data)
        return r.data.result
      })
    },
    getCourse (tigris, slug) {
      return tigris.course.retrieve({ type: 4, query: slug }).then(r => {
        return r.data
      })
    },
    getModule (tigris, courseId, slug) {
      return tigris.module.retrieve(courseId, null, { slug: slug }).then(r => {
        return r.data
      })
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
