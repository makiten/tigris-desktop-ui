<template>
  <div>
    <router-view :course="course" v-if="'courseName' in $route.params"></router-view>
    <div class="layout-padding full-width" v-else>
      <h1>{{ $t('content.courses.list.headings.page') }}</h1>

      <div class="row gutter lt-md-column">
        <div class="auto">
          <q-autocomplete v-model="terms" :delay="0" :placeholder="$t('content.search.label')" @search="searchCourse" @selected="selectedCourse">
            <q-search v-model="terms" />
          </q-autocomplete>
        </div>
      </div>

      <h4>{{ $t('content.courses.list.headings.all') }}</h4>
      <div class="row gutter lt-md-column" v-for="n in Math.ceil(courses.length / 4)">
        <div class="width-1of4 sm-auto sm-wrap" v-for="course in courses.slice(((n - 1) * 4), (n * 4))">
          <course-card :course="course" :status="''" :tigris="tigris" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Utils } from 'quasar'
import { mapActions, mapGetters } from 'vuex'
import CourseCard from './CourseCard'
import Search from '../generic-partials/Search'
export default {
  name: 'courses',
  props: ['tigris'],
  data () {
    return {
      course: {},
      courses: [],
      search: {
        model: '',
        results: []
      },
      terms: ''
    }
  },
  watch: {
    tigris (val) {
      this._onCreated()
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/getUser',
      token: 'token/getToken'
    })
  },
  methods: {
    ...mapActions([]),
    _onCreated () {
      this.getCourses().then(c => {
        this.courses = c
      }).catch(e => {
        if (DEV) console.error(e)
        this.logout()
      })
    },
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
    getCourses () {
      return this.tigris.course.retrieve({ type: 1 }).then(r => r.data)
    },
    logout () {
      this.$store.dispatch('token/destroy')
      this.$store.dispatch('auth/destroy')
      this.$router.replace({path: '/login'})
    },
    searchCourse (terms, done) {
      done(Utils.filter(terms, {field: 'label', list: this._parseCourses(this.courses)}))
    },
    selectedCourse (item) {
      const course = this.courses.filter(c => c.slug === item.value)[0]
      this.terms.course = ''
      this.$router.push({ name: 'course', params: { courseName: course.slug } })
    }
  },
  mounted () {
  },
  created () {
    // if (this.tigris) this._onCreated()
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
