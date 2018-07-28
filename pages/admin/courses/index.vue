<template>
  <div v-if="courses">
    <v-layout row>
      <v-flex xs12 md3 v-for="course in courses.edges" :key="course.node.title">
        <t-course-card
           admin
           color="light"
           :course="course.node"
           img-src="https://lorempixel.com/600/300/food/5/"
           img-height="200px" />
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-pagination
         v-model="coursePage"
         total-visible="6"
         color="indigo"
         :length="Math.ceil(courses.edges.length / 4)"
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
      coursePage: 1
    }
  },
  apollo: {
    courses: {
      prefetch: true,
      query: courses
    }
  },
  components: {
    TCourseCard
  }
}
</script>
