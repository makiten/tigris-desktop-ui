<template>
  <v-container fluid grid-list-md>
    <form v-on:submit.prevent>
      <v-layout class="mb-4" row wrap>
        <v-flex d-flex xs12>
          <v-text-field
             v-model="form.title"
             :error-messages="titleErrors"
             :label="text.title.name"
             :placeholder="text.title.placeholder"
             :hint="text.title.info"
             persistent-hint
             required
             @input="$v.form.title.$touch()"
             @blur="$v.form.title.$touch()"
             />
        </v-flex>
      </v-layout>
      <v-layout class="mb-4" row wrap>
        <v-flex d-flex xs12>
          <v-text-field
             v-model="form.description"
             :error-messages="descriptionErrors"
             :label="text.description.name"
             :placeholder="text.description.placeholder"
             :hint="text.description.info"
             persistent-hint
             required
             @input="$v.form.description.$touch()"
             @blur="$v.form.description.$touch()"
             />
        </v-flex>
      </v-layout>
      <v-layout class="mb-4" row wrap>
        <v-flex d-flex xs12>
          <v-text-field
             v-model="form.slug"
             :error-messages="slugErrors"
             :label="text.slug.name"
             :placeholder="text.slug.placeholder"
             :hint="text.slug.info"
             persistent-hint
             required
             @input="$v.form.slug.$touch()"
             @blur="$v.form.slug.$touch()"
             />
        </v-flex>
      </v-layout>
      <v-layout class="mb-4" row wrap>
        <v-flex d-flex xs12>
          <markdown-editor
             v-model="form.content"
             />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex d-flex xs12 text-xs-center>
          <v-btn
             color="indigo"
             dark
             depressed
             large
             @click="upsert(true)"
             >
            {{ $t('general.buttons.save') }}
          </v-btn>
          <template v-if="course && course.status === 'U'">
            <v-btn
               color="deep-orange"
               dark
               depressed
               large
               @click="upsert"
               >
              {{ $t('general.buttons.save_.draft') }}
            </v-btn>
          </template>
          <v-btn
             color="grey"
             flat
             large
             @click="cancel"
             >
            {{ $t('general.buttons.cancel') }}
          </v-btn>
        </v-flex>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
import { ModulesBySlug } from '~/apollo/queries/modules.gql'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  props: {
    add: Boolean,
    courseId: String
  },
  data () {
    return {
      slugExists: false,
      form: {
        title: '',
        description: '',
        slug: '',
        content: '',
        course: this.courseId,
        status: 'U',
        creator: ''
      },
      text: {
        title: {
          name: this.$i18n.t('module.forms.add_edit.title.name'),
          placeholder: this.$i18n.t('module.forms.add_edit.title.placeholder'),
          info: this.$i18n.t('module.forms.add_edit.title.info')
        },
        description: {
          name: this.$i18n.t('module.forms.add_edit.description.name'),
          placeholder: this.$i18n.t('module.forms.add_edit.description.placeholder'),
          info: this.$i18n.t('module.forms.add_edit.description.info')
        },
        slug: {
          name: this.$i18n.t('module.forms.add_edit.slug.name'),
          placeholder: this.$i18n.t('module.forms.add_edit.slug.placeholder'),
          info: this.$i18n.t('module.forms.add_edit.slug.info')
        },
        content: {
          name: this.$i18n.t('module.forms.add_edit.content.name'),
          placeholder: '',
          info: this.$i18n.t('module.forms.add_edit.content.info')
        }
      }
    }
  },
  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.form.title.$dirty) return errors
      !this.$v.form.title.required &&
          errors.push(this.$i18n.t('module.forms.add_edit.title.validation.required'))
      !this.$v.form.title.minLength &&
          errors.push(this.$i18n.t('module.forms.add_edit.title.validation.minLength'))
      return errors
    },
    /*
    descriptionErrors () {
      const errors = []
      if (!this.$v.form.description.$dirty) return errors
      !this.$v.form.description.required &&
          errors.push(this.$i18n.t('module.forms.add_edit.description.validation.required'))
      return errors
    },
    */
    slugErrors () {
      const errors = []
      if (!this.$v.form.slug.$dirty) return errors
      !this.$v.form.slug.required &&
          errors.push(this.$i18n.t('module.forms.add_edit.slug.validation.required'))
      !this.$v.form.slug.isUnique &&
          errors.push(this.$i18n.t('module.forms.add_edit.slug.validation.isUnique'))
      return errors
    }
  },
  apollo () {
    let queries = {}
    if (this.form.slug) {
      queries.modules = {
        query: ModulesBySlug,
        variables () {
          return {
            slug: this.form.slug
          }
        },
        result ({ data, loading }) {
          if (!loading) {
            this.slugExists = data.modules.edges.length > 0
          }
        }
      }
    }
    return queries
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(5)
      },
      // description: { required },
      slug: {
        required,
        isUnique (v) {
          if (!this.add && this.module && this.module.slug === v) return true
          if (v === '') return true
          if (['done', 'exam'].indexOf(v.toLowerCase()) >= 0) return false
          return this.slugExists
        }
      }
    }
  },
  methods: {
    _upsert () {
    },
    cancel () {
      this.$emit('return')
    },
    upsert () {
    },
    fileChanged () {
    },
    getItemText (obj) {
      return obj.node.name
    },
    getItemValue (obj) {
      return obj.node.id
    }
  },
  created () {
    if (!this.add && this.module) {
    }
  },
  mounted () {
    // const instance = this.$refs.el.dropzone
  },
  components: {
  }
}
</script>

<style>
</style>
