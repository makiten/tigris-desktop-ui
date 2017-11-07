<template>
  <q-modal ref="courseDetail" class="maximized">
    <q-layout>
      <div class="full-width scroll">
        <div class="row">
          <div class="auto text-right">
            <button @click="$refs.courseDetail.close()">
              <i class="text-primary">close</i>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="layout-padding fit">
            <h3 v-if="action === 'edit' && course">
              {{ $t('content.admin.course.detail.edit.heading', {n: course.title}) }}
            </h3>
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
                    <small class="form-group__message has-error" v-if="!$v.form.slug.isUnique && $v.form.slug.$dirty">
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
                  <label>{{ $t('content.admin.course.detail.form.thumbnail.name') }}</label>
                  <q-uploader @upload="checkUpload" ref="thumbnail" :url="uploadUrl" extensions=".gif,.jpg,.jpeg,.png" :multiple="false" />
                  <small v-html="$t('content.admin.course.detail.form.thumbnail.info')"></small>
                </div>
              </div>

              <div class="row gutter lt-md-column">
                <div v-if="action === 'add'">
                  <!--
                  <button class="secondary big round" @click="saveCourse(true)">
                    {{ $t('buttons.draft') }}
                  </button>
                  -->
                  <div class="lt-md">
                    <button class="primary big full-width" @click="nextStep()">
                      {{ $t('buttons.publish') }}
                    </button>
                  </div>
                  <div class="gt-sm">
                    <button class="primary big round" @click="nextStep()">
                      {{ $t('buttons.publish') }}
                    </button>
                  </div>
                </div>
                <div v-else>
                  <div class="lt-md">
                    <button class="primary big full-width" @click="saveCourse(true)">
                      {{ $t('buttons.save') }}
                    </button>
                  </div>
                  <div class="gt-sm">
                    <button class="primary big round" @click="saveCourse(true)">
                      {{ $t('buttons.save') }}
                    </button>
                  </div>
                </div>
                <div>
                  <div class="lt-md">
                    <button class="primary big full-width clear" @click="close">
                      {{ $t('buttons.cancel', {item: ''}) }}
                    </button>
                  </div>
                  <div class="gt-sm">
                    <button class="primary big round clear" @click="close">
                      {{ $t('buttons.cancel', {item: ''}) }}
                    </button>
                  </div>
                </div>
                <div class="auto text-right" v-if="action === 'edit'">
                  <button class="remove big" @click="remove">
                    <i :class="$t('result.failure.class')">delete_forever</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </q-layout>
  </q-modal>
</template>

<script>
import { Utils } from 'quasar'
import { mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

const touchMap = new WeakMap()

export default {
  name: 'course-detail',
  props: ['action', 'course', 'tigris'],
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
      uploadUrl: process.env.apiHost + '/api/utils/upload'
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
          if (this.course.slug === val) return true
          if (val === '') return true
          return this.doesSlugNotExist(this.tigris, val)
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/getUser'
    })
  },
  watch: {
    'form.title': Utils.debounce(function (val) {
      this.tigris.util.slugify({val: val}).then(r => {
        // this.form.title = val
        this.form.slug = r.data.result
        this.delayTouch(this.$v.form.slug)
        // this.$v.form.slug.$touch()
      })
    }, 200),
    action () {
      this._onCreated()
    }
  },
  methods: {
    close () {
      this.$refs.courseDetail.close()
    },
    open () {
      this.$refs.courseDetail.open()
      this._onCreated()
    },
    _onCreated () {
      if (this.action === 'edit') {
        for (var k in this.course) {
          if (this.form.hasOwnProperty(k)) {
            this.form[k] = this.course[k]
          }
        }
      } else if (this.action === 'add') {
        this.form = this._.cloneDeep(this.blankForm)
        this.$v.form.$reset()
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
    checkUpload (e, xhr) {
      const response = JSON.parse(xhr)
      this.form.image = response.uri
    },
    delayTouch ($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch, 200))
    },
    doesSlugNotExist (tigris, slug) {
      return tigris.course.retrieve({type: 4, query: slug}).then(r => {
        if (['done', 'exam'].indexOf(slug.toLowerCase()) >= 0) {
          return false
        } else {
          return (!r.data || this.course.slug === r.data.slug)
        }
      })
    },
    imageUpload () {
      this.$refs.thumbnail.upload()
    },
    nextStep () {
      this.addCourse(this.tigris, this.form).then(course => {
        if (course) {
          this.form = this._.cloneDeep(this.blankForm)
          this.$v.form.slug.$reset()
          this.$v.form.$reset()
          this.close()
          this.$emit('add', 'positive', this.$t('result.success.message'), course)
          this.$emit('open', 'modulesList', 'add', 'course', course)
        }
      })
    },
    remove () {
      if (this.course) {
        this.tigris.course.destroy(this.course.id).then(r => {
          this.$emit('delete', 'positive', this.$t('result.success.message'), this.course.id)
          this.close()
        }).catch(e => {
          this.$emit('delete', 'negative', this.$t('result.failure.message'))
        })
      }
    },
    saveCourse (quit) {
      if (this.action === 'add') {
        this.addCourse(this.tigris, this.form).then(course => {
          if (course) {
            this.form = this._.cloneDeep(this.blankForm)
            this.$v.form.slug.$reset()
            this.$v.form.$reset()
            this.$emit('add', 'positive', this.$t('result.success.message'), course)
          } else {
            this.$emit('add', 'negative', this.$t('result.failure.message'), course)
          }
        })
      } else {
        this.updateCourse(this.tigris, this.form).then(course => {
          if (course) {
            this.$emit('save', 'positive', this.$t('result.success.message'), course)
          } else {
            this.$emit('save', 'negative', this.$t('result.failure.message'), course)
          }
        })
      }
      if (quit) {
        this.close()
      }
    },
    updateCourse (tigris, form) {
      form.creator = this.course.creator
      const data = {course: form}
      return tigris.course.update(this.course.id, data).then(r => {
        return r.data
      })
    }
  },
  created () {
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
