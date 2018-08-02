<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('general.search.user') }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-autocomplete
           v-model="query"
           :loading="loading"
           :items="items"
           item-text="email"
           item-value="id"
           :label="$t('users.forms.search.label')"
           append-icon="search"
           cache-items
           class="mx-3"
           flat
           hide-no-data
           hide-details
           @change="$emit('change', query); $emit('close')"
           />
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
         color="indigo"
         flat
         @click="$emit('close')">
        {{ $t('general.close') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Users } from '~/apollo/queries/users.gql'

export default {
  data () {
    return {
      items: [],
      loading: false,
      query: null,
      search: null
    }
  },
  apollo: {
    users: {
      query: Users,
      prefetch: true,
      result ({ data, loading }) {
        this.loading = loading
        if (!loading) {
          this.loading = loading
          this.items = data.users.edges.map(e => e.node)
        }
      }
    }
  },
  watch: {
    query (v) {
      this.$emit('change', this.query)
    },
    search (v) {
      // v && v !== this.query && this.queryUsers(v)
    }
  },
  methods: {
    _queryResults ({ data, loading }) {
    },
    onUpdateSearchInput () {
      if (this.query) {
        this.$emit('change', this.query)
      }
    },
    queryUsers () {
    }
  }
}
</script>
