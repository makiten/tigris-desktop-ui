<template>
  <div>
    <router-view :tigris="tigris" v-if="$route.name === 'user'" />
    <div class="layout-padding fit bg-light scroll" v-else>
      <div class="shadow-2 round-borders bg-white">
        <q-tabs :refs="$refs" default-tab="settings" class="primary justified shadow-1">
          <q-tab name="settings" icon="settings">{{ $t('content.admin.tabs.settings') }}</q-tab>
          <q-tab name="courses" icon="school">{{ $t('content.admin.tabs.courses') }}</q-tab>
          <!--<q-tab name="customization" icon="build">{{ $t('content.admin.tabs.customization') }}</q-tab>-->
          <q-tab name="users" icon="group">{{ $t('content.admin.tabs.users') }}</q-tab>
        </q-tabs>
        <div class="layout-padding bg-white admin">
          <div ref="settings">
            <h4>{{ $t('content.admin.accordions.settings.account.label') }}</h4>
            <p>{{ $t('content.admin.accordions.settings.account.content') }}</p>
            <table class="q-table settings-table">
              <!--
              <thead class="sr-only">
                <tr>
                  <th>Column</th>
                  <th>Setting</th>
                </tr>
              </thead>
              -->
              <tbody>
                <tr>
                  <th scope="col">{{ $t('settings.account_type') }}</th>
                  <td>{{ settings.account.type }}</td>
                </tr>
                <tr>
                  <th scope="col">{{ $t('settings.account_id') }}</th>
                  <td>{{ settings.account.id }}</td>
                </tr>
                <tr>
                  <th scope="col">{{ $t('settings.name') }}</th>
                  <td>{{ settings.name }}</td>
                </tr>
                <tr>
                  <th scope="col">{{ $t('settings.environment') }}</th>
                  <td>{{ settings.environment }}</td>
                </tr>
                <tr>
                  <th scope="col">{{ $t('settings.users') }}</th>
                  <td>{{ settings.count.users }}</td>
                </tr>
                <tr>
                  <th scope="col">{{ $t('settings.courses') }}</th>
                  <td>{{ settings.count.courses }}</td>
                </tr>
                <tr>
                  <th scope="col">{{ $t('settings.expires') }}</th>
                  <td>{{ settings.expires }}</td>
                </tr>
                <tr>
                  <th scope="col">{{ $t('settings.location') }}</th>
                  <td>{{ settings.location }}</td>
                </tr>
                <tr>
                  <th scope="col">{{ $t('settings.protocol') }}</th>
                  <td>{{ settings.protocol }}</td>
                </tr>
              </tbody>
            </table>
            <!--
            <h4>{{ $t('content.admin.accordions.settings.security.label') }}</h4>
            <p>{{ $t('content.admin.accordions.settings.security.content') }}</p>
            <p>{{ $t('coming_soon') }}</p>
            -->
            <h4>{{ $t('content.admin.accordions.settings.api.label') }}</h4>
            <p>{{ $t('content.admin.accordions.settings.api.content') }}</p>
            <p>{{ $t('coming_soon') }}</p>
          </div>

          <div ref="courses">
            <div class="row actions">
              <div>
                <h4>{{ $t('content.admin.tabs.courses') }}</h4>
              </div>
              <div class="self-center">
                <button class="big" @click="openModal('courseDetail', 'add', 'course')">
                  <i>add_circle_outline</i>
                  <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 0]">
                    {{ $t('content.admin.accordions.courses.add.button') }}
                  </q-tooltip>
                </button>
                <button class="big" @click="">
                  <i>file_download</i>
                  <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 0]">
                    {{ $t('content.admin.accordions.courses.add.upload.button') }}
                  </q-tooltip>
                </button>
              </div>
            </div>

            <h5>{{ $t('content.admin.accordions.courses.edit.label') }}</h5>
            <p>{{ $t('content.admin.accordions.courses.edit.content') }}</p>

            <div class="row gutter">
              <div class="full-width">
                <q-autocomplete v-model="terms.course" :delay="0" @search="searchCourse" @selected="selectedCourse">
                  <q-search v-model="terms.course" />
                </q-autocomplete>
              </div>
            </div>

            <div class="row wrap gutter lt-md-column">
              <template v-for="(course, index) in courses">
                <transition-group name="fade" tag="div" class="width-1of4 lt-md-auto lt-md-wrap">
                  <course-card @delete="removeCard" @open="openModal" :course="course" :tigris="tigris" v-bind:key="course" :index="index" />
                </transition-group>
              </template>
            </div>
          </div>
          <!--
              <div ref="customization">
                <h5>{{ $t('content.admin.accordions.customization.logo.label') }}</h5>
                <p>{{ $t('content.admin.accordions.customization.logo.content') }}</p>
                <h5>{{ $t('content.admin.accordions.customization.colors.label') }}</h5>
                <p>{{ $t('content.admin.accordions.customization.colors.content') }}</p>
              </div>
              -->
          <div ref="users">
            <div class="row actions">
              <div>
                <h4>{{ $t('content.admin.accordions.users.users.label') }}</h4>
              </div>
              <div class="self-center">
                <button class="big" @click="openModal('inviteUser', 'add', 'user')">
                  <i>add_circle_outline</i>
                  <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 0]">
                    {{ $t('content.admin.user.new.form.button') }}
                  </q-tooltip>
                </button>
              </div>
            </div>
            <div class="row">
              <div class="auto">
                <q-autocomplete v-model="terms.user" :delay="0" @search="searchUser" @selected="selectedUser">
                  <q-search v-model="terms.user" />
                </q-autocomplete>
              </div>
            </div>
            <div class="row actions">
              <div>
                <h5>{{ $t('content.admin.accordions.users.roles.label') }}</h5>
              </div>
              <div class="self-center">
                <!--<button class="big" @click="openModal('groupModal', 'add')">
                    <i>add_circle_outline</i>
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 0]">
                      {{ $t('content.admin.role.form.button') }}
                    </q-tooltip>
                </button>-->
              </div>
            </div>
            <div class="row gutter wrap lt-md-column">
              <template v-for="role in roles">
                <transition-group name="fade" tag="div" class="width-1of4 lt-md-auto lt-md-wrap">
                  <role-card @delete="removeCard" @modal-open="openModal('groupModal', 'edit', 'role', role)" v-bind:key="role" :role="role" />
                </transition-group>
              </template>
            </div>
            <!--<p>{{ $t('content.admin.accordions.users.roles.content') }}</p>-->
            <!--<h5>{{ $t('content.admin.accordions.users.permissions.label') }}</h5>-->
            <!--<p>{{ $t('content.admin.accordions.users.permissions.content') }}</p>-->
          </div>
        </div>

        <role-detail ref="groupModal" @add="addRole" @edit="editRole" :action="action" :auth="auth" modal="$refs.groupModal" :role="toEdit.role" :tigris="tigris" />
        <modules-list @reset-search="resetCourseSearch" :auth="auth" :course="toEdit.course" ref="modulesList" :tigris="tigris" :view="moduleView" />
        <course-detail @add="addCard" @open="openModal" @delete="removeCard" @save="updateCard" :action="action" :auth="auth" :course="toEdit.course" ref="courseDetail" :tigris="tigris" />
        <invite-user @send-toast="sendToast" ref="inviteUser" :tigris="tigris" />
        <user-detail @reset-search="resetSearch" @send-toast="sendToast" :user="toEdit.user" ref="userDetail" :tigris="tigris" />
        <exam ref="exam" @refresh="refresh" @send-toast="sendToast" :course="toEdit.course" :tigris="tigris" />
      </div>
    </div>
  </div>
</template>

<script>
import { Tigris } from '../../api'
import { mapActions, mapGetters } from 'vuex'
import { Utils, Toast } from 'quasar'
import CourseCard from './card/CourseCard'
import CourseDetail from './detail/CourseDetail'
import Exam from './assessments/Exam'
import ModulesList from './list/ModulesList'
import InviteUser from './InviteUser'
import RoleCard from './card/RoleCard'
import RoleDetail from './detail/RoleDetail'
import UserDetail from './detail/UserDetail'

export default {
  name: 'admin-panel',
  props: ['shortname'],
  data () {
    return {
      action: '',
      courses: [],
      moduleView: 'list',
      roles: [],
      terms: {
        course: '',
        user: ''
      },
      tigris: {},
      toEdit: {
        course: {},
        role: {},
        user: {}
      },
      users: []
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth',
      token: 'token/token'
    }),
    permissions () {
      return this.getPermissions()
    },
    settings () {
      return this.getSettings()
    }
  },
  watch: {
    '$route': '_onCreated'
  },
  methods: {
    ...mapActions([
    ]),
    _onCreated () {
      if (!this.auth.admin) {
        this.$router.replace({ path: '/forbidden' })
      }
      Tigris.initializeWithToken(this.auth.id, this.token).then(tigris => {
        this.tigris = tigris
      }).then(r => {
        this.getRoles().then(roles => {
          this.roles = roles
          this._getCourses().then(courses => {
            this.courses = courses
          }).then(e => {
            this._getUsers().then(users => {
              this.users = users
            })
          })
        })
      })
    },
    _getCourses () {
      return this.tigris.course.retrieve({type: 1}).then(r => {
        const courses = r.data
        courses.map(c => { c.visible = true })
        return courses
      })
    },
    _getUsers () {
      return this.tigris.user.retrieve().then(r => {
        const users = r.data
        return users
      })
    },
    _parseCourses (courses) {
      return courses.map(c => {
        return {
          label: c.title,
          secondLabel: c.description,
          icon: 'description',
          value: c.slug
        }
      })
    },
    _parseUsers (users) {
      return users.map(u => {
        return {
          label: u.shortname,
          secondLabel: u.email,
          img: u.image,
          value: u.email
        }
      })
    },
    addCard (type, msg, course) {
      if (type === 'positive') {
        this.courses.push(course)
      }
      this.sendToast(type, msg)
    },
    addRole (type, msg, role) {
      if (type === 'positive') {
        this.roles.push(role)
      }
      this.sendToast(type, msg)
    },
    editRole (type, msg) {
      this.sendToast(type, msg)
    },
    getRoles () {
      return this.tigris.role.retrieve().then(r => {
        return r.data
      })
    },
    getSettings () {
      let settings = {
        account: {
          id: '',
          type: ''
        },
        count: {
          users: 0,
          courses: 0
        },
        environment: '',
        expires: new Date().toString(),
        location: '',
        name: '',
        protocol: ''
      }
      return settings
    },
    openModal (name, action, model, obj) {
      if (action) {
        if (obj) {
          this.toEdit[model.toLowerCase()] = obj
        }
        this.action = action
      } else {
        this.action = 'add'
      }
      if (this.action === 'add' && name === 'courseDetail') {
        this.toEdit[model.toLowerCase()] = {}
      }
      this.$refs[name].open()
    },
    refresh () {
      this.$forceUpdate()
    },
    removeCard (type, msg, id, cardType = 'courses') {
      if (type === 'positive') {
        const index = this[cardType].findIndex(c => { return c.id === id })
        this[cardType].splice(index, 1)
        // this.$emit('course-change')
      }
      this.sendToast(type, msg)
    },
    resetCourseSearch () {
      this.terms.course = ''
    },
    resetSearch () {
      this._getUsers().then(users => {
        this.users = users
        this.terms.user = ''
      })
    },
    searchCourse (terms, done) {
      done(Utils.filter(terms, {field: 'label', list: this._parseCourses(this.courses)}))
    },
    selectedCourse (item) {
      const course = this.courses.filter(c => { return c.slug === item.value })[0]
      this.terms.course = ''
      this.openModal('modulesList', 'add', 'course', course)
    },
    searchUser (terms, done) {
      done(Utils.filter(terms, {field: 'label', list: this._parseUsers(this.users)}))
    },
    selectedUser (item) {
      const user = this.users.filter(u => { return u.email === item.value })[0]
      this.terms.user = ''
      // this.$router.push({ path: `/admin/users/${user.id}` })
      this.openModal('userDetail', 'edit', 'user', user)
    },
    sendToast (type, msg) {
      Toast.create[type]({
        html: msg
      })
    },
    switchViewOrClose (view) {
      if (this.moduleView === 'list') {
        this.$refs.modulesList.close()
      } else {
        this.moduleView = view
      }
    },
    updateCard (type, msg, course) {
      if (type === 'positive') {
        const idx = this.courses.findIndex(c => c.id === course.id)
        this.courses[idx] = course
      }
      this.sendToast(type, msg)
    }
  },
  created () {
    this._onCreated()
  },
  components: {
    CourseCard,
    CourseDetail,
    Exam,
    ModulesList,
    InviteUser,
    RoleCard,
    RoleDetail,
    UserDetail
  }
}
</script>

<style lang="stylus">
@import '~themes/app.variables.styl'
.admin
  button
    color $primary
.actions
  button
    color $primary
    padding 0.25vh 0.25vw

.fade-enter-active
.fade-leave-active
  transition all 1s

.fade-enter
.fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity 0
  transform translateY(30px)
.settings-table
  th
    text-align left
</style>
