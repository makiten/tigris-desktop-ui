<template>
  <q-modal ref="inviteUser" :content-css="{minWidth: '55vw', minHeight: '65vh'}">
    <q-layout>
      <div class="full-width scroll">
        <div class="row">
          <div class="auto text-right">
            <button @click="$refs.inviteUser.close()">
              <i class="text-primary">close</i>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="layout-padding fit">
            <h3>{{ $t('content.admin.user.new.heading') }}</h3>
            <form method="post" v-on:submit.prevent>
              <div class="row gutter">
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
                  <small>{{ $t('content.admin.user.new.form.email.info') }}</small>
                </div>
              </div>
              <div class="row gutter">
                <div class="form-group auto">
                  <div class="stacked-label">
                    <q-select
                       type="list"
                       class="full-width"
                       v-model="form.group"
                       :label="$t('content.admin.user.new.form.group.name')"
                       :options="groupOptions" />
                  </div>
                </div>
              </div>
              <div class="row gutter lt-md-column">
                <div>
                  <div class="lt-md">
                    <button @click="addUser" class="secondary big full-width">
                      {{ $t('content.admin.user.new.form.button') }}
                    </button>
                  </div>
                  <div class="gt-sm">
                    <button @click="addUser" class="secondary big round">
                      {{ $t('content.admin.user.new.form.button') }}
                    </button>
                  </div>
                </div>
                <div>
                  <div class="lt-md">
                    <button class="primary big full-width clear" @click="cancel">
                      {{ $t('buttons.cancel', {item: ''}) }}
                    </button>
                  </div>
                  <div class="gt-sm">
                    <button class="primary big round clear" @click="cancel">
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
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'invite-user',
  props: ['tigris'],
  data () {
    return {
      blankForm: {
        email: '',
        group: 0
      },
      form: {
        email: '',
        group: 0
      },
      groupOptions: []
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  computed: {},
  watch: {
    group (val) {
      this._onCreated()
    },
    tigris (val) {
      this._onCreated()
    }
  },
  methods: {
    cancel () {
      this.form = this._.cloneDeep(this.blankForm)
      this.close()
    },
    close () {
      this.$refs.inviteUser.close()
    },
    open () {
      this.$refs.inviteUser.open()
    },
    _onCreated () {
      if (this.tigris.role) {
        this.getGroupOptions().then(opts => {
          const defaultGroup = opts.filter(o => { return o.label === 'Students' })[0]
          this.form.group = defaultGroup.value
          this.groupOptions = opts
        })
      }
    },
    addUser () {
      const data = {fields: {email: this.form.email}, role: this.form.group}
      this.tigris.user.create(null, data).then(r => {
        if (r.data.result.id) {
          const userId = r.data.result.id
          this.tigris.util.invite({id: userId, email: this.form.email}).then(t => {
            const token = t.data.token
            const url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
            const data = {
              to: this.form.email,
              subject: this.$t('content.admin.user.new.invite.subject'),
              message: this.$t('content.admin.user.new.invite.message', {url: url, token: token})
            }
            this.tigris.util.email(data).then(r => {
              if (r.data.result === 'OK') {
                this.$v.form.$reset()
                this.$emit('send-toast',
                           'positive',
                           this.$t('content.admin.user.new.toasts.positive', {e: this.form.email}))
                this.form = this._.cloneDeep(this.blankForm)
                this.close()
              }
            })
          })
        }
      }).catch(e => {
        if (process.env.NODE_ENV !== 'production') { console.error(e) }
        this.$emit('send-toast',
                   'negative',
                   this.$t('content.admin.user.new.toasts.negative', {e: this.form.email}))
      })
    },
    getGroupOptions () {
      return this.getGroups(this.tigris).then(groups => {
        var groupOptions = []
        groups.forEach(g => {
          groupOptions.push({label: g.name, value: g.id})
        })
        return groupOptions
      })
    },
    getGroups (tigris) {
      return tigris.role.retrieve().then(r => {
        return r.data
      })
    }
  },
  created () {
    this._onCreated()
  }
}
</script>

<style lang="stylus">
small
  display block
small.has-error
  color $negative
</style>
