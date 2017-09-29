<template>
  <div class="login-page fit column items-center">
    <div>
      <div class="logo flex items-center justify-center">
        <img class="desktop-only" src="~assets/jogral-logo-web-white.svg">
      </div>
      <div class="login-card card bg-white round-borders items-center justify-center" @keyup.enter="login" v-if="forgot.view">
        <div class="card-title">
          {{ $t('forgot_password.heading') }}
        </div>
        <div class="card-content">
          <div class="row">
            <div class="auto">
              <transition name="fade" mode="out-in">
                <p class="text-center" key="submitted" v-if="forgot.submitted">{{ $t('forgot_password.result') }}</p>
                <p class="text-center" key="instruction" v-else>{{ $t('forgot_password.instructions') }}</p>
              </transition>
            </div>
          </div>
          <div class="row large-gutter">
            <div class="auto form-group" :class="{'form-group--error': $v.forgot.email.$error}">
              <div class="stacked-label">
                <input
                   type="email"
                   name="email"
                   id="email"
                   class="form__input full-width"
                   v-model="forgot.email"
                   @input="$v.forgot.email.$touch()"
                   :class="{'has-error': $v.forgot.email.$error}">
                <label class="form__label" for="email">{{ $t('labels.email') }}</label>
                <small class="form-group__message has-error" v-if="!$v.forgot.email.email">{{ $t('forgot_password.error') }}</small>
              </div>
            </div>
          </div>
          <div class="row gutter">
            <div class="auto text-center">
              <transition name="fade">
                <div v-if="!forgot.submitted">
                  <button class="secondary round big" @click="requestReset" v-if="!$v.forgot.email.$error && $v.forgot.email.$dirty">
                    {{ $t('buttons.reset_password') }}
                  </button>
                  <button class="secondary round big" disabled v-else>
                    {{ $t('buttons.reset_password') }}
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div class="login-card card bg-white round-borders items-center justify-center" @keyup.enter="login" v-else-if="org.useSso">
        <div class="card-title">
          {{ $t('login.labels.sso.heading') }}
        </div>
        <div class="card-content">
          <div class="row large-gutter">
            <div class="auto">
              {{ $t('login.labels.sso.instructions') }}
            </div>
          </div>
          <div class="row large-gutter">
            <div class="auto text-center">
              <button class="secondary full-width big" @click="goToSsoUrl">
                {{ $t('login.labels.sso.login') }}
              </button>
            </div>
          </div>
          <div class="row large-gutter">
            <div class="auto text-center">
              <a @click="switchSso(!org.useSso)">{{ $t('login.labels.sso.switch') }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="login-card card bg-white round-borders items-center justify-center" @keyup.enter="login" v-else>
        <div class="card-title">
          {{ $t('login.labels.heading') }}
        </div>
        <div class="card-content">
          <transition name="fade">
            <div class="row">
              <div class="auto bg-negative error" v-if="error">
                <p class="text-center text-white">{{ $t('login.errors.error') }}</p>
              </div>
            </div>
          </transition>
          <br>
          <div class="row large-gutter">
            <div class="auto form-group" :class="{'form-group--error': $v.creds.username.$error}">
              <div class="stacked-label">
                <input
                 type="text"
                   name="username"
                   id="username"
                   class="form__input full-width"
                   v-model="creds.username"
                   @input="$v.creds.username.$touch()"
                   :class="{'has-error': $v.creds.username.$error}">
                <label class="form__label" for="username">{{ $t('login.labels.username') }}</label>
                <small class="form-group__message has-error" v-if="!$v.creds.username.required && $v.creds.username.$dirty"></small>
              </div>
            </div>
          </div>
          <div class="row large-gutter">
            <div class="auto form-group" :class="{'form-group--error': $v.creds.password.$error}">
              <div class="stacked-label">
                <input
                   type="password"
                   name="password"
                   id="password"
                   class="form__input full-width"
                   v-model="creds.password"
                   @input="$v.creds.password.$touch()"
                   :class="{'has-error': $v.creds.password.$error}">
                <label class="form__label" for="password">{{ $t('login.labels.password') }}</label>
                <small class="form-group__message has-error" v-if="!$v.creds.password.required && $v.creds.password.$dirty"></small>
                <small class="form-group__message has-error" v-if="!$v.creds.password.minLength && $v.creds.password.$dirty"></small>
              </div>
            </div>
          </div>
          <div class="row gutter">
            <div class="auto">
              <button class="primary clear big" @click="forgot.view = true">
                {{ $t('login.labels.forgot') }}
              </button>
            </div>
            <div class="auto text-right">
              <locale-picker v-model="locale" />
            </div>
          </div>
          <div class="row">
            <div class="auto text-center">
              <button class="secondary round big" @click="login" v-if="!$v.creds.$error && $v.creds.$dirty">
                <i class="on-left">school</i>
                {{ $t('login.labels.login') }}
              </button>
              <button class="secondary round big" disabled v-else>
                <i class="on-left">school</i>
                {{ $t('login.labels.login') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <p class="login-footer text-white text-center">&copy;{{currentYear}} Jogral, L.L.C.</p>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { Loading } from 'quasar'
import { Tigris } from '../api'
import LocalePicker from './generic-partials/LocalePicker'

function load (options) {
  Loading.show(options)
}

function finish () {
  Loading.hide()
}

export default {
  name: 'login',
  props: ['currentYear'],
  data () {
    return {
      error: false,
      useLogo: true,
      // locale: '',
      locale: this.$i18n.locale(),
      org: {
        name: '',
        loginUrl: '',
        useSso: false
      },
      creds: {
        username: '',
        password: ''
      },
      forgot: {
        email: '',
        submitted: false,
        view: false
      }
    }
  },
  validations: {
    creds: {
      username: {
        required
      },
      password: {
        required,
        minLength: minLength(8)
      }
    },
    forgot: {
      email: {
        email
      }
    }
  },
  computed: mapGetters({
    auth: 'auth/auth',
    // i18n: 'auth/auth',
    token: 'token/token'
  }),
  methods: {
    ...mapActions([
    ]),
    _i18nOptions () {
      const keys = Object.keys(this.$store.state.i18n.translations)
      let opts = []
      keys.forEach(k => { opts.push({ value: k, label: this.$store.state.i18n.translations[k].lang }) })
      return opts
    },
    _checkOrRedirectToDashboard () {
      if (this.$route.name === 'logout') {
        this.logout()
      }
      if (this.token !== null) {
        this.$router.replace({name: 'index'})
      }
    },
    _doApiAuth (creds) {
      Tigris.initialize(creds).then(tigris => {
        if (!tigris._token || !tigris._token._user) {
          throw tigris
        } else {
          this.$store.commit({ type: 'auth/initialize', auth: tigris._token._user })
          this.$store.commit({ type: 'token/initialize', token: tigris._token })
          finish()
          if (tigris.token !== null) {
            this.$router.replace({name: 'index'})
          } else {
            if (process.env.NODE_ENV !== 'production') {
              console.error('Wrong')
            }
            this.errors.push({ code: '002', message: 'User is not valid.' })
          }
        }
      }).catch(e => {
        if (DEV) { console.error(e) }
        this.error = true
      })
    },
    _goToSsoUrl (url) {
      window.location.href = url
    },
    login () {
      load({ spinner: 'facebook' })
      if (this.org.useSso === true) {
        this._goToSsoUrl(this.org.loginUrl)
      } else {
        this._doApiAuth(this.creds)
      }
      finish()
    },
    logout () {
      this.$store.commit({ type: 'token/destroy' })
      this.$store.commit({ type: 'auth/destroy' })
      // Display message
    },
    requestReset () {
      const url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
      const data = {
        email: this.forgot.email,
        message: {
          subject: this.$t('forgot_password.email_message.subject'),
          body: this.$t('forgot_password.email_message.body', {url: url})
        }
      }
      Tigris.resetPassword(data.email, data.message).then(r => {
        if (r.data) {
          this.forgot.submitted = true
        }
      }).catch(e => {
        if (process.env.NODE_ENV !== 'production') { console.error(e) }
      })
    },
    switchSso (val) {
      const org = this.org
      org.useSso = val
      this.org = org
    }
  },
  watch: {
    locale (val) {
      this.$i18n.set(val)
      this.locale = val
    }
  },
  created () {
    if (Loading.isActive()) {
      Loading.hide()
    }
    this._i18nOptions()
    this._checkOrRedirectToDashboard()
  },
  components: {
    LocalePicker
  }
}
</script>

<style lang="stylus">
@import '~themes/app.variables.styl'
body
  background $login-background-color
p.login-footer
  color white
  font-weight bold
.bg-negative.error
  padding 2vh 4vw
.fade-enter-active
.fade-leave-active
  transition all 0.3s

.fade-enter
.fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity 0
  transform translateY(30px)
</style>
