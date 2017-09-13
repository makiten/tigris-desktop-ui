<template>
  <div class="layout-padding full-width scroll">
    <div class="shadow-2 round-borders bg-white" v-if="typeof $route.params.moduleName === 'undefined' && $route.fullPath.indexOf('exam') < 0 &&  $route.fullPath.indexOf('done') < 0">
      <div class="layout-padding">
        <h3>{{ course.title }}</h3>
        <hr>
        <dl>
          <!--
          <dt>
            <i>video_label</i>
            {{ $t('content.courses.detail.info.presenter') }}
          </dt>
          <dd>{{ course.creator }}</dd>
          <dt>
            <i>schedule</i>
            {{ $t('content.courses.detail.info.estimated_duration') }}
          </dt>
          <dd>
          </dd>
          -->
          <dt>
            <i>code</i>
            {{ $t('content.courses.detail.info.terms_used') }}
          </dt>
          <dd>
            <span class="chip label text-white bg-primary" v-for="tag in course.tags">
              {{ tag }}
            </span>
          </dd>
        </dl>
        <hr>
        <p>{{ course.long_description }}</p>
        <div class="list module-list item-delimiter">
          <template v-for="(module, index) in modules">
            <router-link tag="div" class="item item-link" :to="{ name: 'module', params: { moduleName: module.slug } }">
              <div class="item-primary">
                {{ index + 1 }}.
              </div>
              <div class="item-content has-secondary">
                {{ module.title }}
              </div>
              <i :class="'item-secondary ' + $t('result.success.class')" v-if="typeof enrollment.completed_on !== 'undefined' || typeof enrollment.progress !== 'undefined' && enrollment.progress.modules.complete.indexOf(module.id) >= 0">{{ $t('result.success.icon') }}</i>
            </router-link>
          </template>
          <template v-if="hasExam">
            <router-link tag="div" class="item item-link" :to="{ name: 'exam' }">
              <div class="item-primary">
                {{ modules.length + 1 }}.
              </div>
              <div class="item-content has-secondary">
                {{ $t('content.courses.exam.label') }}
              </div>
              <i :class="'item-secondary ' + $t('result.success.class')" v-if="typeof enrollment.completed_on !== 'undefined' && enrollment.completed_on !== null">{{ $t('result.success.icon') }}</i>
            </router-link>
          </template>
        </div>

        <button class="secondary big round" @click="goToFirstModule">
          {{ $t('content.courses.detail.buttons.continue') }}
        </button>
        <button class="tertiary big outline round" @click="$router.go(-1)">
          {{ $t('content.courses.detail.buttons.return') }}
        </button>
      </div>
    </div>
    <router-view :course="course" :modules="modules" :token="token" class="layout-view" v-else />

    <q-drawer swipe-only ref="drawer">
      <div class="toolbar dark">
        <q-toolbar-title :padding="1">
          {{ course.title }}
        </q-toolbar-title>
      </div>
      <div class="list platform-delimiter">
        <template v-for="(module, index) in modules">
          <q-drawer-link icon="" :to="{ name: 'module', params: { moduleName: module.slug } }">{{ index + 1}}. {{ module.title }}</q-drawer-link>
        </template>
      </div>
    </q-drawer>

    <button class="primary circular shadow-3 absolute-bottom-right" style="right:20px; bottom:20px;" @click="$refs.drawer.open()" v-if="$route.fullPath.substring($route.fullPath.length - 4) !== 'exam'">
      <i>list</i>
      <q-tooltip anchor="center left" self="center right" :offset="[-10, 0]">
        {{ $t('header.nav.tooltips.toc') }}
      </q-tooltip>
    </button>
  </div>
</template>

<script>
import { Tigris } from '../../api'
import { mapActions, mapGetters } from 'vuex'
// import axios from 'axios'
export default {
  name: 'course',
  props: ['token'],
  data () {
    return {
      course: {},
      enrollment: {},
      hasExam: false,
      modules: [],
      tigris: {}
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth'
    })
  },
  watch: {
  },
  methods: {
    ...mapActions([]),
    _findEnrollment (tigris, userId) {
      // return this.auth.enrollments.filter(e => e.course_id === this.course.id && e.is_enrolled && e.completed_on === null)
      return tigris.user.retrieve(userId).then(u => {
        const enrollments = u.data.enrollments.in_progress.concat(u.data.enrollments.completed)
        const enrollment = enrollments.filter(e => e.course.id === this.course.id && e.is_enrolled)[0]
        return enrollment
      })
    },
    _onCreated () {
      Tigris.initializeWithToken(this.auth.id, this.token).then(tigris => {
        this.tigris = tigris
        this.getCourse(tigris).then(c => {
          this.course = c
          return c
        }).then(c => {
          this.getExam(tigris, c.id).then(exam => {
            this.hasExam = !!exam
            this.getModules(tigris, c.id).then(m => {
              this.modules = m
            })
            this._findEnrollment(tigris, this.auth.id).then(e => {
              if (e) {
                this.enrollment = e
              }
            })
          })
        })
        // this.goToFirstModule()
      }).catch(e => {
        this.$router.replace({path: '/login'})
        // console.error(e)
      })
    },
    getCourse (tigris) {
      const slug = encodeURIComponent(this.$route.params.courseName.toLowerCase())
      return tigris.course.retrieve({ type: 4, query: slug }).then(r => {
        return r.data
      }).catch(e => {
        console.error(e)
      })
    },
    getExam (tigris, courseId) {
      return tigris.test.retrieve(null, courseId).then(t => {
        return t.data
      })
    },
    getModules (tigris, id) {
      return tigris.module.retrieve(parseInt(id).toString()).then(r => {
        return r.data
      }).catch(e => {
        console.error(e)
      })
    },
    getValue (e) {
      console.log(e)
    },
    goToFirstModule () {
      // const courseName = this.$route.params.courseName
      const module = this.modules[0]
      this.$router.push({ name: 'module', params: { moduleName: module.slug } })
    }
  },
  created () {
    this._onCreated()
  }
}
</script>

<style lang="stylus">
@import '~themes/app.variables.styl'
.module-list
  margin-top 2vh
  margin-bottom 4vh
  .item
    .item-primary
    .item-content
      font-size 1.2rem
      font-weight bold
  i.item-secondary
    color $primary
dl
  dt
    display inline-block
    padding-top 2vh
    padding-bottom 2vh
    i
      font-size 1.5rem
      color $secondary
  dd
    font-weight bold
    display inline-block
    padding-top 2vh
    padding-bottom 2vh
    margin-right 2vw
span.chip.label
  margin-left 0.5vw
  margin-right 0.5vw
  font-weight bold
</style>
