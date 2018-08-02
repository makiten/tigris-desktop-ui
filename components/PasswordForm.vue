<template>
  <v-container fluid grid-list-md>
    <form v-on:submit.prevent>
      <v-layout class="mb-4" row wrap>
        <v-flex d-flex xs12>
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
      </v-layout>
      <v-layout class="mb-4" row wrap>
        <v-flex d-flex xs12>
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
      <v-layout row text-xs-center>
        <v-btn type="submit"
               flat
               color="deep-orange"
               >
          {{ $t('users.forms.password.submit') }}
        </v-btn>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
// import { UsersByEmail, UsersByUsername } from '~/apollo/queries/users.gql'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  props: {
    add: Boolean,
    user: Object
  },
  data () {
    return {
      form: {
        password: '',
        passwordConfirm: ''
      },
      text: {
        password: {
          name: this.$i18n.t('users.forms.add_edit.email.name'),
          placeholder: this.$i18n.t('users.forms.add_edit.email.placeholder'),
          info: this.$i18n.t('users.forms.add_edit.email.info')
        },
        passwordConfirm: {
          name: this.$i18n.t('users.forms.add_edit.username.name'),
          placeholder: this.$i18n.t('users.forms.add_edit.username.placeholder'),
          info: this.$i18n.t('users.forms.add_edit.username.info')
        }
      }
    }
  },
  computed: {
    passwordErrors () {
    },
    passwordConfirmErrors () {
    }
  },
  apollo () {
    if (!this.$v.$invalid) {
      return {
        updatePassword: {
          prefetch: true,
          // query: UpdatePassword,
          variables () {
            return {
              password: this.form.password
            }
          }
        }
      }
    }
  },
  validations: {
    form: {
      password: {
        required
      },
      passwordConfirm: {
        sameAsPassword: sameAs('password')
      }
    }
  }
}
</script>
