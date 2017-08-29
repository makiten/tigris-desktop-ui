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
export default {
  name: 'done',
  data: () => ({
    dashboard: '',
    jogral_url: process.env.jogral_url,
    slug: '',
    content: '',
    errors: []
  }),
  mounted () {
    this.slug = this.$route.params.courseName
    this.dashboard = process.env.jogral_url + '/dashboard/'
    // const token = this.$cookie.get('_euphrates_token')
    // const course = this.$cookie.get('_euphrates_course')
    const url = '' // process.env.euphrates.api_url + '/course/' + course + '/module/done/'
    var headers = {} // {'Authorization': 'Bearer ' + token}
    this.axios.get(url, {'headers': headers}).then(
      response => {
        this.content = response.data.content
      }).catch(e => {
        this.errors.push(e)
      })
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
