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

    <p v-html="course.description"></p>
    <v-divider/>

    <v-layout row>
      <h2>
        {{ $t('course.module.list') }}
        <v-tooltip bottom>
          <v-btn
             flat
             icon
             color="indigo"
             slot="activator"
             @click.stop="addModule"
             >
            <v-icon>add</v-icon>
          </v-btn>
        </v-tooltip>
      </h2>

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

    <v-dialog
       v-model="moduleDialog"
       fullscreen
       scrollable
       >
      <v-card>
        <v-toolbar dark flat color="indigo">
          <v-btn
             flat
             icon
             @click.native="moduleDialog = false"
             >
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t('module.forms.add_edit.headers.add') }}</v-toolbar-title>
        </v-toolbar>
        <t-module-form :course-id="course.id" add @submit="closeModuleDialog = false" @return="closeModuleDialog" />
      </v-card>
    </v-dialog>
  </div>
  <p v-else>{{ $t('course.not_found') }}</p>
</template>

<script>
import { Course } from '~/apollo/queries/course.gql'
import { ModulesByCourse } from '~/apollo/queries/modules.gql'
import TModuleForm from '~/components/ModuleForm.vue'

export default {
  data () {
    return {
      course: {},
      modules: {},
      moduleDialog: false
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
  },
  methods: {
    addModule () {
      this.moduleDialog = true
    },
    closeModuleDialog () {
      this.moduleDialog = false
    }
  },
  components: {
    TModuleForm
  }
}
</script>
