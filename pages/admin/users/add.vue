<template>
  <div>
    <h2>{{ $t('users.forms.add_edit.headers.add') }}</h2>
    <v-divider />
    <t-user-form add @return="$router.push({ path: '/admin/courses' })"/>
  </div>
</template>

<script>
import TUserForm from '~/components/UserForm.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    TUserForm
  }
}
</script>
