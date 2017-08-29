<template>
  <div class="card bg-white shadow-1 cursor-pointer" @click="goToCourse(course.slug)">
    <template v-if="status === 'in-progress'">
      <img src="https://jogralmedia.blob.core.windows.net/production/img/courses/d29yZHByZXNzLWxvZ28tbm90ZXh0LXJnYg_c4U04wK.png" alt="">
      <div class="card-title">
        {{ course.title }}
      </div>
      <div class="card-content">
        {{ course.teaser | truncate }}
      </div>
      <div class="action row no-gutter">
        <div class="auto text-center">
          <button @click="goToCourse(course.slug)" class="full-width secondary big">
            {{ $t('content.courses.card.buttons.go_to_class') }}
          </button>
        </div>
        <div class="auto text-center">
          <button @click="goToExam(course.slug)" class="full-width secondary big outline">
            {{ $t('content.courses.card.buttons.test_out') }}
          </button>
        </div>
      </div>
    </template>
    <template v-else-if="status === 'completed'">
      <img src="https://jogralmedia.blob.core.windows.net/production/img/courses/d29yZHByZXNzLWxvZ28tbm90ZXh0LXJnYg_c4U04wK.png" alt="">
      <div class="card-title">
        {{ course.title }}
      </div>
      <div class="card-content">
        {{ course.teaser | truncate }}
      </div>
        <div class="action row no-gutter">
          <div class="auto text-center">
            <button @click="$router.push('/courses/' + course.slug)" class="full-width secondary big">
              {{ $t('content.courses.card.buttons.repeat_go_to_class') }}
            </button>
          </div>
          <div class="auto text-center">
            <button @click="$router.push('/courses/' + course.slug + '/exam')" class="full-width secondary big outline">
              {{ $t('content.courses.card.buttons.repeat_test_out') }}
            </button>
          </div>
        </div>
    </template>
    <template v-else>
      <img src="https://jogralmedia.blob.core.windows.net/production/img/courses/d29yZHByZXNzLWxvZ28tbm90ZXh0LXJnYg_c4U04wK.png" alt="">
      <div class="card-title">
        {{ course.title }}
      </div>
      <div class="card-content">
        {{ course.teaser | truncate }}
      </div>
      <div class="action row no-gutter">
        <div class="auto text-center">
          <button @click="$router.push('/courses/' + course.slug + '/' + currentUrl)" class="full-width secondary big" v-if="typeof currentUrl !== 'undefined'">
            {{ $t('content.courses.card.buttons.go_to_class') }}
          </button>
          <button @click="$router.push('/courses/' + course.slug)" class="full-width secondary big" v-else>
            {{ $t('content.courses.card.buttons.go_to_class') }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'course-card',
  props: ['course', 'currentUrl', 'status'],
  data () {
    return {}
  },
  filters: {
    truncate (value) {
      if (value.length > 80) {
        return value.substring(0, 77) + '...'
      } else {
        return value
      }
    }
  },
  watch: {
  },
  methods: {
    goToCourse (slug) {
      this.$router.push({name: 'course', params: {courseName: slug}})
    },
    goToExam (slug) {
      this.$router.push({name: 'exam', params: {courseName: slug}})
    }
  },
  created () {
  }
}
</script>

<style lang="stylus">
.card
  height 37.75vh
  .card-content
    height 6vh
</style>
