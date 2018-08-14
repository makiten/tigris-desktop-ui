<template>
  <v-layout align-center justify-center row fill-height>
    <v-card width="60vw" v-if="forgotPassword">
      <v-card-title primary-title>
      </v-card-title>

      <v-card-text>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn color="indigo" depressed dark></v-btn>
      </v-card-actions>
    </v-card>
    <v-card width="30vw" v-else>
      <v-card-title primary-title>
        <h1 class="headline">{{ $t('auth.login') }}</h1>
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
             v-model="loginForm.username"
             :label="$t('auth.form.username')"
             required
             />
          <v-text-field
             v-model="loginForm.password"
             :label="$t('auth.form.password')"
             required
             />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="indigo" depressed dark>{{ $t('general.buttons.login') }}</v-btn>
        <v-spacer/>
        <v-btn color="deep-orange" flat dark>{{ $t('general.buttons.forgot_password') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  layout: 'auth',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      forgotForm: {
        email: ''
      },
      forgotPassword: false,
      valid: null
    }
  }
}
</script>
