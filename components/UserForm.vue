<template>
  <v-container fluid grid-list-md>
    <form v-on:submit.prevent>
      <v-layout class="mb-4" row wrap>
        <v-flex d-flex xs12 md6>
          <v-text-field
             v-model="form.email"
             :error-messages="emailErrors"
             :label="text.email.name"
             :placeholder="text.email.placeholder"
             :hint="text.email.info"
             persistent-hint
             required
             @input="$v.form.email.$touch()"
             @blur="$v.form.email.$touch()"
             />
        </v-flex>
        <v-flex d-flex xs12 md6>
          <v-text-field
             v-model="form.username"
             :error-messages="usernameErrors"
             :label="text.username.name"
             :placeholder="text.username.placeholder"
             :hint="text.username.info"
             persistent-hint
             required
             @input="$v.form.username.$touch()"
             @blur="$v.form.username.$touch()"
             />
        </v-flex>
      </v-layout>
      <v-layout class="mb-4" row wrap>
        <v-flex xs12 md6>
          <v-text-field
             v-model="form.name.first"
             :error-messages="nameFirstErrors"
             :label="text.name.first.name"
             :placeholder="text.name.first.placeholder"
             :hint="text.name.first.info"
             persistent-hint
             required
             @input="$v.form.name.first.$touch()"
             @blur="$v.form.name.first.$touch()"
             />
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field
             v-model="form.name.last"
             :error-messages="nameLastErrors"
             :label="text.name.last.name"
             :placeholder="text.name.last.placeholder"
             :hint="text.name.last.info"
             persistent-hint
             required
             @input="$v.form.name.last.$touch()"
             @blur="$v.form.name.last.$touch()"
             />
        </v-flex>
      </v-layout>
      <v-layout class="mb-4" row>
        <v-flex xs12>
          <v-text-field
             v-model="form.phone"
             :error-messages="phoneErrors"
             :label="text.phone.name"
             :placeholder="text.phone.placeholder"
             :hint="text.phone.info"
             persistent-hint
             required
             @input="$v.form.phone.$touch()"
             @blur="$v.form.phone.$touch()"
             />
        </v-flex>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
import { UsersByEmail, UsersByUsername } from '~/apollo/queries/users.gql'
import { validationMixin } from 'vuelidate'
import { email, numeric, required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  props: {
    add: Boolean,
    user: Object
  },
  data () {
    return {
      checks: {
        emailExists: false,
        usernameExists: false
      },
      form: {
        email: '',
        username: '',
        name: {
          first: '',
          last: ''
        },
        phone: ''
      },
      text: {
        email: {
          name: this.$i18n.t('users.forms.add_edit.email.name'),
          placeholder: this.$i18n.t('users.forms.add_edit.email.placeholder'),
          info: this.$i18n.t('users.forms.add_edit.email.info')
        },
        username: {
          name: this.$i18n.t('users.forms.add_edit.username.name'),
          placeholder: this.$i18n.t('users.forms.add_edit.username.placeholder'),
          info: this.$i18n.t('users.forms.add_edit.username.info')
        },
        name: {
          first: {
            name: this.$i18n.t('users.forms.add_edit.name.first.name'),
            placeholder: this.$i18n.t('users.forms.add_edit.name.first.placeholder'),
            info: this.$i18n.t('users.forms.add_edit.name.first.info')
          },
          last: {
            name: this.$i18n.t('users.forms.add_edit.name.last.name'),
            placeholder: this.$i18n.t('users.forms.add_edit.name.last.placeholder'),
            info: this.$i18n.t('users.forms.add_edit.name.last.info')
          }
        },
        phone: {
          name: this.$i18n.t('users.forms.add_edit.phone.name'),
          placeholder: this.$i18n.t('users.forms.add_edit.phone.placeholder'),
          info: this.$i18n.t('users.forms.add_edit.phone.info')
        }
      }
    }
  },
  computed: {
    emailErrors () {
    },
    usernameErrors () {
    },
    nameFirstErrors () {
    },
    nameLastErrors () {
    },
    phoneErrors () {
    }
  },
  apollo () {
    let queries = {}
    if (this.form.email) {
      queries.usersByEmail = {
        prefetch: true,
        query: UsersByEmail,
        variables () {
          return {
            email: this.form.email
          }
        },
        result ({ data, loading }) {
          if (!loading) {
            this.checks.emailExists = data.users.edges.length > 0
          }
        }
      }
    }
    if (this.form.username) {
      queries.usersByUsername = {
        prefetch: true,
        query: UsersByUsername,
        variables () {
          return {
            email: this.form.username
          }
        },
        result ({ data, loading }) {
          if (!loading) {
            this.checks.usernameExists = data.users.edges.length > 0
          }
        }
      }
    }
    return queries
  },
  validations: {
    form: {
      email: {
        email,
        required,
        isUnique (v) {
          if (!this.add && this.user && this.user.email === v) return true
          return this.checks.emailExists
        }
      },
      username: {
        isUnique (v) {
          if (!this.add && this.user && this.user.username === v) return true
          if (!v) return true
          return this.checks.usernameExists
        }
      },
      name: {
        first: {},
        last: {}
      },
      phone: {
        numeric
      }
    }
  }
}
</script>
