<template>
  <q-modal ref="roleDetail" :content-css="{minWidth: '80vw', minHeight: '64vh'}">
    <q-layout>
      <div class="full-width scroll">
        <div class="row">
          <div class="auto text-right">
            <button @click="$refs.roleDetail.close()">
              <i class="text-primary">close</i>
            </button>
          </div>
        </div>
        <div class="layout-padding">
          <h4 v-if="action === 'edit'">{{ $t('content.admin.role.headings.edit', {g: role.name}) }}</h4>
          <h4 v-else>{{ $t('content.admin.role.headings.new') }}</h4>
          <form method="post" v-on:submit.prevent>
            <div class="row gutter">
              <div class="auto form-group" :class="{'form-group--error': $v.form.name.$error}">
                <div class="stacked-label">
                  <input
                     class="form__input full-width"
                     id="title"
                     v-model="form.name"
                     @input="$v.form.name.$touch()"
                     :placeholder="$t('content.admin.role.form.title.placeholder')"
                     :class="{'has-error': $v.form.name.$error}">
                  <label class="form__label" for="title">{{ $t('content.admin.role.form.title.label') }}</label>
                </div>
                <small class="form-group__message has-error" v-if="!$v.form.name.required && $v.form.name.$dirty">{{ $t('content.admin.role.form.title.errors.required') }}</small>
                <small>{{ $t('content.admin.role.form.title.info') }}</small>
              </div>
            </div>
            <div class="row gutter">
              <div class="auto form-group">
                <div class="stacked-label">
                  <input
                     class="form__input full-width"
                     id="title"
                     v-model="form.description"
                     :placeholder="$t('content.admin.role.form.description.placeholder')">
                  <label class="form__label" for="title">{{ $t('content.admin.role.form.description.label') }}</label>
                </div>
                <small>{{ $t('content.admin.role.form.description.info') }}</small>
              </div>
            </div>
            <div class="row gutter">
              <div class="auto form-group" :class="{'form-group--error': $v.form.permissions.$error}">
                <q-select
                   v-if="action === 'edit' && role && Object.keys(role).length > 0 && !role.deletable"
                   readonly
                   type="checkbox"
                   class="form__input full-width"
                   v-model="form.permissions"
                   @input="$v.form.permissions.$touch()"
                   :label="$t('content.admin.role.form.permissions.label')"
                   :options="permOptions" />
                <q-select
                   v-else
                   type="checkbox"
                   class="form__input full-width"
                   v-model="form.permissions"
                   @input="$v.form.permissions.$touch()"
                   :label="$t('content.admin.role.form.permissions.label')"
                   :options="permOptions" />
              </div>
            </div>
            <div class="row gutter lt-md-column">
              <div v-if="action === 'add'">
                <div class="lt-md">
                  <button class="big full-width secondary" @click="addRole">
                    {{ $t('buttons.add', {n: $t('labels.roles')}, 1) }}
                  </button>
                </div>
                <div class="gt-sm">
                  <button class="big round secondary" @click="addRole">
                    {{ $t('buttons.add', {n: $t('labels.roles')}, 1) }}
                  </button>
                </div>
              </div>
              <div v-else>
                <div class="lt-md">
                  <button class="big full-width secondary" @click="updateRole">
                    {{ $t('buttons.save') }}
                  </button>
                </div>
                <div class="gt-sm">
                  <button class="big round secondary" @click="updateRole">
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
    </q-layout>
  </q-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'role-detail',
  props: ['action', 'role', 'tigris'],
  computed: {
    ...mapGetters({
      auth: 'auth/getUser'
    })
  },
  data () {
    return {
      blankForm: {
        name: '',
        description: '',
        permissions: [1]
      },
      form: {
        name: '',
        description: '',
        permissions: [1]
      },
      permOptions: []
    }
  },
  watch: {
    action (val) {
      this._onCreated()
    },
    role (val) {
      this._onCreated()
    },
    tigris (val) {
      this._onCreated()
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      description: {},
      permissions: {
        required
      }
    }
  },
  methods: {
    close () {
      this.$refs.roleDetail.close()
    },
    open () {
      this.$refs.roleDetail.open()
    },
    _onCreated () {
      if (this.tigris.permission) {
        this.getPermOptions().then(opts => {
          this.permOptions = opts
          if (this.role.id && this.action === 'edit') {
            this._populate()
          } else {
            this.form = this._.cloneDeep(this.blankForm)
          }
        })
      }
    },
    _populate () {
      for (var k in this.role) {
        if (this.form.hasOwnProperty(k)) {
          this.form[k] = this.role[k]
        }
      }
    },
    addRole () {
      const data = {fields: {name: this.form.name, description: this.form.description, permissions: this.form.permissions}}
      this.tigris.role.create(data).then(r => {
        if (r.data.id) {
          const role = r.data
          this.form = this._.cloneDeep(this.blankForm)
          this.$v.form.$reset()
          this.$emit('add', 'positive', this.$t('content.admin.role.toasts.positive', {n: role.name}), role)
          this.close()
        } else {
          this.$emit('add', 'negative', this.$t('content.admin.role.toasts.negative'), null)
        }
      }).catch(e => {
        if (process.env.NODE_ENV !== 'production') { console.error(e) }
        this.$emit('add', 'negative', this.$t('content.admin.role.toasts.negative'), null)
      })
    },
    getPermOptions () {
      return this.getPermissions(this.tigris).then(perms => {
        var permOptions = []
        perms.forEach(p => {
          permOptions.push({label: p.name, value: p.id})
        })
        return permOptions
      })
    },
    getPermissions (tigris) {
      return tigris.permission.retrieve().then(r => {
        return r.data
      })
    },
    updateRole () {
      const data = {fields: {name: this.form.name, description: this.form.description, permissions: this.form.permissions}}
      this.tigris.role.update(this.role.id, data).then(r => {
        if (r.data) {
          this.$emit('add', 'positive', this.$t('result.success.message'))
          this.close()
        } else {
          this.$emit('add', 'negative', this.$t('result.failure.message'))
        }
      }).catch(e => {
        if (process.env.NODE_ENV !== 'production') { console.error(e) }
        this.$emit('add', 'negative', this.$t('result.failure.message'))
      })
    }
  },
  created () {
    this._onCreated()
  }
}
</script>

<style lang="stylus">
.q-picker-textfield-value.ellipsis
  min-height 3vh
.q-select-popover.list.highlight
  .item
    .item-content
      div
        min-height 2.5vh
</style>
