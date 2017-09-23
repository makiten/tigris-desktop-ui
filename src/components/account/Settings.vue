<template>
  <div class="layout-padding">
    <div>
      <h4>{{ $t('content.modals.account.settings.forms.username.heading') }}</h4>
      <form name="change-username" method="post" enctype="application/x-www-form-urlencoded" v-on:submit.prevent>
        <div class="row gutter lt-md-column">
          <div class="auto form-group" :class="{'form-group--error': $v.user.shortname.$error}">
            <div class="stacked-label">
              <input
                 type="text"
                 class="form__input full-width"
                 id="username"
                 v-model="user.shortname"
                 @input="$v.user.shortname.$touch()"
                 :class="{'has-error': $v.user.shortname.$error}">
              <label class="form__label" for="username">{{ $t('content.modals.account.settings.forms.username.fields.shortname') }}</label>
            </div>
          </div>
          <div>
            <div class="lt-md">
              <button @click="updateUser" class="secondary big full-width" v-if="!$v.user.$error || !$v.user.$dirty">
                {{ $t('content.modals.account.settings.forms.username.button') }}
              </button>
              <button @click="updateUser" class="secondary big full-width" disabled v-else>
                {{ $t('content.modals.account.settings.forms.username.button') }}
              </button>
            </div>
            <div class="gt-sm">
              <button @click="updateUser" class="secondary big round" v-if="!$v.user.$error || !$v.user.$dirty">
                {{ $t('content.modals.account.settings.forms.username.button') }}
              </button>
              <button @click="updateUser" class="secondary big round" disabled v-else>
                {{ $t('content.modals.account.settings.forms.username.button') }}
              </button>
            </div>
          </div>
        </div>
      </form>
      <h4>{{ $t('content.modals.account.settings.forms.password.heading') }}</h4>
      <form name="change-password" method="post" enctype="application/x-www-form-urlencoded" v-on:submit.prevent>
        <div class="row gutter lt-md-column">
          <div class="auto form-group" :class="{'form-group--error': $v.password.new_password.$error}">
            <div class="stacked-label">
              <input
                 id="password1"
                 type="password"
                 class="form__input full-width"
                 v-model="password.new_password"
                 @input="$v.password.new_password.$touch()"
                 :class="{'has-error': $v.password.new_password.$error}">
              <label class="form__label" for="password1">{{ $t('content.modals.account.settings.forms.password.fields.password1.label') }}</label>
              <small
                 class="form-group__message has-error"
                 v-if="!$v.password.new_password.required && $v.password.new_password.$dirty">
                {{ $t('content.modals.account.settings.forms.password.fields.password1.error.required') }}
              </small>
              <small
                 class="form-group__message has-error"
                 v-if="!$v.password.new_password.minLength && $v.password.new_password.$dirty">
                {{ $t('content.modals.account.settings.forms.password.fields.password1.error.minLength') }}
              </small>
            </div>
          </div>
          <div class="auto form-group" :class="{'form-group--error': $v.password.confirm_password.$error}">
            <div class="stacked-label">
              <input
                 id="password2"
                 type="password"
                 class="form__input full-width"
                 v-model="password.confirm_password"
                 @input="$v.password.confirm_password.$touch()"
                 :class="{'has-error': $v.password.confirm_password.$error}">
              <label class="form__label" for="password2">{{ $t('content.modals.account.settings.forms.password.fields.password2.label') }}</label>
              <small
                 class="form-group__message has-error"
                 v-if="!$v.password.confirm_password.sameAsPassword && $v.password.confirm_password.$dirty">
                {{ $t('content.modals.account.settings.forms.password.fields.password2.error.sameAs') }}
              </small>
            </div>
          </div>
          <div>
            <div class="lt-md">
              <button class="big full-width secondary" @click="updatePassword" v-if="!$v.password.$error || !$v.password.$dirty">
                {{ $t('content.modals.account.settings.forms.password.button') }}
              </button>
              <button class="big full-width secondary" disabled v-else>
                {{ $t('content.modals.account.settings.forms.password.button') }}
              </button>
            </div>
            <div class="gt-sm">
              <button class="big round secondary" @click="updatePassword" v-if="!$v.password.$error || !$v.password.$dirty">
                {{ $t('content.modals.account.settings.forms.password.button') }}
              </button>
              <button class="big round secondary" disabled v-else>
                {{ $t('content.modals.account.settings.forms.password.button') }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'settings',
  props: ['auth', 'tigris'],
  data () {
    return {
      password: {
        new_password: '',
        confirm_password: ''
      },
      user: {
        shortname: ''
      }
    }
  },
  validations: {
    user: {
      shortname: {
        required
      }
    },
    password: {
      new_password: {
        required,
        minLength: minLength(8)
      },
      confirm_password: {
        sameAsPassword: sameAs('new_password')
      }
    }
  },
  watch: {
  },
  methods: {
    _onCreated () {
      this.user.shortname = this.auth.shortname
    },
    togglePassword () {
    },
    updatePassword () {
      if (!(this.password.new_password === '' || this.password.confirm_password === '')) {
        const data = {fields: {password: this.password.new_password}, action: ''}
        this.tigris.user.update(this.auth.id, null, data).then(r => {
          if (r.data) {
            for (var f in this.password) {
              this.password[f] = ''
            }
            this.$v.password.$reset()
            this.$v.password.new_password.$reset()
            this.$v.password.confirm_password.$reset()
            this.$emit('refresh')
            this.$emit('toast', 'positive', this.$t('content.modals.account.settings.toast.success'))
          } else {
            this.$emit('toast', 'negative', this.$t('content.modals.account.settings.toast.failure'))
          }
        })
      }
    },
    updateUser () {
      const data = {fields: {shortname: this.user.shortname}, action: ''}
      this.tigris.user.update(this.auth.id, null, data).then(r => {
        if (r.data) {
          this.$v.user.$reset()
          this.$v.user.shortname.$reset()
          this.$emit('refresh')
          this.$emit('toast', 'positive', this.$t('content.modals.account.settings.toast.success'))
        } else {
          this.$emit('toast', 'negative', this.$t('content.modals.account.settings.toast.failure'))
        }
      }).catch(e => {})
    }
  },
  created () {
    this._onCreated()
  }
}
</script>

<style lang="stylus">
</style>
