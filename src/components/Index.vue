<template>
  <q-layout class="bg-light" v-if="auth">
    <div slot="header" class="toolbar">
      <div class="row flex full-width no-margin no-padding">
        <div class="auto">
          <q-toolbar-title :padding="1">
            <span class="mobile-only vertical-middle">{{app.label}}</span>
            <img class="desktop-only vertical-middle" src="~assets/jogral-logo-web-white.svg">
            <span class="inline-block vertical-middle" style="padding-left:1vw">Tigris</span>
            <small class="inline-block vertical-bottom" style="padding-left:0.1vw">β</small>
          </q-toolbar-title>
        </div>
        <div class="auto text-center lt-md">
          <locale-picker v-model="locale" />
        </div>
        <div class="auto text-right lt-md">
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
                <!--
                <div class="item item-link" @click="openModalClosePopover('licenseModal', $refs.aboutPopover)">
                  <div class="item-content">
                    <a>{{ $t('header.nav.license.label') }}</a>
                  </div>
                </div>
                <div class="item item-link" @click="openModalClosePopover('privacyModal', $refs.aboutPopover)">
                  <div class="item-content">
                    <a>{{ $t('header.nav.privacy.label') }}</a>
                  </div>
                </div>
                <div class="item item-link" @click="openModalClosePopover('termsModal', $refs.aboutPopover)">
                  <div class="item-content">
                    <a>{{ $t('header.nav.terms.label') }}</a>
                  </div>
                </div>
                -->
              </div>
            </q-popover>
            <q-tooltip anchor="center left" self="center right" :offset="[0, 0]">
              <strong>{{ $t('header.nav.tooltips.more') }}</strong>
            </q-tooltip>
          </button>
        </div>
        <div class="auto text-right gt-sm">
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
                <!--
                <div class="item item-link" @click="openModalClosePopover('licenseModal', $refs.aboutPopover)">
                  <div class="item-content">
                    <a>{{ $t('header.nav.license.label') }}</a>
                  </div>
                </div>
                <div class="item item-link" @click="openModalClosePopover('privacyModal', $refs.aboutPopover)">
                  <div class="item-content">
                    <a>{{ $t('header.nav.privacy.label') }}</a>
                  </div>
                </div>
                <div class="item item-link" @click="openModalClosePopover('termsModal', $refs.aboutPopover)">
                  <div class="item-content">
                    <a>{{ $t('header.nav.terms.label') }}</a>
                  </div>
                </div>
                -->
              </div>
            </q-popover>
            <q-tooltip anchor="center left" self="center right" :offset="[0, 0]">
              <strong>{{ $t('header.nav.tooltips.more') }}</strong>
            </q-tooltip>
          </button>
        </div>
      </div>
    </div>

    <dashboard :enrollments="enrollments"
               :recommended="courses.recommended"
               :tigris="tigris"
               v-if="$route.fullPath.toLowerCase() == '/'"
               class="layout-view" />
    <router-view :label="$t('header.nav.tooltips.toc')"
                 :notifications="notifications"
                 :tigris="tigris"
                 class="layout-view" v-else></router-view>

    <div class="toolbar" slot="footer">
      <q-toolbar-title :padding="0" class="gt-sm">
        &copy;{{currentYear}} Jogral, L.L.C.
      </q-toolbar-title>
      <div class="auto flex justify-end gt-sm">
        <locale-picker v-model="locale" />
      </div>
      <div class="auto lt-md">
        <q-tabs slot="navigation">
          <q-tab icon="home" route="/" exact>{{ $t('header.nav.tooltips.dashboard') }}</q-tab>
          <q-tab icon="school" route="/courses" exact>{{ $t('header.nav.tooltips.course') }}</q-tab>
          <q-tab icon="notifications_none" route="/notifications" v-if="unreadNotifications === 0">
            {{ $t('header.nav.tooltips.notifications.label') }}
          </q-tab>
          <q-tab icon="notifications_active" route="/notifications" v-else>
            {{ $t('header.nav.tooltips.notifications.label') }}
            <span class="circular label bg-secondary">{{ unreadNotifications }}</span>
          </q-tab>
        </q-tabs>
      </div>
    </div>

    <generic-modal ref="aboutModal" :contentCss="{minWidth: '40vw', minHeight: '30vh'}" />

    <generic-modal ref="licenseModal" :maximized="true">
      <h4 slot="header">{{ $t('header.nav.license.label') }}</h4>
      <div slot="content">
      </div>
    </generic-modal>

    <generic-modal ref="privacyModal" :maximized="true">
      <h4 slot="header">{{ $t('header.nav.privacy.label') }}</h4>
      <div slot="content">
      </div>
    </generic-modal>

    <generic-modal ref="termsModal" :maximized="true">
      <h4 slot="header">{{ $t('header.nav.terms.label') }}</h4>
      <div slot="content">
      </div>
    </generic-modal>

    <notifications :notifications="notifications" ref="notificationsModal" />

    <account :tigris="tigris" ref="accountModal" @refresh="refreshAuth" @toast="sendToast" />
  </q-layout>
</template>

<script>
import { Toast } from 'quasar'
// import { Tigris } from '../api'
import { mapActions, mapGetters } from 'vuex'
import Account from './account/Account'
import Admin from './admin/Admin'
import Profile from './account/Profile'
import Settings from './account/Settings'
import Dashboard from './generic-partials/Dashboard'
import Notifications from './generic-partials/Notifications'
import CourseCard from './courses/CourseCard'
import GenericModal from './modals/GenericModal'
import LocalePicker from './generic-partials/LocalePicker'
import Loader from '../loader.js'

export default {
  props: ['currentYear'],
  data () {
    return {
      app: { label: 'Jogral' },
      courses: {},
      enrollments: {},
      locale: this.$i18n.locale(),
      notifications: [],
      nextUrl: '',
      tigris: {}
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/getUser',
      token: 'token/getToken'
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
    locale (val) {
      this.$i18n.set(val)
      this.locale = val
    },
    '$route': function (to, from) {
      this._onCreated(this.auth, this.token)
    }
  },
  methods: {
    ...mapActions([
    ]),
    _verifyLoggedIn () {
      if (this.auth && this.token) {
        this._onCreated(this.auth, this.token)
      } else {
        console.log(this.auth, this.token)
        // this.logout()
      }
    },
    _onCreated (auth, token) {
      this.$store.dispatch({ type: 'auth/refresh', user: auth, token: token }).then(tigris => {
        this.$store.dispatch({ type: 'token/initialize', token: tigris._token })
        this.tigris = tigris
      }).then(() => {
        return this.getUserCourses()
      }).then(courses => {
        this.courses = courses
        return this.getRecommendedCourses()
      }).then(r => {
        this.courses.recommended = r
        return this.INTERVAL_2e4$getUserNotifications()
      }).then(notifications => {
        this.notifications = notifications
        this.hideLoader()
      }).catch(e => {
        if (DEV) { console.error(e) }
        this.logout()
      })
    },
    INTERVAL_2e4$getUserNotifications () {
      return this.tigris.notification.retrieve({ recipient: this.auth.id }).then(r => {
        return r.data
      })
    },
    logout () {
      this.$store.dispatch('token/destroy')
      this.$store.dispatch('auth/destroy')
      this.hideLoader()
      this.$router.replace('/login')
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
      this.$refs.accountModal.close()
      this._onCreated(this.token)
    },
    sendToast (type, statement) {
      Toast.create[type]({
        html: statement
      })
    },
    showLoader () {
      Loader.show()
    },
    hideLoader () {
      Loader.hide()
    }
  },
  mounted () {
    this.$nextTick(function () { this.hideLoader() })
  },
  beforeCreate () {
  },
  created () {
    this.showLoader()
    if (this.auth && this.token) this._onCreated(this.auth, this.token)
    else this.logout()
  },
  components: {
    Account,
    Admin,
    Profile,
    Settings,
    Dashboard,
    Notifications,
    CourseCard,
    GenericModal,
    LocalePicker
  }
}
</script>

<style lang="stylus">
.gt-sm
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
    i
      color #fff
</style>
