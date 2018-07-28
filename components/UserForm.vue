<template>
  <form v-on:submit.prevent>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  props: {
    add: Boolean,
    user: Object
  },
  data () {
    return {
      form: {
        email: '',
        username: '',
        name: {
          first: '',
          last: ''
        },
        phone: ''
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
  apollo: {
    let queries = {}
    queries.users = {
      prefetch: true,
      query: ,
    }
  }
}
</script>
