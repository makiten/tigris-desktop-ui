<template>
  <div class="card bg-white shadow-1 cursor-pointer" @click="goToCourse(course.slug)">
    <template v-if="status === 'in-progress'">
      <img :src="course.image" :alt="course.title" v-if="course.image">
      <img class="full-width" :src="'http://via.placeholder.com/400x200/999999/ffffff?text=' + encodeURIComponent(course.title)" :alt="course.title" v-else>
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
        <div class="auto text-center" v-if="hasExam">
          <button @click="goToExam(course.slug)" class="full-width secondary big outline">
            {{ $t('content.courses.card.buttons.test_out') }}
          </button>
        </div>
      </div>
    </template>
    <template v-else-if="status === 'completed'">
      <img :src="course.image" :alt="course.title" v-if="course.image">
      <img class="full-width" :src="'http://via.placeholder.com/400x200/999999/ffffff?text=' + encodeURIComponent(course.title)" :alt="course.title" v-else>
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
          <div class="auto text-center" v-if="hasExam">
            <button @click="$router.push('/courses/' + course.slug + '/exam')" class="full-width secondary big outline">
              {{ $t('content.courses.card.buttons.repeat_test_out') }}
            </button>
          </div>
        </div>
    </template>
    <template v-else>
      <img :src="course.image" :alt="course.title" v-if="!course.image">
      <img class="full-width" :src="'http://via.placeholder.com/400x200/999999/ffffff?text=' + encodeURIComponent(course.title)" :alt="course.title" v-else>
      <div class="card-title">
        {{ course.title }}
      </div>
      <div class="card-content">
        {{ course.description | truncate }}
      </div>
      <div class="action row no-gutter">
        <div class="auto text-center">
          <button @click="$router.push('/courses/' + course.slug + '/' + currentUrl)" class="full-width secondary big" v-if="currentUrl">
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
  props: ['course', 'currentUrl', 'status', 'tigris'],
  data () {
    return {
      hasExam: false
    }
  },
  filters: {
    truncate (value, length = 80) {
      if (value.length > length) {
        return value.substring(0, length - 3) + '...'
      } else {
        return value
      }
    }
  },
  watch: {
    course (val) {
      this._onCreated()
    },
    tigris (val) {
      this._onCreated()
    }
  },
  methods: {
    getExam (courseId) {
      return this.tigris.test.retrieve(null, courseId).then(t => {
        return t.data
      })
    },
    goToCourse (slug) {
      this.$router.push({name: 'course', params: {courseName: slug}})
    },
    goToExam (slug) {
      this.$router.push({path: `/courses/${slug}/exam`})
    },
    _onCreated () {
      this.getExam(this.course.id).then(c => {
        this.hasExam = !!c
      })
    }
  },
  created () {
    if (this.course && this.tigris) {
      this._onCreated()
    }
  }
}
</script>

<style lang="stylus">
.card
  min-height 36.9vh
  .card-content
    height 6vh
</style>
