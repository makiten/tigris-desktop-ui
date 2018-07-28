<template>
  <div>
    <v-layout row class="mb-2">
      <v-flex>
        <h1>Hello, {{name}}</h1>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 md9>
        <h2>{{ $t('dash.courseload') }}</h2>
        <v-layout row wrap>
          <v-flex xs12 md4 v-for="course in courses.edges" :key="course.node.id">
            <t-course-card
               color="light"
               :course="course.node"
               img-src="https://lorempixel.com/600/300/food/5/"
               img-height="200px" />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md3>
        <v-card color="indigo lighten-1" flat>
          <v-card-title primary-title>
            <h4 class="headline white--text">
              Course History
            </h4>
          </v-card-title>
          <v-divider />
          <v-list two-line subheader>
            <v-list-tile
               ripple
               v-for="n in 4"
               :key="n"
               >
              <v-list-tile-content>
                <v-list-tile-title>A Course Title</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">Completed 2 days ago</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>2 d</v-list-tile-action-text>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <v-divider class="mt-4 mb-2" />

    <v-layout row>
      <v-flex xs12>
        <h2 class="mt-2">{{ $t('dash.recommended') }}</h2>
        <v-layout row>
          <v-flex xs12 md3 v-for="course in courses.edges" :key="course.node.id">
            <t-course-card
               color="light"
               :course="course.node"
               img-src="https://lorempixel.com/600/300/food/5/"
               img-height="200px" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import courses from '~/apollo/queries/courses.gql'
import TCourseCard from '~/components/CourseCard.vue'

export default {
  data: () => ({
    name: 'Vejituh'
  }),
  apollo: {
    courses: {
      prefetch: true,
      query: courses
    }
  },
  head: {
    title: 'Home'
  },
  computed: {
  },
  created () {
  },
  components: {
    TCourseCard
  }
}
</script>

<style>
</style>
