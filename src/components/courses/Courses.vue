<template>
  <div>
    <router-view :course="course" :token="token" v-if="'courseName' in $route.params"></router-view>
    <div class="layout-padding full-width" v-else>
      <h1>{{ $t('content.courses.list.headings.page') }}</h1>

      <div class="row gutter">
        <div class="auto">
          <q-autocomplete v-model="terms" :delay="0" :placeholder="$t('content.search.label')" @search="searchCourse" @selected="selectedCourse">
            <q-search v-model="terms" />
          </q-autocomplete>
        </div>
      </div>

      <h4>{{ $t('content.courses.list.headings.all') }}</h4>
      <div class="row gutter">
        <div class="width-1of4 sm-auto sm-wrap" v-for="course in courses">
          <course-card :course="course" :status="''" :tigris="tigris" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Utils } from 'quasar'
import { Tigris } from '../../api'
import { mapActions, mapGetters } from 'vuex'
import CourseCard from './CourseCard'
import Search from '../generic-partials/Search'
export default {
  name: 'courses',
  props: ['auth', 'token'],
  data () {
    return {
      course: {},
      courses: [],
      search: {
        model: '',
        results: []
      },
      terms: '',
      tigris: {}
    }
  },
  watch: {
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
    ...mapActions([]),
    _parseCourses (courses) {
      return courses.map(c => {
        return {
          label: c.title,
          secondLabel: c.description,
          icon: 'description',
          value: c.slug
        }
      })
    },
    getCourses (tigris) {
      return tigris.course.retrieve({ type: 1 }).then(r => {
        return r.data
      })
    },
    searchCourse (terms, done) {
      done(Utils.filter(terms, {field: 'label', list: this._parseCourses(this.courses)}))
    },
    selectedCourse (item) {
      const course = this.courses.filter(c => { return c.slug === item.value })[0]
      this.terms.course = ''
      this.$router.push({ name: 'course', params: { courseName: course.slug } })
    }
  },
  mounted () {
  },
  created () {
    // this.$store.commit({ type: 'auth/initialize', auth: tigris._token._user })
    // this.$store.commit({ type: 'token/initialize', token: tigris._token })
    Tigris.initializeWithToken(this.auth.id, this.token).then(tigris => {
      this.tigris = tigris
      this.getCourses(tigris).then(c => {
        this.courses = c
      })
    }).catch(e => {
      console.error(e)
      this.$router.replace({path: '/logout'})
    })
  },
  components: {
    CourseCard,
    Search
  }
}
</script>

<style lang="stylus">
.courses-content
  padding 1.5vh 1vw
button
  font-size 1rem
  font-family 'oxygenbold'
</style>
