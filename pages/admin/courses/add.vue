<template>
  <div>
    <h2>{{ $t('course.forms.add_edit.headers.add') }}</h2>
    <v-divider />
    <t-course-form add @return="$router.push({ path: '/admin/courses' })"/>
  </div>
</template>

<script>
import TCourseForm from '~/components/CourseForm.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    TCourseForm
  }
}
</script>
