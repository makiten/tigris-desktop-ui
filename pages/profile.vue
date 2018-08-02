<template>
  <div>
    <v-tabs
       color="indigo"
       dark
       icons-and-text
       >

      <v-tabs-slider color="deep-orange" />

      <v-tab href="#user">
        {{ $t('general.nav.user') }}
        <v-icon>face</v-icon>
      </v-tab>
      <v-tab href="#security">
        {{ $t('general.nav.security') }}
        <v-icon>lock</v-icon>
      </v-tab>
    </v-tabs>

    <v-tab-item id="user">
      <v-card flat>
        <v-card-text v-if="user">
          <t-user-form :user="user" />
        </v-card-text>
      </v-card>
    </v-tab-item>

    <v-tab-item id="security">
        <v-card-text v-if="user">
          <t-password-form :user-id="user.id" />
        </v-card-text>
    </v-tab-item>
  </div>
</template>

<script>
import TUserForm from '~/components/UserForm.vue'
import { User } from '~/apollo/queries/user.gql'

export default {
  apollo: {
    user: {
      query: User,
      // prefetch: ({ route }) => ({ id: route.params.id }),
      variables () {
        return {
          id: 'blah'
        }
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    TUserForm
  }
}
</script>
