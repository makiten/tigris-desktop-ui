<template>
  <q-layout class="bg-light" v-if="auth">
    <div slot="header" class="toolbar">
      <div class="row flex full-width no-margin no-padding">
        <div class="auto">
          <q-toolbar-title :padding="1">
            <span class="mobile-only">{{app.label}}</span>
            <img class="desktop-only" src="~assets/jogral-logo-web-white.svg">
          </q-toolbar-title>
        </div>
        <div class="auto text-center">
        </div>
        <div class="auto text-right">
          <button class="big" @click="$router.push({path: '/'})">
            <i>home</i>
            <q-tooltip anchor="center left" self="center right" :offset="[0, 0]">
              <strong>{{ $t('header.nav.tooltips.dashboard') }}</strong>
            </q-tooltip>
          </button>
          <button class="big" @click="$router.push({path: '/courses'})">
            <i>school</i>
            <q-tooltip anchor="center left" self="center right" :offset="[0, 0]">
              <strong>{{ $t('header.nav.tooltips.course') }}</strong>
            </q-tooltip>
          </button>
          <button class="big relative-position notifications" @click="$refs.notificationsModal.open()">
            <span class="floating circular label bg-secondary" v-if="unreadNotifications > 0">{{ unreadNotifications }}</span>
            <template v-if="notifications.length > 0">
              <i>notifications_on</i>
              <q-tooltip anchor="center left" self="center right" :offset="[0, 0]">
                <strong>{{ $t('header.nav.tooltips.notifications.label') }}</strong>
              </q-tooltip>
            </template>
            <template v-else>
              <i>notifications_none</i>
              <q-tooltip anchor="center left" self="center right" :offset="[0, 0]">
                <strong>{{ $t('header.nav.tooltips.notifications.empty_message') }}</strong>
              </q-tooltip>
            </template>
          </button>
          <button class="big">
            <i>account_circle</i>
            <q-popover ref="popover">
              <div class="list item-delimiter highlight">
                <div class="item item-link" @click="$router.push({name: 'admin'})" v-if="auth.admin">
                  <div class="item-content">
                    <a>{{ $t('header.nav.admin') }}</a>
                  </div>
                </div>
                <div class="item item-link" v-if="auth !== null" @click="openModalClosePopover('accountModal', $refs.popover)">
                  <div class="item-content">
                    <a>{{ $t('header.nav.account') }}</a>
                  </div>
                </div>
                <div class="item item-link" @click="$router.replace({path: '/login'})" v-if="auth === null">
                  <div class="item-content">
                    <a>{{ $t('header.nav.login') }}</a>
                  </div>
                </div>
                <div class="item item-link" @click="logout()" v-else>
                  <div class="item-content">
                    <a>{{ $t('header.nav.logout') }}</a>
                  </div>
                </div>
              </div>
            </q-popover>
            <q-tooltip anchor="center left" self="center right" :offset="[0, 0]">
              <strong>{{ $t('header.nav.account') }}</strong>
            </q-tooltip>
          </button>
          <button class="big">
            <i>more_horiz</i>
            <q-popover ref="aboutPopover">
              <div class="list item-delimiter highlight">
                <div class="item item-link" @click="openModalClosePopover('aboutModal', $refs.aboutPopover)">
                  <div class="item-content">
                    <a>{{ $t('header.nav.about.label') }}</a>
                  </div>
                </div>
              </div>
            </q-popover>
            <q-tooltip anchor="center left" self="center right" :offset="[0, 0]">
              <strong>{{ $t('header.nav.tooltips.more') }}</strong>
            </q-tooltip>
          </button>
        </div>
      </div>
    </div>

    <dashboard :auth="auth" :enrollments="enrollments" :recommended="courses.recommended" :token="token" v-if="$route.fullPath.toLowerCase() == '/'" class="layout-view" />
    <router-view :auth="auth" :label="$t('header.nav.tooltips.toc')" :token="token" class="layout-view" v-else></router-view>

    <div class="toolbar" slot="footer">
      <div class="row fit">
        <div>
          <strong>&copy;{{currentYear}} Jogral, L.L.C.</strong>
        </div>
        <div class="auto text-right vertical-top">
          <q-select
             type="list"
             v-model="locale"
             @input="$i18n.set($event)"
             :options="localeOpts"></q-select>
        </div>
      </div>
    </div>

    <q-modal ref="aboutModal" :content-css="{minWidth: '40vw', minHeight: '30vh'}">
      <div class="layout-padding">
        <div class="row">
          <div class="auto">
            <h4>{{ $t('header.nav.about.label') }}</h4>
          </div>
          <div class="auto text-right">
            <button @click="$refs.aboutModal.close()">
              <i>close</i>
            </button>
          </div>
        </div>
        <p v-html="$t('header.nav.about.message')"></p>
        <button class="big round primary" @click="$refs.aboutModal.close()">
          {{ $t('header.nav.about.close') }}
        </button>
      </div>
    </q-modal>

    <q-modal ref="notificationsModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <notifications :notifications="notifications" :modal="$refs.notificationsModal"></notifications>
    </q-modal>

    <q-modal ref="accountModal" class="maximized">
      <q-layout>
        <div class="toolbar" slot="header">
          <button @click="$refs.accountModal.close()">
            <i>keyboard_arrow_left</i>
          </button>
          <q-toolbar-title :padding="1">
            <button @click="$refs.accountModal.close()">
              {{ $t('header.nav.account') }}
            </button>
          </q-toolbar-title>
          <button @click="$refs.accountModal.close()">
            <i>close</i>
          </button>
        </div>
        <div class="layout-view">
          <div class="layout-padding fit bg-light scroll">
            <div class="shadow-2 round-borders bg-white">
              <q-tabs :refs="$refs" default-tab="settings" class="primary justified shadow-1">
                <q-tab name="settings" icon="settings">{{ $t('content.modals.account.settings.tab') }}</q-tab>
                <q-tab name="profile" icon="face">{{ $t('content.modals.account.profile.tab') }}</q-tab>
              </q-tabs>
              <div>
                <div ref="settings">
                  <settings :auth="auth" :modal="$refs.accountModal" :tigris="tigris" @toast="sendToast" @refresh="refreshAuth" />
                </div>
                <div ref="profile">
                  <profile :auth="auth" :modal="$refs.accountModal" :tigris="tigris" @toast="sendToast" @refresh="refreshAuth" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-layout>
    </q-modal>
  </q-layout>
</template>

<script>
import { Loading, Toast } from 'quasar'
Loading.show()
import { Tigris } from '../api'
import { mapActions, mapGetters } from 'vuex'
import Admin from './admin/Admin'
import Profile from './account/Profile'
import Settings from './account/Settings'
import Dashboard from './generic-partials/Dashboard'
import Notifications from './generic-partials/Notifications'
import CourseCard from './courses/CourseCard'

export default {
  props: ['currentYear'],
  data () {
    return {
      app: { label: 'Jogral' },
      courses: {},
      enrollments: {},
      locale: this.$i18n.locale(),
      localeOpts: this._i18nOptions(),
      notifications: [],
      nextUrl: '',
      tigris: {}
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth',
      token: 'token/token'
    }),
    unreadNotifications () {
      const unread = this.notifications.reduce(function (s, e) {
        if (!e.is_read) {
          return s
        }
      }, 0)
      return unread
    }
  },
  watch: {
    '$route': function (val) {
      this._onCreated(this.auth.id, this.token)
    }
  },
  methods: {
    ...mapActions([
    ]),
    _i18nOptions () {
      const keys = Object.keys(this.$store.state.i18n.translations)
      let opts = []
      keys.forEach(k => { opts.push({ value: k, label: this.$store.state.i18n.translations[k].lang }) })
      return opts
    },
    _onCreated (id, token) {
      Tigris.initializeWithToken(id, token).then(tigris => {
        this.$store.commit({ type: 'auth/initialize', auth: tigris._token._user })
        this.$store.commit({ type: 'token/initialize', token: tigris._token })
        this.tigris = tigris
        if (this.auth.id) {
          this.getUserCourses().then(courses => {
            this.courses = courses
            this.getRecommendedCourses().then(r => {
              this.courses.recommended = r
              this.INTERVAL_2e4$getUserNotifications().then(notifications => {
                this.notifications = notifications
                if (Loading.isActive()) {
                  Loading.hide()
                }
              })
            })
          })
        } else {
          this.logout()
        }
      }).catch(e => {
        if (process.env.NODE_ENV !== 'production') {
          console.error(e)
        }
        this.logout()
      })
    },
    INTERVAL_2e4$getUserNotifications () {
      return this.tigris.notification.retrieve({ recipient: this.auth.id }).then(r => {
        return r.data
      })
    },
    logout () {
      this.$store.commit({ type: 'token/destroy' })
      this.$store.commit({ type: 'auth/destroy' })
      if (Loading.isActive()) {
        Loading.hide()
      }
      this.$router.replace({ path: '/login' })
    },
    getRecommendedCourses () {
      return this.tigris.course.retrieve({ type: 2 }).then(r => {
        return r.data
      })
    },
    getUserCourses () {
      return this.tigris.user.retrieve(this.auth.id).then(r => {
        var courses = {}
        var extractCoursesFromEnrollments = function (enrollments) {
          var courses = []
          for (var i = 0; i < enrollments.length; i++) {
            courses.push(enrollments[i].course)
          }
          return courses
        }
        const enrollments = r.data.enrollments
        this.enrollments = enrollments
        courses.in_progress = extractCoursesFromEnrollments(enrollments.in_progress)
        courses.completed = extractCoursesFromEnrollments(enrollments.completed)
        return courses
      })
    },
    openModalClosePopover (name, popover) {
      this.$refs[name].open()
      popover.close()
    },
    refreshAuth () {
      this._onCreated(this.auth.id, this.token)
    },
    sendToast (type, statement) {
      Toast.create[type]({
        html: statement
      })
    }
  },
  mounted () {
    if (Loading.isActive()) {
      Loading.hide()
    }
  },
  created () {
    if (this.token && this.auth) {
      this._onCreated(this.auth.id, this.token)
    } else {
      this.logout()
    }
  },
  components: {
    Admin,
    Profile,
    Settings,
    Dashboard,
    Notifications,
    CourseCard
  }
}
</script>

<style lang="stylus">
.notifications
  span.label
    top 0vh
.lang-picker
  margin-right 1vw
.toolbar
  img
    margin-top 1vh
  button.big
    padding 0.8vh 0.2vw 0
</style>
