<template>
  <div class="layout-padding fit scroll">
    <div class="shadow-2 round-borders bg-white module-content">
      <div class="flex justify-center current-position">
        <p>
          <i>my_location</i>
          <router-link to="/courses" v-html="$t('content.courses.done.position.message', {link: $t('content.courses.done.position.new_course')})"></router-link>
        </p>
      </div>
      <hr>
      <div class="row">
        {{ $t('content.courses.done.content') }}
      </div>
      <div class="row">
        <router-link to="/courses">
          {{ $t('content.courses.done.return.message', {link: $t('content.courses.done.return.link')}) }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import { Tigris } from '../../api'

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
    if (this.auth) {
      this._onCreated()
    }
  },
  methods: {
    _onCreated () {
      /*
      Tigris.initializeWithToken(this.auth.id, this.token).then(tigris => {
        tigris.user.update(this.auth.id, this.enrollment.id, {}).then(r => {
        })
      })
      */
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
