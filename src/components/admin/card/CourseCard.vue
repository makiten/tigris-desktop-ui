<template>
  <div class="card bg-white shadow-1">
    <div class="card-title">
      <span class="cursor-pointer" @click="modules()">
        {{ course.title | truncate(24) }}
        <q-tooltip>
          {{ $t('content.admin.module.list.heading') }}
        </q-tooltip>
      </span>
      <button class="big" @click="edit()">
        <i>edit</i>
      </button>
    </div>
    <div class="card-content">
      {{ course.description }}
    </div>
    <div class="card-actions flex items-end">
      <div class="text-primary">
        <button @click="modules()">
          <i>view_module</i>
          {{ $t('labels.module', {}, 2) }}
        </button>
      </div>
      <div class="text-primary">
        <button @click="exam()">
          <i>grade</i>
          {{ $t('labels.test', {}, 1) }}
        </button>
      </div>
      <div class="auto text-right">
        <button class="remove" @click="remove()">
          <i class="text-negative">delete_forever</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CourseDetail from '../detail/CourseDetail'
import ModuleDetail from '../detail/ModuleDetail'

export default {
  name: 'admin-course-card',
  props: ['auth', 'course', 'index', 'tigris'],
  data () {
    return {
    }
  },
  filters: {
    truncate (value, length = 100) {
      if (value.length > length) {
        return value.substring(0, length - 3) + '...'
      } else {
        return value
      }
    }
  },
  watch: {
    course (val) {
      this.course = val
    }
  },
  created () {
  },
  methods: {
    modules () {
      this.$emit('open', 'modulesList', 'add', 'course', this.course)
    },
    edit () {
      this.$emit('open', 'courseDetail', 'edit', 'course', this.course)
    },
    exam () {
      this.$emit('open', 'exam', 'test', 'course', this.course)
    },
    remove () {
      this.tigris.course.destroy(this.course.id).then(r => {
        if (r.data.result === 1) {
          this.$emit('delete', 'positive', this.$t('content.admin.course.toasts.positive', {c: this.course.title}, this.course.id))
        } else {
          this.$emit('delete', 'negative', this.$t('content.admin.course.toasts.negative', {c: this.course.title}))
        }
      }).catch(e => {
        if (process.env.NODE_ENV !== 'production') {
          console.error(e)
        }
        this.$emit('delete', 'negative', this.$t('content.admin.course.toasts.negative', {c: this.course.title}))
      })
    }
  },
  components: {
    CourseDetail,
    ModuleDetail
  }
}
</script>

<style lang="stylus" scoped>
@import '~themes/app.variables.styl'
button
  padding 0.25vh 0vw
.card
  min-height 16vh
  span
    padding-left 0
  .card-title
    color $light
    background $primary
    padding-top 0.1vh
    padding-bottom 0.1vh
    button
      i
        color lighten($primary, 55%)
    button:hover
      i
        color darken($primary, 55%)
  .card-content
    height 6vh
  .card-actions
    vertical-align bottom
</style>
