<template>
  <div class="layout-padding fit">
    <h3 v-if="action === 'edit' && typeof course !== 'undefined' && course !== null">{{ $t('content.admin.course.detail.edit.heading', {n: course.title}) }}</h3>
    <h3 v-else>{{ $t('content.admin.course.detail.new.heading') }}</h3>

    <form method="post" v-on:submit.prevent>

      <div class="row">
        <div class="auto form-group" :class="{ 'form-group--error': $v.form.title.$error }">
          <div class="stacked-label">
            <input
               class="form__input full-width"
               id="title"
               v-model.trim="form.title"
               @input="$v.form.title.$touch()"
               :placeholder="$t('content.admin.course.detail.form.title.placeholder')"
               :class="{'has-error': $v.form.title.$error}">
            <label class="form__label" for="title">{{ $t('content.admin.course.detail.form.title.name') }}</label>
            <small class="form-group__message has-error" v-if="!$v.form.title.required && $v.form.title.$dirty">
              {{ $t('content.admin.course.detail.form.title.errors.required') }}
            </small>
            <small class="form-group__message has-error" v-if="!$v.form.title.minLength">
              {{ $t('content.admin.course.detail.form.title.errors.minLength') }}
            </small>
            <small>{{ $t('content.admin.course.detail.form.title.info') }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="auto form-group" :class="{'form-group--error': $v.form.slug.$error, 'form-group--loading': $v.form.slug.$pending}">
          <div class="stacked-label">
            <input
               class="form__input full-width"
               id="slug"
               v-model.trim="form.slug"
               @input="$v.form.slug.$touch()"
               :placeholder="$t('content.admin.course.detail.form.slug.placeholder')"
               :class="{'has-error': $v.form.slug.$error}">
            <label class="form__label" for="slug">{{ $t('content.admin.course.detail.form.slug.name') }}</label>
            <small class="form-group__message has-error" v-if="!$v.form.slug.required && $v.form.slug.$dirty">
              {{ $t('content.admin.course.detail.form.slug.errors.required') }}
            </small>
            <small class="form-group__message has-error" v-if="!$v.form.slug.isUnique">
              {{ $t('content.admin.course.detail.form.slug.errors.isUnique') }}
            </small>
            <small v-html="$t('content.admin.course.detail.form.slug.info')"></small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="auto form-group" :class="{'form-group--error': $v.form.description.$error}">
          <div class="stacked-label">
            <input
               class="form__input full-width"
               id="description"
               v-model.trim="form.description"
               :placeholder="$t('content.admin.course.detail.form.description.placeholder')"
               :class="{'has-error': $v.form.description.$error}">
            <label class="form__label" for="description">{{ $t('content.admin.course.detail.form.description.name') }}</label>
            <small class="form-group__message has-error" v-if="!$v.form.description.required && $v.form.description.$dirty">
              {{ $t('content.admin.course.detail.form.description.errors.required') }}
            </small>
            <small v-html="$t('content.admin.course.detail.form.description.info')"></small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="auto">
          <div class="stacked-label">
            <textarea class="full-width" id="long_description" v-model="form.long_description" :placeholder="$t('content.admin.course.detail.form.long_description.placeholder')"></textarea>
            <label for="long_description">{{ $t('content.admin.course.detail.form.long_description.name') }}</label>
            <small v-html="$t('content.admin.course.detail.form.long_description.info')"></small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="auto">
          <label for="thumbnail">{{ $t('content.admin.course.detail.form.thumbnail.name') }}</label>
          <q-uploader :url="uploadUrl" class="full-width" id="thumbnail" v-model="form.image" extensions=".gif,.jpg,.jpeg,.png" :hide-upload-button="true" />
          <small v-html="$t('content.admin.course.detail.form.thumbnail.info')"></small>
        </div>
      </div>
<!--
      <div class="row">
        <div class="auto">
          <label for="tags">{{ $t('content.admin.course.detail.form.tags.name') }}</label>
          <q-chips class="full-width" id="tags" v-model="form.tags" @keyup.tab="add(value)"/>
          <small v-html="$t('content.admin.course.detail.form.tags.info')"></small>
        </div>
      </div>
-->
      <div class="row">
        <div class="auto">
          <button class="secondary outline big round" @click="saveCourse(false)">
            {{ $t('content.admin.course.detail.form.buttons.save') }}
          </button>
          <button class="secondary big round" @click="saveCourse(true)">
            {{ $t('content.admin.course.detail.form.buttons.quit') }}
          </button>
          <button class="primary big round" @click="nextStep()">
            {{ $t('content.admin.course.detail.form.buttons.add_modules') }}
          </button>
          <button class="tertiary big round" @click="closeModal">
            {{ $t('buttons.cancel') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

const touchMap = new WeakMap()

export default {
  name: 'course-detail',
  props: ['action', 'auth', 'course', 'modal', 'tigris'],
  data () {
    return {
      form: {
        title: '',
        teaser: '',
        description: '',
        long_description: '',
        slug: '',
        tags: [],
        image: '',
        status: 1,
        creator: ''
      },
      blankForm: {
        title: '',
        teaser: '',
        description: '',
        long_description: '',
        slug: '',
        tags: [],
        image: '',
        status: 1,
        creator: ''
      },
      uploadUrl: 'https://azure.microsoft.com'
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(5)
      },
      description: {
        required
      },
      slug: {
        required,
        isUnique (val) {
          if (val === '') return true
          return this.doesSlugNotExist(this.tigris, val)
        }
      }
    }
  },
  computed: {},
  watch: {
    'form.title': function (val) {
      this.tigris.util.slugify({val: val}).then(r => {
        // this.form.title = val
        this.form.slug = r.data.result
        this.delayTouch(this.$v.form.slug)
      })
    },
    course (val) {
      this._onCreated()
    }
  },
  methods: {
    _onCreated () {
      if (!(typeof this.course === 'undefined' || this.course === null)) {
        if (this.action === 'edit') {
          for (var k in this.course) {
            if (this.form.hasOwnProperty(k)) {
              this.form[k] = this.course[k]
            }
          }
        } else {
          this.form = this._.cloneDeep(this.blankForm)
        }
      }
      // this.tigris.course.retrieve().then(tigris => {})
    },
    addCourse (tigris, form) {
      form.creator = this.auth.id
      const data = {course: form}
      return tigris.course.create(data).then(r => {
        return tigris.course.retrieve({ type: 4, query: form.slug }).then(r => {
          return r.data
        })
      })
    },
    updateCourse (tigris, form) {
      form.creator = this.course.creator
      const data = {course: form}
      return tigris.course.update(this.course.id, data).then(r => {
        return r.data.result
      })
    },
    closeModal () {
      // this.$emit('close', this.modal)
      this.modal.close()
    },
    delayTouch ($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch, 1500))
    },
    doesSlugNotExist (tigris, slug) {
      return tigris.course.retrieve({type: 4, query: slug}).then(r => {
        if (['done', 'exam'].indexOf(slug.toLowerCase()) >= 0) {
          return false
        } else {
          return typeof r.data !== 'object'
        }
      })
    },
    nextStep () {
      this.modal.close()
    },
    saveCourse (quit) {
      if (this.action === 'add') {
        this.addCourse(this.tigris, this.form).then(course => {
          if (typeof course !== 'undefined') {
            this.form = this._.cloneDeep(this.blankForm)
            this.$v.form.$reset()
            this.$emit('add', 'positive', this.$t('content.admin.course.toasts.positive', {c: course.title}), course)
          } else {
            this.$emit('add', 'negative', this.$t('content.admin.course.toasts.negative', {c: course.title}), course)
          }
        })
      } else {
        this.updateCourse(this.tigris, this.form).then(r => {
          if (r === 1) {
            this.$emit('save', 'positive', this.$t('content.admin.course.toasts.positive', {c: this.course.title}))
          } else {
            this.$emit('save', 'negative', this.$t('content.admin.course.toasts.negative', {c: this.course.title}))
          }
        })
      }
      if (quit) {
        this.closeModal()
      }
    }
  },
  created () {
    this._onCreated()
  }
}
</script>

<style lang="stylus" scoped>
@import '~themes/app.variables.styl'
form
  .row
    margin-top 4vh
    margin-bottom 4vh
  label
    font-weight bold
  small
    color $faded
    font-style italic
  small.has-error
    color $negative
    display block
</style>
