<template>
  <div>
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
