<template>
  <div class="login-page window-height window-width column items-center">
    <div>
      <div class="logo flex items-center justify-center">
        <img class="desktop-only" src="~assets/jogral-logo-web-white.svg">
      </div>
      <div class="login-card card bg-white round-borders items-center justify-center" @keyup.enter="login">
        <div class="card-title">
          {{ $t('verify.heading') }}
        </div>
        <div class="card-content">
          <form name="set-password" method="post" enctype="application/x-www-form-urlencoded" v-on:submit.prevent v-if="emailToken.value !== null && emailToken.valid">
            <p>{{ $t('verify.instructions') }}</p>
            <div class="row large-gutter">
              <div class="auto form-group" :class="{'form-group--error': $v.form.password1.$error}">
                <div class="stacked-label">
                  <input
                     id="password1"
                     type="password"
                     class="form__input full-width"
                     v-model="form.password1"
                     @input="$v.form.password1.$touch()"
                     :class="{'has-error': $v.form.password1.$error}">
                  <label class="form__label" for="password1">{{ $t('content.modals.account.settings.forms.password.fields.password1.label') }}</label>
                  <small class="form-group__message has-error" v-if="!$v.form.password1.required && $v.form.password1.$dirty">{{ $t('content.modals.account.settings.forms.password.fields.password1.error.required') }}</small>
                  <small class="form-group__message has-error" v-if="!$v.form.password1.minLength">{{ $t('content.modals.account.settings.forms.password.fields.password1.error.minLength') }}</small>
                </div>
              </div>
            </div>
            <div class="row large-gutter">
              <div class="auto form-group" :class="{'form-group--error': $v.form.password2.$error}">
                <div class="stacked-label">
                  <input
                     id="password2"
                     type="password"
                     class="form__input full-width"
                     v-model="form.password2"
                     @input="$v.form.password2.$touch()"
                     :class="{'has-error': $v.form.password2.$error}">
                  <label class="form__label" for="password2">{{ $t('content.modals.account.settings.forms.password.fields.password2.label') }}</label>
                  <small class="form-group__message has-error" v-if="!$v.form.password2.sameAsPassword && ($v.form.password1.$dirty || $v.form.password2.$dirty)">{{ $t('content.modals.account.settings.forms.password.fields.password2.error.sameAs') }}</small>
                </div>
              </div>
            </div>
            <div class="row large-gutter">
              <div>
                <button class="big round secondary" @click="finalize" v-if="!$v.form.$error">
                  {{ $t('content.modals.account.settings.forms.password.button') }}
                </button>
                <button class="big round secondary" disabled v-else>
                  {{ $t('content.modals.account.settings.forms.password.button') }}
                </button>
              </div>
            </div>
          </form>
          <p class="text-center" v-else-if="!(emailToken.value === null || emailToken.valid)">
            {{ $t('verify.errors.invalid') }}
          </p>
          <p class="text-center" v-else>
            {{ $t('verify.errors.no_token') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { Tigris } from '../api'
export default {
  name: 'verify',
  props: [],
  data () {
    return {
      emailToken: {},
      form: {
        password1: '',
        password2: ''
      }
    }
  },
  watch: {
    emailToken (val) {
      // this.emailToken = val // this._processToken(this.$route.params.token)
    }
  },
  validations: {
    form: {
      password1: {
        required,
        minLength: minLength(8)
      },
      password2: {
        sameAsPassword: sameAs('password1')
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
    _doApiAuth (tigris) {
      this.$store.commit({ type: 'auth/initialize', auth: tigris._token._user })
      this.$store.commit({ type: 'token/initialize', token: tigris._token })
      if (tigris.token !== null) {
        this.$router.replace({name: 'index'})
      }
    },
    _onCreated () {
      this._processToken(this.$route.params.token).then(t => {
        this.emailToken = t
      })
    },
    _processToken (token) {
      const emailToken = {}
      emailToken.value = token
      return this.validateToken(emailToken.value).then(data => {
        emailToken.valid = data['valid?']
        emailToken.email = data.email
        emailToken.id = data.id
        console.log(emailToken)
        return emailToken
      })
    },
    finalize () {
      if (!(this.form.password1 === '' || this.form.password2 === '')) {
        Tigris.finalize(this.emailToken.id, this.emailToken.email, this.form.password1).then(tigris => {
          this._doApiAuth(tigris)
        }).catch(e => { console.error(e) })
      }
    },
    validateToken (token) {
      return Tigris.validate(token).then(data => {
        return data
      })
    }
  },
  created () {
    this._onCreated()
  }
}
</script>

<style lang="stylus">
@import '~themes/app.variables.styl'
body
  background $login-background-color
</style>
