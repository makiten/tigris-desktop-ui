<template>
  <div class="layout-padding fit scroll">
    <div class="shadow-2 round-borders bg-white module-content">
      <div class="flex justify-center current-position">
        <p>
          <i>my_location</i>
          <i18n path="position.message" tag="span">
            <router-link to="/courses">{{ $t('position.new_course') }}</router-link>
          </i18n>
        </p>
      </div>
      <hr>
      <div class="row" v-html="content">
        {{ content }}
      </div>
      <div class="row">
        <i18n path="return.message" tag="p">
          <router-link to="/courses">{{ $t('return.link') }}</router-link>
        </i18n>
      </div>
    </div>
  </div>
</template>

<script>
import { Tigris } from '../../api'

export default {
  name: 'done',
  props: ['auth', 'enrollment', 'token'],
  data: () => ({
    dashboard: '',
    slug: '',
    content: '',
    errors: []
  }),
  watch: {
    enrollment (val) {
      this._onCreated()
    }
  },
  created () {
    this._onCreated()
  },
  methods: {
    _onCreated () {
      Tigris.initializeWithToken(this.auth.id, this.token).then(tigris => {
        tigris.user.update(this.auth.id, this.enrollment.id, {}).then(r => {
        })
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus">
.module-content
  padding 1.5vh 1vw
.current-position
  p
    font-size 1.5rem
    i
      color #fc763c
button
  font-size 1rem
  font-family 'oxygenbold'
</style>
