<template>
  <q-modal ref="userDetail" :content-css="{minWidth: '80vw', minHeight: '60vh'}">
    <q-layout>
      <div class="full-width scroll">
        <div class="row">
          <div class="auto text-right">
            <button @click="$refs.userDetail.close()">
              <i class="text-primary">close</i>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="layout-padding fit">
            <h3>{{ $t('content.admin.user.edit.heading', {n: user.shortname}) }}</h3>

            <form method="post" v-on:submit.prevent>
              <div class="row gutter lt-md-column">
                <div class="form-group auto" :class="{'form-group--error': $v.form.shortname.$error}">
                  <div class="stacked-label">
                    <input
                       class="form__input full-width"
                       id="shortname"
                       v-model="form.shortname"
                       @input="$v.form.shortname.$touch()"
                       :placeholder="$t('content.admin.user.edit.form.shortname.placeholder')"
                       :class="{'has-error': $v.form.shortname.$error}">
                    <label class="form__label" for="shortname">{{ $t('content.admin.user.edit.form.shortname.name') }}</label>
          </div>
                  <small class="form-group__message has-error" v-if="!$v.form.shortname.isUnique && $v.form.shortname.$dirty">{{ $t('content.admin.user.edit.form.shortname.errors.isUnique') }}</small>
                </div>
                <div class="form-group auto" :class="{'form-group--error': $v.form.email.$error}">
                  <div class="stacked-label">
                    <input
                       class="form__input full-width"
                       id="email"
                       v-model="form.email"
                       @input="$v.form.email.$touch()"
                       :placeholder="$t('content.admin.user.new.form.email.placeholder')"
                       :class="{'has-error': $v.form.email.$error}">
                    <label class="form__label" for="email">{{ $t('content.admin.user.new.form.email.name') }}</label>
                  </div>
                  <small class="form-group__message has-error" v-if="!$v.form.email.required && $v.form.email.$dirty">{{ $t('content.admin.user.new.form.email.errors.required') }}</small>
                  <small class="form-group__message has-error" v-if="!$v.form.email.email">{{ $t('content.admin.user.new.form.email.errors.email') }}</small>
                </div>
              </div>
              <div class="row gutter">
                <div class="form-group auto">
                  <div class="stacked-label">
                    <input
                       class="form__input full-width"
                       id="password"
                       type="password"
                       v-model="form.password"
                       @input="$v.form.password.$touch()"
                       :placeholder="$t('content.admin.user.edit.form.password.placeholder')"
                       :class="{'has-error': $v.form.password.$error}">
                    <label class="form__label" for="password">{{ $t('content.admin.user.edit.form.password.name') }}</label>
                  </div>
                  <small class="form-group__message has-error" v-if="!$v.form.password.minLength && $v.form.password.$dirty">{{ $t('content.admin.user.edit.form.password.errors.minLength') }}</small>
                </div>
              </div>
              <div class="row gutter">
                <div class="form-group auto">
                  <div class="stacked-label">
                    <q-select
                       type="list"
                       class="full-width"
                       v-model="form.roles"
                       :label="$t('content.admin.user.new.form.group.name')"
                       :options="groupOptions" />
                  </div>
                </div>
              </div>
              <div class="row gutter lt-md-column">
                <div>
                  <div class="lt-md">
                    <button class="secondary big full-width" @click="updateUser">
                      {{ $t('buttons.save') }}
                    </button>
                  </div>
                  <div class="gt-sm">
                    <button class="secondary big round" @click="updateUser">
                      {{ $t('buttons.save') }}
                    </button>
                  </div>
                </div>
                <div>
                  <div class="lt-md">
                    <button class="big primary full-width clear" @click="close">
                      {{ $t('buttons.cancel', {item: ''}) }}
                    </button>
                  </div>
                  <div class="gt-sm">
                    <button class="big primary round clear" @click="close">
                      {{ $t('buttons.cancel', {item: ''}) }}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </q-layout>
  </q-modal>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'user-detail',
  props: ['tigris', 'user'],
  data () {
    return {
      form: {
        shortname: '',
        email: '',
        password: '',
        roles: 0
      },
      groupOptions: []
    }
  },
  validations: {
    form: {
      shortname: {
        isUnique (val) {
          if (val === '') return true
          return this._isUniqueUsername(val)
        }
      },
      email: {
        required,
        email
      },
      password: {
        minLength: minLength(8)
      }
    }
  },
  computed: {},
  watch: {
    user (val) {
      this._onCreated()
    }
  },
  created () {
    this._onCreated()
  },
  methods: {
    close () {
      this.$refs.userDetail.close()
    },
    open () {
      this.$refs.userDetail.open()
    },
    _onCreated () {
      if (this.tigris.role) {
        this.getRoleOptions().then(opts => {
          this.groupOptions = opts
          if (this.user) {
            this._populate()
          }
        })
      }
    },
    _populate () {
      for (var k in this.user) {
        if (this.form.hasOwnProperty(k)) {
          this.form[k] = (k === 'roles') ? this.user[k][0] : this.user[k]
        }
      }
    },
    _isUniqueUsername (name) {
      if (!name) { name = '' }
      return this.tigris.user.retrieve(null, null, { shortname: name }).then(r => {
        return r.data || r.data === ''
      })
    },
    closeAndReset () {
      this.close()
      this.$emit('reset-search')
    },
    getRoleOptions () {
      return this.tigris.role.retrieve().then(r => {
        const roles = r.data
        const roleOptions = []
        roles.forEach(r => {
          roleOptions.push({label: r.name, value: r.id})
        })
        return roleOptions
      })
    },
    updateUser () {
      const $submit = this.form
      var $roles = []
      $roles.push($submit.roles)
      delete $submit.roles
      if ($submit.password === '') {
        delete $submit.password
      }
      const data = {fields: $submit, action: '', roles: $roles}
      this.tigris.user.update(this.user.id, null, data).then(r => {
        if (r.data) {
          this.$emit('send-toast', 'positive', this.$t('content.modals.account.settings.toast.success'))
          this.close()
        } else {
          this.$emit('send-toast', 'negative', this.$t('content.modals.account.settings.toast.failure'))
        }
      }).catch(e => {
        if (process.env.NODE_ENV !== 'production') { console.error(e) }
        this.$emit('send-toast', 'negative', this.$t('content.modals.account.settings.toast.failure'))
      })
    }
  }
}
</script>

<style lang="stylus">
</style>
