<template>
  <div>
    <h3>
      <button class="big" @click="$emit('close', 'list', '')">
        <i>keyboard_arrow_left</i>
      </button>
      <span v-if="action === 'edit' && module">{{ $t('content.admin.module.detail.edit.heading', {n: module.title}) }}</span>
      <span v-else>{{ $t('content.admin.module.detail.new.heading') }}</span>
    </h3>

    <form method="post" v-on:submit.prevent>

      <div class="row">
        <div class="auto form-group" :class="{ 'form-group--error': $v.form.title.$error }">
          <div class="stacked-label">
            <input
               class="form__input full-width"
               id="title"
               v-model.trim="form.title"
               @input="delayTouch($v.form.title)"
               :placeholder="$t('content.admin.module.detail.form.title.placeholder')"
               :class="{'has-error': $v.form.title.$error}">
            <label class="form__label" for="title">{{ $t('content.admin.module.detail.form.title.name') }}</label>
            <small class="form-group__message has-error" v-if="!$v.form.title.required && $v.form.title.$dirty">
              {{ $t('content.admin.module.detail.form.title.errors.required') }}
            </small>
            <small class="form-group__message has-error" v-if="!$v.form.title.minLength">
              {{ $t('content.admin.module.detail.form.title.errors.minLength') }}
            </small>
            <small>{{ $t('content.admin.module.detail.form.title.info') }}</small>
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
               @input="delayTouch($v.form.slug)"
               :placeholder="$t('content.admin.module.detail.form.slug.placeholder')"
               :class="{'has-error': $v.form.slug.$error}">
            <label class="form__label" for="slug">{{ $t('content.admin.module.detail.form.slug.name') }}</label>
            <small class="form-group__message has-error" v-if="!$v.form.slug.required && $v.form.slug.$dirty">
              {{ $t('content.admin.module.detail.form.slug.errors.required') }}
            </small>
            <small class="form-group__message has-error" v-if="!$v.form.slug.isUnique && $v.form.slug.$dirty && $v.form.slug === module.slug">
              {{ $t('content.admin.module.detail.form.slug.errors.isUnique') }}
            </small>
            <small v-html="$t('content.admin.module.detail.form.slug.info')"></small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="auto form-group">
          <div class="stacked-label">
            <input
               class="form__input full-width"
               id="description"
               v-model.trim="form.description"
               :placeholder="$t('content.admin.module.detail.form.description.placeholder')"
               >
            <label class="form__label" for="description">{{ $t('content.admin.module.detail.form.description.name') }}</label>
            <small v-html="$t('content.admin.module.detail.form.description.info')"></small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="auto">
          <div class="stacked-label">
            <mavon-editor v-model="form.content" :language="'en'" default_open="edit" />
            <label>{{ $t('content.admin.module.detail.form.content.name') }}</label>
            <small v-html="$t('content.admin.module.detail.form.content.info')"></small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="auto">
          <button class="secondary outline big round" @click="save(false)">
            {{ $t('content.admin.module.detail.form.buttons.save') }}
          </button>
          <button class="secondary big round" @click="save(true)">
            {{ $t('content.admin.module.detail.form.buttons.quit') }}
          </button>
          <button class="tertiary big round" @click="cancel">
            {{ $t('buttons.cancel') }}
          </button>
        </div>
        <div class="auto text-right">
          <button class="remove big" @click="remove">
            <i :class="$t('result.failure.class')">delete_forever</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Utils } from 'quasar'
import { required, minLength } from 'vuelidate/lib/validators'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const touchMap = new WeakMap()

export default {
  name: 'module-detail',
  props: ['action', 'auth', 'course', 'module', 'tigris'],
  data () {
    return {
      form: {
        title: '',
        order_index: 0,
        description: '',
        content: '',
        slug: '',
        is_active: true,
        creator: ''
      },
      blankForm: {
        title: '',
        order_index: 0,
        description: '',
        content: '',
        slug: '',
        is_active: true,
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
      slug: {
        required,
        isUnique (val) {
          if (val === '') return true
          if (val === this.module.slug) return true
          return this.doesSlugNotExist(this.tigris, val)
        }
      }
    }
  },
  computed: {},
  watch: {
    'form.title': Utils.debounce(function (val) {
      this.tigris.util.slugify({val: val}).then(r => {
        // this.form.title = val
        this.form.slug = r.data.result
        this.delayTouch(this.$v.form.slug)
      })
    }, 100),
    module (val) {
      this.module = val
      this._onCreated(this.tigris)
    }
  },
  methods: {
    _onCreated (tigris) {
      if (this.module) {
        if (this.action === 'add') {
          this.form = this._.cloneDeep(this.blankForm)
        } else {
          for (var k in this.module) {
            if (this.form.hasOwnProperty(k)) {
              this.form[k] = this.module[k]
            }
          }
        }
      }
      // this.tigris.module.retrieve().then(tigris => {})
    },
    addModule (tigris, form) {
      form.creator = this.auth.id
      form.order_index = 1
      const data = {module: form}
      return tigris.module.create(this.course.id, data).then(r => {
        return r.data.result
      })
    },
    removeModule (tigris) {
      return tigris.module.destroy(this.module.id).then(r => {
        return r.data.result
      })
    },
    updateModule (tigris, form) {
      form.creator = this.module.creator
      const data = {module: form}
      return tigris.module.update(this.course.id, this.module.id, data).then(r => {
        return r.data.result
      })
    },
    cancel () {
      this.$emit('close', 'list', '')
    },
    delayTouch ($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch, 100))
    },
    doesSlugNotExist (tigris, slug) {
      return tigris.module.retrieve(this.course.id, null, {slug: slug}).then(r => {
        if (['done', 'exam'].indexOf(slug.toLowerCase()) >= 0) {
          return false
        } else {
          return !r.data
        }
      })
    },
    remove () {
      if (this.module) {
        this.removeModule(this.tigris).then(result => {
          this.form = this._.cloneDeep(this.blankForm)
          this.$emit('delete-module', 'positive', this.$t('result.success.message'), this.module)
          this.close()
        }).catch(e => {
          this.$emit('delete-module', 'negative', this.$t('result.failure.message'))
        })
      } else {
        this.form = this._.cloneDeep(this.blankForm)
        this.close()
      }
    },
    save (quit) {
      if (this.action === 'add') {
        this.addModule(this.tigris, this.form).then(module => {
          this.form = this._.cloneDeep(this.blankForm)
          this.$v.form.$reset()
          this.$emit('save-module', 'positive', this.$t('result.success.message'), module.id)
          if (quit) {
            this.$emit('close', 'list', '')
          }
        }).catch(e => {
          this.$emit('save-module', 'negative', this.$t('result.failure.message'))
        })
      } else {
        this.updateModule(this.tigris, this.form).then(r => {
          this.$emit('save-module', 'positive', this.$t('result.success.message'), this.module.id)
          if (quit) {
            this.$emit('close', 'list', '')
          }
        }).catch(e => {
          this.$emit('save-module', 'negative', this.$t('result.failure.message'))
        })
      }
    }
  },
  created () {
    this._onCreated(this.tigris)
  },
  components: {
    mavonEditor
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
