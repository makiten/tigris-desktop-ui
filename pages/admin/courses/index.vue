<template>
  <div v-if="courses">
    <v-layout row>
      <v-flex xs12 md3 v-for="course in courses" :key="course.title">
        <t-course-card
           admin
           color="light"
           :course="course"
           img-src="https://lorempixel.com/600/300/food/5/"
           img-height="200px" />
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-pagination
         v-model="coursePage"
         total-visible="6"
         color="indigo"
         :length="Math.ceil(courses.length / 4)"
         circle />
    </div>
  </div>
</template>

<script>
import TCourseCard from '~/components/CourseCard.vue'
import courses from '~/apollo/queries/courses.gql'
export default {
  head: {
    title: 'Admin - Courses'
  },
  data () {
    return {
      coursePage: 1,
      courses: []
    }
  },
  apollo: {
    allCourses: {
      prefetch: true,
      query: courses,
      result ({ data, loading }) {
        if (!loading) {
          this.courses = data.courses.edges.map(n => n.node)
        }
      }
    }
  },
  components: {
    TCourseCard
  }
}
</script>
