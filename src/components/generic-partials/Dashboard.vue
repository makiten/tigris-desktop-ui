<template>
  <div>
    <div class="layout-padding full-width">

      <div class="row full-width generic-margin">
        <div class="fit">
          <h1 class="no-margin" v-if="auth.first_name !== null">{{ $t('content.dashboard.headings.greeting.with_name', {name: auth.first_name}) }}!</h1>
          <h1 class="no-margin" v-else-if="auth.shortname !== null">{{ $t('content.dashboard.headings.greeting.with_name', {name: auth.shortname}) }}!</h1>
          <h1 class="no-margin" v-else>{{ $t('content.dashboard.headings.greeting.without_name') }}!</h1>
          <p>{{ $t('content.dashboard.welcome') }}</p>
        </div>
      </div>

      <!--<search :tigris="tigris" />-->

      <div class="row full-width group generic-margin">
        <div class="fit">

          <h4>{{ $t('content.dashboard.headings.your_list') }}</h4>

          <div class="shadow-2 round-borders">
            <q-tabs :refs="$refs" default-tab="tab-current" class="primary justified shadow-1">
              <q-tab name="tab-current" icon="work">{{ $t('content.dashboard.in_progress') }}</q-tab>
              <q-tab name="tab-complete" icon="done">{{ $t('content.dashboard.completed') }}</q-tab>
            </q-tabs>

            <div class="content bg-white">
              <div ref="tab-current">
                <div class="row gutter lt-md-column">
                  <div v-if="typeof enrollments.in_progress === 'undefined' || enrollments.in_progress.length === 0" class="auto text-center">
                    <p>
                      {{ $t('content.dashboard.empty') }}
                    </p>
                    <div class="lt-md">
                      <button class="secondary full-width clear big" @click="$router.push({ name: 'courses' })">
                        <i>school</i>
                        {{ $t('content.dashboard.register') }}
                      </button>
                    </div>
                    <div class="gt-sm">
                      <button class="secondary round clear big" @click="$router.push({ name: 'courses' })">
                        <i>school</i>
                        {{ $t('content.dashboard.register') }}
                      </button>
                    </div>
                  </div>
                  <div class="width-1of3 sm-auto sm-wrap" v-for="enrollment in enrollments.in_progress" v-else>
                    <course-card :course="enrollment.course" :currentUrl="enrollment.progress.modules.current.slug" :status="'in-progress'" :tigris="tigris" v-if="typeof enrollment.progress.modules !== 'undefined'" />
                    <course-card :course="enrollment.course" :status="'in-progress'" :tigris="tigris" v-else/>
                  </div>
                </div>
              </div>

              <div ref="tab-complete">
                <div class="row gutter lt-md-column">
                  <div v-if="typeof enrollments.completed === 'undefined' || enrollments.completed.length === 0" class="auto text-center">
                    <p>
                      {{ $t('content.dashboard.empty') }}
                    </p>
                  </div>
                  <div class="width-1of3 sm-auto sm-wrap" v-for="enrollment in enrollments.completed" v-else>
                    <course-card :course="enrollment.course" :status="'completed'" :tigris="tigris" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row full-width group generic-margin">
        <div class="fit">
          <h4>{{ $t('content.dashboard.headings.recommended_list') }}</h4>
          <div class="content">
            <div class="row gutter no-margin lt-md-column">
              <div class="width-1of4 sm-auto sm-wrap" v-for="course in recommended">
                <course-card :course="course" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tigris } from '../../api'
import { mapGetters } from 'vuex'
import CourseCard from '../courses/CourseCard'
import Search from './Search'
export default {
  name: 'dashboard',
  props: ['auth', 'enrollments', 'recommended', 'token'],
  data () {
    return {
      search: { model: '', results: [] },
      tigris: {}
    }
  },
  computed: {
    ...mapGetters({})
  },
  watch: {
    recommended (val) {
      this.recommended = val
    }
  },
  methods: {
    _onCreated (authId, token) {
      Tigris.initializeWithToken(authId, token).then(tigris => {
        this.tigris = tigris
      }).catch(e => {})
    }
  },
  created () {
    this._onCreated(this.auth.id, this.token)
  },
  components: {
    CourseCard,
    Search
  }
}
</script>

<style lang="styl">
div.content
  padding 1vh 0.85vw 1vh 0
.q-tab
  font-family 'oxygenbold'
</style>
