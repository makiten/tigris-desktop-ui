<template>
  <div>
    <div class="row gutter">
      <div class="full-width">
        <q-search v-model="search.model" :debounce="600" :placeholder="$t('content.search.label')" @input="searchCourses" />
      </div>
    </div>

    <div class="row gutter" v-if="search.model !== ''">
      <div class="auto">
        <h4>{{ $t('content.search.results') }}</h4>
        <p v-if="search.results.length === 0">{{ $t('content.search.no_results') }}</p>
        <div class="content" v-else>
          <p>{{ $t('content.search.results', { n: search.results.length }) }}</p>
          <div class="row gutter no-margin">
            <div class="width-1of3" v-for="course in search.results">
              <course-card :course="course" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CourseCard from '../courses/CourseCard'
export default {
  name: 'search',
  props: ['tigris'],
  data () {
    return {
      search: {
        model: '',
        results: []
      }
    }
  },
  computed: {
    ...mapGetters([])
  },
  watch: {
  },
  methods: {
    searchCourses () {
      console.log(this.tigris)
      if (this.search.model.length > 3) {
        this.tigris.course.retrieve({ type: 3, query: encodeURI(this.search.model) }).then(r => {
          this.search.results = r.data
        }).catch(e => {
          console.error(e)
        })
      }
    }
  },
  created () {
  },
  components: {
    CourseCard
  }
}
</script>
