<template>
  <div v-if="course">
    <h2>{{ $t('course.forms.add_edit.headers.edit') }}</h2>
    <v-divider />
    <t-course-form :course="course" @return="$router.push({ path: '/admin/courses' })"/>
  </div>
</template>

<script>
import TCourseForm from '~/components/CourseForm.vue'
import { Course } from '~/apollo/queries/course.gql'

export default {
  data () {
    return {
    }
  },
  apollo: {
    course: {
      query: Course,
      prefetch: ({ route }) => ({ id: route.params.id }),
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  },
  components: {
    TCourseForm
  }
}
</script>
