<template>
  <div v-if="user">
    <h2>{{ $t('users.forms.add_edit.headers.edit') }}</h2>
    <v-divider />
    <t-user-form :user="user" @return="$router.push({ path: '/admin/courses' })"/>
  </div>
</template>

<script>
import TUserForm from '~/components/UserForm.vue'
import { User } from '~/apollo/queries/user.gql'

export default {
  data () {
    return {
    }
  },
  apollo: {
    user: {
      prefetch: ({ route }) => ({ id: route.params.id }),
      query: User,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  },
  components: {
    TUserForm
  }
}
</script>
