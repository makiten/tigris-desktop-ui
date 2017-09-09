<template>
  <router-view :course="course" :token="token" class="layout-view" v-if="'courseName' in $route.params"></router-view>
  <div class="layout-padding fit scroll" v-else>
    <h1>{{ $t('content.courses.list.headings.page') }}</h1>

    <search />

    <h4>{{ $t('content.courses.list.headings.all') }}</h4>
    <div class="row gutter">
      <div class="width-1of4" v-for="course in courses">
        <course-card :course="course" :status="''" :tigris="tigris" />
      </div>
    </div>
  </div>
</template>

<script>
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
    getCourses (tigris) {
      return tigris.course.retrieve({ type: 1 }).then(r => {
        return r.data
      })
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
