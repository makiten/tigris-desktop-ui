<template>
  <div v-if="course">
    <h1>
      {{ course.title }}
      <v-tooltip bottom>
        <v-btn
           flat
           icon
           color="indigo"
           slot="activator"
           :to="`/admin/courses/edit/${course.id}`"
           >
          <v-icon>edit</v-icon>
        </v-btn>
        <span>{{ $t('course.nav.admin.edit') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn
           flat
           icon
           color="red"
           slot="activator"
           @click=""
           >
          <v-icon>delete</v-icon>
        </v-btn>
        <span>{{ $t('course.nav.admin.delete') }}</span>
      </v-tooltip>
      <v-chip color="success" text-color="white" v-if="course.status === 'P'">
        {{ $t('general.status.published') }}
      </v-chip>
      <v-chip color="warning" text-color="white" v-else-if="course.status === 'U'">
        {{ $t('general.status.unpublished') }}
      </v-chip>
      <v-chip color="danger" text-color="white" v-else-if="course.status === 'D'">
        {{ $t('general.status.deleted') }}
      </v-chip>
    </h1>

    <v-layout row>
      <h2>{{ $t('course.module.list') }}</h2>

      <v-list>
        <template v-for="(module, index) in modules">
          <v-list-tile
             :key="module.node.title"
             >
            <v-list-tile-content>
              {{ module.node.title }}
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index < modules.length - 1"/>
        </template>
      </v-list>
    </v-layout>
  </div>
  <p v-else>{{ $t('course.not_found') }}</p>
</template>

<script>
import { Course } from '~/apollo/queries/course.gql'
import { ModulesByCourse } from '~/apollo/queries/modules.gql'

export default {
  data () {
    return {
      course: {},
      modules: {}
    }
  },
  apollo: {
    course: {
      query: Course,
      prefetch: ({ route }) => ({ id: route.params.id }),
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    },
    modules: {
      query: ModulesByCourse,
      variables () {
        return {
          course: this.course.id
        }
      },
      result ({ data, loading }) {
        if (!loading && data.modules) {
          this.modules = data.modules.edges
        }
      }
    }
  }
}
</script>
