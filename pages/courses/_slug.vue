<template>
  <div v-if="course">
    <h1>
      {{ course.title }}
      <v-chip color="warning" text-color="white" v-if="course.status === 'U'">
        {{ $t('general.status.unpublished') }}
      </v-chip>
      <v-chip color="red" text-color="white" v-else-if="course.status === 'D'">
        {{ $t('general.status.deleted') }}
      </v-chip>
    </h1>
    <hr>
    <div>
      <strong class="mr-2">{{ $t('course.tags') }}</strong>
      <v-chip color="deep-orange" text-color="white" v-if="course.tags" v-for="tag in course.tags.edges" :key="tag.node.id">
        {{ tag.node.name }}
      </v-chip>
    </div>
    <div>
      <p v-html="course.description" />
    </div>
    <div>
      <v-list subheader two-line v-if="modules.edges">
        <v-subheader>{{ $t('course.toc') }}</v-subheader>
        <v-list-tile v-for="(module, index) in modules" :key="module.title" :to="'/' + course.slug + '/' + module.slug + '/'">
          <v-list-tile-action>{{ index }}</v-list-tile-action>
          <v-list-tile-content>{{ module.title }}</v-list-tile-content>
          <v-list-tile-sub-title>{{ module.description }}</v-list-tile-sub-title>
          <v-list-tile-action color="green darken-3" v-if="true">
            <v-icon>check_circle</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </div>
    <nuxt-child/>
  </div>
  <p v-else>{{ $t('course.not_found') }}</p>
</template>

<script>
import { CourseBySlug } from '~/apollo/queries/course.gql'
import { ModulesByCourse } from '~/apollo/queries/modules.gql'

export default {
  data () {
    return {
      course: {},
      modules: {}
    }
  },
  apollo: {
    courses: {
      query: CourseBySlug,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables () {
        return {
          slug: this.$route.params.slug
        }
      },
      result ({ data, loading }) {
        if (!loading) {
          this.course = data.courses.edges[0].node
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
  },
  methods: {

  }
}
</script>
