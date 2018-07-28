<template>
  <form v-on:submit.prevent>
    <v-layout class="mb-4" row>
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
    </v-layout>
    <v-layout class="mb-4" row>
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
    </v-layout>
    <v-layout class="mb-4" row>
      <v-text-field
         v-model="form.long_description"
         :error-messages="long_descriptionErrors"
         :label="text.long_description.name"
         :placeholder="text.long_description.placeholder"
         :hint="text.long_description.info"
         persistent-hint
         required
         @input="$v.form.long_description.$touch()"
         @blur="$v.form.long_description.$touch()"
         />
    </v-layout>
    <v-layout class="mb-4" row>
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
    </v-layout>
    <v-layout class="mb-4" row>
      <v-combobox
         v-model="form.tags"
         :label="text.tags.name"
         :placeholder="text.tags.placeholder"
         :hint="text.tags.info"
         :item-text="getItemText"
         :item-value="getItemValue"
         :items="tags"
         persistent-hint
         multiple
         chips
         @input="$v.form.tags.$touch()"
         />
    </v-layout>
    <v-layout class="mb-4" row>
      <dropzone
         id="foo"
         ef="el"
         :options="thumbOptions"
         :destroyDropzone="true"
         />
      <!--
      <upload-btn
         v-model="form.thumbnail"
         :title="text.thumbnail.name"
         color="deep-orange"
         :fileChangedCallback="fileChanged"
         flat>
      </upload-btn>
      -->
    </v-layout>
    <v-layout row>
      <v-flex xs12 text-xs-center>
        <v-btn
           color="indigo"
           dark
           depressed
           large
           @click="upsert(true)"
           >
          <template v-if="add">
            {{ $t('course.buttons.add') }}
          </template>
          <template v-else>
            {{ $t('course.buttons.edit') }}
          </template>
        </v-btn>
        <template v-if="course && course.status === 'U'">
          <v-btn
             color="deep-orange"
             dark
             depressed
             large
             @click="upsert"
             >
            {{ $t('course.buttons.draft') }}
          </v-btn>
        </template>
        <v-btn
           color="grey"
           flat
           large
           @click="cancel"
           >
          {{ $t('course.buttons.cancel') }}
        </v-btn>
      </v-flex>
    </v-layout>
  </form>
</template>

<script>
import { CourseBySlug } from '~/apollo/queries/course.gql'
import tags from '~/apollo/queries/tags.gql'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import Dropzone from 'nuxt-dropzone'
import '~/static/nuxt-dropzone.css'

export default {
  mixins: [validationMixin],
  props: {
    add: Boolean,
    course: Object
  },
  data () {
    return {
      slugExists: false,
      tags: [],
      form: {
        title: '',
        description: '',
        long_description: '',
        slug: '',
        tags: [],
        thumbnail: '',
        status: 'U',
        creator: ''
      },
      thumbOptions: {
        url: 'http://httpbin.org/anything'
      },
      text: {
        title: {
          name: this.$i18n.t('course.forms.add_edit.title.name'),
          placeholder: this.$i18n.t('course.forms.add_edit.title.placeholder'),
          info: this.$i18n.t('course.forms.add_edit.title.info')
        },
        description: {
          name: this.$i18n.t('course.forms.add_edit.description.name'),
          placeholder: this.$i18n.t('course.forms.add_edit.description.placeholder'),
          info: this.$i18n.t('course.forms.add_edit.description.info')
        },
        long_description: {
          name: this.$i18n.t('course.forms.add_edit.long_description.name'),
          placeholder: this.$i18n.t('course.forms.add_edit.long_description.placeholder'),
          info: this.$i18n.t('course.forms.add_edit.long_description.info')
        },
        slug: {
          name: this.$i18n.t('course.forms.add_edit.slug.name'),
          placeholder: this.$i18n.t('course.forms.add_edit.slug.placeholder'),
          info: this.$i18n.t('course.forms.add_edit.slug.info')
        },
        tags: {
          name: this.$i18n.t('course.forms.add_edit.tags.name'),
          placeholder: this.$i18n.t('course.forms.add_edit.tags.placeholder'),
          info: this.$i18n.t('course.forms.add_edit.tags.info')
        },
        thumbnail: {
          name: this.$i18n.t('course.forms.add_edit.thumbnail.name'),
          placeholder: this.$i18n.t('course.forms.add_edit.thumbnail.placeholder'),
          info: this.$i18n.t('course.forms.add_edit.thumbnail.info')
        }
      }
    }
  },
  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.form.title.$dirty) return errors
      !this.$v.form.title.required &&
          errors.push(this.$i18n.t('course.forms.add_edit.title.validation.required'))
      !this.$v.form.title.minLength &&
          errors.push(this.$i18n.t('course.forms.add_edit.title.validation.minLength'))
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.form.description.$dirty) return errors
      !this.$v.form.description.required &&
          errors.push(this.$i18n.t('course.forms.add_edit.description.validation.required'))
      return errors
    },
    long_descriptionErrors () {
      const errors = []
      if (!this.$v.form.long_description.$dirty) return errors
      !this.$v.form.long_description.required &&
          errors.push(this.$i18n.t('course.forms.add_edit.long_description.validation.required'))
      return errors
    },
    slugErrors () {
      const errors = []
      if (!this.$v.form.slug.$dirty) return errors
      !this.$v.form.slug.required &&
          errors.push(this.$i18n.t('course.forms.add_edit.slug.validation.required'))
      !this.$v.form.slug.isUnique &&
          errors.push(this.$i18n.t('course.forms.add_edit.slug.validation.isUnique'))
      return errors
    }
  },
  apollo () {
    let queries = {}
    console.log(tags)
    queries.tags = {
      prefetch: true,
      query: tags,
      result ({ data, loading }) {
        if (!loading) {
          this.tags = data.tags.edges
        }
      }
    }
    if (this.form.slug) {
      queries.courses = {
        query: CourseBySlug,
        variables () {
          return {
            slug: this.form.slug
          }
        },
        result ({ data, loading }) {
          if (!loading) {
            this.slugExists = data.courses.edges.length > 0
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
      description: { required },
      long_description: { required },
      slug: {
        required,
        isUnique (v) {
          if (!this.add && this.course && this.course.slug === v) return true
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
    if (!this.add && this.course) {
      for (let k in this.course) {
        if (k === 'tags') {
          this.form[k] = this.course[k].edges
        } else {
          this.form[k] = this.course[k]
        }
      }
    }
  },
  mounted () {
    // const instance = this.$refs.el.dropzone
  },
  components: {
    Dropzone
  }
}
</script>

<style>
#foo {
  width: 100%
}
</style>
