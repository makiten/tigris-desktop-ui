<template>
  <div ref="courses">
    <div class="row actions">
      <div>
        <h4>{{ $t('content.admin.tabs.courses') }}</h4>
      </div>
      <div class="self-center">
        <button class="big" @click="openModal('courseDetail', 'add')">
          <i>add_circle_outline</i>
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 0]">
            {{ $t('content.admin.accordions.courses.add.button') }}
          </q-tooltip>
        </button>
        <!--
              <button class="big" @click="">
                <i>file_upload</i>
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 0]">
                  {{ $t('content.admin.accordions.courses.add.upload.button') }}
                </q-tooltip>
              </button>
              -->
      </div>
    </div>

    <h5>{{ $t('content.admin.accordions.courses.edit.label') }}</h5>
    <p>{{ $t('content.admin.accordions.courses.edit.content') }}</p>

    <div class="row lg-gutter">
      <div class="full-width">
        <q-autocomplete v-model="terms.course" :delay="0" @search="searchCourse" @selected="selectedCourse">
          <q-search v-model="terms.course" />
        </q-autocomplete>
      </div>
    </div>

    <div class="row wrap lg-gutter">
      <template v-for="(course, index) in courses">
        <transition-group name="fade" tag="div" class="width-1of5">
          <course-card @delete="removeCard" @open="openModal" :course="course" :tigris="tigris" v-bind:key="course" :index="index" />
        </transition-group>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'courses',
  props: ['tigris'],
  data () {
    return {
      courses: [],
      terms: {
        course: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  methods: {
    openModal (name, action, model, obj) {
      if (!(typeof action === 'undefined' || action === null)) {
        if (!(typeof obj === 'undefined' || obj === null)) {
          this.toEdit[model] = obj
        }
        this.action = action
      } else {
        this.action = 'add'
      }
      this.$refs[name].open()
    },
    removeCard (type, msg, id) {
      if (type === 'positive') {
        const index = this.courses.findIndex(c => { return c.id === id })
        this.courses.splice(index, 1)
        // this.$emit('course-change')
      }
      this.sendToast(type, msg)
    }
  }
}
</script>

<style lang="stylus">
</style>
