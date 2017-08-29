<template>
  <div class="login-page window-height window-width column items-center">
    <div>
      <div class="logo flex items-center justify-center">
        <img class="desktop-only" src="~assets/jogral-logo-web-white.svg">
      </div>
      <div class="login-card card bg-white round-borders items-center justify-center" @keyup.enter="login" v-if="org.useSso">
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
          <div class="row large-gutter" v-if="error">
            <div class="auto">
            </div>
          </div>
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
          <div class="row">
            <div class="auto text-center">
              <button class="secondary round big" @click="login" v-if="!$v.creds.$error">
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
      <p class="login-footer text-center">&copy;{{currentYear}} Jogral, L.L.C.</p>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { Loading } from 'quasar'
import { Tigris } from '../api'

export default {
  name: 'login',
  props: ['currentYear'],
  data () {
    return {
      error: false,
      useLogo: true,
      org: {
        name: '',
        loginUrl: '',
        useSso: false
      },
      creds: {
        username: '',
        password: ''
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
    }
  },
  computed: mapGetters({
    auth: 'auth/auth',
    token: 'token/token'
  }),
  methods: {
    ...mapActions([
    ]),
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
        if (tigris._token === null || tigris._token._user === null) {
          throw tigris
        } else {
          this.$store.commit({ type: 'auth/initialize', auth: tigris._token._user })
          this.$store.commit({ type: 'token/initialize', token: tigris._token })
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
        if (process.env.NODE_ENV !== 'production') {
          console.error(e)
        }
        this.error = true
      })
    },
    _goToSsoUrl (url) {
      window.location.href = url
    },
    login () {
      if (this.org.useSso === true) {
        this._goToSsoUrl(this.org.loginUrl)
      } else {
        Loading.show()
        this._doApiAuth(this.creds)
        Loading.hide()
      }
    },
    logout () {
      this.$store.commit({ type: 'token/destroy' })
      this.$store.commit({ type: 'auth/destroy' })
      // Display message
    },
    switchSso (val) {
      const org = this.org
      org.useSso = val
      this.org = org
    }
  },
  watch: {
  },
  created () {
    if (Loading.isActive()) {
      Loading.hide()
    }
    this._checkOrRedirectToDashboard()
  },
  components: {
    Loading
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
</style>
